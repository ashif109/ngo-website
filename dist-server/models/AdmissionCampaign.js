import mongoose, { Schema } from 'mongoose';
const AdmissionCampaignSchema = new Schema({
    titleEn: { type: String, required: true },
    titleHi: { type: String, default: '' },
    titleGu: { type: String, default: '' },
    descriptionEn: { type: String, required: true },
    descriptionHi: { type: String, default: '' },
    descriptionGu: { type: String, default: '' },
    academicYear: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['upcoming', 'active', 'closed'], default: 'upcoming' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
const AdmissionCampaign = mongoose.model('AdmissionCampaign', AdmissionCampaignSchema);
export default AdmissionCampaign;
