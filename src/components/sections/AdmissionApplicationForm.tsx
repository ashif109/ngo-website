import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface AdmissionApplicationFormProps {
  campaign: any;
  onClose: () => void;
}

const AdmissionApplicationForm: React.FC<AdmissionApplicationFormProps> = ({ campaign, onClose }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'male',
    programId: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const programs = campaign?.programsOffered || []; // If we link programs to campaign later. For now, let's fetch all active courses if we need to. 
  // Wait, I should fetch courses to let the user select a program.
  const [courses, setCourses] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {}
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Error submitting application');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-sm p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
          <h3 className="text-2xl font-serif font-black text-blue-950 mb-2">
            {language === 'hi' ? 'आवेदन सफल!' : language === 'gu' ? 'અરજી સફળ!' : 'Application Successful!'}
          </h3>
          <p className="text-gray-600 mb-6">
            {language === 'hi' ? 'आपका प्रवेश आवेदन प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।' : language === 'gu' ? 'તમારી પ્રવેશ અરજી મળી ગઈ છે. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.' : 'Your admission application has been received. We will contact you shortly.'}
          </p>
          <button onClick={onClose} className="bg-primary text-white px-6 py-2 rounded-sm font-bold w-full uppercase text-sm">
            {language === 'hi' ? 'बंद करें' : language === 'gu' ? 'બંધ કરો' : 'Close'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-sm w-full max-w-lg shadow-2xl overflow-hidden my-8">
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <h3 className="font-serif font-black text-xl">
            {language === 'hi' ? 'प्रवेश आवेदन' : language === 'gu' ? 'પ્રવેશ અરજી' : 'Admission Application'}
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 text-2xl font-light">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-amber-50 text-amber-900 text-xs font-bold p-3 rounded-sm border border-amber-200">
            {language === 'hi' ? 'के लिए आवेदन:' : language === 'gu' ? 'માટે અરજી:' : 'Applying for:'} {language === 'hi' ? campaign.titleHi || campaign.titleEn : language === 'gu' ? campaign.titleGu || campaign.titleEn : campaign.titleEn}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Full Name *</label>
            <input type="text" required value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Email *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Phone *</label>
              <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Date of Birth *</label>
              <input type="date" required value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Gender *</label>
              <select required value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Select Program *</label>
            <select required value={formData.programId} onChange={(e) => setFormData({...formData, programId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
              <option value="" disabled>Select a program...</option>
              {courses.map(c => (
                <option key={c._id} value={c._id}>{language === 'hi' ? c.titleHi || c.titleEn : language === 'gu' ? c.titleGu || c.titleEn : c.titleEn}</option>
              ))}
            </select>
          </div>

          {error && <div className="text-red-600 text-xs font-bold bg-red-50 p-2 rounded-sm">{error}</div>}

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 font-bold uppercase text-xs hover:bg-gray-100 rounded-sm">Cancel</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-secondary text-white font-bold uppercase text-xs rounded-sm hover:bg-red-700 disabled:opacity-50 transition-colors">
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionApplicationForm;
