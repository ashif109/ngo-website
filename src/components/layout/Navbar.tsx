import React, { useState } from 'react';
import { Globe, ChevronDown, Menu, X, Check } from 'lucide-react';
import { NAV_MAIN, NAV_SECONDARY } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const getMenuTranslationKey = (item: string) => {
    switch(item) {
      case "ABOUT US": return "nav.aboutUs";
      case "ADMISSIONS": return "nav.admissions";
      case "ACADEMICS": return "nav.academics";
      case "Vedic Studies": return "nav.vedicStudies";
      case "RESEARCH": return "nav.research";
      case "GURUKULAMS": return "nav.gurukulams";
      case "PUBLICATIONS": return "nav.publications";
      case "CAMPUS LIFE": return "nav.campusLife";
      case "RESOURCES": return "nav.resources";
      case "ANNOUNCEMENTS": return "nav.announcements";
      case "MEDIA ROOM": return "nav.mediaRoom";
      case "AWARDS": return "nav.awards";
      case "CONTACT US": return "nav.contactUs";
      case "ALUMNI LOGIN": return "nav.alumniLogin";
      case "HELP DESK": return "nav.helpDesk";
      case "GRIEVANCE PORTAL": return "nav.grievancePortal";
      case "ADMIN PORTAL": return "nav.adminPortal";
      default: return "";
    }
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg relative">
      {/* Primary Navigation */}
      <div className="bg-primary-light text-white relative z-20">
        <div className="institutional-container">
          <div className="flex items-center justify-between lg:justify-start">
            
            <div className="flex items-center lg:flex-wrap overflow-x-auto no-scrollbar lg:overflow-visible flex-1 lg:flex-none relative">
              <div 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="p-4 border-r border-white/10 hover:bg-primary transition-colors cursor-pointer group"
              >
                <Globe size={16} className="group-hover:rotate-12 transition-transform" />
              </div>

              {/* Premium Language Dropdown Selection */}
              {isLanguageDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-primary/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-sm py-2 z-50">
                  {[
                    { code: 'en', label: '🇬🇧 English' },
                    { code: 'hi', label: '🇮🇳 हिन्दी (Hindi)' },
                    { code: 'gu', label: '🇮🇳 ગુજરાતી (Gujarati)' }
                  ].map((lang) => (
                    <div 
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="px-4 py-2.5 text-xs font-bold text-white hover:bg-primary-light flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>{lang.label}</span>
                      {language === lang.code && <Check size={14} className="text-orange-400" />}
                    </div>
                  ))}
                </div>
              )}

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center">
                {NAV_MAIN.map((item, i) => {
                  const translatedText = getMenuTranslationKey(item) ? t(getMenuTranslationKey(item)) : item;
                  return (
                    <div 
                      key={i} 
                      onClick={() => {
                        if (item === "ABOUT US") {
                          window.location.hash = '#/about-us';
                        } else if (item === "ADMISSIONS") {
                          window.location.hash = '#/admissions';
                        } else if (item === "Vedic Studies") {
                          window.location.hash = '#/vedic-studies';
                        } else if (item === "ACADEMICS") {
                          window.location.hash = '#/vedic-studies';
                        } else if (item === "RESEARCH") {
                          window.location.hash = '#/research';
                        } else if (item === "GURUKULAMS") {
                          window.location.hash = '#/gurukulams';
                        } else if (item === "PUBLICATIONS") {
                          window.location.hash = '#/publications';
                        } else if (item === "CAMPUS LIFE") {
                          window.location.hash = '#/campus-life';
                        } else if (item === "RESOURCES") {
                          window.location.hash = '#/resources';
                        } else if (item === "ANNOUNCEMENTS") {
                          window.location.hash = '#/announcements';
                        } else {
                          window.location.hash = '';
                        }
                      }}
                      className="px-5 py-4 text-[11px] font-bold border-r border-white/10 hover:bg-primary transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap group"
                    >
                      {translatedText} 
                      <ChevronDown size={10} className="group-hover:translate-y-0.5 transition-transform opacity-70" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div 
              className="lg:hidden p-4 cursor-pointer hover:bg-primary transition-colors flex items-center gap-2 font-bold text-xs tracking-wider"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              MENU {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-primary border-t border-white/10 shadow-2xl z-10 max-h-[80vh] overflow-y-auto">
          {/* Mobile Language Selector */}
          <div className="bg-primary px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-black text-white/70 uppercase tracking-wider flex items-center gap-1.5">
              <Globe size={12} /> Language / भाषा
            </span>
            <div className="flex gap-2">
              {[
                { code: 'en', label: 'EN' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'gu', label: 'ગુજરાતી' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-sm border uppercase transition-all cursor-pointer ${
                    language === lang.code
                      ? 'bg-accent border-transparent text-white'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {NAV_MAIN.map((item, i) => {
              const translatedText = getMenuTranslationKey(item) ? t(getMenuTranslationKey(item)) : item;
              return (
                <div 
                  key={i} 
                  onClick={() => {
                    if (item === "ABOUT US") {
                      window.location.hash = '#/about-us';
                    } else if (item === "ADMISSIONS") {
                      window.location.hash = '#/admissions';
                    } else if (item === "Vedic Studies") {
                      window.location.hash = '#/vedic-studies';
                    } else if (item === "ACADEMICS") {
                      window.location.hash = '#/vedic-studies';
                    } else if (item === "RESEARCH") {
                      window.location.hash = '#/research';
                    } else if (item === "GURUKULAMS") {
                      window.location.hash = '#/gurukulams';
                    } else if (item === "PUBLICATIONS") {
                      window.location.hash = '#/publications';
                    } else if (item === "CAMPUS LIFE") {
                      window.location.hash = '#/campus-life';
                    } else if (item === "RESOURCES") {
                      window.location.hash = '#/resources';
                    } else if (item === "ANNOUNCEMENTS") {
                      window.location.hash = '#/announcements';
                    } else {
                      window.location.hash = '';
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-6 py-4 text-xs font-bold border-b border-white/10 hover:bg-primary transition-colors cursor-pointer flex items-center justify-between text-white tracking-wide"
                >
                  {translatedText}
                  <ChevronDown size={14} className="opacity-70" />
                </div>
              );
            })}
            <div className="bg-primary p-6 grid grid-cols-2 gap-y-6 gap-x-4">
               {NAV_SECONDARY.map((item, i) => {
                 const translatedText = getMenuTranslationKey(item) ? t(getMenuTranslationKey(item)) : item;
                 return (
                   <span 
                     key={i} 
                     onClick={() => {
                       setIsMobileMenuOpen(false);
                       if (item === "MEDIA ROOM") window.location.hash = '#/media-room';
                       else if (item === "AWARDS") window.location.hash = '#/awards';
                       else if (item === "CONTACT US") window.location.hash = '#/contact-us';
                       else if (item === "ALUMNI LOGIN") window.location.hash = '#/alumni-login';
                       else if (item === "HELP DESK") window.location.hash = '#/help-desk';
                       else if (item === "GRIEVANCE PORTAL") window.location.hash = '#/grievance-portal';
                       else if (item === "ADMIN PORTAL") {
                         const token = localStorage.getItem('adminToken');
                         window.location.hash = token ? '#/admin-dashboard' : '#/admin-login';
                       }
                     }}
                     className="text-[10px] font-bold text-white/80 hover:text-white cursor-pointer uppercase tracking-wider"
                   >
                     {translatedText}
                   </span>
                 );
               })}
               <button 
                 onClick={() => {
                   window.dispatchEvent(new Event('openDonateModal'));
                   setIsMobileMenuOpen(false);
                 }}
                 className="col-span-2 mt-2 bg-accent text-white px-4 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all text-center shadow-xl"
               >
                 {t('nav.donateBtn')}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Navigation */}
      <div className="hidden lg:block bg-primary py-2 border-t border-white/5">
        <div className="institutional-container flex gap-6 text-[10px] font-bold text-white/80">
          {NAV_SECONDARY.map((item, i) => {
            const translatedText = getMenuTranslationKey(item) ? t(getMenuTranslationKey(item)) : item;
            return (
              <span 
                key={i} 
                onClick={() => {
                  if (item === "MEDIA ROOM") window.location.hash = '#/media-room';
                  else if (item === "AWARDS") window.location.hash = '#/awards';
                  else if (item === "CONTACT US") window.location.hash = '#/contact-us';
                  else if (item === "ALUMNI LOGIN") window.location.hash = '#/alumni-login';
                  else if (item === "HELP DESK") window.location.hash = '#/help-desk';
                  else if (item === "GRIEVANCE PORTAL") window.location.hash = '#/grievance-portal';
                  else if (item === "ADMIN PORTAL") {
                    const token = localStorage.getItem('adminToken');
                    window.location.hash = token ? '#/admin-dashboard' : '#/admin-login';
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider relative group"
              >
                {translatedText}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
              </span>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
