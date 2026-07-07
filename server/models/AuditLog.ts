import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  user: mongoose.Types.ObjectId;
  action: string;
  module: string;
  details: Record<string, any>;
  ip: string;
  location?: string;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
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

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
