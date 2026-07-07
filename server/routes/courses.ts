import express from 'express';
import AcademicCourse from '../models/AcademicCourse.js';
import { authenticate as adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Public route to get active courses
router.get('/', async (req, res) => {
  try {
    const courses = await AcademicCourse.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin routes
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const courses = await AcademicCourse.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/admin', adminAuth, async (req, res) => {
  try {
    const newCourse = new AcademicCourse(req.body);
    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/admin/:id', adminAuth, async (req, res) => {
  try {
    const updated = await AcademicCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/admin/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await AcademicCourse.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Course not found' });
    res.json({ success: true, message: 'Course deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
