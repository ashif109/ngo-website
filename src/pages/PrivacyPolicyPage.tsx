import React from 'react';
import { ArrowLeft, Sparkles, Shield, Mail, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const PrivacyPolicyPage: React.FC = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      title: language === 'hi' ? '1. जानकारी संग्रह' : '1. Information Collection',
      content: language === 'hi' 
        ? 'हम आपके बारे में जानकारी तब एकत्र करते हैं जब आप हमारी वेबसाइट का उपयोग करते हैं, प्रवेश के लिए अपनी रुचि दर्ज करते हैं, हमसे संपर्क करते हैं, या स्वयंसेवक बनने के लिए पंजीकरण करते हैं। इसमें आपका नाम, ईमेल पता, फोन नंबर और आपकी चुनी हुई प्राथमिकताएं शामिल हो सकती हैं।'
        : 'We collect personal information that you voluntarily provide to us when registering interest, filling forms, or applying as a volunteer. This includes name, email address, telephone numbers, and interest choices.'
    },
    {
      title: language === 'hi' ? '2. कुकीज़ और ट्रैकिंग' : '2. Cookies & Tracking',
      content: language === 'hi'
        ? 'हम वेबसाइट उपयोग का विश्लेषण करने, प्राथमिकताओं को याद रखने और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए मानक कुकीज़ और ट्रैकिंग तकनीकों का उपयोग करते हैं। आप अपने ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को अक्षम कर सकते हैं।'
        : 'We use cookies and similar tracking technologies to analyze site traffic, remember preferences, and enhance security. You can adjust your browser settings to refuse cookies.'
    },
    {
      title: language === 'hi' ? '3. डेटा का उपयोग' : '3. Data Usage',
      content: language === 'hi'
        ? 'एकत्र की गई जानकारी का उपयोग मुख्य रूप से हमारी गतिविधियों, सूचनाओं को साझा करने, प्रवेश और स्वयंसेवक प्रक्रियाओं को प्रबंधित करने और आपके प्रश्नों का उत्तर देने के लिए किया जाता है। हम आपका व्यक्तिगत डेटा किसी तीसरे पक्ष को नहीं बेचते हैं।'
        : 'We utilize collected information primarily to manage community operations, process admissions registries, coordinate volunteers, and answer inquiries. We do not sell or lease your data.'
    },
    {
      title: language === 'hi' ? '4. डेटा सुरक्षा' : '4. Data Security',
      content: language === 'hi'
        ? 'हम आपके व्यक्तिगत डेटा की सुरक्षा सुनिश्चित करने के लिए उचित तकनीकी और संगठनात्मक उपाय लागू करते हैं। हालांकि, इंटरनेट पर कोई भी ट्रांसमिशन 100% सुरक्षित नहीं है।'
        : 'We implement standard physical and digital protection controls to ensure data safety. However, no transmission method over the internet is completely bulletproof.'
    },
    {
      title: language === 'hi' ? '5. आपके अधिकार' : '5. User Rights',
      content: language === 'hi'
        ? 'आपके पास अपने व्यक्तिगत डेटा तक पहुँचने, उसे सही करने, या हटाने का अनुरोध करने का अधिकार है। आप किसी भी समय इन अधिकारों का प्रयोग करने के लिए हमसे संपर्क कर सकते हैं।'
        : 'You have the right to request access, correction, or deletion of your personal data stored with us. Contact us at any time to execute these choices.'
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="privacy-policy-content">
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
              <Shield size={16} className="animate-pulse" /> {t('privacy.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('privacy.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('privacy.desc')}
            </p>
          </div>

          {/* DETAILED STATEMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-8 space-y-8 bg-white/5 border border-white/10 p-8 sm:p-10 rounded-sm shadow-xl">
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed italic">
                {t('privacy.bodyText')}
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
                  <FileText size={16} />
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Privacy Contact</h4>
                </div>
                <p className="text-xs text-blue-200/70 leading-relaxed">
                  {language === 'hi'
                    ? 'यदि आपके पास हमारी गोपनीयता प्रथाओं या अपने व्यक्तिगत डेटा के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'
                    : 'If you have any questions or feedback regarding our privacy practices or personal data management, contact us directly at:'}
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

export default PrivacyPolicyPage;
