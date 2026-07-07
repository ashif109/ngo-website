import express, { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import Admin from '../models/Admin.js';
import Program from '../models/Program.js';
import Volunteer from '../models/Volunteer.js';
import Contact from '../models/Contact.js';
import Donation from '../models/Donation.js';
import Submission from '../models/Submission.js';
import SiteContent from '../models/SiteContent.js';
import GalleryImage from '../models/GalleryImage.js';
import { hashPassword, verifyPassword, generateToken, adminAuthMiddleware } from '../utils/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// Multer: store file in memory, then upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Default site content for initial setup
const DEFAULT_SITE_CONTENT: Record<string, any> = {
  hero: {
    headlineEn: 'Preserving Wisdom, Empowering the Future',
    headlineHi: 'ज्ञान का संरक्षण, भविष्य का सशक्तिकरण',
    headlineGu: 'જ્ઞાનનું સંરક્ષણ, ભવિષ્યનું સશક્તિકરણ',
    badgeEn: 'National Initiative 2026',
    badgeHi: 'राष्ट्रीय पहल 2026',
    badgeGu: 'રાષ્ટ્રીય પહેલ 2026',
    backgroundImageUrl: '',
  },
  causes: [
    {
      titleEn: 'Vedic Education',
      titleHi: 'वैदिक शिक्षा',
      titleGu: 'વૈદિક શિક્ષણ',
      descEn: 'Reviving ancient wisdom for modern minds through structured Gurukulam programs.',
      descHi: 'संरचित गुरुकुल कार्यक्रमों के माध्यम से आधुनिक दिमागों के लिए प्राचीन ज्ञान को पुनर्जीवित करना।',
      descGu: 'આયોજિત ગુરુકુલ કાર્યક્રમો દ્વારા આધુનિક મન માટે પ્રાચીન જ્ઞાનને પુનર્જીવિત કરવું.',
      imageUrl: '',
      colorClass: 'bg-orange-600'
    },
    {
      titleEn: 'Cultural Heritage',
      titleHi: 'सांस्कृतिक विरासत',
      titleGu: 'સાંસ્કૃતિક વારસો',
      descEn: 'Preserving and documenting the intangible heritage of Bharat for future generations.',
      descHi: 'भावी पीढ़ियों के लिए भारत की अमूर्त विरासत का संरक्षण और दस्तावेजीकरण।',
      descGu: 'ભાવી પેઢીઓ માટે ભારતના અમૂર્ત વારસાનું સંરક્ષણ અને દસ્તાવેજીકરણ.',
      imageUrl: '',
      colorClass: 'bg-blue-900'
    },
    {
      titleEn: 'Rural Welfare',
      titleHi: 'ग्रामीण कल्याण',
      titleGu: 'ગ્રામીણ કલ્યાણ',
      descEn: 'Bringing sustainable development and education to the heart of rural India.',
      descHi: 'ग्रामीण भारत के दिल में सतत विकास और शिक्षा लाना।',
      descGu: 'ગ્રામીણ ભારતના હૃદયમાં ટકાઉ વિકાસ અને શિક્ષણ લાવવું.',
      imageUrl: '',
      colorClass: 'bg-green-700'
    }
  ],
  stats: [
    { labelEn: 'Students Empowered', labelHi: 'सशक्त छात्र', labelGu: 'સશક્ત વિદ્યાર્થીઓ', value: '15,000+', icon: 'graduation' },
    { labelEn: 'Gurukulams Supported', labelHi: 'समर्थित गुरुकुल', labelGu: 'સમર્થિત ગુરુકુલો', value: '120+', icon: 'building' },
    { labelEn: 'Villages Reached', labelHi: 'पहुंचे हुए गाँव', labelGu: 'પહોંચેલા ગામો', value: '450+', icon: 'map' },
    { labelEn: 'Research Publications', labelHi: 'अनुसंधान प्रकाशन', labelGu: 'સંશોધન પ્રકાશનો', value: '200+', icon: 'book' }
  ],
  settings: {
    orgNameEn: 'Triyambakam Gurukulam Association',
    orgNameHi: 'त्र्यंबकम गुरुकुलम एसोसिएशन',
    orgNameGu: 'ત્ર્યયંબકમ ગુરુકુળ સંઘ',
    address: 'Om Shree Platinum, Basai, Agra, Uttar Pradesh - 282001',
    email: 'ashifansari04704@gmail.com',
    phone: '+91 XXXXXXXXXX',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: Get or create a section's content
// ─────────────────────────────────────────────────────────────────────────────
async function getOrCreateSection(sectionKey: string) {
  let section = await SiteContent.findOne({ sectionKey });
  if (!section) {
    section = await SiteContent.create({
      sectionKey,
      data: DEFAULT_SITE_CONTENT[sectionKey] || {}
    });
  }
  return section;
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN AUTH ROUTES (Existing)
// ─────────────────────────────────────────────────────────────────────────────

// 1. Check if first-time setup is needed
router.get('/check-setup', async (req: Request, res: Response): Promise<any> => {
  try {
    const adminCount = await Admin.countDocuments();
    return res.status(200).json({ success: true, isSetup: adminCount > 0 });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while checking admin status' });
  }
});

// 2. Perform initial first-time setup
router.post('/setup', async (req: Request, res: Response): Promise<any> => {
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
    await Admin.create({ email, passwordHash: hash, passwordSalt: salt });
    return res.status(201).json({ success: true, message: 'Admin setup completed successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error during admin setup' });
  }
});

// 3. Admin Login
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, error: 'Invalid email or password' });
    const isValid = verifyPassword(password, admin.passwordHash, admin.passwordSalt);
    if (!isValid) return res.status(401).json({ success: false, error: 'Invalid email or password' });
    const token = generateToken({ id: admin._id, email: admin.email });
    return res.status(200).json({ success: true, token, email: admin.email });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error during login' });
  }
});

