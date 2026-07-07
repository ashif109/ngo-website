import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';


import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const FaqPage: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Gurukulam education?",
      a: "Gurukulam education is a traditional Indian system of learning where students live with their teacher (Guru) and receive holistic education covering Vedic knowledge, philosophy, sciences, arts, and life skills."
    },
    {
      q: "What programs does Triyambakam Gurukulam offer?",
      a: "We offer programs in Vedic Studies & Sanskrit Hermeneutics, Vedic Mathematics & Computational Logic, PG Diploma in Cultural Heritage & Management, and Leadership Development & Vedic Ethics."
    },
    {
      q: "How to apply for admission in Gurukulam?",
      a: "You can apply online through our admission portal. Stay tuned for the admission notification for 2026-27 session."
    },
    {
      q: "Is Gurukulam education recognized?",
      a: "Yes, our programs are designed to integrate traditional Vedic epistemology with contemporary scientific models and are recognized by academic bodies."
    },
    {
      q: "What is the admission process?",
      a: "The admission process includes application submission, document verification, entrance test/interview, and final selection."
    },
    {
      q: "Are there scholarships available?",
      a: "Yes, we offer merit-based and need-based scholarships for deserving students."
    },
    {
      q: "What is the fee structure?",
      a: "Fee structure varies by program. Please contact us for detailed fee information."
    },
    {
      q: "What are the eligibility criteria?",
      a: "Eligibility criteria vary by program. Generally, 10+2 or equivalent for undergraduate programs, and graduation for postgraduate programs."
    },
    {
      q: "How long are the programs?",
      a: "Program duration ranges from 6 months to 2 years depending on the course."
    },
    {
      q: "Is online learning available?",
      a: "Yes, we offer both online and on-site learning options for our programs."
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-dark/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute top-[30%] left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-secondary-light hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </button>

          <div className="mb-16">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] bg-accent/10 border border-secondary/20 px-3.5 py-1.5 rounded-sm">
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-black uppercase text-white tracking-tight mt-4">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="max-w-4xl space-y-4 mb-24">
            {faqs.map((faq, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={idx} 
                className="bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <h3 className="text-sm sm:text-base font-bold text-white pr-8">{faq.q}</h3>
                  {openIndex === idx ? (
                    <ChevronUp className="text-secondary shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-white/50 shrink-0" size={20} />
                  )}
                </button>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="p-6 pt-0 text-white/70 text-sm leading-relaxed border-t border-white/5"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* [ADDED] Internal Links */}
          <div className="mb-16 flex gap-4 text-sm font-bold flex-wrap">
            <button onClick={() => window.location.hash = '#/forthcoming-programs'} className="text-secondary hover:text-white uppercase tracking-wider">Programs</button>
            <button onClick={() => window.location.hash = '#/about-us'} className="text-secondary hover:text-white uppercase tracking-wider">About</button>
            <button onClick={() => window.location.hash = '#/blog'} className="text-secondary hover:text-white uppercase tracking-wider">Blog</button>
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

export default FaqPage;
