import mongoose, { Schema } from 'mongoose';
const GalleryImageSchema = new Schema({
    url: { type: String, required: true },
    captionEn: { type: String, default: '' },
    captionHi: { type: String, default: '' },
    captionGu: { type: String, default: '' },
    section: { type: String, default: 'campus-life', required: true },
}, { timestamps: true });
const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema);
export default GalleryImage;
