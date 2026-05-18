import mongoose, { Schema } from 'mongoose';
const VolunteerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    interests: [{ type: String }],
    message: { type: String },
    status: { type: String, enum: ['pending', 'contacted', 'active'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Volunteer', VolunteerSchema);
