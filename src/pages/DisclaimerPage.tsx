import React from 'react';
import { ArrowLeft, Sparkles, Scale, Info, Mail, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const DisclaimerPage: React.FC = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      title: language === 'hi' ? '1. सामान्य अस्वीकरण' : '1. General Disclaimer',
      content: language === 'hi'
        ? 'इस वेबसाइट पर मौजूद सामग्री केवल सामान्य जानकारी और शैक्षिक उद्देश्यों के लिए है। संगठन किसी भी प्रत्यक्ष या अप्रत्यक्ष नुकसान के लिए जिम्मेदार नहीं होगा जो इस वेबसाइट के उपयोग से उत्पन्न हो सकता है।'
        : 'All information on this website is published in good faith and for general information and educational purposes only. Any actions taken are at the user\'s own risk.'
    },
    {
      title: language === 'hi' ? '2. सामग्री की सटीकता' : '2. Content Accuracy',
      content: language === 'hi'
        ? 'हम जानकारी को अद्यतन और सही रखने का प्रयास करते हैं, लेकिन हम इसकी पूर्णता, सटीकता या विश्वसनीयता के बारे में कोई वारंटी नहीं देते हैं।'
        : 'While we strive to keep information accurate and up to date, we make no representations or warranties of any kind regarding completeness or reliability.'
    },
    {
      title: language === 'hi' ? '3. बाहरी लिंक' : '3. External Links',
      content: language === 'hi'
        ? 'हमारी वेबसाइट में बाहरी वेबसाइटों के लिंक हो सकते हैं। हम इन बाहरी साइटों की सामग्री या उपलब्धता को नियंत्रित नहीं करते हैं और उनके लिए कोई जिम्मेदारी स्वीकार नहीं करते हैं।'
        : 'Our website may contain links to external sites. We do not control or endorse the content, policies, or practices of third-party websites.'
    },
    {
      title: language === 'hi' ? '4. दायित्व की सीमा' : '4. Limitation of Liability',
      content: language === 'hi'
        ? 'किसी भी परिस्थिति में त्र्यंबकम गुरुकुलम एसोसिएशन इस वेबसाइट के उपयोग से होने वाले किसी भी नुकसान या क्षति के लिए उत्तरदायी नहीं होगा।'
        : 'In no event will Triyambakam Gurukulam Association be liable for any loss or damage including without limitation, indirect or consequential loss.'
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="disclaimer-content">
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
              <AlertTriangle size={16} className="animate-pulse" /> {t('disclaimer.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('disclaimer.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('disclaimer.desc')}
            </p>
          </div>

          {/* DETAILED STATEMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-8 space-y-8 bg-white/5 border border-white/10 p-8 sm:p-10 rounded-sm shadow-xl">
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed italic">
                {t('disclaimer.bodyText')}
              </p>

              <div className="space-y-6 pt-4 border-t border-white/10">
                {sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-serif font-bold text-base text-orange-400">
                      {sec.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDE CONTACT CARD */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-orange-400 border-b border-white/10 pb-2">
                  <Info size={16} />
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Legal Contact</h4>
                </div>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  {language === 'hi'
                    ? 'अस्वीकरण नीति या कानूनी उपयोग से संबंधित प्रश्नों के लिए, कृपया हमसे संपर्क करें:'
                    : 'For questions regarding this disclaimer policy or website terms of use, please reach out to:'}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-white bg-blue-950/60 p-3 border border-white/10 rounded-sm">
                  <Mail size={14} className="text-orange-400" />
                  <span>croping@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default DisclaimerPage;
