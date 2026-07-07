import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { authenticate, authorize } from '../middleware/auth';
import Media from '../models/Media';
import AuditLog from '../models/AuditLog';
const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'test',
    api_key: process.env.CLOUDINARY_API_KEY || 'test',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'test',
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gurukulamagra-media',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf'],
    },
});
const upload = multer({ storage: storage });
// @route   GET /api/admin/media
// @desc    Get all media files
// @access  Admin/Editor
router.get('/', authenticate, async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 }).populate('uploadedBy', 'name');
        res.json(media);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   POST /api/admin/media/upload
// @desc    Upload media
// @access  Admin/Editor
router.post('/upload', authenticate, authorize(['super-admin', 'admin', 'content-manager', 'editor']), upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { altText, folder } = req.body;
        const media = new Media({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            url: req.file.path, // cloudinary url
            type: req.file.mimetype.includes('image') ? 'image' : req.file.mimetype.includes('video') ? 'video' : 'document',
            size: req.file.size,
            altText: altText || '',
            folder: folder || 'root',
            uploadedBy: req.user._id
        });
        await media.save();
        await AuditLog.create({
            user: req.user._id,
            action: 'UPLOAD_MEDIA',
            module: 'MEDIA',
            details: { mediaId: media._id, originalName: media.originalName },
            ip: req.ip
        });
        res.status(201).json(media);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   DELETE /api/admin/media/:id
// @desc    Delete media
// @access  Admin only
router.delete('/:id', authenticate, authorize(['super-admin', 'admin', 'content-manager']), async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media)
            return res.status(404).json({ message: 'Media not found' });
        // Delete from cloudinary
        if (media.filename) {
            await cloudinary.uploader.destroy(media.filename);
        }
        await media.deleteOne();
        await AuditLog.create({
            user: req.user._id,
            action: 'DELETE_MEDIA',
            module: 'MEDIA',
            details: { mediaId: req.params.id, originalName: media.originalName },
            ip: req.ip
        });
        res.json({ message: 'Media deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
