import mongoose, { Schema } from 'mongoose';
const DonationSchema = new Schema({
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
export default mongoose.model('Donation', DonationSchema);
