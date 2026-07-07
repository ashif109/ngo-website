import React from 'react';
import { ArrowLeft, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';


import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const BlogPage: React.FC = () => {
  const { language } = useLanguage();

  const posts = [
    { title: "What is Gurukulam Education? A Complete Guide to Ancient Indian Learning System", date: "Jan 15, 2026" },
    { title: "Top 10 Benefits of Vedic Education in Modern Times", date: "Jan 22, 2026" },
    { title: "How to Preserve and Promote Cultural Heritage in India", date: "Feb 05, 2026" },
    { title: "Vedic Mathematics and AI: Ancient Wisdom Meets Modern Technology", date: "Feb 18, 2026" },
    { title: "Sanskrit Studies: Why Learning Sanskrit is Important Today", date: "Mar 02, 2026" },
    { title: "Rural Education in India: Challenges and Solutions", date: "Mar 15, 2026" },
    { title: "Gurukulam vs Modern Education: Which is Better?", date: "Apr 04, 2026" },
    { title: "Leadership Development Through Vedic Ethics", date: "Apr 20, 2026" },
    { title: "How to Apply for Gurukulam Admission in 2026", date: "May 10, 2026" },
    { title: "The Role of Cultural Research Academy in Preserving Heritage", date: "May 25, 2026" }
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
              Our Blog
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-black uppercase text-white tracking-tight mt-4">
              Latest Articles & Insights
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {posts.map((post, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={idx} 
                className="bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden hover:bg-white/[0.05] transition-all group flex flex-col cursor-pointer hover:-translate-y-1 hover:border-secondary/50 shadow-xl"
              >
                <div className="p-6 flex-grow space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-light mb-4">
                    <Calendar size={12} />
                    {post.date}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-3">
                    Explore insights and research about traditional Vedic education, cultural preservation, and modern applications of ancient wisdom at Triyambakam Gurukulam.
                  </p>
                </div>
                <div className="px-6 py-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest group-hover:text-white transition-colors">
                  <BookOpen size={14} /> Read Article <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* [ADDED] Internal Links */}
          <div className="mb-16 flex gap-4 text-sm font-bold flex-wrap">
            <button onClick={() => window.location.hash = '#/forthcoming-programs'} className="text-secondary hover:text-white uppercase tracking-wider">Programs</button>
            <button onClick={() => window.location.hash = '#/about-us'} className="text-secondary hover:text-white uppercase tracking-wider">About</button>
            <button onClick={() => window.location.hash = '#/faq'} className="text-secondary hover:text-white uppercase tracking-wider">FAQ</button>
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

export default BlogPage;
