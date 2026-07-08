import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.js';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT && process.env.PORT !== '3000' ? process.env.PORT : 5000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false // Disabled temporarily for development
}));

// Trust proxy for Vercel and express-rate-limit
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute'
});
app.use('/api', limiter);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api', apiRoutes);
app.use('/api/admin/auth', authRoutes);
import pagesRoutes from './routes/pages.js';
import mediaRoutes from './routes/media.js';
import programsRoutes from './routes/programs.js';
import admissionsRoutes from './routes/admissions.js';
import donationsRoutes from './routes/donations.js';
import studentsRoutes from './routes/students.js';
import analyticsRoutes from './routes/analytics.js';
import coursesRoutes from './routes/courses.js';
import publicationsRoutes from './routes/publications.js';
import announcementsRoutes from './routes/announcements.js';
import admissionCampaignsRoutes from './routes/admissionCampaigns.js';
import usersRoutes from './routes/users.js';
import volunteersRoutes from './routes/volunteers.js';

app.use('/api/admin/pages', pagesRoutes);
app.use('/api/admin/media', mediaRoutes);
app.use('/api/admin/admissions', admissionsRoutes);
app.use('/api/admin/donations', donationsRoutes);
app.use('/api/admin/students', studentsRoutes);
app.use('/api/admin/analytics', analyticsRoutes);
app.use('/api/admin/users', usersRoutes);
app.use('/api/admin/volunteers', volunteersRoutes);

app.use('/api/courses', coursesRoutes);
app.use('/api/publications', publicationsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/admission-campaigns', admissionCampaignsRoutes);

app.use('/api/donations', donationsRoutes); // Public endpoints for frontend
app.use('/api/admissions', admissionsRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Serve Frontend in Production
const frontendDistPath = path.join(__dirname, '..', 'dist');
app.use(express.static(frontendDistPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Export the app for Vercel serverless
export default app;

// Only listen if not running on Vercel
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
