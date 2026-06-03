import React from 'react';
import { ArrowLeft, Sparkles, MapPin, Train, Bus, Navigation, Compass, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const HowToReachPage: React.FC = () => {
  const { t, language } = useLanguage();

  const methods = [
    { title: t('howToReach.trainTitle'), desc: t('howToReach.trainDesc'), icon: Train },
    { title: t('howToReach.busTitle'), desc: t('howToReach.busDesc'), icon: Bus },
    { title: t('howToReach.roadTitle'), desc: t('howToReach.roadDesc'), icon: Navigation }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="how-to-reach-content">
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
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Compass size={16} className="animate-pulse" /> {t('howToReach.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('howToReach.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('howToReach.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-start">
            {/* LEFT COLUMN: TRAVEL DETAILS (Col-span 7) */}
            <div className="lg:col-span-7 space-y-8">
              {methods.map((method, idx) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-5 bg-white/[0.02] border border-white/5 p-6 rounded-sm shadow-md hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-sm bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-base text-white uppercase tracking-wider mb-1.5">{method.title}</h3>
                      <p className="text-xs sm:text-sm text-blue-200/85 leading-relaxed">{method.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Nearby Landmarks */}
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm shadow-md space-y-3">
                <h3 className="font-serif font-black text-base text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  🏫 {t('howToReach.landmarkTitle')}
                </h3>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-blue-200/80 space-y-2 leading-relaxed">
                  <li>{language === 'hi' ? 'ओम श्री प्लेटिनम हाउसिंग सोसाइटी (मुख्य स्थल)' : 'Om Shree Platinum Housing Society (Main Site)'}</li>
                  <li>{language === 'hi' ? 'फतेहाबाद रोड, बसई, आगरा' : 'Basai, Fatehabad Road, Agra'}</li>
                  <li>{language === 'hi' ? 'ताज महल पूर्वी गेट (लगभग 3.5 किमी दूर)' : 'Taj Mahal Eastern Gate (Approx 3.5 km away)'}</li>
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: MAP EMBED & CTA (Col-span 5) */}
            <div className="lg:col-span-5 space-y-6 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-sm shadow-xl">
              <div className="flex items-center gap-2 text-orange-400 border-b border-white/10 pb-3">
                <MapPin size={18} />
                <h4 className="text-xs font-black uppercase text-white tracking-wide">{t('howToReach.mapTitle')}</h4>
              </div>
              <div className="w-full h-[280px] bg-blue-950/40 rounded-sm overflow-hidden border border-white/10 shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.0520261352495!2d78.046399!3d27.154388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974714f346df0df%3A0xe9f7cd55725db005!2sOm%20Shree%20Platinum!5e0!3m2!1sen!2sin!4v1780000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  title="Office Location Map"
                  aria-label="Location map"
                ></iframe>
              </div>

              <div className="pt-2">
                <a 
                  href="https://maps.google.com/?q=Om+Shree+Platinum+Basai+Agra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5"
                >
                  <ExternalLink size={14} /> {t('howToReach.btnDirections')}
                </a>
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

export default HowToReachPage;
