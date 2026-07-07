import mongoose, { Schema } from 'mongoose';
const NotificationSchema = new Schema({
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
export default mongoose.model('Notification', NotificationSchema);
