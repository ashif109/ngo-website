import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import Program from '../models/Program';
import AuditLog from '../models/AuditLog';

const router = express.Router();

// @route   GET /api/admin/programs
// @desc    Get all programs
// @access  Admin/Editor/Viewer
router.get('/', authenticate, async (req, res) => {
  try {
    const programs = await Program.find().sort({ startDate: 1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/programs
// @desc    Create a program
// @access  Admin/Editor
router.post('/', authenticate, authorize(['super-admin', 'admin', 'editor']), async (req: any, res: any) => {
  try {
    const program = new Program(req.body);
    await program.save();

    await AuditLog.create({
      user: req.user._id,
      action: 'CREATE_PROGRAM',
      module: 'PROGRAMS',
      details: { programId: program._id, title: program.titleEn },
      ip: req.ip
    });

    res.status(201).json(program);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/programs/:id
// @desc    Update a program
// @access  Admin/Editor
router.put('/:id', authenticate, authorize(['super-admin', 'admin', 'editor']), async (req: any, res: any) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!program) return res.status(404).json({ message: 'Program not found' });

    await AuditLog.create({
      user: req.user._id,
      action: 'UPDATE_PROGRAM',
      module: 'PROGRAMS',
      details: { programId: program._id, title: program.titleEn },
      ip: req.ip
    });

    res.json(program);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/programs/:id
// @desc    Delete a program
// @access  Admin only
router.delete('/:id', authenticate, authorize(['super-admin', 'admin']), async (req: any, res: any) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    await program.deleteOne();

    await AuditLog.create({
      user: req.user._id,
      action: 'DELETE_PROGRAM',
      module: 'PROGRAMS',
      details: { programId: req.params.id, title: program.titleEn },
      ip: req.ip
    });

    res.json({ message: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
