import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteContent extends Document {
  sectionKey: string;
  data: any;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>({
  sectionKey: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

const SiteContent = mongoose.model<ISiteContent>('SiteContent', SiteContentSchema);
export default SiteContent;
