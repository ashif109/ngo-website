import React from 'react';
import { ArrowLeft, Sparkles, Award, Medal, ShieldAlert, BookOpen, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const AwardsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const sections = [
    { title: language === 'hi' ? 'पुरस्कार' : language === 'gu' ? 'પુરસ્કારો' : 'Awards', icon: Medal },
    { title: language === 'hi' ? 'सामुदायिक मान्यता' : language === 'gu' ? 'સામુદાયિક માન્યતા' : 'Community Recognition', icon: Star },
    { title: language === 'hi' ? 'महत्वपूर्ण मील के पत्थर' : language === 'gu' ? 'મહત્વપૂર્ણ સીમાચિહ્નો' : 'Key Milestones', icon: Sparkles },
    { title: language === 'hi' ? 'सराहना प्रमाण पत्र' : language === 'gu' ? 'પ્રશંસા પત્રો' : 'Appreciation Certificates', icon: Award }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden" id="awards-content">
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
              <Award size={18} className="animate-pulse" /> {t('awards.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('awards.title')}
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t('awards.desc')}
            </p>
          </div>

          {/* GRID OF SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sections.map((sec, idx) => {
              const IconComp = sec.icon;
              return (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-sm flex flex-col items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-primary-dark/80 border border-white/10 flex items-center justify-center text-orange-400">
                    <IconComp size={20} />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wide">
                    {sec.title}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* MAIN CONTENT - EMPTY STATE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 p-12 sm:p-16 rounded-sm text-center shadow-xl space-y-6 max-w-4xl mx-auto my-12"
          >
            <div className="w-20 h-20 bg-primary-dark/65 border border-white/10 text-orange-400 rounded-full flex items-center justify-center mx-auto shadow-md">
              <ShieldAlert size={32} className="animate-pulse" />
            </div>
            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-wider">
                {t('awards.emptyTitle')}
              </h3>
              <p className="text-secondary-light/70 text-xs sm:text-sm leading-relaxed">
                {t('awards.emptyDesc')}
              </p>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
                className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
              >
                <BookOpen size={14} /> {t('awards.btnLearn')}
              </button>
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

export default AwardsPage;
