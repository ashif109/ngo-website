import express from 'express';
import AdmissionCampaign from '../models/AdmissionCampaign.js';
import { authenticate as adminAuth } from '../middleware/auth.js';
const router = express.Router();
// Public route to get active admission campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await AdmissionCampaign.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, data: campaigns });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin routes
router.get('/admin', adminAuth, async (req, res) => {
    try {
        const campaigns = await AdmissionCampaign.find().sort({ createdAt: -1 });
        res.json({ success: true, data: campaigns });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post('/admin', adminAuth, async (req, res) => {
    try {
        const newCampaign = new AdmissionCampaign(req.body);
        await newCampaign.save();
        res.status(201).json({ success: true, data: newCampaign });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.put('/admin/:id', adminAuth, async (req, res) => {
    try {
        const updated = await AdmissionCampaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.delete('/admin/:id', adminAuth, async (req, res) => {
    try {
        const deleted = await AdmissionCampaign.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        res.json({ success: true, message: 'Campaign deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
export default router;
