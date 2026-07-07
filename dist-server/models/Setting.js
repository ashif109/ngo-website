import mongoose, { Schema } from 'mongoose';
const SettingSchema = new Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    category: { type: String, required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});
export default mongoose.model('Setting', SettingSchema);
