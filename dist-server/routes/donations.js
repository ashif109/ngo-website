import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Donation from '../models/Donation.js';
import AuditLog from '../models/AuditLog.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
const router = express.Router();
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret'
});
// @route   GET /api/admin/donations
// @desc    Get all donations
// @access  Admin/Viewer
router.get('/', authenticate, async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json(donations);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   PUT /api/admin/donations/:id/status
// @desc    Update donation status (manual verification)
// @access  Admin/Editor
router.put('/:id/status', authenticate, authorize(['super-admin', 'admin', 'editor']), async (req, res) => {
    try {
        const { status } = req.body;
        const donation = await Donation.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!donation)
            return res.status(404).json({ message: 'Donation not found' });
        await AuditLog.create({
            user: req.user._id,
            action: 'UPDATE_DONATION_STATUS',
            module: 'DONATIONS',
            details: { donationId: donation._id, newStatus: status },
            ip: req.ip
        });
        res.json(donation);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   DELETE /api/admin/donations/:id
// @desc    Delete a donation/donor
// @access  Super-Admin/Admin
router.delete('/:id', authenticate, authorize(['super-admin', 'admin']), async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);
        if (!donation)
            return res.status(404).json({ message: 'Donation not found' });
        await donation.deleteOne();
        await AuditLog.create({
            user: req.user._id,
            action: 'DELETE_DONATION',
            module: 'DONATIONS',
            details: { donationId: req.params.id, donorName: donation.donorName },
            ip: req.ip
        });
        res.json({ message: 'Donation deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   POST /api/donations/create-order
// @desc    Create Razorpay order (Public API for frontend)
// @access  Public
router.post('/create-order', async (req, res) => {
    try {
        const { amount, donorName, phone, email, isAnonymous, panNumber, address, campaign } = req.body;
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: 'receipt_' + Date.now()
        };
        const order = await razorpay.orders.create(options);
        const donation = new Donation({
            donorName,
            phone,
            email,
            amount,
            razorpayOrderId: order.id,
            receiptNumber: options.receipt,
            isAnonymous,
            panNumber,
            address,
            campaign,
            status: 'created'
        });
        await donation.save();
        res.json({ order, donationId: donation._id });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   POST /api/donations/verify
// @desc    Verify Razorpay payment
// @access  Public
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'test_secret')
            .update(sign.toString())
            .digest("hex");
        if (razorpay_signature === expectedSign) {
            await Donation.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, {
                status: 'verified',
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature
            });
            res.json({ message: 'Payment verified successfully' });
        }
        else {
            await Donation.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: 'failed' });
            res.status(400).json({ message: 'Invalid signature sent!' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
