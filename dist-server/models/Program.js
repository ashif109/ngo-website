import mongoose, { Schema } from 'mongoose';
const ProgramSchema = new Schema({
    titleEn: { type: String, required: true },
    titleHi: { type: String, required: true },
    titleGu: { type: String, required: true },
    descriptionEn: { type: String },
    descriptionHi: { type: String },
    descriptionGu: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    },
    link: { type: String },
    websiteLink: { type: String },
    featuredImage: { type: String },
}, {
    timestamps: true
});
export default mongoose.model('Program', ProgramSchema);
