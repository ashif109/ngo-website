import mongoose, { Schema } from 'mongoose';
const PageSchema = new Schema({
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
export default mongoose.model('Page', PageSchema);
