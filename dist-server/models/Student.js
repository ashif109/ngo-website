import mongoose, { Schema } from 'mongoose';
const StudentSchema = new Schema({
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
export default mongoose.model('Student', StudentSchema);
