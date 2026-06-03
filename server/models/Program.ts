import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  textEn: string;
  textHi: string;
  textGu: string;
  link?: string;
  websiteLink?: string;
  createdAt: Date;
}

const ProgramSchema: Schema = new Schema({
  textEn: { type: String, required: true },
  textHi: { type: String, required: true },
  textGu: { type: String, required: true },
  link: { type: String },
  websiteLink: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProgram>('Program', ProgramSchema);
