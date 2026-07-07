import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmission extends Document {
  studentName: string;
  email: string;
  phone: string;
  dob: Date;
  gender: 'male' | 'female' | 'other';
  programId: mongoose.Types.ObjectId;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  documents: Array<{
    name: string;
    url: string;
  }>;
  notes?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema: Schema = new Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  },
  documents: [{
    name: { type: String, required: true },
    url: { type: String, required: true }
  }],
  notes: { type: String },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export default mongoose.model<IAdmission>('Admission', AdmissionSchema);
