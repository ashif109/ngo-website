import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, Bell, Calendar, Compass, 
  Award, Send, CheckCircle2, Megaphone
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

const AnnouncementsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    document.title = `${t('announcements.title')} | Triyambakam Gurukulam Association`;
  }, [language, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitGeneralForm('Announcements Newsletter Subscription', { email });
      if (res.success) {
        setStatus('success');
        setEmail('');
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error subscribing. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error subscribing. Please try again.');
      setStatus('idle');
    }
  };

  const sections = [
    { title: t('announcements.sec1Title'), icon: Megaphone, accent: "text-orange-400" },
    { title: t('announcements.sec2Title'), icon: Calendar, accent: "text-blue-400" },
    { title: t('announcements.sec3Title'), icon: Compass, accent: "text-green-400" },
    { title: t('announcements.sec4Title'), icon: Award, accent: "text-indigo-400" }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="announcements-main-content">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-800/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
            aria-label="Navigate back to homepage"
            id="back-to-home-btn"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Sparkles size={16} className="animate-pulse" /> {t('announcements.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('announcements.title')}
            </h1>
          </div>

          {/* SECTION TILES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sections.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-5 rounded-sm flex items-center gap-4 hover:bg-white/[0.04] transition-all">
                  <div className="w-10 h-10 rounded-sm bg-blue-950/80 border border-white/10 flex items-center justify-center text-xl shadow-md">
                    <IconComp size={18} className={sec.accent} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">{sec.title}</span>
                </div>
              );
            })}
          </div>

          {/* PROFESSIONAL EMPTY STATE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/10 rounded-sm p-16 text-center shadow-2xl border-t-4 border-orange-500 mb-24"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 bg-orange-600/15 border border-orange-500/20 rounded-full flex items-center justify-center text-orange-400 mx-auto animate-bounce">
                <Bell size={24} />
              </div>
              <h3 className="text-xl font-serif font-black uppercase text-white tracking-wide">
                {t('announcements.emptyStateTitle')}
              </h3>
              <p className="text-blue-100/70 text-xs leading-relaxed">
                {t('announcements.emptyStateDesc')}
              </p>
            </div>
          </motion.div>

          {/* SUBSCRIBE BANNER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#003366] to-[#001f3f] border border-white/10 p-8 sm:p-12 rounded-sm shadow-2xl relative overflow-hidden border-l-4 border-orange-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto text-center space-y-6">
              <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest border border-orange-500/30 px-2.5 py-1 rounded-full">
                {language === 'hi' ? 'सूचनाएं' : language === 'gu' ? 'સૂચનાઓ' : 'Notifications'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wider">
                {t('announcements.ctaTitle')}
              </h3>
              <p className="text-blue-100/80 text-xs sm:text-sm leading-relaxed">
                {t('announcements.ctaDesc')}
              </p>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-sm max-w-md mx-auto flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {language === 'hi' ? 'सफलतापूर्वक पंजीकृत!' : language === 'gu' ? 'સફળતાપૂર્વક રજીસ્ટર!' : 'Registered Successfully!'}
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                  <label htmlFor="email-subscription" className="sr-only">Email Address</label>
                  <input 
                    id="email-subscription"
                    required
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={language === 'hi' ? 'आपका ईमेल पता' : language === 'gu' ? 'તમારું ઇમેઇલ સરનામું' : 'Your email address'} 
                    className="flex-grow p-3 bg-blue-950/80 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white"
                  />
                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] py-3 px-6 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer disabled:opacity-75"
                  >
                    {status === 'loading' ? t('admissions.btnSubmitting') : t('announcements.btnSubscribe')}
                  </button>
                </form>
              )}
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

export default AnnouncementsPage;
