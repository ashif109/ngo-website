import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, GraduationCap, MapPin, Phone, 
  Send, CheckCircle2, Star, Calendar, Mail, BookOpen
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

const AdmissionsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Vedic Studies Integrated Course',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await submitGeneralForm('Admission Registry', formData);
      if (res.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          program: 'Vedic Studies Integrated Course',
          message: ''
        });
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting form. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting form. Please try again.');
      setStatus('idle');
    }
  };

  const programs = [
    t("vedic.explore1Title"),
    t("vedic.explore5Title"),
    t("about.whatWeDo4Title"),
    t("about.whatWeDo5Title"),
    t("about.whatWeDo1Title")
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden">
        {/* Glowing Decorative Backgrounds */}
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

          {/* PAGE HERO HEADER */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <GraduationCap size={18} className="animate-pulse" /> {t('admissions.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('admissions.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('admissions.desc')}
            </p>
          </div>

          {/* MAIN GRID CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            
            {/* LEFT COLUMN: INTERACTIVE FORM (Col-span 7) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-orange-500 overflow-hidden"
            >
              {/* Radial glow subtle accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/5">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-black text-white uppercase tracking-wider">{t('admissions.successTitle')}</h3>
                    <p className="text-blue-200 text-sm max-w-md mx-auto leading-relaxed">
                      {t('admissions.successDesc')}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all border border-white/5 cursor-pointer shadow-md"
                  >
                    {t('admissions.btnReset')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-black text-white uppercase tracking-wide border-b border-white/10 pb-3 mb-5">
                      {t('admissions.formTitle')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('admissions.fieldName')}</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder={language === 'hi' ? 'आपका पूरा नाम' : language === 'gu' ? 'તમારું પૂરું નામ' : 'Your full name'} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('admissions.fieldEmail')}</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder="example@mail.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('admissions.fieldPhone')}</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder="+91 XXXXX XXXXX" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('admissions.fieldInterest')}</label>
                      <select 
                        value={formData.program} 
                        onChange={e => setFormData({...formData, program: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/90 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white cursor-pointer"
                      >
                        {programs.map((prog, idx) => (
                          <option key={idx} value={prog} className="bg-blue-950 text-white py-2">{prog}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('admissions.fieldMessage')}</label>
                    <textarea 
                      rows={4} 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white resize-none" 
                      placeholder={language === 'hi' ? 'हमें अपने बारे में बताएं...' : language === 'gu' ? 'અમને તમારા વિશે કહો...' : "Tell us about yourself and what you'd like to learn or participate in..."}
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <span>{t('admissions.btnSubmitting')}</span>
                    ) : (
                      <>
                        <Send size={14} /> {t('admissions.btnSubmit')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN: INFO CARDS & BANNER (Col-span 5) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Coming Soon Panel */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-[#003366] to-[#001f3f] border border-white/10 p-6 sm:p-8 rounded-sm shadow-2xl relative overflow-hidden border-l-4 border-orange-500"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-[#002147] border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-orange-400 tracking-wider">
                    <Calendar size={10} className="animate-spin" /> {t('admissions.comingSoonBadge')}
                  </div>
                  <h3 className="text-xl font-serif font-black text-white uppercase tracking-wider">{t('admissions.comingSoonTitle')}</h3>
                  <p className="text-blue-100/80 text-xs leading-relaxed">
                    {t('admissions.comingSoonDesc')}
                  </p>
                </div>
              </motion.div>

              {/* Contact Information Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-sm space-y-6 shadow-xl"
              >
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Mail size={16} className="text-orange-400" />
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">{t('admissions.contactTitle')}</h4>
                </div>

                <div className="space-y-5">
                  {/* Phone Info */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-9 h-9 rounded-full bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                      <Phone size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">{t('admissions.contactPhone')}</p>
                      <p className="text-sm font-bold text-white mt-0.5">+91 94121 62807</p>
                    </div>
                  </div>

                  {/* Headquarters Info */}
                  <div className="flex gap-4 items-start group">
                    <div className="w-9 h-9 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">{t('admissions.contactLocation')}</p>
                      <p className="text-xs font-medium text-blue-100/90 leading-relaxed mt-0.5">
                        F.No.1006 10th Floor BL-A, Om Shree Platinum Basai <br/>
                        Agra - 282001, Uttar Pradesh
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

          {/* CROWN BLOCKQUOTE: SERIF QUOTE BLOCK */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#002147] border border-white/10 rounded-sm p-10 sm:p-12 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Decorative background glows */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto space-y-5">
              <div className="flex justify-center text-orange-400">
                <BookOpen size={28} className="animate-pulse" />
              </div>
              <h3 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed">
                "{t('admissions.quote')}"
              </h3>
              <p className="text-[10px] sm:text-xs font-bold text-orange-400 uppercase tracking-[0.25em]">
                {language === 'hi' ? 'वेद • मूल्य • आजीविका • विजय' : language === 'gu' ? 'વેદ • મૂલ્ય • આજીવિકા • વિજય' : 'Vedas • Values • Vocation • Victory'}
              </p>
            </div>
          </motion.div>

        </div>
      </main>

      <ContactSection />
      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default AdmissionsPage;
