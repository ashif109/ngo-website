import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  path: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  altText?: string;
  usage: Array<mongoose.Types.ObjectId>;
  folder: string;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MediaSchema: Schema = new Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ['image', 'video', 'document'],
    required: true
  },
  size: { type: Number, required: true },
  altText: { type: String },
  usage: [{ type: Schema.Types.ObjectId, ref: 'Page' }],
  folder: { type: String, default: 'root' },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export default mongoose.model<IMedia>('Media', MediaSchema);
