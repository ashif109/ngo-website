import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  url: string;
  captionEn: string;
  captionHi: string;
  captionGu: string;
  section: string; // 'campus-life', 'hero', 'causes', etc.
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  url: { type: String, required: true },
  captionEn: { type: String, default: '' },
  captionHi: { type: String, default: '' },
  captionGu: { type: String, default: '' },
  section: { type: String, default: 'campus-life', required: true },
}, { timestamps: true });

const GalleryImage = mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
export default GalleryImage;
