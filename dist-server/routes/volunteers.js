import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Volunteer from '../models/Volunteer.js';
import AuditLog from '../models/AuditLog.js';
const router = express.Router();
// @route   GET /api/admin/volunteers
// @desc    Get all volunteers
// @access  Admin/Editor/Viewer
router.get('/', authenticate, async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.json(volunteers);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   PUT /api/admin/volunteers/:id
// @desc    Update volunteer details/status
// @access  Admin/Editor
router.put('/:id', authenticate, authorize(['super-admin', 'admin', 'editor']), async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!volunteer)
            return res.status(404).json({ message: 'Volunteer not found' });
        await AuditLog.create({
            user: req.user._id,
            action: 'UPDATE_VOLUNTEER',
            module: 'VOLUNTEERS',
            details: { volunteerId: volunteer._id, name: volunteer.name },
            ip: req.ip
        });
        res.json(volunteer);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   DELETE /api/admin/volunteers/:id
// @desc    Delete a volunteer
// @access  Super-Admin/Admin
router.delete('/:id', authenticate, authorize(['super-admin', 'admin']), async (req, res) => {
    try {
        const volunteer = await Volunteer.findById(req.params.id);
        if (!volunteer)
            return res.status(404).json({ message: 'Volunteer not found' });
        await volunteer.deleteOne();
        await AuditLog.create({
            user: req.user._id,
            action: 'DELETE_VOLUNTEER',
            module: 'VOLUNTEERS',
            details: { volunteerId: req.params.id, name: volunteer.name },
            ip: req.ip
        });
        res.json({ message: 'Volunteer deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
