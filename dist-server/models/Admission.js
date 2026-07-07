import mongoose, { Schema } from 'mongoose';
const AdmissionSchema = new Schema({
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
export default mongoose.model('Admission', AdmissionSchema);
