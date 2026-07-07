import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'super-admin' | 'admin' | 'content-manager' | 'editor' | 'viewer' | 'contributor';
  status: 'active' | 'inactive' | 'suspended';
  twoFactorAuth: boolean;
  lastLogin?: Date;
  loginHistory: Array<{
    time: Date;
    ip: string;
    location?: string;
    device?: string;
  }>;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
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

export default mongoose.model<IUser>('User', UserSchema);
