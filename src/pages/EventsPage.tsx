import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, ArrowRight, BookOpen, FileText, Globe, MapPin, Laptop, Sparkles, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getPrograms } from '../services/api';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const EventsPage: React.FC = () => {
  const { language } = useLanguage();
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await getPrograms();
        if (Array.isArray(res)) {
          setPrograms(res);
        } else if (res && res.success) {
          setPrograms(res.data);
        }
      } catch (err) {
        console.error('Error fetching programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden">
        {/* Glowing Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dark/10 rounded-full blur-[120px] -mr-64 -mt-64 z-0 pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-48 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          
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

          {/* Page Header */}
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Calendar size={18} className="animate-pulse" /> {language === 'hi' ? 'ज्ञान कैलेंडर 2026' : language === 'gu' ? 'જ્ઞાન કેલેન્ડર 2026' : 'Knowledge Calendar 2026'}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight mb-6 uppercase tracking-tight">
              {language === 'hi' ? 'आगामी' : language === 'gu' ? 'આગામી' : 'Forthcoming'} <span className="text-secondary underline decoration-wavy decoration-orange-600/30">{language === 'hi' ? 'कार्यक्रम' : language === 'gu' ? 'કાર્યક્રમો' : 'Programs'}</span>
            </h1>
            <p className="text-white/80 text-base leading-relaxed">
              {language === 'hi'
                ? '2026 के लिए निर्धारित हमारे व्यापक शैक्षणिक कार्यक्रमों, गतिशील हैकाथॉन और प्राचीन विरासत कांग्रेस का अन्वेषण करें। वैदिक ज्ञान की जड़ों को समकालीन अनुप्रयोगों के साथ एकीकृत करने की हमारी खोज में हमसे जुड़ें।'
                : language === 'gu'
                ? '2026 માટે નિર્ધારિત અમારા વ્યાપક શૈક્ષણિક કાર્યક્રમો, ગતિશીલ હેકાથોન અને પ્રાચીન વારસાની પરિષદની શોધ કરો. વૈદિક જ્ઞાનના મૂળને સમકાલીન ઉપયોગો સાથે એકીકૃત કરવાની અમારી શોધમાં અમારી સાથે જોડાઓ.'
                : 'Explore our comprehensive academic events, dynamic hackathons, and ancient heritage congresses scheduled for 2026. Join us on our quest to integrate the roots of Vedic knowledge with contemporary applications.'}
            </p>
          </div>

          {/* DYNAMIC PROGRAMS LIST */}
          <div className="space-y-8 mb-20">
            {loading ? (
              <div className="py-12 text-center text-secondary-light text-xs font-bold uppercase tracking-widest animate-pulse">
                Loading Programs...
              </div>
            ) : programs.length > 0 ? (
              programs.map((prog: any, idx: number) => {
                let translatedTitle = prog.titleEn;
                let translatedDesc = prog.descriptionEn;
                if (language === 'hi') {
                  translatedTitle = prog.titleHi || prog.titleEn;
                  translatedDesc = prog.descriptionHi || prog.descriptionEn;
                } else if (language === 'gu') {
                  translatedTitle = prog.titleGu || prog.titleEn;
                  translatedDesc = prog.descriptionGu || prog.descriptionEn;
                }

                // Determine if event is past or upcoming based on date
                // Note: The CMS does not enforce start/end dates strictly in the current model,
                // but we render them all gracefully.
                return (
                  <motion.div 
                    key={prog._id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-sm relative overflow-hidden border-t-4 border-secondary shadow-2xl mb-12"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-light/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Event Main Description */}
                      <div className="lg:col-span-8 space-y-6">
                        <div className="inline-flex items-center gap-2 bg-primary-light/20 text-secondary-light border border-secondary/30 text-[10px] font-bold uppercase tracking-widest py-1.5 px-3.5 rounded-sm">
                          <Info size={12} /> {prog.status === 'published' ? (language === 'hi' ? 'सक्रिय कार्यक्रम' : 'Active Program') : (language === 'hi' ? 'मसौदा' : 'Draft')}
                        </div>
                        
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-serif font-black text-white leading-snug mb-2 uppercase">
                            {translatedTitle}
                          </h3>
                        </div>

                        {translatedDesc && (
                          <p className="text-white/90 text-sm leading-relaxed whitespace-pre-line">
                            {translatedDesc}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 pt-4">
                          {prog.link && (
                            <button 
                              onClick={() => window.open(prog.link, '_blank')}
                              className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all flex items-center justify-center gap-2.5 border border-white/10 hover:border-white/20 cursor-pointer shadow-lg"
                            >
                              <FileText size={16} className="text-orange-400" />
                              {language === 'hi' ? 'विवरण पढ़ें (PDF)' : language === 'gu' ? 'વિગતો વાંચો (PDF)' : 'Read Details (PDF)'}
                            </button>
                          )}
                          
                          {prog.websiteLink && (
                            <button 
                              onClick={() => window.open(prog.websiteLink, '_blank')}
                              className="flex-1 sm:flex-initial bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-orange-600/10 hover:shadow-orange-600/30 hover:-translate-y-0.5"
                            >
                              <Globe size={16} />
                              {language === 'hi' ? 'वेबसाइट पर जाएं' : language === 'gu' ? 'વેબસાઇટની મુલાકાત લો' : 'Visit Website'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* We could render event images or extra metadata here if the model supported it. For now, we'll keep it clean. */}
                      <div className="lg:col-span-4 flex items-center justify-center">
                         <div className="bg-primary-dark/50 border border-white/10 w-full h-full min-h-[200px] rounded-sm flex items-center justify-center flex-col gap-3">
                           <Calendar size={48} className="text-white/20" />
                           <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                             {language === 'hi' ? 'तिथि निर्धारित की जाएगी' : 'Schedule TBA'}
                           </span>
                         </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-sm text-center relative overflow-hidden flex flex-col items-center justify-center border-l-4 border-secondary shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.03] via-transparent to-transparent pointer-events-none"></div>

                <div className="bg-accent/15 border border-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-600/5">
                  <Sparkles size={28} className="text-orange-400 animate-pulse" />
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-black text-white mb-4 uppercase tracking-tight">
                  {language === 'hi' ? 'नए कार्यक्रम जल्द ही घोषित किए जाएंगे' : language === 'gu' ? 'નવા કાર્યક્રમો ટૂંક સમયમાં જાહેર કરવામાં આવશે' : 'New Programs & Events Coming Soon'}
                </h3>
                
                <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-8">
                  {language === 'hi'
                    ? 'हम वर्तमान में हमारी अकादमिक और सांस्कृतिक पहलों की नई श्रृंखला का नियोजन कर रहे हैं। आधिकारिक घोषणाओं के लिए हमारे साथ जुड़े रहें।'
                    : language === 'gu'
                    ? 'અમે હાલમાં અમારી શૈક્ષણિક અને સાંસ્કૃતિક પહેલોની નવી શ્રેણીનું આયોજન અને શેડ્યૂલ કરી રહ્યા છીએ. સત્તાવાર જાહેરાતો માટે અમારી સાથે જોડાયેલા રહો.'
                    : 'We are currently curating and scheduling our new series of academic and cultural initiatives. Stay tuned to receive updates as soon as registrations open.'}
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button 
                    onClick={() => window.location.hash = '#/admissions'}
                    className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-orange-600/10 hover:shadow-orange-600/30 hover:-translate-y-0.5"
                  >
                    <Sparkles size={14} />
                    {language === 'hi' ? 'प्रवेश एवं रुचि दर्ज करें' : language === 'gu' ? 'રસ અને પ્રવેશ નોંધાવો' : 'Register Interest & Admissions'}
                  </button>
                </div>
              </motion.div>
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

export default EventsPage;
