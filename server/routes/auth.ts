import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';

// @route   POST /api/admin/auth/login
// @desc    Authenticate admin & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress || 'unknown';

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is inactive or suspended.' });
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res.status(403).json({ message: 'Account locked due to too many failed attempts. Try again later.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // Lock for 30 mins
      }
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Successful login
    user.failedLoginAttempts = 0;
    user.lockedUntil = undefined;
    user.lastLogin = new Date();
    user.loginHistory.push({ time: new Date(), ip });
    
    // Keep only last 10 logins
    if (user.loginHistory.length > 10) {
      user.loginHistory.shift();
    }
    await user.save();

    await AuditLog.create({
      user: user._id,
      action: 'LOGIN',
      module: 'AUTH',
      ip
    });

    const payload = {
      id: user._id,
      role: user.role
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' }); // 30 mins session

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
