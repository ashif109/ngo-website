import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { CORE_CAUSES } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

const Causes: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="institutional-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-4">
              <Heart size={16} fill="currentColor" /> {language === 'hi' ? 'हमारे मुख्य मिशन' : language === 'gu' ? 'અમારા મુખ્ય મિશનો' : 'Our Core Missions'}
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-blue-900 leading-tight">
              {language === 'hi' ? 'मुद्दे जिन्हें आपके सहयोग की आवश्यकता है' : language === 'gu' ? 'કાર્યો કે જેમને તમારા સમર્થનની જરૂર છે' : 'Causes That Need Your Support'}
            </h2>
          </div>
          <button className="px-8 py-4 bg-blue-900 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-800 transition-all rounded-sm shadow-xl flex items-center gap-3 cursor-pointer">
            {language === 'hi' ? 'सभी मिशन देखें' : language === 'gu' ? 'બધા મિશનો જુઓ' : 'View All Causes'} <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CORE_CAUSES.map((cause, i) => {
            let translatedTitle = cause.title;
            let translatedDesc = cause.desc;
            if (language === 'hi') {
              if (cause.title === "Vedic Education") {
                translatedTitle = "वैदिक शिक्षा";
                translatedDesc = "संरचित गुरुकुल कार्यक्रमों के माध्यम से आधुनिक दिमागों के लिए प्राचीन ज्ञान को पुनर्जीवित करना।";
              } else if (cause.title === "Cultural Heritage") {
                translatedTitle = "सांस्कृतिक विरासत";
                translatedDesc = "भावी पीढ़ियों के लिए भारत की अमूर्त विरासत का संरक्षण और दस्तावेजीकरण।";
              } else if (cause.title === "Rural Welfare") {
                translatedTitle = "ग्रामीण कल्याण";
                translatedDesc = "ग्रामीण भारत के दिल में सतत विकास और शिक्षा लाना।";
              }
            } else if (language === 'gu') {
              if (cause.title === "Vedic Education") {
                translatedTitle = "વૈદિક શિક્ષણ";
                translatedDesc = "આયોજિત ગુરુકુલમ કાર્યક્રમો દ્વારા આધુનિક મન માટે પ્રાચીન જ્ઞાનને પુનર્જીવિત કરવું.";
              } else if (cause.title === "Cultural Heritage") {
                translatedTitle = "સાંસ્કૃતિક વારસો";
                translatedDesc = "ભાવી પેઢીઓ માટે ભારતના અમૂર્ત વારસાનું સંરક્ષણ અને દસ્તાવેજીકરણ.";
              } else if (cause.title === "Rural Welfare") {
                translatedTitle = "ગ્રામીણ કલ્યાણ";
                translatedDesc = "ગ્રામીણ ભારતના હૃદયમાં ટકાઉ વિકાસ અને શિક્ષણ લાવવું.";
              }
            }
            return (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-[400px] overflow-hidden rounded-sm shadow-2xl mb-6">
                  <img 
                    src={cause.img} 
                    alt={translatedTitle} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className={`absolute top-6 left-6 ${cause.color} text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm shadow-lg`}>
                    {language === 'hi' ? 'प्राथमिकता मिशन' : language === 'gu' ? 'પ્રાથમિકતા મિશન' : 'Priority Mission'}
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-2xl font-serif font-black text-white mb-2 leading-tight">
                      {translatedTitle}
                    </h3>
                    <p className="text-[12px] text-gray-300 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {translatedDesc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="text-[11px] font-black text-blue-900 uppercase tracking-widest">
                    {language === 'hi' ? 'हमें बढ़ने में मदद करें' : language === 'gu' ? 'અમને આગળ વધવામાં મદદ કરો' : 'Help Us Grow'}
                  </div>
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-xs group-hover:gap-4 transition-all">
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
