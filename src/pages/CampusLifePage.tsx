import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowLeft, Sparkles, Calendar, Compass, Award, 
  Heart, Users, Star, UserPlus, Image, Maximize2, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getGallery } from '../services/api';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import aboutMango from '../assets/about-mango.jpg';
import aboutConference from '../assets/about-conference.jpg';
import aboutCommunity from '../assets/about-community.jpg';
import aboutStudents from '../assets/about-students.jpg';

const CampusLifePage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cmsGallery, setCmsGallery] = useState<any[]>([]);

  useEffect(() => {
    getGallery('campus-life').then(res => {
      if (res.success && Array.isArray(res.data)) setCmsGallery(res.data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    document.title = `${t('campusLife.title')} | Triyambakam Gurukulam Association`;
  }, [language, t]);

  const sections = [
    {
      title: t('campusLife.sec1Title'),
      desc: t('campusLife.sec1Desc'),
      icon: Users,
      color: "border-secondary/30",
      accent: "text-orange-400"
    },
    {
      title: t('campusLife.sec2Title'),
      desc: t('campusLife.sec2Desc'),
      icon: Calendar,
      color: "border-secondary/30",
      accent: "text-secondary"
    },
    {
      title: t('campusLife.sec3Title'),
      desc: t('campusLife.sec3Desc'),
      icon: Award,
      color: "border-green-500/30",
      accent: "text-green-400"
    },
    {
      title: t('campusLife.sec4Title'),
      desc: t('campusLife.sec4Desc'),
      icon: Compass,
      color: "border-indigo-500/30",
      accent: "text-indigo-400"
    },
    {
      title: t('campusLife.sec5Title'),
      desc: t('campusLife.sec5Desc'),
      icon: Star,
      color: "border-teal-500/30",
      accent: "text-teal-400"
    },
    {
      title: t('campusLife.sec6Title'),
      desc: t('campusLife.sec6Desc'),
      icon: Heart,
      color: "border-red-500/30",
      accent: "text-red-400"
    }
  ];

  const staticGalleryItems = [
    {
      src: aboutMango,
      title: t('campusLife.galleryItem1Title'),
      desc: t('campusLife.galleryItem1Desc'),
      tag: language === 'hi' ? "प्रकृति" : language === 'gu' ? "પ્રકૃતિ" : "Nature"
    },
    {
      src: aboutConference,
      title: t('campusLife.galleryItem2Title'),
      desc: t('campusLife.galleryItem2Desc'),
      tag: language === 'hi' ? "सम्मेलन" : language === 'gu' ? "પરિષદ" : "Conference"
    },
    {
      src: aboutCommunity,
      title: t('campusLife.galleryItem3Title'),
      desc: t('campusLife.galleryItem3Desc'),
      tag: language === 'hi' ? "संवाद" : language === 'gu' ? "સંવાદ" : "Dialogue"
    },
    {
      src: aboutStudents,
      title: t('campusLife.galleryItem4Title'),
      desc: t('campusLife.galleryItem4Desc'),
      tag: language === 'hi' ? "गुरुकुल" : language === 'gu' ? "ગુરુકુળ" : "Gurukulam"
    }
  ];

  // Merge static + CMS gallery items
  const galleryItems = [
    ...staticGalleryItems,
    ...cmsGallery.map((img: any) => ({
      src: img.url,
      title: language === 'hi' ? (img.captionHi || img.captionEn) : language === 'gu' ? (img.captionGu || img.captionEn) : img.captionEn,
      desc: '',
      tag: img.section || 'Gallery'
    }))
  ];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIdx !== null) {
      setDirection(-1);
      setSelectedIdx((selectedIdx - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIdx !== null) {
      setDirection(1);
      setSelectedIdx((selectedIdx + 1) % galleryItems.length);
    }
  };

  const scrollToIdx = (idx: number) => {
    if (carouselRef.current) {
      const width = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: idx * width,
        behavior: 'smooth'
      });
      setActiveIdx(idx);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    if (width > 0) {
      const idx = Math.round(scrollLeft / width);
      if (idx !== activeIdx && idx >= 0 && idx < galleryItems.length) {
        setActiveIdx(idx);
      }
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
        setSelectedIdx((selectedIdx - 1 + galleryItems.length) % galleryItems.length);
      } else if (e.key === 'ArrowRight') {
        setDirection(1);
        setSelectedIdx((selectedIdx + 1) % galleryItems.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, galleryItems.length]);

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden" id="campus-life-main-content">
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
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Sparkles size={16} className="animate-pulse" /> {t('campusLife.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('campusLife.title')}
            </h1>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-secondary-light leading-relaxed border-l-4 border-secondary pl-4">
              {t('campusLife.internalHeading')}
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t('campusLife.descTitle')} <br className="hidden sm:inline" />
              {t('campusLife.desc')}
            </p>
          </div>

          {/* 6-SECTION CARD GRID */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((sec, idx) => {
                const IconComp = sec.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-6 sm:p-8 rounded-sm shadow-xl transition-all duration-300 relative group ${sec.color}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-sm bg-primary-dark/80 border border-white/10 flex items-center justify-center text-xl shadow-md group-hover:bg-accent group-hover:border-transparent transition-all">
                        <IconComp size={20} className={`${sec.accent} group-hover:text-white transition-colors`} />
                      </div>
                      <span className="text-[10px] font-black text-white/20 select-none group-hover:text-secondary/30 transition-colors">0{idx+1}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-serif font-bold text-white group-hover:text-orange-400 transition-colors">
                        {sec.title}
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {sec.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* GALLERY & MOMENTS SECTION */}
          <div className="mb-24">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8">
              <Image size={18} className="text-orange-400" />
              <h3 className="text-lg font-serif font-black uppercase tracking-wider text-white">
                {t('campusLife.galleryTitle')}
              </h3>
            </div>

            {/* Desktop Layout - Showcase Gallery */}
            <div className="hidden md:grid grid-cols-12 gap-8 items-stretch">
              {/* Main Showcase Panel */}
              <div className="col-span-7 lg:col-span-8 relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 bg-primary-dark/40 shadow-2xl flex flex-col justify-end group">
                {/* Images with crossfade animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIdx}
                      src={galleryItems[activeIdx].src}
                      alt={galleryItems[activeIdx].title}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Actions */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => setSelectedIdx(activeIdx)}
                    className="w-10 h-10 rounded-full bg-black/40 hover:bg-accent backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
                    aria-label="View fullscreen"
                    title="Fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>

                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-accent text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
                    {galleryItems[activeIdx].tag}
                  </span>
                </div>

                {/* Glassmorphic Caption Banner */}
                <div className="relative z-10 p-6 sm:p-8 bg-primary-dark/70 backdrop-blur-md border-t border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="space-y-2"
                    >
                      <h4 className="font-serif font-black text-lg lg:text-2xl text-white uppercase tracking-wider">
                        {galleryItems[activeIdx].title}
                      </h4>
                      <p className="text-xs lg:text-sm text-secondary-light/90 leading-relaxed max-w-3xl">
                        {galleryItems[activeIdx].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Thumbnails Navigation Panel */}
              <div className="col-span-5 lg:col-span-4 flex flex-col justify-between gap-4">
                {galleryItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center gap-4 p-4 rounded-sm border transition-all text-left relative overflow-hidden w-full h-[22%] cursor-pointer group ${
                      activeIdx === idx
                        ? 'bg-white/[0.08] border-secondary/50 shadow-lg shadow-orange-500/5'
                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15'
                    }`}
                  >
                    {activeIdx === idx && (
                      <motion.div
                        layoutId="activeBorder"
                        className="absolute inset-0 border-2 border-secondary rounded-sm pointer-events-none z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div className="w-20 h-14 rounded-sm overflow-hidden flex-shrink-0 border border-white/10 relative">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="flex-grow space-y-1 min-w-0">
                      <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">
                        {item.tag}
                      </span>
                      <h5 className="font-serif font-bold text-xs lg:text-sm text-white truncate uppercase tracking-wide group-hover:text-orange-300 transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-[10px] text-secondary-light/50 truncate leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Layout - Swipeable Carousel */}
            <div className="block md:hidden space-y-6">
              {/* Carousel Container */}
              <div className="relative">
                <style dangerouslySetInnerHTML={{__html: `
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}} />
                <div 
                  ref={carouselRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar w-full h-[280px] rounded-sm border border-white/10 bg-primary-dark/40 relative shadow-xl"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {galleryItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="w-full h-full flex-shrink-0 snap-start snap-always relative"
                    >
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                      
                      {/* Floating Category Tag */}
                      <span className="absolute top-4 left-4 bg-accent text-white font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-md">
                        {item.tag}
                      </span>
                      
                      {/* Fullscreen Maximize Action */}
                      <button
                        onClick={() => setSelectedIdx(idx)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white cursor-pointer shadow-lg"
                        aria-label="Open view screen"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Indicators (Dots) */}
              <div className="flex justify-center items-center gap-2.5">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToIdx(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIdx === idx ? 'bg-secondary w-7 shadow-md shadow-orange-500/20' : 'bg-white/20 w-2 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Caption Description Box */}
              <div className="bg-primary-dark/65 backdrop-blur-sm border border-white/10 p-5 rounded-sm space-y-2 shadow-lg">
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                  {galleryItems[activeIdx].tag}
                </span>
                <h4 className="font-serif font-black text-lg text-white uppercase tracking-wider">
                  {galleryItems[activeIdx].title}
                </h4>
                <p className="text-xs text-secondary-light/80 leading-relaxed">
                  {galleryItems[activeIdx].desc}
                </p>
              </div>
            </div>

            {/* Label */}
            <div className="mt-8 bg-secondary/5 border border-secondary/10 p-4 rounded-sm text-center">
              <p className="text-orange-400/90 text-xs font-semibold leading-relaxed tracking-wide">
                {t('campusLife.galleryLabel')}
              </p>
            </div>
          </div>

          {/* CALL TO ACTION */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-dark to-primary-dark border border-white/10 p-8 sm:p-12 rounded-sm text-center border-l-4 border-secondary shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-2xl mx-auto space-y-6">
              <span className="text-[9px] font-black uppercase text-orange-400 tracking-widest border border-secondary/30 px-2.5 py-1 rounded-full">
                {language === 'hi' ? 'स्वयंसेवक पंजीकरण' : language === 'gu' ? 'સ્વયંસેવક રજીસ્ટ્રેશન' : 'Volunteer Registry'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wider">
                {t('campusLife.ctaTitle')}
              </h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                {t('campusLife.ctaDesc')}
              </p>
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
                  className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                  id="become-volunteer-btn"
                >
                  <UserPlus size={14} /> {t('campusLife.btnVolunteer')}
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer z-50 shadow-lg"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-40"
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-4 sm:right-8 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all cursor-pointer z-40"
              aria-label="Next Image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Selected Image Wrapper */}
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center gap-4 relative z-30"
            >
              <div className="relative rounded-sm overflow-hidden bg-zinc-950 border border-white/10 h-[50vh] sm:h-[60vh] w-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={selectedIdx}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 200 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) {
                        handlePrev();
                      } else if (info.offset.x < -80) {
                        handleNext();
                      }
                    }}
                    className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    <img 
                      src={galleryItems[selectedIdx].src} 
                      alt={galleryItems[selectedIdx].title} 
                      className="max-h-[50vh] sm:max-h-[60vh] max-w-full object-contain pointer-events-none select-none"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Floating category tag */}
                <span className="absolute top-4 left-4 bg-accent/90 text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm shadow-md z-20">
                  {galleryItems[selectedIdx].tag}
                </span>
              </div>

              {/* Caption details block */}
              <div className="text-center max-w-xl space-y-2 mt-2 px-4 h-[120px] flex flex-col items-center justify-start">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={selectedIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-1.5"
                  >
                    <h4 className="font-serif font-black text-lg sm:text-xl text-white uppercase tracking-wider">
                      {galleryItems[selectedIdx].title}
                    </h4>
                    <p className="text-secondary-light/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {galleryItems[selectedIdx].desc}
                    </p>
                    <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest pt-1">
                      Image {selectedIdx + 1} of {galleryItems.length}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactSection />
      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default CampusLifePage;
