import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, Scale, Send, CheckCircle2, 
  Loader2, ShieldCheck, AlertCircle, UploadCloud
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import { submitGeneralForm } from '../services/api';

const GrievancePortalPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Feedback & Suggestions',
    description: '',
    fileName: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const categories = [
    { value: 'Feedback & Suggestions', label: language === 'hi' ? 'प्रतिक्रिया और सुझाव' : 'Feedback & Suggestions' },
    { value: 'Academic Query', label: language === 'hi' ? 'अकादमिक प्रश्न' : 'Academic Query' },
    { value: 'Operational Complaints', label: language === 'hi' ? 'परिचालन संबंधी शिकायतें' : 'Operational Complaints' },
    { value: 'Other Concerns', label: language === 'hi' ? 'अन्य चिंताएं' : 'Other Concerns' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitGeneralForm('Grievance Submission', formData);
      if (res.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'Feedback & Suggestions',
          description: '',
          fileName: ''
        });
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting grievance. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting grievance. Please try again.');
      setStatus('idle');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData({ ...formData, fileName: files[0].name });
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="grievance-portal-content">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-800/15 rounded-full blur-[130px] -mr-72 -mt-72 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Scale size={16} className="animate-pulse" /> {t('grievance.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('grievance.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('grievance.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            {/* LEFT COLUMN: SECURE SUBMISSION FORM (Col-span 8) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-orange-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-black text-white uppercase tracking-wider">{t('grievance.successTitle')}</h3>
                    <p className="text-blue-200 text-sm max-w-md mx-auto leading-relaxed">
                      {t('grievance.successDesc')}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all border border-white/5 cursor-pointer shadow-md"
                  >
                    {language === 'hi' ? 'एक और शिकायत दर्ज करें' : 'Submit Another Grievance'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-black text-white uppercase tracking-wide border-b border-white/10 pb-3 mb-5">
                      {t('grievance.formTitle')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('grievance.fieldName')}</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white" 
                        placeholder={language === 'hi' ? 'आपका नाम' : 'Your Name'} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('grievance.fieldEmail')}</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white" 
                        placeholder="example@mail.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('grievance.fieldPhone')}</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white" 
                        placeholder="+91 XXXXX XXXXX" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('grievance.fieldCategory')}</label>
                      <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/90 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white cursor-pointer"
                      >
                        {categories.map((cat, idx) => (
                          <option key={idx} value={cat.value} className="bg-blue-950 text-white py-2">{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('grievance.fieldDesc')}</label>
                    <textarea 
                      required 
                      rows={5} 
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})} 
                      className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white resize-none" 
                      placeholder={language === 'hi' ? 'विवरण यहाँ प्रदान करें...' : "Provide detailed information..."}
                    ></textarea>
                  </div>

                  {/* Document Attachment Upload Component */}
                  <div>
                    <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('grievance.fieldAttach')}</label>
                    <div className="relative border border-dashed border-white/20 rounded-sm p-6 bg-blue-950/20 text-center hover:bg-blue-950/40 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <UploadCloud size={24} className="text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white">
                        {formData.fileName ? formData.fileName : (language === 'hi' ? 'फ़ाइल चुनने के लिए यहाँ क्लिक करें या ड्रैग करें' : 'Click or drag file to upload')}
                      </span>
                      <span className="text-[10px] text-blue-200/50 mt-1">PDF, JPG, PNG (Max 5MB)</span>
                    </div>
                  </div>

                  {/* Privacy Notice Box */}
                  <div className="flex gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-sm items-start">
                    <ShieldCheck size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-blue-200/80 leading-relaxed font-bold">
                      {t('grievance.privacyNotice')}
                    </p>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <>
                        <Send size={14} /> {t('grievance.btnSubmit')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN: POLICY DETAILS (Col-span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#003366]/40 border border-white/10 p-6 sm:p-8 rounded-sm space-y-4 shadow-xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-orange-400">
                  <AlertCircle size={16} />
                  <h4 className="text-xs font-black uppercase text-white tracking-wide">Redressal Policy</h4>
                </div>
                <p className="text-xs text-blue-200/80 leading-relaxed">
                  {language === 'hi' 
                    ? 'त्र्यंबकम गुरुकुलम हमारे समुदाय के सभी सदस्यों के लिए पारदर्शिता, सत्यनिष्ठा और न्याय सुनिश्चित करने के लिए प्रतिबद्ध है। हमारी शिकायत समिति निष्पक्षता और तटस्थता के नियमों का पालन करते हुए सभी शिकायतों की जांच करती है।'
                    : 'Triyambakam Gurukulam is committed to ensuring transparency, integrity, and safety across all programs. Our committee investigates and addresses all logged feedbacks and concerns without bias.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <ContactSection />
      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default GrievancePortalPage;
