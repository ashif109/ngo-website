import express from 'express';
import Publication from '../models/Publication.js';
import { authenticate as adminAuth } from '../middleware/auth.js';
const router = express.Router();
// Public route
router.get('/', async (req, res) => {
    try {
        const publications = await Publication.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.json({ success: true, data: publications });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// Admin routes
router.get('/admin', adminAuth, async (req, res) => {
    try {
        const publications = await Publication.find().sort({ order: 1, createdAt: -1 });
        res.json({ success: true, data: publications });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post('/admin', adminAuth, async (req, res) => {
    try {
        const newDoc = new Publication(req.body);
        await newDoc.save();
        res.status(201).json({ success: true, data: newDoc });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
router.put('/admin/:id', adminAuth, async (req, res) => {
    try {
        const updated = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const deleted = await Publication.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, message: 'Deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
export default router;
