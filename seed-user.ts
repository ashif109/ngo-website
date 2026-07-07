import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const MONGO_URI = 'mongodb://ashifansari04704_db_user:Ashifansari555@ac-wlgophf-shard-00-00.yh4ttds.mongodb.net:27017,ac-wlgophf-shard-00-01.yh4ttds.mongodb.net:27017,ac-wlgophf-shard-00-02.yh4ttds.mongodb.net:27017/?ssl=true&replicaSet=atlas-vy1l62-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterNgos';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['super-admin', 'admin', 'content-manager', 'editor', 'viewer', 'contributor'], default: 'viewer' },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  failedLoginAttempts: { type: Number, default: 0 },
  loginHistory: [{ time: Date, ip: String }]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');
  const hash = await bcrypt.hash('GuruKulam@2026Admin', 10);
  await User.findOneAndUpdate(
    { email: 'admin@gurukulam.org' },
    { 
      name: 'Super Admin', 
      email: 'admin@gurukulam.org', 
      passwordHash: hash, 
      role: 'super-admin', 
      status: 'active',
      failedLoginAttempts: 0
    },
    { upsert: true }
  );
  console.log('User Seeded Successfully');
  process.exit(0);
}

seed();
