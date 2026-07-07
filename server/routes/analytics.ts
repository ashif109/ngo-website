import express from 'express';
import { authenticate } from '../middleware/auth';
import User from '../models/User';
import Donation from '../models/Donation';
import Page from '../models/Page';
import Student from '../models/Student';
import AuditLog from '../models/AuditLog';

const router = express.Router();

// @route   GET /api/admin/analytics/dashboard
// @desc    Get dashboard analytics
// @access  Admin/Editor/Viewer
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activePages = await Page.countDocuments({ status: 'published' });
    const verifiedDonations = await Donation.aggregate([
      { $match: { status: 'verified' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalStudents = await Student.countDocuments();
    
    const recentActivity = await AuditLog.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .populate('user', 'name email');
      
    // Mock monthly data for recharts
    const revenueData = [
      { name: 'Jan', amount: 4000 },
      { name: 'Feb', amount: 3000 },
      { name: 'Mar', amount: 2000 },
      { name: 'Apr', amount: 2780 },
      { name: 'May', amount: 1890 },
      { name: 'Jun', amount: 2390 },
      { name: 'Jul', amount: 3490 },
    ];

    res.json({
      metrics: {
        totalUsers,
        activePages,
        totalDonations: verifiedDonations.length > 0 ? verifiedDonations[0].total : 0,
        totalStudents
      },
      recentActivity,
      revenueData
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
