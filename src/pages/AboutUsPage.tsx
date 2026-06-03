import React from 'react';
import { 
  ArrowLeft, Sparkles, Target, Eye, BookOpen, Heart, 
  Shield, Compass, Award, Star, ArrowRight, GraduationCap,
  Users, Briefcase, UserPlus
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import aboutConference from '../assets/about-conference.jpg';
import aboutCommunity from '../assets/about-community.jpg';
import aboutStudents from '../assets/about-students.jpg';
import aboutMango from '../assets/about-mango.jpg';

const AboutUsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const coreValues = [
    {
      num: "01",
      title: t("about.value1Title"),
      desc: t("about.value1Desc"),
      icon: BookOpen,
      color: "from-orange-500 to-amber-500",
      glow: "shadow-orange-500/10"
    },
    {
      num: "02",
      title: t("about.value2Title"),
      desc: t("about.value2Desc"),
      icon: Shield,
      color: "from-blue-600 to-indigo-600",
      glow: "shadow-blue-500/10"
    },
    {
      num: "03",
      title: t("about.value3Title"),
      desc: t("about.value3Desc"),
      icon: Users,
      color: "from-green-600 to-teal-600",
      glow: "shadow-green-500/10"
    },
    {
      num: "04",
      title: t("about.value4Title"),
      desc: t("about.value4Desc"),
      icon: Compass,
      color: "from-red-500 to-rose-500",
      glow: "shadow-red-500/10"
    },
    {
      num: "05",
      title: t("about.value5Title"),
      desc: t("about.value5Desc"),
      icon: Heart,
      color: "from-purple-500 to-indigo-500",
      glow: "shadow-purple-500/10"
    }
  ];

  const whatWeDo = [
    {
      title: t("about.whatWeDo1Title"),
      desc: t("about.whatWeDo1Desc"),
      color: "border-orange-500"
    },
    {
      title: t("about.whatWeDo2Title"),
      desc: t("about.whatWeDo2Desc"),
      color: "border-blue-500"
    },
    {
      title: t("about.whatWeDo3Title"),
      desc: t("about.whatWeDo3Desc"),
      color: "border-green-600"
    },
    {
      title: t("about.whatWeDo4Title"),
      desc: t("about.whatWeDo4Desc"),
      color: "border-indigo-500"
    },
    {
      title: t("about.whatWeDo5Title"),
      desc: t("about.whatWeDo5Desc"),
      color: "border-pink-500"
    }
  ];

  const areasOfLearning = [
    t("vedic.explore1Title"),
    t("vedic.explore2Title"),
    t("vedic.explore3Title"),
    t("vedic.explore4Title"),
    t("vedic.explore5Title"),
    t("vedic.explore6Title"),
    t("vedic.areasTitle"),
    t("about.value1Title")
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-800/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute top-[30%] left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>
        <div className="absolute bottom-10 right-[20%] w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[130px] z-0 pointer-events-none"></div>

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

          {/* 1. HERO SECTION & Collages */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            {/* Left Content (Col-span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles size={16} className="animate-pulse" /> {t('about.badge')}
              </div>
              
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight uppercase tracking-tight">
                {t('about.title')} <br/>
                <span className="text-orange-500 underline decoration-wavy decoration-orange-600/30">{t('about.subtitle')}</span>
              </h1>
              
              <h2 className="text-lg sm:text-xl font-serif font-bold text-blue-200 leading-relaxed border-l-4 border-orange-500 pl-4">
                {t('about.descTitle')}
              </h2>
              
              <div className="space-y-4 text-blue-100/80 text-sm sm:text-base leading-relaxed">
                <p>
                  {t('about.desc1')}
                </p>
                <p>
                  {t('about.desc2')}
                </p>
              </div>
            </div>

            {/* Right Offset Image Collage (Col-span 5) */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <div className="relative w-full h-[400px] flex items-center justify-center">
                {/* Background glow behind images */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>

                {/* Primary Large Image: Gurukulam Students */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-0 left-0 w-[75%] h-[280px] rounded-sm overflow-hidden border-2 border-orange-500/60 shadow-2xl z-10"
                >
                  <img 
                    src={aboutStudents} 
                    alt="Gurukulam Children" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-orange-400">{t('about.value1Title')}</p>
                    <p className="text-[10px] text-white/70">{t('about.value1Desc')}</p>
                  </div>
                </motion.div>

                {/* Secondary Overlapping Image: Community Meet */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute bottom-2 right-0 w-[65%] h-[200px] rounded-sm overflow-hidden border-2 border-blue-500/60 shadow-2xl z-20"
                >
                  <img 
                    src={aboutCommunity} 
                    alt="Community Meeting" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-300">{t('about.whatWeDo2Title')}</p>
                    <p className="text-[10px] text-white/70">{t('about.whatWeDo2Desc')}</p>
                  </div>
                </motion.div>

                {/* Micro floating info chip */}
                <div className="absolute top-1/2 right-[68%] translate-x-1/2 bg-[#003366]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm shadow-xl z-30 hidden sm:flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">{language === 'hi' ? '१००% विश्वसनीय संगठन' : language === 'gu' ? '૧૦૦% વિશ્વસનીય સંગઠન' : '100% Trusted Org'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. MISSION & VISION SPLIT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-sm border-t-4 border-orange-500 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.02] via-transparent to-transparent pointer-events-none"></div>
              
              <div>
                <div className="w-12 h-12 bg-orange-600/15 border border-orange-500/30 rounded-sm flex items-center justify-center mb-6 text-orange-400 group-hover:scale-110 transition-transform">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wide mb-4">
                  {t('about.missionTitle')}
                </h3>
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                  {t('about.missionText')}
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4 text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                {language === 'hi' ? 'ज्ञान • जिम्मेदारी • अधिगम' : language === 'gu' ? 'જ્ઞાન • જવાબદારી • શિક્ષણ' : 'Knowledge • Responsibility • Learning'}
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-sm border-t-4 border-blue-500 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.02] via-transparent to-transparent pointer-events-none"></div>

              <div>
                <div className="w-12 h-12 bg-blue-600/15 border border-blue-500/30 rounded-sm flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  <Eye size={24} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wide mb-4">
                  {t('about.visionTitle')}
                </h3>
                <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                  {t('about.visionText')}
                </p>
              </div>
              <div className="mt-8 border-t border-white/5 pt-4 text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                {language === 'hi' ? 'समावेशिता • विरासत • नवाचार' : language === 'gu' ? 'સમાવેશીતા • વિરાસત • નવીનતા' : 'Inclusivity • Heritage • Innovation'}
              </div>
            </motion.div>
          </div>

          {/* 3. CORE VALUES SECTION */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] bg-orange-600/10 border border-orange-500/20 px-3.5 py-1.5 rounded-sm">
                {t('about.valuesBadge')}
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-serif font-black uppercase text-white tracking-tight">
                {t('about.valuesTitle')}
              </h2>
              <p className="text-blue-100/70 text-xs sm:text-sm">
                {t('about.valuesDesc')}
              </p>
            </div>

            {/* 5-Column Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {coreValues.map((val, idx) => {
                const IconComp = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:border-white/20 p-6 rounded-sm shadow-lg transition-all duration-300 relative group flex flex-col justify-between ${val.glow}`}
                  >
                    <div className="absolute top-4 right-4 text-white/10 font-mono font-black text-xl select-none group-hover:text-white/25 transition-colors">
                      {val.num}
                    </div>

                    <div className="space-y-4">
                      <div className={`w-10 h-10 rounded-sm bg-gradient-to-tr ${val.color} p-2 flex items-center justify-center text-white shadow-md shadow-black/20`}>
                        <IconComp size={20} />
                      </div>
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                        {val.title}
                      </h4>
                      <p className="text-blue-100/70 text-[11px] sm:text-xs leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 4. WHAT WE DO & FOCUS AREAS SPLIT LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
            
            {/* Left Column: What We Do (Col-span 7) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest border border-orange-500/20 bg-orange-600/10 px-3.5 py-1.5 rounded-sm">
                  {t('about.whatWeDoBadge')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight mt-4">
                  {t('about.whatWeDoTitle')}
                </h2>
                <p className="text-blue-100/70 text-xs sm:text-sm mt-2">
                  {t('about.whatWeDoDesc')}
                </p>
              </div>

              {/* Styled timeline list cards */}
              <div className="space-y-4">
                {whatWeDo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`bg-white/[0.02] border border-white/5 hover:border-white/10 p-5 rounded-sm flex items-start gap-4 transition-all duration-300 hover:bg-white/[0.04] border-l-4 ${item.color} group`}
                  >
                    <div className="bg-[#002147] border border-white/10 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white/70 select-none group-hover:bg-white group-hover:text-[#002147] transition-all">
                      {idx + 1}
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="text-xs sm:text-sm font-black uppercase text-white tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-blue-100/70 text-[11px] sm:text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Focus Areas & Portrait Image (Col-span 5) */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
              {/* Picture Frame: Mango Picking */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 p-3 rounded-sm shadow-2xl relative overflow-hidden group"
              >
                <div className="h-[280px] w-full rounded-sm overflow-hidden relative">
                  <img 
                    src={aboutMango} 
                    alt="Youth Empowerment" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Star size={10} className="animate-spin" /> {t('about.whatWeDo4Title')}
                    </span>
                    <p className="text-white font-serif font-bold text-lg leading-tight uppercase">
                      "{t('about.whatWeDo4Desc')}"
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Areas of Focus Badges */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm space-y-4 shadow-xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <GraduationCap size={16} className="text-orange-400" />
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">{t('about.areasFocusTitle')}</h4>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {areasOfLearning.map((foc, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] sm:text-[11px] font-bold text-blue-200 hover:text-white uppercase tracking-wider bg-blue-900/40 hover:bg-blue-900/60 border border-blue-500/20 px-3.5 py-1.5 rounded-full transition-all cursor-default select-none shadow-sm hover:shadow-md"
                    >
                      {foc}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* 5. WHY GURUKULAM EDITORIAL SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden p-8 sm:p-12 mb-24 relative shadow-2xl border-l-4 border-orange-500">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/[0.01] to-blue-600/[0.01] pointer-events-none"></div>

            {/* Left Content (Col-span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#003366] border border-blue-500/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-300">
                <Award size={12} className="text-orange-400" /> {t('about.whyBadge')}
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white leading-tight tracking-tight">
                {t('about.whyTitle')}
              </h2>

              <blockquote className="text-blue-100 font-serif italic text-base sm:text-lg leading-relaxed relative pl-6 border-l-2 border-orange-500/40">
                "{t('about.whyQuote')}"
              </blockquote>

              <p className="text-blue-200/70 text-xs sm:text-sm leading-relaxed">
                {t('about.whyDesc')}
              </p>
            </div>

            {/* Right Image: Award Ceremony (Col-span 5) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 border border-white/10 p-2 rounded-sm shadow-xl bg-[#002147]/80 backdrop-blur-md"
            >
              <div className="h-[250px] rounded-sm overflow-hidden relative">
                <img 
                  src={aboutConference} 
                  alt="Official Recognition" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">{t('about.whatWeDo4Title')}</p>
                  <p className="text-[10px] text-white/60">{t('about.whatWeDo4Desc')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 6. LOOKING AHEAD & CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Looking Ahead Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#003366] to-[#001f3f] border border-white/10 p-8 sm:p-10 rounded-sm relative overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest border border-orange-500/30 px-2.5 py-1 rounded-full">
                  {t('about.roadmapBadge')}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-wider">
                  {t('about.roadmapTitle')}
                </h3>
                <p className="text-blue-100/80 text-xs sm:text-sm leading-relaxed">
                  {t('about.roadmapDesc')}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest hover:text-white transition-colors cursor-default select-none">
                {language === 'hi' ? 'क्षितिज का विस्तार' : language === 'gu' ? 'ક્ષિતિજનો વિસ્તાર' : 'Expanding Horizons'} <ArrowRight size={14} />
              </div>
            </motion.div>

            {/* Join Our Journey / CTA Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#0d0d0d]/90 border border-white/10 p-8 sm:p-10 rounded-sm border-l-4 border-orange-500 relative overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase text-teal-400 tracking-widest border border-teal-500/30 px-2.5 py-1 rounded-full">
                  {t('about.ctaBadge')}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-wider">
                  {t('about.ctaTitle')}
                </h3>
                <p className="text-blue-100/80 text-xs sm:text-sm leading-relaxed">
                  {t('about.ctaDesc')}
                </p>
              </div>

              {/* Action Link Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-white/5">
                <button 
                  onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-2.5 rounded-sm transition-all flex items-center justify-center gap-1.5 border border-white/5 hover:border-white/15 cursor-pointer shadow-md"
                >
                  <UserPlus size={12} className="text-orange-400" />
                  {t('about.ctaBtnVolunteer')}
                </button>
                <button 
                  onClick={() => window.dispatchEvent(new Event('openDonateModal'))}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-black text-[10px] uppercase tracking-wider px-3 py-2.5 rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-orange-600/20"
                >
                  <Users size={12} />
                  {t('about.ctaBtnDonate')}
                </button>
              </div>
            </motion.div>
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

export default AboutUsPage;
