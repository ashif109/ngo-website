import express from 'express';
import Volunteer from '../models/Volunteer.js';
import Contact from '../models/Contact.js';
import Donation from '../models/Donation.js';
const router = express.Router();
// ----------------------
// VOLUNTEER ROUTES
// ----------------------
router.post('/volunteers', async (req, res) => {
    try {
        const { name, email, phone, interests, message } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, error: 'Please provide name, email, and phone' });
        }
        const volunteer = await Volunteer.create({
            name, email, phone, interests, message
        });
        return res.status(201).json({ success: true, data: volunteer });
    }
    catch (error) {
        console.error('Error in POST /volunteers:', error);
        return res.status(500).json({ success: false, error: 'Server error while processing volunteer request' });
    }
});
// ----------------------
// CONTACT ROUTES
// ----------------------
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Please provide name, email, and message' });
        }
        const contact = await Contact.create({
            name, email, message
        });
        return res.status(201).json({ success: true, data: contact });
    }
    catch (error) {
        console.error('Error in POST /contact:', error);
        return res.status(500).json({ success: false, error: 'Server error while processing contact message' });
    }
});
// ----------------------
// DONATION ROUTES
// ----------------------
router.post('/donations', async (req, res) => {
    try {
        const { donorName, phone, email, transactionId, amount } = req.body;
        if (!donorName || !phone || !transactionId || !amount) {
            return res.status(400).json({ success: false, error: 'Please provide all required donation details' });
        }
        const donation = await Donation.create({
            donorName, phone, email, transactionId, amount
        });
        return res.status(201).json({ success: true, data: donation });
    }
    catch (error) {
        console.error('Error in POST /donations:', error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, error: 'A donation with this Transaction ID already exists' });
        }
        return res.status(500).json({ success: false, error: 'Server error while processing donation details' });
    }
});
export default router;
