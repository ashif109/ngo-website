import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import Student from '../models/Student';
import AuditLog from '../models/AuditLog';
const router = express.Router();
// @route   GET /api/admin/students
// @desc    Get all students
// @access  Admin/Editor/Viewer
router.get('/', authenticate, async (req, res) => {
    try {
        const students = await Student.find().populate('program', 'titleEn').sort({ createdAt: -1 });
        res.json(students);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   POST /api/admin/students
// @desc    Create a student profile
// @access  Admin/Editor
router.post('/', authenticate, authorize(['super-admin', 'admin', 'editor']), async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        await AuditLog.create({
            user: req.user._id,
            action: 'CREATE_STUDENT',
            module: 'STUDENTS',
            details: { studentId: student._id, name: student.firstName },
            ip: req.ip
        });
        res.status(201).json(student);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
