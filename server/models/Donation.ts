import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donorName: string;
  phone: string;
  email?: string;
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  receiptNumber?: string;
  isAnonymous: boolean;
  panNumber?: string;
  address?: string;
  status: 'created' | 'pending' | 'verified' | 'failed' | 'refunded';
  campaign?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema: Schema = new Schema({
  donorName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  razorpayOrderId: { type: String, required: true, unique: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  receiptNumber: { type: String },
  isAnonymous: { type: Boolean, default: false },
  panNumber: { type: String },
  address: { type: String },
  status: { type: String, enum: ['created', 'pending', 'verified', 'failed', 'refunded'], default: 'created' },
  campaign: { type: String },
}, {
  timestamps: true
});

export default mongoose.model<IDonation>('Donation', DonationSchema);
