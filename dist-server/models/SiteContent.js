import mongoose, { Schema } from 'mongoose';
const SiteContentSchema = new Schema({
    sectionKey: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });
const SiteContent = mongoose.model('SiteContent', SiteContentSchema);
export default SiteContent;
