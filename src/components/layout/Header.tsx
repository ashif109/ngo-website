import React from 'react';
import logo from '../../assets/logo.png';
import { useLanguage } from '../../context/LanguageContext';

import { useSiteContent } from '../../context/SiteContentContext';

const Header: React.FC = () => {
  const { t, language } = useLanguage();
  const { settings } = useSiteContent();

  const getOrgName = () => {
    if (!settings) return null;
    if (language === 'hi') return settings.orgNameHi;
    if (language === 'gu') return settings.orgNameGu;
    return settings.orgNameEn;
  };

  const orgName = getOrgName();

  return (
    <header className="bg-white">
      {/* Main Header */}
      <div className="py-6 shadow-sm">
        <div className="institutional-container flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Triyambakam Logo" className="h-20 lg:h-28 w-auto hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Center: Text */}
          <div className="text-center flex-1 px-4 lg:px-8 w-full flex flex-col justify-center overflow-hidden">
            <h1 className="text-2xl md:text-4xl xl:text-5xl font-serif font-black text-primary leading-tight md:leading-none tracking-wide drop-shadow-sm mb-1 sm:mb-2 whitespace-normal md:whitespace-nowrap">
              {language === 'hi' ? orgName : t('header.academyNameHindi')}
            </h1>
            <h2 className="text-lg md:text-2xl xl:text-3xl font-serif font-bold text-primary leading-tight tracking-wide mb-1 whitespace-normal md:whitespace-nowrap">
              {language === 'hi' ? t('header.academyNameEnglish') : orgName || t('header.academyNameEnglish')}
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm text-text-muted font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-normal md:whitespace-nowrap">{t('header.subtitle')}</p>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => window.dispatchEvent(new Event('openDonateModal'))}
              className="bg-accent text-white px-8 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-xl hover-lift"
            >
              {t('header.donateBtn')}
            </button>
            <img src={logo} alt="Secondary Logo" className="h-16 w-auto opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
