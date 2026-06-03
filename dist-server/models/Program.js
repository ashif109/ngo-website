import mongoose, { Schema } from 'mongoose';
const ProgramSchema = new Schema({
    textEn: { type: String, required: true },
    textHi: { type: String, required: true },
    textGu: { type: String, required: true },
    link: { type: String },
    websiteLink: { type: String },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Program', ProgramSchema);