// 4. Change Password (Protected)
router.post('/change-password', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Provide current password and a new password of at least 6 characters' });
    }
    const adminInfo = (req as any).admin;
    const admin = await Admin.findById(adminInfo.id);
    if (!admin) return res.status(404).json({ success: false, error: 'Admin user not found' });
    const isValid = verifyPassword(oldPassword, admin.passwordHash, admin.passwordSalt);
    if (!isValid) return res.status(400).json({ success: false, error: 'Current password provided is incorrect' });
    const { hash, salt } = hashPassword(newPassword);
    admin.passwordHash = hash;
    admin.passwordSalt = salt;
    await admin.save();
    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while changing password' });
  }
});

// 5. Retrieve Submissions logs (Protected)
router.get('/submissions', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    const contacts = await Contact.find().sort({ createdAt: -1 });
    const donations = await Donation.find().sort({ createdAt: -1 });
    const generals = await Submission.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: { volunteers, contacts, donations, generals } });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while fetching submissions' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMS ROUTES (Existing)
// ─────────────────────────────────────────────────────────────────────────────

router.get('/programs', async (req: Request, res: Response): Promise<any> => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: programs });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while fetching programs' });
  }
});

router.post('/programs', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { titleEn, titleHi, titleGu, descriptionEn, descriptionHi, descriptionGu, startDate, endDate, location, status, link, websiteLink } = req.body;

    if (!titleEn || !titleHi || !titleGu) {
      return res.status(400).json({ success: false, error: 'Please provide program title in English, Hindi, and Gujarati' });
    }
    const program = await Program.create({ 
      titleEn, titleHi, titleGu, 
      descriptionEn, descriptionHi, descriptionGu, 
      startDate, endDate, location, status, 
      link, websiteLink 
    });
    return res.status(201).json({ success: true, data: program });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while creating program' });
  }
});

router.put('/programs/:id', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { titleEn, titleHi, titleGu, descriptionEn, descriptionHi, descriptionGu, startDate, endDate, location, status, link, websiteLink } = req.body;
    const { id } = req.params;

    if (!titleEn || !titleHi || !titleGu) {
      return res.status(400).json({ success: false, error: 'Please provide program title in English, Hindi, and Gujarati' });
    }
    const program = await Program.findByIdAndUpdate(id, { 
      titleEn, titleHi, titleGu, 
      descriptionEn, descriptionHi, descriptionGu, 
      startDate, endDate, location, status, 
      link, websiteLink 
    }, { new: true });
    if (!program) return res.status(404).json({ success: false, error: 'Program not found' });
    return res.status(200).json({ success: true, data: program });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while updating program' });
  }
});

