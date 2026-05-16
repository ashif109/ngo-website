import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  message?: string;
  status: 'pending' | 'contacted' | 'active';
  createdAt: Date;
}

const VolunteerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interests: [{ type: String }],
  message: { type: String },
  status: { type: String, enum: ['pending', 'contacted', 'active'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
