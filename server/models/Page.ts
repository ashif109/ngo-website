import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  template: string;
  parent?: mongoose.Types.ObjectId;
  status: 'draft' | 'review' | 'published' | 'archived';
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
  author: mongoose.Types.ObjectId;
  schedulePublish?: Date;
  version: number;
  versions: Array<{
    versionNumber: number;
    content: string;
    updatedBy: mongoose.Types.ObjectId;
    updatedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
  excerpt: { type: String },
  template: { type: String, default: 'default' },
  parent: { type: Schema.Types.ObjectId, ref: 'Page' },
  status: {
    type: String,
    enum: ['draft', 'review', 'published', 'archived'],
    default: 'draft'
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  featuredImage: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  schedulePublish: { type: Date },
  version: { type: Number, default: 1 },
  versions: [{
    versionNumber: Number,
    content: String,
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IPage>('Page', PageSchema);
