import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
        type: String,
        enum: ['super-admin', 'admin', 'content-manager', 'editor', 'viewer', 'contributor'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    twoFactorAuth: { type: Boolean, default: false },
    lastLogin: { type: Date },
    loginHistory: [{
            time: { type: Date, default: Date.now },
            ip: String,
            location: String,
            device: String
        }],
    failedLoginAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date }
}, {
    timestamps: true
});
export default mongoose.model('User', UserSchema);
