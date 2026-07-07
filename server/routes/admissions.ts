import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import Admission from '../models/Admission';
import AuditLog from '../models/AuditLog';

const router = express.Router();

// @route   GET /api/admin/admissions
// @desc    Get all admissions
// @access  Admin/Editor/Viewer
router.get('/', authenticate, async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 }).populate('programId', 'titleEn');
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/admissions/:id/status
// @desc    Update admission status
// @access  Admin/Editor
router.put('/:id/status', authenticate, authorize(['super-admin', 'admin', 'editor']), async (req: any, res: any) => {
  try {
    const { status, notes } = req.body;
    
    const admission = await Admission.findById(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Admission not found' });

    admission.status = status;
    if (notes) admission.notes = notes;
    admission.reviewedBy = req.user._id;

    await admission.save();

    await AuditLog.create({
      user: req.user._id,
      action: 'UPDATE_ADMISSION_STATUS',
      module: 'ADMISSIONS',
      details: { admissionId: admission._id, newStatus: status, student: admission.studentName },
      ip: req.ip
    });

    res.json(admission);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
