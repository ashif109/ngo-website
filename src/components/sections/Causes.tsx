import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getSiteContent } from '../../services/api';
// Static fallback images
import policyImg from '../../assets/WhatsApp Image 2026-05-10 at 6.46.14 PM (1).jpeg';
import ruralImg from '../../assets/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg';
import heritageImg from '../../assets/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg';

const FALLBACK_CAUSES = [
  {
    titleEn: 'Vedic Education', titleHi: 'वैदिक शिक्षा', titleGu: 'વૈદિક શિક્ષણ',
    descEn: 'Reviving ancient wisdom for modern minds through structured Gurukulam programs.',
    descHi: 'संरचित गुरुकुल कार्यक्रमों के माध्यम से आधुनिक दिमागों के लिए प्राचीन ज्ञान को पुनर्जीवित करना।',
    descGu: 'આયોજિત ગુરુકુળ કાર્યક્રમો દ્વારા આધુનિક મન માટે પ્રાચીન જ્ઞાનને પુનર્જીવિત કરવું.',
    imageUrl: policyImg, colorClass: 'bg-accent'
  },
  {
    titleEn: 'Cultural Heritage', titleHi: 'सांस्कृतिक विरासत', titleGu: 'સાંસ્કૃતિક વારસો',
    descEn: 'Preserving and documenting the intangible heritage of Bharat for future generations.',
    descHi: 'भावी पीढ़ियों के लिए भारत की अमूर्त विरासत का संरक्षण और दस्तावेजीकरण।',
    descGu: 'ભાવી પેઢીઓ માટે ભારતના અમૂર્ત વારસાનું સંરક્ષણ અને દસ્તાવેજીકરણ.',
    imageUrl: heritageImg, colorClass: 'bg-primary'
  },
  {
    titleEn: 'Rural Welfare', titleHi: 'ग्रामीण कल्याण', titleGu: 'ગ્રામીણ કલ્યાણ',
    descEn: 'Bringing sustainable development and education to the heart of rural India.',
    descHi: 'ग्रामीण भारत के दिल में सतत विकास और शिक्षा लाना।',
    descGu: 'ગ્રામીણ ભારતના હૃદયમાં ટકાઉ વિકાસ અને શિક્ષણ લાવવું.',
    imageUrl: ruralImg, colorClass: 'bg-green-700'
  }
];

const Causes: React.FC = () => {
  const { language } = useLanguage();
  const [causes, setCauses] = useState(FALLBACK_CAUSES);

  useEffect(() => {
    getSiteContent('causes').then(res => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        // Merge CMS data with fallback images if no CMS image provided
        const merged = res.data.map((c: any, i: number) => ({
          ...FALLBACK_CAUSES[i] || {},
          ...c,
          imageUrl: c.imageUrl || FALLBACK_CAUSES[i]?.imageUrl || ''
        }));
        setCauses(merged);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="institutional-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest mb-4">
              <Heart size={16} fill="currentColor" />
              {language === 'hi' ? 'हमारे मुख्य मिशन' : language === 'gu' ? 'અમારા મુખ્ય મિશનો' : 'Our Core Missions'}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-primary leading-tight">
              {language === 'hi' ? 'मुद्दे जिन्हें आपके सहयोग की आवश्यकता है' : language === 'gu' ? 'કાર્યો કે જેમને તમારા સમર્થનની જરૂર છે' : 'Causes That Need Your Support'}
            </h2>
          </div>
          <button className="px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary-dark transition-all rounded-sm shadow-xl flex items-center gap-3 cursor-pointer">
            {language === 'hi' ? 'सभी मिशन देखें' : language === 'gu' ? 'બધા મિશનો જુઓ' : 'View All Causes'} <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {causes.map((cause: any, i: number) => {
            const title = language === 'hi' ? cause.titleHi : language === 'gu' ? cause.titleGu : cause.titleEn;
            const desc = language === 'hi' ? cause.descHi : language === 'gu' ? cause.descGu : cause.descEn;
            const img = cause.imageUrl;

            return (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-[400px] overflow-hidden rounded-sm shadow-2xl mb-6">
                  {img ? (
                    <img
                      src={img}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/30 flex items-center justify-center">
                      <span className="text-secondary-light/50 text-4xl font-serif">{title?.[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className={`absolute top-6 left-6 ${cause.colorClass || 'bg-accent'} text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm shadow-lg`}>
                    {language === 'hi' ? 'प्राथमिकता मिशन' : language === 'gu' ? 'પ્રાથમિકતા મિશન' : 'Priority Mission'}
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-serif font-black text-white mb-2 leading-tight">{title}</h3>
                    <p className="text-[12px] text-gray-300 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-border-main pb-4">
                  <div className="text-[11px] font-black text-primary uppercase tracking-widest">
                    {language === 'hi' ? 'हमें बढ़ने में मदद करें' : language === 'gu' ? 'અમને આગળ વધવામાં મદદ કરો' : 'Help Us Grow'}
                  </div>
                  <div className="flex items-center gap-2 text-accent font-bold text-xs group-hover:gap-4 transition-all">
                    {language === 'hi' ? 'अभी योगदान करें' : language === 'gu' ? 'હમણાં જ યોગદાન આપો' : 'CONTRIBUTE NOW'} <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Causes;
