import express from 'express';
import { authenticate } from '../middleware/auth.js';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import Page from '../models/Page.js';
import Student from '../models/Student.js';
import AuditLog from '../models/AuditLog.js';

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
      
    // Calculate real monthly data for recharts (past 7 months)
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(sevenMonthsAgo.getMonth() - 6);
    sevenMonthsAgo.setDate(1);
    sevenMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyDonations = await Donation.aggregate([
      { 
        $match: { 
          status: 'verified', 
          createdAt: { $gte: sevenMonthsAgo } 
        } 
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: '$amount' }
        }
      }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      
      const found = monthlyDonations.find(item => item._id.year === year && item._id.month === month);
      
      revenueData.push({
        name: monthNames[d.getMonth()],
        amount: found ? found.total : 0
      });
    }

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
