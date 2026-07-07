import React, { useEffect, useState } from 'react';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const DynamicPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { language } = useLanguage();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/pages/${slug}`);
        const data = await res.json();
        if (data.success) {
          setPage(data.data);
          document.title = `${data.data.title} | Triyambakam Gurukulam Association`;
        } else {
          setError(data.error || 'Page not found');
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden">
        {/* Glowing Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dark/10 rounded-full blur-[120px] -mr-64 -mt-64 z-0 pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-48 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10 min-h-[50vh]">
          
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateToHome'));
            }}
            className="inline-flex items-center gap-2 text-secondary-light hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-secondary-light text-xs font-bold uppercase tracking-widest animate-pulse">
                Loading...
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-sm text-center">
              <AlertTriangle className="mx-auto text-red-400 mb-4" size={48} />
              <h2 className="text-2xl font-serif text-white mb-2">Error</h2>
              <p className="text-white/80">{error}</p>
            </div>
          ) : page ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
                  <FileText size={18} /> {page.metaTitle || 'Document'}
                </div>
                <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight mb-6 uppercase tracking-tight">
                  {page.title}
                </h1>
                {page.excerpt && (
                  <p className="text-secondary-light/90 text-lg leading-relaxed border-l-4 border-secondary pl-4 mb-8">
                    {page.excerpt}
                  </p>
                )}
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-sm shadow-xl">
                {/* 
                  Since page.content contains HTML string from the rich text editor,
                  we need to render it using dangerouslySetInnerHTML.
                  We use prose styling to make HTML content look good.
                */}
                <div 
                  className="prose prose-invert prose-orange max-w-none text-white/90 font-sans"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            </motion.div>
          ) : null}

        </div>
      </main>

      <ContactSection />
      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default DynamicPage;
