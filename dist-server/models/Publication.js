import mongoose, { Schema } from 'mongoose';
const PublicationSchema = new Schema({
    titleEn: { type: String, required: true },
    titleHi: { type: String, default: '' },
    titleGu: { type: String, default: '' },
    category: { type: String, required: true, enum: ['publication', 'policy_brief', 'newsletter', 'resource'] },
    dateEn: { type: String, default: '' },
    dateHi: { type: String, default: '' },
    dateGu: { type: String, default: '' },
    imgUrl: { type: String, default: '' },
    fileUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });
const Publication = mongoose.model('Publication', PublicationSchema);
export default Publication;
