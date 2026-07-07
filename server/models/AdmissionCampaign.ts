import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmissionCampaign extends Document {
  titleEn: string;
  titleHi: string;
  titleGu: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionGu: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'closed';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionCampaignSchema = new Schema<IAdmissionCampaign>({
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

const AdmissionCampaign = mongoose.model<IAdmissionCampaign>('AdmissionCampaign', AdmissionCampaignSchema);
export default AdmissionCampaign;
