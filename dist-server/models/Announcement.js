import mongoose, { Schema } from 'mongoose';
const AnnouncementSchema = new Schema({
    contentEn: { type: String, required: true },
    contentHi: { type: String, default: '' },
    contentGu: { type: String, default: '' },
    linkUrl: { type: String, default: '' },
    linkTextEn: { type: String, default: '' },
    linkTextHi: { type: String, default: '' },
    linkTextGu: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isPinned: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true });
const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export default Announcement;
