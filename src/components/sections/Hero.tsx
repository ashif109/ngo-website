import React from 'react';
import { motion } from 'motion/react';
import heroBg from '../../assets/main image inhanced.png';
import { useLanguage } from '../../context/LanguageContext';


const Hero: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full min-h-[480px] md:h-[520px] py-16 md:py-0 overflow-hidden bg-gray-900 border-b-8 border-[#0055a5]">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url("${heroBg}")` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1 bg-orange-600 text-white text-[12px] font-bold uppercase tracking-widest mb-6 rounded-sm shadow-xl">
            {language === 'hi' ? 'राष्ट्रीय पहल 2026' : language === 'gu' ? 'રાષ્ટ્રીય પહેલ 2026' : 'National Initiative 2026'}
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight drop-shadow-2xl mb-8 uppercase tracking-tight">
            {language === 'hi' ? (
              <>ज्ञान का संरक्षण, <br /><span className="text-orange-400">भविष्य का</span> सशक्तिकरण</>
            ) : language === 'gu' ? (
              <>જ્ઞાનનું સંરક્ષણ, <br /><span className="text-orange-400">ભવિષ્યનું</span> સશક્તિકરણ</>
            ) : (
              <>Preserving Wisdom, <br /><span className="text-orange-400">Empowering</span> the Future</>
            )}
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new Event('openDonateModal'))}
              className="w-full sm:w-auto bg-orange-600 text-white px-8 py-3 rounded-sm font-black text-sm uppercase tracking-wider hover:bg-orange-700 transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {language === 'hi' ? 'मिशन में दान दें' : language === 'gu' ? 'મિશનમાં દાન આપો' : 'Donate to the Mission'}
            </button>
            <button 
              onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-all shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {language === 'hi' ? 'स्वयंसेवक बनें' : language === 'gu' ? 'સ્વયંસેવક બનો' : 'Become a Volunteer'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
    </div>
  );
};

export default Hero;
