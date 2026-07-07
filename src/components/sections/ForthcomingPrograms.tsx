import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getPrograms } from '../../services/api';

const ForthcomingPrograms: React.FC = () => {
  const { t, language } = useLanguage();
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
    <section className="bg-primary-dark py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl -ml-32 -mb-32"></div>

      <div className="institutional-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-3">
              <Calendar size={16} /> {language === 'hi' ? 'ज्ञान कैलेंडर 2026' : language === 'gu' ? 'જ્ઞાન કેલેન્ડર 2026' : 'Knowledge Calendar 2026'}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight">
              {language === 'hi' ? <>आगामी <span className="text-secondary">कार्यक्रम</span></> : language === 'gu' ? <>આગામી <span className="text-secondary">કાર્યક્રમો</span></> : <>Forthcoming <span className="text-secondary">Programs</span></>}
            </h2>
          </div>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToEvents'))}
            className="px-6 py-3 border border-blue-400/30 text-white hover:bg-white hover:text-primary transition-all text-[11px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2 cursor-pointer"
          >
            {language === 'hi' ? 'सभी कार्यक्रम देखें' : language === 'gu' ? 'બધા કાર્યક્રમો જુઓ' : 'View All Events'} <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-secondary-light text-xs font-bold uppercase tracking-widest animate-pulse">
            Loading Forthcoming Programs...
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.slice(0, 4).map((prog: any, i) => {
              let translatedTitle = prog.titleEn;
              let translatedDesc = prog.descriptionEn;
              if (language === 'hi') {
                translatedTitle = prog.titleHi || prog.titleEn;
                translatedDesc = prog.descriptionHi || prog.descriptionEn;
              } else if (language === 'gu') {
                translatedTitle = prog.titleGu || prog.titleEn;
                translatedDesc = prog.descriptionGu || prog.descriptionEn;
              }
              return (
                <div 
                  key={i} 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-sm transition-all group border-l-4 border-secondary flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 text-secondary">
                      <BookOpen size={24} />
                    </div>
                    <h3 className="text-white text-[15px] font-bold leading-tight group-hover:text-secondary transition-colors mb-2">
                      {translatedTitle}
                    </h3>
                    {translatedDesc && (
                      <p className="text-white/80 text-[12px] font-medium leading-relaxed group-hover:text-white transition-colors whitespace-pre-line mb-6 line-clamp-4">
                        {translatedDesc}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                    {prog.link && (
                      <button 
                        onClick={() => window.open(prog.link, '_blank')}
                        className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center justify-between group/btn cursor-pointer"
                      >
                        <span>{language === 'hi' ? 'विवरण पढ़ें (PDF)' : language === 'gu' ? 'વિગતો વાંચો (PDF)' : 'Read Details (PDF)'}</span>
                        <ArrowRight size={12} className="text-orange-400 group-hover/btn:translate-x-1 transition-all" />
                      </button>
                    )}
                    {prog.websiteLink && (
                      <button 
                        onClick={() => window.open(prog.websiteLink, '_blank')}
                        className="w-full py-2 px-3 bg-accent hover:bg-orange-700 text-white transition-all text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center justify-between group/btn cursor-pointer shadow-md hover:shadow-orange-600/20"
                      >
                        <span>{language === 'hi' ? 'वेबसाइट पर जाएं' : language === 'gu' ? 'વેબસાઇટની મુલાકાત લો' : 'Visit Website'}</span>
                        <ArrowRight size={12} className="text-white group-hover/btn:translate-x-1 transition-all" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-12 rounded-sm text-center border-l-4 border-secondary shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.03] via-transparent to-transparent pointer-events-none"></div>
            
            <div className="bg-accent/15 border border-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-600/5">
              <Sparkles size={28} className="text-orange-400 animate-pulse" />
            </div>

            <h4 className="text-xl sm:text-2xl font-serif font-black text-white mb-4 uppercase tracking-tight">
              {language === 'hi' ? 'नए कार्यक्रम जल्द ही आ रहे हैं' : language === 'gu' ? 'નવા કાર્યક્રમો ટૂંક સમયમાં આવી રહ્યા છે' : 'New Programs & Events Coming Soon'}
            </h4>
            
            <p className="text-white/75 text-sm max-w-md leading-relaxed mb-8">
              {language === 'hi'
                ? 'हम वर्तमान में हमारी अकादमिक और सांस्कृतिक पहलों की नई श्रृंखला का नियोजन कर रहे हैं। आधिकारिक घोषणाओं के लिए हमारे साथ जुड़े रहें।'
                : language === 'gu'
                ? 'અમે હાલમાં અમારી શૈક્ષણિક અને સાંસ્કૃતિક પહેલોની નવી શ્રેણીનું આયોજન અને શેડ્યૂલ કરી રહ્યા છીએ. સત્તાવાર જાહેરાતો માટે અમારી સાથે જોડાયેલા રહો.'
                : 'We are currently curating and scheduling our new series of academic and cultural initiatives. Stay tuned for official announcements.'}
            </p>

            <button 
              onClick={() => window.location.hash = '#/admissions'}
              className="bg-accent hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Calendar size={14} /> {language === 'hi' ? 'रुचि दर्ज करें' : language === 'gu' ? 'રસ નોંધાવો' : 'Register Interest'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default ForthcomingPrograms;
