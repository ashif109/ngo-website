import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: Date;
  gender: 'male' | 'female' | 'other';
  studentId: string;
  batchYear: number;
  program: mongoose.Types.ObjectId;
  currentStatus: 'active' | 'graduated' | 'dropped';
  alumniStatus?: {
    isRegistered: boolean;
    currentOccupation?: string;
    company?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  studentId: { type: String, required: true, unique: true },
  batchYear: { type: Number, required: true },
  program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  currentStatus: { type: String, enum: ['active', 'graduated', 'dropped'], default: 'active' },
  alumniStatus: {
    isRegistered: { type: Boolean, default: false },
    currentOccupation: String,
    company: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IStudent>('Student', StudentSchema);
