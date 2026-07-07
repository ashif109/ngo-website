import twilio from 'twilio';
import nodemailer from 'nodemailer';
import Notification from '../models/Notification';

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendSMS = async (to: string, message: string, recipientId?: any) => {
  try {
    if (!twilioClient) throw new Error('Twilio not configured');
    
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    if (recipientId) {
      await Notification.create({
        recipient: recipientId,
        recipientPhone: to,
        title: 'SMS Alert',
        message,
        type: 'sms',
        status: 'sent',
        providerResponse: { messageId: response.sid }
      });
    }

    return true;
  } catch (error: any) {
    console.error('SMS Error:', error);
    if (recipientId) {
      await Notification.create({
        recipient: recipientId,
        recipientPhone: to,
        title: 'SMS Alert',
        message,
        type: 'sms',
        status: 'failed',
        providerResponse: { error: error.message }
      });
    }
    return false;
  }
};

export const sendEmail = async (to: string, subject: string, html: string, recipientId?: any) => {
  try {
    if (!process.env.SMTP_HOST) throw new Error('SMTP not configured');

    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    if (recipientId) {
      await Notification.create({
        recipient: recipientId,
        recipientEmail: to,
        title: subject,
        message: html,
        type: 'email',
        status: 'sent',
        providerResponse: { messageId: info.messageId }
      });
    }

    return true;
  } catch (error: any) {
    console.error('Email Error:', error);
    if (recipientId) {
      await Notification.create({
        recipient: recipientId,
        recipientEmail: to,
        title: subject,
        message: html,
        type: 'email',
        status: 'failed',
        providerResponse: { error: error.message }
      });
    }
    return false;
  }
};
