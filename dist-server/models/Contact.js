import mongoose, { Schema } from 'mongoose';
const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Contact', ContactSchema);
