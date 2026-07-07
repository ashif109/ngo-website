import mongoose, { Schema } from 'mongoose';
const AuditLogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    module: { type: String, required: true },
    details: { type: Schema.Types.Mixed },
    ip: { type: String },
    location: { type: String },
    timestamp: { type: Date, default: Date.now }
});
// Create index for faster querying by user or module
AuditLogSchema.index({ user: 1, timestamp: -1 });
AuditLogSchema.index({ module: 1, timestamp: -1 });
export default mongoose.model('AuditLog', AuditLogSchema);
