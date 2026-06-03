import express, { Request, Response } from 'express';
import Volunteer from '../models/Volunteer.js';
import Contact from '../models/Contact.js';
import Donation from '../models/Donation.js';
import Submission from '../models/Submission.js';
import { sendNotificationEmail } from '../utils/email.js';

const router = express.Router();

// ----------------------
// VOLUNTEER ROUTES
// ----------------------
router.post('/volunteers', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, phone, interests, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and phone' });
    }

    const volunteer = await Volunteer.create({
      name, email, phone, interests, message
    });

    // Send email alert asynchronously without blocking client response
    sendNotificationEmail('Volunteer Registration', { name, email, phone, interests, message }).catch(err => {
      console.error('Failed to send volunteer email alert:', err);
    });

    return res.status(201).json({ success: true, data: volunteer });
  } catch (error: any) {
    console.error('Error in POST /volunteers:', error);
    return res.status(500).json({ success: false, error: 'Server error while processing volunteer request' });
  }
});

// ----------------------
// CONTACT ROUTES
// ----------------------
router.post('/contact', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and message' });
    }

    const contact = await Contact.create({
      name, email, phone, subject, message
    });

    // Send email alert asynchronously
    sendNotificationEmail('Contact Form Message', { name, email, phone, subject, message }).catch(err => {
      console.error('Failed to send contact email alert:', err);
    });

    return res.status(201).json({ success: true, data: contact });
  } catch (error: any) {
    console.error('Error in POST /contact:', error);
    return res.status(500).json({ success: false, error: 'Server error while processing contact message' });
  }
});

// ----------------------
// DONATION ROUTES
// ----------------------
router.post('/donations', async (req: Request, res: Response): Promise<any> => {
  try {
    const { donorName, phone, email, transactionId, amount } = req.body;
    
    if (!donorName || !phone || !transactionId || !amount) {
      return res.status(400).json({ success: false, error: 'Please provide all required donation details' });
    }

    const donation = await Donation.create({
      donorName, phone, email, transactionId, amount
    });

    // Send email alert asynchronously
    sendNotificationEmail('Donation Alert', { donorName, phone, email, transactionId, amount }).catch(err => {
      console.error('Failed to send donation email alert:', err);
    });

    return res.status(201).json({ success: true, data: donation });
  } catch (error: any) {
    console.error('Error in POST /donations:', error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'A donation with this Transaction ID already exists' });
    }
    return res.status(500).json({ success: false, error: 'Server error while processing donation details' });
  }
});

// ----------------------
// GENERAL SUBMISSIONS (Admissions, Help Desk, Grievances, Alumni registry)
// ----------------------
router.post('/submit-general', async (req: Request, res: Response): Promise<any> => {
  try {
    const { formType, data } = req.body;
    
    if (!formType || !data) {
      return res.status(400).json({ success: false, error: 'Please provide formType and data object' });
    }

    const submission = await Submission.create({
      formType, data
    });

    // Send email alert asynchronously
    sendNotificationEmail(formType, data).catch(err => {
      console.error('Failed to send general submission email alert:', err);
    });

    return res.status(201).json({ success: true, data: submission });
  } catch (error: any) {
    console.error('Error in POST /submit-general:', error);
    return res.status(500).json({ success: false, error: 'Server error while processing general submission' });
  }
});

export default router;
