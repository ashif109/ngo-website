import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication required. No token provided.' });
        }
        console.log('Received token:', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-change-in-production');
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        if (user.status !== 'active') {
            return res.status(403).json({ message: 'Your account is inactive or suspended.' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
export const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required.' });
        }
        if (req.user.role === 'super-admin') {
            return next(); // Super admin bypasses all role checks
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action.' });
        }
        next();
    };
};
