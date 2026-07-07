import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: any;
  category: string;
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true },
  category: { type: String, required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export default mongoose.model<ISetting>('Setting', SettingSchema);
