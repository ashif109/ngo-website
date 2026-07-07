import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import staticHeroBg from '../../assets/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Star, HeartHandshake, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const { hero: content } = useSiteContent();

  // Use CMS image if provided, otherwise fallback to static image
  const heroBg = (content?.backgroundImageUrl) || staticHeroBg;

  const badge = language === 'hi'
    ? (content?.badgeHi || 'राष्ट्रीय पहल 2026')
    : language === 'gu'
      ? (content?.badgeGu || 'રાષ્ટ્રીય પહેલ 2026')
      : (content?.badgeEn || 'NATIONAL INITIATIVE 2026');

  return (
    <div className="relative w-full min-h-[500px] sm:min-h-[550px] md:min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden bg-primary-dark py-16 md:py-20 lg:py-24">
      {/* Background Image & Overlays */}
      {/* Background Image Container restricted to right side for better sizing and masking */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[90%] md:w-[75%] lg:w-[65%] flex justify-end items-center overflow-hidden">
        <img
          src={heroBg}
          alt="Triyambakam Gurukulam - Premier Vedic Education and Cultural Research Academy in Agra"
          className="h-full w-auto max-w-full object-contain opacity-90 transition-all duration-700"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)'
          }}
        />
      </div>

      {/* Rich gradient overlays matching the reference - adjusted for better face visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent"></div>

      {/* Content Container */}
      <div className="institutional-container relative z-10 w-full pt-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-left"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 text-secondary font-bold text-[11px] md:text-xs uppercase tracking-[0.2em] mb-6">
            <Star size={14} className="fill-current" />
            {badge}
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-serif font-black leading-[1.05] mb-6 drop-shadow-2xl">
            {language === 'hi' 
              ? (content?.headlineHi || 'ज्ञान का संरक्षण, भविष्य का सशक्तिकरण').split(',').map((part: string, i: number) => <span key={i} className={`block tracking-tight ${i === 1 ? 'text-secondary mt-1' : 'text-white'}`}>{part}{i === 0 ? ',' : ''}</span>)
              : language === 'gu'
                ? (content?.headlineGu || 'જ્ઞાનનું સંરક્ષણ, ભવિષ્યનું સશક્તિકરણ').split(',').map((part: string, i: number) => <span key={i} className={`block tracking-tight ${i === 1 ? 'text-secondary mt-1' : 'text-white'}`}>{part}{i === 0 ? ',' : ''}</span>)
                : (content?.headlineEn || 'PRESERVING WISDOM, EMPOWERING THE FUTURE').split(',').map((part: string, i: number) => <span key={i} className={`block tracking-tight ${i === 1 ? 'text-secondary mt-1' : 'text-white'}`}>{part}{i === 0 ? ',' : ''}</span>)
            }
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center gap-2 mb-6 opacity-80">
            <div className="h-[1px] w-12 bg-secondary"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-secondary"></div>
            <div className="h-[1px] w-32 bg-gradient-to-r from-secondary to-transparent"></div>
          </div>

          {/* Paragraph */}
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-10 max-w-lg font-medium">
            {language === 'hi'
              ? (content?.descHi || 'प्राचीन ज्ञान को पोषित करने, वैदिक शिक्षा को बढ़ावा देने और एक उज्जवल, मूल्य-आधारित कल के निर्माण के हमारे मिशन में शामिल हों।')
              : language === 'gu'
                ? (content?.descGu || 'પ્રાચીન જ્ઞાનને પોષવા, વૈદિક શિક્ષણને પ્રોત્સાહન આપવા અને ઉજ્જવળ, મૂલ્ય આધારિત આવતીકાલના નિર્માણના અમારા મિશનમાં જોડાઓ.')
                : (content?.descEn || 'Join us in our mission to nurture ancient knowledge, promote Vedic education, and build a brighter, value-driven tomorrow.')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={() => window.dispatchEvent(new Event('openDonateModal'))}
              className="flex items-center justify-center gap-3 bg-[#f59e0b] hover:bg-[#d97706] text-primary-dark px-8 py-3.5 rounded-sm font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <HeartHandshake size={18} />
              {language === 'hi' ? 'मिशन में दान दें' : language === 'gu' ? 'મિશનમાં દાન આપો' : 'Donate to the Mission'}
            </button>
            <button
              onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
              className="flex items-center justify-center gap-3 bg-transparent border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <Users size={18} />
              {language === 'hi' ? 'स्वयंसेवक बनें' : language === 'gu' ? 'સ્વયંસેવક બનો' : 'Become a Volunteer'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Border Area */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="w-full h-3 bg-gradient-to-r from-primary-dark via-primary to-primary-dark border-t border-secondary/30 relative">
          <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-dark border-t border-secondary/30 flex items-center justify-center shadow-[0_-5px_10px_rgba(0,0,0,0.3)]">
            <Star size={14} className="text-secondary fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
