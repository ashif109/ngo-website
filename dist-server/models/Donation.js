import mongoose, { Schema } from 'mongoose';
const DonationSchema = new Schema({
    donorName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Donation', DonationSchema);
