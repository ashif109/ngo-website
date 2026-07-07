import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  titleEn: string;
  titleHi: string;
  titleGu: string;
  descriptionEn?: string;
  descriptionHi?: string;
  descriptionGu?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  link?: string;
  websiteLink?: string;
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema: Schema = new Schema({
  titleEn: { type: String, required: true },
  titleHi: { type: String, required: true },
  titleGu: { type: String, required: true },
  descriptionEn: { type: String },
  descriptionHi: { type: String },
  descriptionGu: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  location: { type: String },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  link: { type: String },
  websiteLink: { type: String },
  featuredImage: { type: String },
}, {
  timestamps: true
});

export default mongoose.model<IProgram>('Program', ProgramSchema);
