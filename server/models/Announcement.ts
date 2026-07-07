import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncement extends Document {
  contentEn: string;
  contentHi: string;
  contentGu: string;
  linkUrl: string;
  linkTextEn: string;
  linkTextHi: string;
  linkTextGu: string;
  isActive: boolean;
  isPinned: boolean;
  order: number;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
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

const Announcement = mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
export default Announcement;
