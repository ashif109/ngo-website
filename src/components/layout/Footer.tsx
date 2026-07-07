import React from 'react';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-text-main text-white pt-16 pb-8 mt-20 border-t-8 border-primary-light">
      <div className="institutional-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-serif font-bold mb-6 border-l-4 border-secondary pl-4">{t('footer.aboutTitle')}</h4>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-6 italic">
              {t('footer.aboutText')}
            </p>
            <div className="flex gap-4 flex-wrap">
              {/* [ADDED] Social Media Links */}
              <a href="https://www.facebook.com/gurukulamagra" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#1877F2] flex items-center justify-center rounded-full cursor-pointer hover:bg-opacity-80 transition-colors text-white text-[12px] font-bold" title="Facebook">f</a>
              <a href="https://www.instagram.com/gurukulamagra" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center rounded-full cursor-pointer hover:bg-opacity-80 transition-colors text-white text-[12px] font-bold" title="Instagram">in</a>
              <a href="https://www.youtube.com/gurukulamagra" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#FF0000] flex items-center justify-center rounded-full cursor-pointer hover:bg-opacity-80 transition-colors text-white text-[12px] font-bold" title="YouTube">yt</a>
              <a href="https://www.linkedin.com/company/gurukulamagra" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#0A66C2] flex items-center justify-center rounded-full cursor-pointer hover:bg-opacity-80 transition-colors text-white text-[12px] font-bold" title="LinkedIn">li</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6 border-l-4 border-secondary pl-4">{t('footer.linksTitle')}</h4>
            <ul className="space-y-3 text-[11px] font-bold text-gray-400">
              <li 
                onClick={() => window.location.hash = '#/important-links'}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group"
              >
                <ExternalLink size={10} className="group-hover:translate-x-1 transition-transform" /> {language === 'hi' ? 'महत्वपूर्ण लिंक' : language === 'gu' ? 'મહત્વપૂર્ણ લિંક્સ' : 'IMPORTANT LINKS'}
              </li>
              <li 
                onClick={() => window.location.hash = '#/privacy-policy'}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group"
              >
                <ExternalLink size={10} className="group-hover:translate-x-1 transition-transform" /> {language === 'hi' ? 'गोपनीयता नीति' : language === 'gu' ? 'ગોપનીયતા નીતિ' : 'PRIVACY POLICY'}
              </li>
              <li 
                onClick={() => window.location.hash = '#/disclaimer'}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group"
              >
                <ExternalLink size={10} className="group-hover:translate-x-1 transition-transform" /> {language === 'hi' ? 'अस्वीकरण' : language === 'gu' ? 'અસ્વીકરણ' : 'DISCLAIMER'}
              </li>
              <li 
                onClick={() => window.location.hash = '#/how-to-reach'}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group"
              >
                <ExternalLink size={10} className="group-hover:translate-x-1 transition-transform" /> {language === 'hi' ? 'कैसे पहुंचें' : language === 'gu' ? 'કેવી રીતે પહોંચવું' : 'HOW TO REACH'}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-lg font-serif font-bold mb-6 border-l-4 border-secondary pl-4">{t('footer.contactTitle')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="bg-gray-800 p-3 rounded-sm h-fit">
                  <MapPin size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase mb-1">{t('footer.addressLabel')}</p>
                  <p className="text-[12px] text-gray-400">F.No.1006 10th Floor BL-A, Om Shree Platinum Basai  Agra - 282001, Uttar Pradesh</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-gray-800 p-3 rounded-sm h-fit">
                  <Mail size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase mb-1">{t('footer.emailLabel')}</p>
                  <p className="text-[12px] text-gray-400">croping@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
