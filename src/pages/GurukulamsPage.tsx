import React, { useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, BookOpen, Compass, Award, 
  Heart, Shield, Info, Calendar, Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import heritageImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg';

const GurukulamsPage: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = `${t('gurukulams.title')} | Triyambakam Gurukulam Association`;
  }, [language, t]);

  const valuesItems = [
    {
      title: t('gurukulams.value1Title'),
      desc: t('gurukulams.value1Desc'),
      icon: Shield,
      color: "from-secondary to-amber-500",
      glow: "shadow-orange-500/10"
    },
    {
      title: t('gurukulams.value2Title'),
      desc: t('gurukulams.value2Desc'),
      icon: BookOpen,
      color: "from-blue-600 to-indigo-600",
      glow: "shadow-secondary/10"
    },
    {
      title: t('gurukulams.value3Title'),
      desc: t('gurukulams.value3Desc'),
      icon: Award,
      color: "from-green-600 to-teal-600",
      glow: "shadow-green-500/10"
    },
    {
      title: t('gurukulams.value4Title'),
      desc: t('gurukulams.value4Desc'),
      icon: Heart,
      color: "from-red-500 to-rose-500",
      glow: "shadow-red-500/10"
    },
    {
      title: t('gurukulams.value5Title'),
      desc: t('gurukulams.value5Desc'),
      icon: Compass,
      color: "from-purple-500 to-indigo-500",
      glow: "shadow-purple-500/10"
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden" id="gurukulam-main-content">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-dark/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-secondary-light hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
            aria-label="Navigate back to homepage"
            id="back-to-home-btn"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles size={16} className="animate-pulse" /> {t('gurukulams.badge')}
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight uppercase tracking-tight">
                {t('gurukulams.title')}
              </h1>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-secondary-light leading-relaxed border-l-4 border-secondary pl-4">
                {t('gurukulams.whatIsTitle')}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {t('gurukulams.whatIsText')}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 p-3 rounded-sm shadow-2xl relative overflow-hidden group">
                <div className="h-[280px] w-full rounded-sm overflow-hidden relative">
                  <img 
                    src={heritageImg} 
                    alt="Traditional Gurukulam Boarding and Education Structure" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">{language === 'hi' ? 'गुरु-शिष्य परंपरा' : language === 'gu' ? 'ગુરુ-શિષ્ય પરંપરા' : 'Guru-Shishya Tradition'}</span>
                    <p className="text-white font-serif font-bold text-base uppercase">
                      {language === 'hi' ? 'अनुभवात्मक अध्ययन व चरित्र निर्माण' : language === 'gu' ? 'અનુભવાત્મક શિક્ષણ અને ચરિત્ર નિર્માણ' : 'Holistic Learning & Character Building'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRADITIONAL LEARNING SYSTEM */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Info size={16} /> {language === 'hi' ? 'पारंपरिक प्रणाली' : language === 'gu' ? 'પરંપરાગત પ્રણાલી' : 'Traditional Philosophy'}
              </div>
              <h3 className="text-3xl font-serif font-black uppercase text-white leading-tight">
                {t('gurukulams.systemTitle')}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {t('gurukulams.systemText')}
              </p>
            </div>
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-8 rounded-sm shadow-xl space-y-6">
              <h4 className="text-sm font-black uppercase tracking-wider text-orange-400 border-b border-white/10 pb-4">
                {t('gurukulams.philosophyTitle')}
              </h4>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                {t('gurukulams.philosophyText')}
              </p>
            </div>
          </div>

          {/* VALUES OF GURUKULAM */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] bg-accent/10 border border-secondary/20 px-3.5 py-1.5 rounded-sm">
                {language === 'hi' ? 'नैतिक आधार' : language === 'gu' ? 'નૈતિક આધાર' : 'Ethical Values'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight">
                {t('gurukulams.valuesTitle')}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">
                {t('gurukulams.valuesDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {valuesItems.map((val, idx) => {
                const IconComp = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-6 rounded-sm shadow-lg transition-all duration-300 relative group flex flex-col justify-between ${val.glow}`}
                  >
                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-sm bg-gradient-to-tr ${val.color} p-2 flex items-center justify-center text-white shadow-md shadow-black/20`}>
                        <IconComp size={20} />
                      </div>
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                        {val.title}
                      </h4>
                      <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MODERN RELEVANCE & FUTURE INITIATIVES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-3xl font-serif font-black uppercase text-white leading-tight">
                {t('gurukulams.relevanceTitle')}
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {t('gurukulams.relevanceText')}
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-gradient-to-br from-primary-dark to-primary-dark border border-white/10 p-6 sm:p-8 rounded-sm shadow-2xl border-l-4 border-secondary relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-primary-dark border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-black uppercase text-orange-400 tracking-wider">
                  <Calendar size={10} className="animate-pulse" /> {language === 'hi' ? 'जल्द आ रहा है' : language === 'gu' ? 'ટૂંક સમયમાં આવી રહ્યું છે' : 'Upcoming'}
                </div>
                <h4 className="text-xl font-serif font-black text-white uppercase tracking-wider">{t('gurukulams.futureTitle')}</h4>
                <p className="text-white/80 text-xs leading-relaxed">
                  {t('gurukulams.futureText')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* CALL TO ACTION */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 p-8 sm:p-12 rounded-sm text-center border-l-4 border-secondary shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/[0.01] to-blue-600/[0.01] pointer-events-none"></div>
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest border border-secondary/30 px-2.5 py-1 rounded-full">
                {language === 'hi' ? 'सामुदायिक पंजीकरण' : language === 'gu' ? 'સામુદાયિક રજીસ્ટ્રેશન' : 'Community Registry'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wider">
                {t('gurukulams.ctaTitle')}
              </h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                {t('gurukulams.ctaDesc')}
              </p>
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
                  className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                  id="join-community-btn"
                >
                  <Users size={14} /> {t('gurukulams.btnJoin')}
                </button>
              </div>
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

export default GurukulamsPage;
