import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Link as LinkIcon, Search, ChevronRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const ImportantLinksPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const linksData = [
    {
      category: language === 'hi' ? 'अकादमिक और गुरुकुल' : 'Academics & Gurukulam',
      links: [
        { label: language === 'hi' ? 'प्रवेश रुचि पंजीकरण' : 'Admissions & Interest Registry', hash: '#/admissions' },
        { label: language === 'hi' ? 'वैदिक अध्ययन पाठ्यक्रम' : 'Vedic Studies Curriculum', hash: '#/vedic-studies' },
        { label: language === 'hi' ? 'गुरुकुल दर्शन और परंपरा' : 'Gurukulam Vision & Tradition', hash: '#/gurukulams' }
      ]
    },
    {
      category: language === 'hi' ? 'शोध और संसाधन' : 'Research & Resources',
      links: [
        { label: language === 'hi' ? 'शोध ध्यान क्षेत्र' : 'Research Focus Areas', hash: '#/research' },
        { label: language === 'hi' ? 'डिजिटल प्रकाशन और पुस्तकालय' : 'Publications & Digital Library', hash: '#/publications' },
        { label: language === 'hi' ? 'शैक्षिक संसाधन और अध्ययन सामग्री' : 'Educational Study Materials & Downloads', hash: '#/resources' },
        { label: language === 'hi' ? 'आधिकारिक नोटिस और घोषणाएं' : 'Official Notices & Announcements', hash: '#/announcements' }
      ]
    },
    {
      category: language === 'hi' ? 'जुड़ाव और समर्थन' : 'Get Involved & Support',
      links: [
        { label: language === 'hi' ? 'स्वयंसेवक कार्यक्रम' : 'Volunteer Programs', hash: '#/campus-life' },
        { label: language === 'hi' ? 'मीडिया रूम और प्रेस रिलीज' : 'Media Room & Press Releases', hash: '#/media-room' },
        { label: language === 'hi' ? 'पुरस्कार और मील के पत्थर' : 'Awards & Milestones', hash: '#/awards' },
        { label: language === 'hi' ? 'पूर्व छात्र पोर्टल (विकास के अधीन)' : 'Alumni Portal (Coming Soon)', hash: '#/alumni-login' }
      ]
    },
    {
      category: language === 'hi' ? 'सहायता और नीतियां' : 'Help & Policies',
      links: [
        { label: language === 'hi' ? 'संपर्क जानकारी' : 'Contact Information & Office Address', hash: '#/contact-us' },
        { label: language === 'hi' ? 'सहायता डेस्क' : 'Help Desk & Ticket Submission', hash: '#/help-desk' },
        { label: language === 'hi' ? 'शिकायत निवारण' : 'Grievance Redressal Portal', hash: '#/grievance-portal' },
        { label: language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy', hash: '#/privacy-policy' },
        { label: language === 'hi' ? 'कानूनी अस्वीकरण' : 'Legal Disclaimer', hash: '#/disclaimer' },
        { label: language === 'hi' ? 'मुख्यालय कैसे पहुंचें' : 'How to Reach Headquarters', hash: '#/how-to-reach' }
      ]
    }
  ];

  const filteredData = linksData.map(group => {
    const filtered = group.links.filter(link => 
      link.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, links: filtered };
  }).filter(group => group.links.length > 0);

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden" id="important-links-content">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dark/10 rounded-full blur-[120px] -mr-60 -mt-60 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-secondary-light hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <LinkIcon size={16} className="animate-pulse" /> {t('importantLinks.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('importantLinks.title')}
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              {t('importantLinks.desc')}
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="max-w-xl mb-12 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-light/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white font-semibold transition-all shadow-xl"
              placeholder={t('importantLinks.searchPlaceholder')}
            />
          </div>

          {/* LINK GROUPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
            {filteredData.length > 0 ? (
              filteredData.map((group, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 p-6 rounded-sm space-y-4 shadow-lg">
                  <h3 className="text-xs font-black uppercase text-orange-400 tracking-wider border-b border-white/10 pb-2">
                    📁 {group.category}
                  </h3>
                  <ul className="space-y-3">
                    {group.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <button
                          onClick={() => {
                            window.location.hash = link.hash;
                          }}
                          className="w-full text-left p-3 rounded-sm bg-white/[0.01] hover:bg-white/[0.04] transition-all flex items-center justify-between text-xs sm:text-sm text-white/85 hover:text-white cursor-pointer group/link border border-transparent hover:border-white/5"
                        >
                          <span className="font-bold flex items-center gap-2">
                            <ChevronRight size={14} className="text-orange-400/80 group-hover/link:translate-x-1 transition-transform" />
                            {link.label}
                          </span>
                          <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 text-secondary-light transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-16 bg-white/[0.01] border border-white/5 rounded-sm">
                <span className="text-xs font-bold text-secondary-light/50">
                  {language === 'hi' ? 'कोई लिंक नहीं मिला।' : 'No links match your search query.'}
                </span>
              </div>
            )}
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

export default ImportantLinksPage;
