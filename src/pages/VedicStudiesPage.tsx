import React from 'react';
import { 
  ArrowLeft, Sparkles, BookOpen, Compass, Award, 
  Book, Globe, Heart, CheckCircle2, ChevronRight,
  Database, Users, Calendar, Star, Info
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

const VedicStudiesPage: React.FC = () => {
  const { t, language } = useLanguage();

  const exploreCards = [
    {
      emoji: "📖",
      title: t("vedic.explore1Title"),
      desc: t("vedic.explore1Desc"),
      icon: BookOpen,
      color: "border-secondary/30",
      glow: "shadow-orange-500/5",
      accent: "text-orange-400"
    },
    {
      emoji: "🕉️",
      title: t("vedic.explore2Title"),
      desc: t("vedic.explore2Desc"),
      icon: Compass,
      color: "border-secondary/30",
      glow: "shadow-secondary/5",
      accent: "text-secondary"
    },
    {
      emoji: "📜",
      title: t("vedic.explore3Title"),
      desc: t("vedic.explore3Desc"),
      icon: Award,
      color: "border-green-500/30",
      glow: "shadow-green-500/5",
      accent: "text-green-400"
    },
    {
      emoji: "🌿",
      title: t("vedic.explore4Title"),
      desc: t("vedic.explore4Desc"),
      icon: Book,
      color: "border-indigo-500/30",
      glow: "shadow-indigo-500/5",
      accent: "text-indigo-400"
    },
    {
      emoji: "🏛️",
      title: t("vedic.explore5Title"),
      desc: t("vedic.explore5Desc"),
      icon: Globe,
      color: "border-red-500/30",
      glow: "shadow-red-500/5",
      accent: "text-red-400"
    },
    {
      emoji: "💡",
      title: t("vedic.explore6Title"),
      desc: t("vedic.explore6Desc"),
      icon: Heart,
      color: "border-teal-500/30",
      glow: "shadow-teal-500/5",
      accent: "text-teal-400"
    }
  ];

  const whyStudy = language === 'hi' ? [
    "गहरी सांस्कृतिक समझ विकसित करें",
    "शाश्वत जीवन सिद्धांतों को सीखें",
    "चरित्र और आत्म-अनुशासन का निर्माण करें",
    "भारत की समृद्ध विरासत से जुड़ें",
    "समग्र व्यक्तिगत विकास को बढ़ावा दें"
  ] : language === 'gu' ? [
    "ઊંડી સાંસ્કૃતિક સમજ વિકસાવો",
    "કાલાતીત જીવન સિદ્ધાંતો શીખો",
    "ચરિત્ર અને આત્મ-શિસ્તનું નિર્માણ કરો",
    "ભારતના સમૃદ્ધ વારસા સાથે જોડાઓ",
    "સર્વાંગી વ્યક્તિગત વિકાસને પ્રોત્સાહન આપો"
  ] : [
    "Develop deeper cultural understanding",
    "Learn timeless life principles",
    "Build character and self-discipline",
    "Connect with India's rich heritage",
    "Promote holistic personal growth"
  ];

  const areasOfLearning = language === 'hi' ? [
    "वैदिक साहित्य",
    "भारतीय दर्शन",
    "संस्कृत बुनियादी बातें",
    "योग और ध्यान",
    "सांस्कृतिक विरासत",
    "नैतिक जीवन",
    "प्राचीन विज्ञान",
    "आध्यात्मिक विकास"
  ] : language === 'gu' ? [
    "વૈદિક સાહિત્ય",
    "ભારતીય તત્વજ્ઞાન",
    "સંસ્કૃત મૂળભૂત બાબતો",
    "યોગ અને ધ્યાન",
    "સાંસ્કૃતિક વારસો",
    "નૈતિક જીવન",
    "પ્રાચીન વિજ્ઞાન",
    "આધ્યાત્મિક વિકાસ"
  ] : [
    "Vedic Literature",
    "Indian Philosophy",
    "Sanskrit Basics",
    "Yoga & Meditation",
    "Cultural Heritage",
    "Ethical Living",
    "Ancient Sciences",
    "Spiritual Development"
  ];

  const featuredTopics = [
    {
      title: t("vedic.topic1Title"),
      subtitle: t("vedic.topic1Sub"),
      desc: t("vedic.topic1Desc"),
      color: "border-l-4 border-secondary"
    },
    {
      title: t("vedic.topic2Title"),
      subtitle: t("vedic.topic2Sub"),
      desc: t("vedic.topic2Desc"),
      color: "border-l-4 border-secondary"
    },
    {
      title: t("vedic.topic3Title"),
      subtitle: t("vedic.topic3Sub"),
      desc: t("vedic.topic3Desc"),
      color: "border-l-4 border-green-600"
    },
    {
      title: t("vedic.topic4Title"),
      subtitle: t("vedic.topic4Sub"),
      desc: t("vedic.topic4Desc"),
      color: "border-l-4 border-teal-500"
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden">
        {/* Glowing Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-dark/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute top-[40%] left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 right-[15%] w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] z-0 pointer-events-none"></div>

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

          {/* 1. HERO HEADER SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            
            {/* Left Content (Col-span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles size={16} className="animate-pulse" /> {t('vedic.badge')}
              </div>
              
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight uppercase tracking-tight">
                {t('vedic.title').split(' ')[0]} <span className="text-secondary underline decoration-wavy decoration-orange-600/30">{t('vedic.title').split(' ').slice(1).join(' ')}</span>
              </h1>
              
              <h2 className="text-lg sm:text-xl font-serif font-bold text-secondary-light leading-relaxed border-l-4 border-secondary pl-4">
                {t('vedic.descTitle')}
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {t('vedic.desc')}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button 
                  onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
                  className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  {t('vedic.btnJoin')}
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('coming-soon-banner');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 border border-white/5 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all shadow-md cursor-pointer"
                >
                  {t('vedic.btnResources')}
                </button>
              </div>
            </div>

            {/* Right Featured Image (Col-span 5) */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 p-3 rounded-sm shadow-2xl relative overflow-hidden group"
              >
                <div className="h-[300px] w-full rounded-sm overflow-hidden relative">
                  <img 
                    src={heritageImg} 
                    alt="Heritage Learning" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Star size={10} className="animate-spin" /> {language === 'hi' ? 'प्राचीन संस्कृत और तर्क' : language === 'gu' ? 'પ્રાચીન સંસ્કૃત અને તર્ક' : 'Ancient Sanskrit & Tarka'}
                    </span>
                    <p className="text-white font-serif font-bold text-lg leading-tight uppercase">
                      {language === 'hi' 
                        ? '"पारंपरिक भारतीय तर्कशास्त्र को आधुनिक तर्कसंगत अनुसंधान से जोड़ना।"' 
                        : language === 'gu'
                        ? '"પરંપરાગત ભારતીય તર્કશાસ્ત્રને આધુનિક તર્કસંગત સંશોધન સાથે જોડવું."'
                        : '"Bridging traditional Indian logic with modern rational inquiry."'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* 2. WHAT YOU'LL EXPLORE GRID */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] bg-accent/10 border border-secondary/20 px-3.5 py-1.5 rounded-sm">
                {t('vedic.syllabusBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight">
                {t('vedic.exploreTitle').split(' ').slice(0, -1).join(' ')} <span className="text-secondary">{t('vedic.exploreTitle').split(' ').slice(-1)[0]}</span>
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">
                {t('vedic.exploreDesc')}
              </p>
            </div>

            {/* 6-Card Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exploreCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 p-6 sm:p-8 rounded-sm shadow-xl transition-all duration-300 relative group ${card.glow}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-sm bg-primary-dark/80 border border-white/10 flex items-center justify-center text-xl shadow-md group-hover:bg-accent group-hover:border-transparent transition-all">
                        <span className="group-hover:scale-110 transition-transform">{card.emoji}</span>
                      </div>
                      <IconComp size={18} className={`${card.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-base font-serif font-bold text-white group-hover:text-orange-400 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 3. WHY VEDIC KNOWLEDGE & AREAS OF LEARNING SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
            
            {/* Left Column: Why Vedic (Col-span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest border border-secondary/20 bg-accent/10 px-3.5 py-1.5 rounded-sm">
                  {t('vedic.outcomesBadge')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight mt-4">
                  {t('vedic.whyTitle').split(' ').slice(0, -2).join(' ')} <span className="text-secondary">{t('vedic.whyTitle').split(' ').slice(-2).join(' ')}</span>
                </h2>
                <p className="text-white/70 text-xs sm:text-sm mt-2">
                  {t('vedic.whyDesc')}
                </p>
              </div>

              {/* Checkmark custom items */}
              <div className="space-y-4">
                {whyStudy.map((text, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white/[0.02] border border-white/5 p-4 rounded-sm flex items-center gap-4 hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="text-green-400 w-8 h-8 rounded-full bg-green-950/40 border border-green-500/20 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Areas of Learning (Col-span 5) */}
            <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl lg:sticky lg:top-24">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <Compass size={18} className="text-orange-400" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">{t('vedic.areasTitle')}</h4>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {areasOfLearning.map((foc, idx) => (
                  <span 
                    key={idx}
                    className="text-[10px] sm:text-[11px] font-bold text-orange-300 hover:text-white uppercase tracking-wider bg-orange-950/40 hover:bg-orange-950/60 border border-secondary/20 px-3.5 py-1.5 rounded-full transition-all cursor-default select-none shadow-sm hover:shadow-md"
                  >
                    {foc}
                  </span>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 flex items-center gap-2 text-[10px] text-secondary-light font-bold uppercase tracking-widest">
                <ChevronRight size={14} className="text-orange-400 animate-pulse" /> {t('vedic.areasBadge')}
              </div>
            </div>

          </div>

          {/* 4. FEATURED TOPICS PANEL */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] bg-accent/10 border border-secondary/20 px-3.5 py-1.5 rounded-sm">
                {t('vedic.topicsBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight">
                {t('vedic.topicsTitle').split(' ').slice(0, -1).join(' ')} <span className="text-secondary">{t('vedic.topicsTitle').split(' ').slice(-1)[0]}</span>
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">
                {t('vedic.topicsDesc')}
              </p>
            </div>

            {/* 4-column timeline cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredTopics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`bg-white/[0.02] border border-white/5 hover:border-primary-light p-6 sm:p-8 rounded-sm shadow-xl flex flex-col justify-between hover:bg-white/[0.04] transition-all ${topic.color} group`}
                >
                  <div className="space-y-3">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-primary text-secondary-light px-2 py-0.5 rounded-full border border-white/10">
                      {language === 'hi' ? `मॉड्यूल ${idx + 1}` : language === 'gu' ? `મોડ્યુલ ${idx + 1}` : `Module ${idx + 1}`}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-orange-400 transition-colors mt-2">
                      {topic.title}
                    </h3>
                    <h4 className="text-xs font-bold text-secondary-light/90 uppercase tracking-wide">
                      {topic.subtitle}
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mt-2">
                      {topic.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black text-orange-400 uppercase tracking-widest select-none">
                    <span>{language === 'hi' ? 'पाठ्यक्रम उपलब्ध' : language === 'gu' ? 'અભ્યાસક્રમ ઉપલબ્ધ' : 'Syllabus Available'}</span>
                    <ArrowLeft size={12} className="rotate-180 text-orange-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 5. COMING SOON BANNER & ACTIVE CTAS */}
          <motion.div 
            id="coming-soon-banner"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary-dark to-primary-dark border border-white/10 p-8 sm:p-12 rounded-sm relative overflow-hidden shadow-2xl text-center border-l-4 border-secondary"
          >
            {/* Background glowing bubbles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-primary-dark border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-black uppercase text-orange-400 tracking-wider">
                <Calendar size={12} className="animate-spin" /> {t('vedic.updatesBadge')}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wider">
                {t('vedic.upcomingTitle')} <br/>
                <span className="text-secondary">{t('vedic.upcomingSubtitle')}</span>
              </h3>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {t('vedic.upcomingDesc')}
              </p>

              {/* Double CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
                <button 
                  onClick={() => window.dispatchEvent(new Event('openDonateModal'))}
                  className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Database size={14} /> {t('vedic.btnResources')}
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
                  className="bg-primary-dark hover:bg-black/20 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] py-3.5 rounded-sm transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Users size={14} className="text-orange-400" /> {language === 'hi' ? 'समुदाय से जुड़ें' : language === 'gu' ? 'સમુદાયમાં જોડાઓ' : 'Join Community'}
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

export default VedicStudiesPage;
