import mongoose, { Schema } from 'mongoose';
const AcademicCourseSchema = new Schema({
    titleEn: { type: String, required: true },
    titleHi: { type: String, default: '' },
    titleGu: { type: String, default: '' },
    descriptionEn: { type: String, required: true },
    descriptionHi: { type: String, default: '' },
    descriptionGu: { type: String, default: '' },
    typeEn: { type: String, required: true },
    typeHi: { type: String, default: '' },
    typeGu: { type: String, default: '' },
    statusEn: { type: String, required: true },
    statusHi: { type: String, default: '' },
    statusGu: { type: String, default: '' },
    syllabusLink: { type: String, default: '' },
    isNewCourse: { type: Boolean, default: false },
    tagEn: { type: String, default: '' },
    tagHi: { type: String, default: '' },
    tagGu: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });
const AcademicCourse = mongoose.model('AcademicCourse', AcademicCourseSchema);
export default AcademicCourse;
