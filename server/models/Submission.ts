import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true
  },
  data: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Submission', SubmissionSchema);
