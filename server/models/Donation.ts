import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donorName: string;
  phone: string;
  email?: string;
  transactionId: string;
  amount: number;
  status: 'pending' | 'verified' | 'failed';
  createdAt: Date;
}

const DonationSchema: Schema = new Schema({
  donorName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  transactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IDonation>('Donation', DonationSchema);