router.delete('/programs/:id', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const program = await Program.findByIdAndDelete(id);
    if (!program) return res.status(404).json({ success: false, error: 'Program not found' });
    return res.status(200).json({ success: true, message: 'Program deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while deleting program' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT ROUTES (New CMS)
// ─────────────────────────────────────────────────────────────────────────────

// GET any section content (public)
router.get('/content/:sectionKey', async (req: Request, res: Response): Promise<any> => {
  try {
    const { sectionKey } = req.params;
    const section = await getOrCreateSection(sectionKey);
    return res.status(200).json({ success: true, data: section.data });
  } catch (error: any) {
    console.error('Error in GET /content/:sectionKey:', error);
    return res.status(500).json({ success: false, error: 'Server error while fetching content' });
  }
});

// UPDATE any section content (protected)
router.put('/content/:sectionKey', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { sectionKey } = req.params;
    const { data } = req.body;
    if (data === undefined) {
      return res.status(400).json({ success: false, error: 'No data provided' });
    }
    const section = await SiteContent.findOneAndUpdate(
      { sectionKey },
      { data },
      { new: true, upsert: true }
    );
    return res.status(200).json({ success: true, data: section.data });
  } catch (error: any) {
    console.error('Error in PUT /content/:sectionKey:', error);
    return res.status(500).json({ success: false, error: 'Server error while updating content' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE UPLOAD (via Cloudinary)
// ─────────────────────────────────────────────────────────────────────────────

// Upload image directly to Cloudinary and return URL (protected)
router.post('/upload-image', adminAuthMiddleware, upload.single('image'), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      // If Cloudinary not configured, return a placeholder
      return res.status(400).json({ 
        success: false, 
        error: 'Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file.' 
      });
    }

    // Upload buffer to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'gurukulam-ngo', resource_type: 'image' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file!.buffer);
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ success: false, error: 'Image upload failed: ' + error.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY IMAGE ROUTES
// ─────────────────────────────────────────────────────────────────────────────

// Get all gallery images for a section (public)
router.get('/gallery', async (req: Request, res: Response): Promise<any> => {
  try {
    const { section } = req.query;
    const query = section ? { section: section as string } : {};
    const images = await GalleryImage.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: images });
  } catch (error: any) {
    console.error('Error in GET /gallery:', error);
    return res.status(500).json({ success: false, error: 'Server error while fetching gallery' });
  }
});

// Add gallery image (protected) - accepts URL or file upload
router.post('/gallery', adminAuthMiddleware, upload.single('image'), async (req: Request, res: Response): Promise<any> => {
  try {
    const { captionEn = '', captionHi = '', captionGu = '', section = 'campus-life', imageUrl } = req.body;
    
    let finalUrl = imageUrl;

    // If a file was uploaded, upload to Cloudinary
    if (req.file && !finalUrl) {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      if (cloudName && apiKey && apiSecret) {
        const result = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'gurukulam-ngo/gallery', resource_type: 'image' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.file!.buffer);
        });
        finalUrl = result.secure_url;
      }
    }

    if (!finalUrl) {
      return res.status(400).json({ success: false, error: 'Please provide an image URL or upload an image file' });
    }

    const image = await GalleryImage.create({
      url: finalUrl,
      captionEn,
      captionHi,
      captionGu,
      section
    });

    return res.status(201).json({ success: true, data: image });
  } catch (error: any) {
    console.error('Error in POST /gallery:', error);
    return res.status(500).json({ success: false, error: 'Server error while adding gallery image' });
  }
});

// Update gallery image caption (protected)
router.put('/gallery/:id', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { captionEn, captionHi, captionGu, section } = req.body;
    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      { captionEn, captionHi, captionGu, section },
      { new: true }
    );
    if (!image) return res.status(404).json({ success: false, error: 'Image not found' });
    return res.status(200).json({ success: true, data: image });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while updating image' });
  }
});

// Delete gallery image (protected)
router.delete('/gallery/:id', adminAuthMiddleware, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const image = await GalleryImage.findByIdAndDelete(id);
    if (!image) return res.status(404).json({ success: false, error: 'Gallery image not found' });
    return res.status(200).json({ success: true, message: 'Gallery image deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: 'Server error while deleting gallery image' });
  }
});

export default router;
