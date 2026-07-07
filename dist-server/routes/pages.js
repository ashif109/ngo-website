import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import Page from '../models/Page';
import AuditLog from '../models/AuditLog';
const router = express.Router();
// @route   GET /api/admin/pages
// @desc    Get all pages
// @access  Admin/Editor/Viewer
router.get('/', authenticate, async (req, res) => {
    try {
        const pages = await Page.find().sort({ updatedAt: -1 }).populate('author', 'name email');
        res.json(pages);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   GET /api/admin/pages/:id
// @desc    Get page by ID
// @access  Admin/Editor/Viewer
router.get('/:id', authenticate, async (req, res) => {
    try {
        const page = await Page.findById(req.params.id).populate('author', 'name email');
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(page);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   POST /api/admin/pages
// @desc    Create a page
// @access  Admin/Editor
router.post('/', authenticate, authorize(['super-admin', 'admin', 'content-manager', 'editor']), async (req, res) => {
    try {
        const { title, slug, content, excerpt, status, metaTitle, metaDescription } = req.body;
        const existing = await Page.findOne({ slug });
        if (existing) {
            return res.status(400).json({ message: 'A page with this slug already exists.' });
        }
        const page = new Page({
            title,
            slug,
            content,
            excerpt,
            status,
            metaTitle,
            metaDescription,
            author: req.user._id,
            version: 1,
            versions: [{
                    versionNumber: 1,
                    content,
                    updatedBy: req.user._id
                }]
        });
        await page.save();
        await AuditLog.create({
            user: req.user._id,
            action: 'CREATE_PAGE',
            module: 'CMS',
            details: { pageId: page._id, title: page.title },
            ip: req.ip
        });
        res.status(201).json(page);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   PUT /api/admin/pages/:id
// @desc    Update a page
// @access  Admin/Editor
router.put('/:id', authenticate, authorize(['super-admin', 'admin', 'content-manager', 'editor']), async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        const { title, slug, content, excerpt, status, metaTitle, metaDescription } = req.body;
        // Check slug collision
        if (slug !== page.slug) {
            const existing = await Page.findOne({ slug });
            if (existing)
                return res.status(400).json({ message: 'Slug already in use.' });
        }
        page.title = title;
        page.slug = slug;
        page.excerpt = excerpt;
        page.status = status;
        page.metaTitle = metaTitle;
        page.metaDescription = metaDescription;
        if (content && content !== page.content) {
            page.content = content;
            page.version += 1;
            page.versions.push({
                versionNumber: page.version,
                content,
                updatedBy: req.user._id,
                updatedAt: new Date()
            });
        }
        await page.save();
        await AuditLog.create({
            user: req.user._id,
            action: 'UPDATE_PAGE',
            module: 'CMS',
            details: { pageId: page._id, title: page.title },
            ip: req.ip
        });
        res.json(page);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// @route   DELETE /api/admin/pages/:id
// @desc    Delete a page
// @access  Admin only
router.delete('/:id', authenticate, authorize(['super-admin', 'admin']), async (req, res) => {
    try {
        const page = await Page.findById(req.params.id);
        if (!page)
            return res.status(404).json({ message: 'Page not found' });
        await page.deleteOne();
        await AuditLog.create({
            user: req.user._id,
            action: 'DELETE_PAGE',
            module: 'CMS',
            details: { pageId: req.params.id, title: page.title },
            ip: req.ip
        });
        res.json({ message: 'Page deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
export default router;
