import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users (admins, editors, etc.)
// @access  Admin/Editor/Viewer
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash -loginHistory').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/users
// @desc    Create a new user
// @access  Super-Admin/Admin
router.post('/', authenticate, authorize(['super-admin', 'admin']), async (req: any, res: any) => {
  try {
    const { name, email, password, role, status } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      passwordHash,
      role: role || 'editor',
      status: status || 'active'
    });

    await user.save();

    await AuditLog.create({
      user: req.user._id,
      action: 'CREATE_USER',
      module: 'USERS',
      details: { targetUserId: user._id, email: user.email },
      ip: req.ip
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user role or status
// @access  Super-Admin/Admin
router.put('/:id', authenticate, authorize(['super-admin', 'admin']), async (req: any, res: any) => {
  try {
    const { role, status } = req.body;
    
    // Prevent self-demotion from super-admin or locking oneself out
    if (req.user._id.toString() === req.params.id && (status === 'inactive' || status === 'suspended')) {
      return res.status(400).json({ message: 'You cannot suspend or deactivate your own account.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { role, status } },
      { new: true }
    ).select('-passwordHash');

    if (!user) return res.status(404).json({ message: 'User not found' });

    await AuditLog.create({
      user: req.user._id,
      action: 'UPDATE_USER',
      module: 'USERS',
      details: { targetUserId: user._id, newRole: role, newStatus: status },
      ip: req.ip
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Super-Admin/Admin
router.delete('/:id', authenticate, authorize(['super-admin', 'admin']), async (req: any, res: any) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: 'You cannot delete your own account.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    await user.deleteOne();

    await AuditLog.create({
      user: req.user._id,
      action: 'DELETE_USER',
      module: 'USERS',
      details: { targetUserId: req.params.id, email: user.email },
      ip: req.ip
    });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
