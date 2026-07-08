import express from 'express';
import Announcement from '../models/Announcement.js';
import { authenticate as adminAuth } from '../middleware/auth.js';
const router = express.Router();
// Public route
router.get('/', async (req, res) => {
    try {
        const announcements = await Announcement.find({ isActive: true })
            .sort({ isPinned: -1, order: 1, createdAt: -1 });
        res.json({ success: true, data: announcements });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin routes
router.get('/admin', adminAuth, async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ isPinned: -1, order: 1, createdAt: -1 });
        res.json({ success: true, data: announcements });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post('/admin', adminAuth, async (req, res) => {
    try {
        const newDoc = new Announcement(req.body);
        await newDoc.save();
        res.status(201).json({ success: true, data: newDoc });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.put('/admin/:id', adminAuth, async (req, res) => {
    try {
        const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.delete('/admin/:id', adminAuth, async (req, res) => {
    try {
        const deleted = await Announcement.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, message: 'Deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
export default router;
