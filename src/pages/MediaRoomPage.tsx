import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Image, Video, FileText, Share2, Calendar, Newspaper } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const MediaRoomPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'news' | 'releases' | 'gallery'>('all');

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी' : language === 'gu' ? 'બધા' : 'All Media' },
    { id: 'news', label: language === 'hi' ? 'समाचार कवरेज' : language === 'gu' ? 'સમાચાર કવરેજ' : 'News Coverage' },
    { id: 'releases', label: language === 'hi' ? 'प्रेस विज्ञप्ति' : language === 'gu' ? 'પ્રેસ રીલીઝ' : 'Press Releases' },
    { id: 'gallery', label: language === 'hi' ? 'गैलरी' : language === 'gu' ? 'ગેલેરી' : 'Photo & Video' }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="media-room-content">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-[120px] -mr-60 -mt-60 z-0 pointer-events-none"></div>
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
              <Newspaper size={16} className="animate-pulse" /> {t('media.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('media.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('media.desc')}
            </p>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeFilter === cat.id
                    ? 'bg-orange-600 border-transparent text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* GRID SECTIONS - EMPTY STATE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.02] border border-white/5 p-12 sm:p-16 rounded-sm text-center shadow-xl space-y-6 max-w-4xl mx-auto my-12"
          >
            <div className="w-20 h-20 bg-blue-950/65 border border-white/10 text-orange-400 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Share2 size={32} className="animate-pulse" />
            </div>
            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-wider">
                {t('media.emptyTitle')}
              </h3>
              <p className="text-blue-200/70 text-xs sm:text-sm leading-relaxed">
                {t('media.emptyDesc')}
              </p>
            </div>
            
            {/* Featured category highlights placeholder */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto">
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm flex flex-col items-center text-center">
                <FileText size={20} className="text-blue-400 mb-2" />
                <span className="text-[10px] font-black uppercase text-white/40 tracking-wider">Press Deck</span>
                <span className="text-xs font-bold text-blue-200 mt-1">Under Construction</span>
              </div>
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm flex flex-col items-center text-center">
                <Image size={20} className="text-orange-400 mb-2" />
                <span className="text-[10px] font-black uppercase text-white/40 tracking-wider">Photo Album</span>
                <span className="text-xs font-bold text-blue-200 mt-1">Curating Gallery</span>
              </div>
              <div className="p-4 bg-white/[0.01] border border-white/5 rounded-sm flex flex-col items-center text-center">
                <Video size={20} className="text-red-400 mb-2" />
                <span className="text-[10px] font-black uppercase text-white/40 tracking-wider">Video Reels</span>
                <span className="text-xs font-bold text-blue-200 mt-1">Editing Highlights</span>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
              >
                {t('media.btnView')}
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

export default MediaRoomPage;
