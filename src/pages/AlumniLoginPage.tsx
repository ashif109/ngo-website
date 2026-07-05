import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Users, Calendar, Award, Briefcase, Mail, Send, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import { submitGeneralForm } from '../services/api';

const AlumniLoginPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitGeneralForm('Alumni Registry', { email });
      if (res.success) {
        setStatus('success');
        setEmail('');
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting request. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting request. Please try again.');
      setStatus('idle');
    }
  };

  const features = [
    { title: t('alumni.feat1'), desc: language === 'hi' ? 'पूर्व छात्रों और शिक्षकों से जुड़ने के लिए खोज योग्य डेटाबेस।' : 'Searchable database to connect with past students and teachers.', icon: Users },
    { title: t('alumni.feat2'), desc: language === 'hi' ? 'करियर के मार्गदर्शन और नेटवर्किंग के लिए व्यावसायिक मंच।' : 'Professional channels for career mentorship and guidance.', icon: Briefcase },
    { title: t('alumni.feat3'), desc: language === 'hi' ? 'पूर्व छात्रों के लिए विशेष पुनर्मिलन और सम्मेलनों की सूचना।' : 'Invites and information for exclusive reunion meets.', icon: Calendar },
    { title: t('alumni.feat4'), desc: language === 'hi' ? 'प्रमाणपत्रों और प्रशंसापत्रों का रिकॉर्ड रखने का डिजिटल समाधान।' : 'Archiving milestones and appreciation records.', icon: Award }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden" id="alumni-login-content">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dark/10 rounded-full blur-[120px] -mr-60 -mt-60 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-secondary-light hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Lock size={16} className="animate-pulse" /> {t('alumni.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('alumni.title')}
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t('alumni.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            {/* LEFT COLUMN: LARGE STATUS CARD (Col-span 7) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-primary/40 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-12 shadow-2xl relative border-l-4 border-secondary overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-6">
                <span className="bg-accent/90 text-white font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md">
                  {language === 'hi' ? 'जल्द आ रहा है' : language === 'gu' ? 'ટૂંક સમયમાં આવી રહ્યું છે' : 'Under Development'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wider">
                  {t('alumni.statusCardTitle')}
                </h2>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {t('alumni.statusCardDesc')}
                </p>

                {/* Registration Notification Form */}
                <div className="pt-6 border-t border-white/10">
                  {status === 'success' ? (
                    <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 p-4 rounded-sm">
                      <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-black text-white uppercase tracking-wider">{t('alumni.successTitle')}</p>
                        <p className="text-[10px] text-secondary-light mt-0.5">{t('alumni.successDesc')}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <label className="block text-[10px] font-black text-secondary-light uppercase tracking-wider">
                        {language === 'hi' ? 'अधिसूचना प्राप्त करने के लिए ईमेल दर्ज करें' : 'Get notified when we launch'}
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-grow p-3 bg-primary-dark/60 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white"
                          placeholder="your-email@mail.com"
                        />
                        <button
                          disabled={status === 'loading'}
                          type="submit"
                          className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:hover:translate-y-0 whitespace-nowrap"
                        >
                          {status === 'loading' ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <>
                              <Mail size={14} /> {t('alumni.btnNotify')}
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>
            </motion.div>

            {/* RIGHT COLUMN: ALUMNI PORTAL FEATURES (Col-span 5) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-sm font-black uppercase text-secondary-light tracking-widest border-b border-white/10 pb-2">
                {t('alumni.futureTitle')}
              </h3>

              <div className="space-y-4">
                {features.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="flex gap-4 p-4 rounded-sm border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                      <div className="w-9 h-9 rounded-sm bg-accent/10 border border-secondary/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs text-white uppercase tracking-wide truncate">{feat.title}</h4>
                        <p className="text-[10px] text-secondary-light/60 leading-relaxed mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
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

export default AlumniLoginPage;
