import express from 'express';
import Admin from '../models/Admin.js';
import Program from '../models/Program.js';
import Volunteer from '../models/Volunteer.js';
import Contact from '../models/Contact.js';
import Donation from '../models/Donation.js';
import Submission from '../models/Submission.js';
import { hashPassword, verifyPassword, generateToken, adminAuthMiddleware } from '../utils/auth.js';
const router = express.Router();
// 1. Check if first-time setup is needed
router.get('/check-setup', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        return res.status(200).json({ success: true, isSetup: adminCount > 0 });
    }
    catch (error) {
        console.error('Error in GET /check-setup:', error);
        return res.status(500).json({ success: false, error: 'Server error while checking admin status' });
    }
});
// 2. Perform initial first-time setup
router.post('/setup', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(400).json({ success: false, error: 'Admin has already been setup and configured' });
        }
        const { email, password } = req.body;
        if (!email || !password || password.length < 6) {
            return res.status(400).json({ success: false, error: 'Valid email and a password of at least 6 characters are required' });
        }
        const { hash, salt } = hashPassword(password);
        const admin = await Admin.create({
            email,
            passwordHash: hash,
            passwordSalt: salt
        });
        return res.status(201).json({ success: true, message: 'Admin setup completed successfully' });
    }
    catch (error) {
        console.error('Error in POST /setup:', error);
        return res.status(500).json({ success: false, error: 'Server error during admin setup' });
    }
});
// 3. Admin Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        const isValid = verifyPassword(password, admin.passwordHash, admin.passwordSalt);
        if (!isValid) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
        const token = generateToken({ id: admin._id, email: admin.email });
        return res.status(200).json({
            success: true,
            token,
            email: admin.email
        });
    }
    catch (error) {
        console.error('Error in POST /login:', error);
        return res.status(500).json({ success: false, error: 'Server error during login' });
    }
});
// 4. Change Password (Protected)
router.post('/change-password', adminAuthMiddleware, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, error: 'Provide current password and a new password of at least 6 characters' });
        }
        const adminInfo = req.admin;
        const admin = await Admin.findById(adminInfo.id);
        if (!admin) {
            return res.status(404).json({ success: false, error: 'Admin user not found' });
        }
        const isValid = verifyPassword(oldPassword, admin.passwordHash, admin.passwordSalt);
        if (!isValid) {
            return res.status(400).json({ success: false, error: 'Current password provided is incorrect' });
        }
        const { hash, salt } = hashPassword(newPassword);
        admin.passwordHash = hash;
        admin.passwordSalt = salt;
        await admin.save();
        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    }
    catch (error) {
        console.error('Error in POST /change-password:', error);
        return res.status(500).json({ success: false, error: 'Server error while changing password' });
    }
});
// 5. Retrieve Submissions logs (Protected)
router.get('/submissions', adminAuthMiddleware, async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        const contacts = await Contact.find().sort({ createdAt: -1 });
        const donations = await Donation.find().sort({ createdAt: -1 });
        const generals = await Submission.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: {
                volunteers,
                contacts,
                donations,
                generals
            }
        });
    }
    catch (error) {
        console.error('Error in GET /submissions:', error);
        return res.status(500).json({ success: false, error: 'Server error while fetching submissions' });
    }
});
// 6. List Programs (Public)
router.get('/programs', async (req, res) => {
    try {
        const programs = await Program.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: programs });
    }
    catch (error) {
        console.error('Error in GET /programs:', error);
        return res.status(500).json({ success: false, error: 'Server error while fetching programs' });
    }
});
// 7. Add Program (Protected)
router.post('/programs', adminAuthMiddleware, async (req, res) => {
    try {
        const { textEn, textHi, textGu, link, websiteLink } = req.body;
        if (!textEn || !textHi || !textGu) {
            return res.status(400).json({ success: false, error: 'Please provide program details in English, Hindi, and Gujarati' });
        }
        const program = await Program.create({
            textEn, textHi, textGu, link, websiteLink
        });
        return res.status(201).json({ success: true, data: program });
    }
    catch (error) {
        console.error('Error in POST /programs:', error);
        return res.status(500).json({ success: false, error: 'Server error while creating program' });
    }
});
// 8. Edit Program (Protected)
router.put('/programs/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const { textEn, textHi, textGu, link, websiteLink } = req.body;
        const { id } = req.params;
        if (!textEn || !textHi || !textGu) {
            return res.status(400).json({ success: false, error: 'Please provide program details in English, Hindi, and Gujarati' });
        }
        const program = await Program.findByIdAndUpdate(id, { textEn, textHi, textGu, link, websiteLink }, { new: true });
        if (!program) {
            return res.status(404).json({ success: false, error: 'Program not found' });
        }
        return res.status(200).json({ success: true, data: program });
    }
    catch (error) {
        console.error('Error in PUT /programs/:id:', error);
        return res.status(500).json({ success: false, error: 'Server error while updating program' });
    }
});
// 9. Delete Program (Protected)
router.delete('/programs/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const program = await Program.findByIdAndDelete(id);
        if (!program) {
            return res.status(404).json({ success: false, error: 'Program not found' });
        }
        return res.status(200).json({ success: true, message: 'Program deleted successfully' });
    }
    catch (error) {
        console.error('Error in DELETE /programs/:id:', error);
        return res.status(500).json({ success: false, error: 'Server error while deleting program' });
    }
});
export default router;
