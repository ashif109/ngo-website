import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  recipientEmail?: string;
  recipientPhone?: string;
  title: string;
  message: string;
  type: 'email' | 'sms' | 'push';
  status: 'pending' | 'sent' | 'failed';
  providerResponse?: any;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User' },
  recipientEmail: { type: String },
  recipientPhone: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['email', 'sms', 'push'], required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  providerResponse: { type: Schema.Types.Mixed }
}, {
  timestamps: true
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
