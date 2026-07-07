import React from 'react';
import { Mail, Download, ChevronRight, BookOpen, FileText } from 'lucide-react';
import { PUBLICATIONS, POLICY_BRIEFS, NEWSLETTERS, KEY_RESOURCES } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

const Sidebar: React.FC = () => {
  const { language } = useLanguage();
  const [announcements, setAnnouncements] = React.useState<any[]>([]);
  const [publications, setPublications] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [annRes, pubRes] = await Promise.all([
          fetch('/api/announcements'),
          fetch('/api/publications')
        ]);
        const annData = await annRes.json();
        const pubData = await pubRes.json();
        
        if (annData.success) setAnnouncements(annData.data);
        if (pubData.success) setPublications(pubData.data);
      } catch (err) {
        console.error('Failed to fetch sidebar data', err);
      }
    };
    fetchData();
  }, []);

  const pubs = publications.filter(p => p.category === 'publication');
  const policyBriefs = publications.filter(p => p.category === 'policy_brief');
  const newsletters = publications.filter(p => p.category === 'newsletter');
  const resources = publications.filter(p => p.category === 'resource');

  return (
    <aside className="lg:col-span-1 space-y-10 bg-background p-5 border border-border-main shadow-sm rounded-sm">
      {/* Gurukulam Greetings */}
      <div>
        <h3 className="section-title text-primary text-[13px] font-black bg-surface p-2 rounded-sm border-l-4 border-secondary">
          {language === 'hi' ? 'गुरुकुल संदेश' : language === 'gu' ? 'ગુરુકુલમ સંદેશ' : 'GURUKULAM GREETINGS'}
        </h3>
        <div className="mt-6">
          <h4 className="text-[11px] font-bold text-green-800 border-b border-border-main pb-1 mb-4 uppercase tracking-tighter">
            {language === 'hi' ? 'ताज़ा समाचार' : language === 'gu' ? 'તાજા સમાચાર' : 'Latest News'}
          </h4>
          <div className="space-y-4">
            {announcements.length === 0 ? (
              <div className="p-3.5 bg-green-50/50 border border-green-100 rounded-sm text-center">
                <p className="text-[10px] text-green-800 font-medium leading-relaxed">
                  {language === 'hi'
                    ? 'आधिकारिक परिसर घोषणाएं, घटना सूचनाएं और शैक्षणिक अपडेट जल्द ही यहां पोस्ट किए जाएंगे।'
                    : language === 'gu'
                    ? 'સત્તાવાર કેમ્પસ જાહેરાતો, કાર્યક્રમ સૂચનાઓ અને શૈક્ષણિક અપડેટ્સ ટૂંક સમયમાં અહીં પોસ્ટ કરવામાં આવશે.'
                    : 'Official campus announcements, event notifications, and academic updates will be posted here soon.'}
                </p>
                <span className="text-[8px] bg-green-600 text-white px-1.5 py-0.5 rounded-sm italic font-bold mt-2.5 inline-block animate-pulse">
                  {language === 'hi' ? 'जुड़े रहें' : language === 'gu' ? 'જોડાયેલા રહો' : 'Stay Tuned'}
                </span>
              </div>
            ) : (
              announcements.map((ann, i) => (
                <div key={i} className={`p-3.5 ${ann.isPinned ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50/50 border-green-100'} border rounded-sm`}>
                  <p className="text-[11px] text-green-900 font-medium leading-relaxed">
                    {language === 'hi' ? ann.contentHi || ann.contentEn : language === 'gu' ? ann.contentGu || ann.contentEn : ann.contentEn}
                  </p>
                  {ann.linkUrl && (
                    <a href={ann.linkUrl} target="_blank" rel="noreferrer" className="text-[10px] text-blue-700 font-bold mt-2 inline-block hover:underline">
                      {language === 'hi' ? ann.linkTextHi || ann.linkTextEn : language === 'gu' ? ann.linkTextGu || ann.linkTextEn : ann.linkTextEn || 'Read More'}
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Publications */}
      <div>
        <h4 className="text-[11px] font-bold text-red-900 border-b border-border-main pb-1 mb-4 uppercase tracking-tighter">
          {language === 'hi' ? 'नवीनतम प्रकाशन' : language === 'gu' ? 'નવીનતમ પ્રકાશનો' : 'Latest Publications'}
        </h4>
        {pubs.length === 0 ? (
          <div className="p-4 bg-red-50/40 border border-red-100 rounded-sm text-center flex flex-col items-center">
            <BookOpen size={18} className="text-red-700/60 mb-2" />
            <p className="text-[10px] text-red-900 font-black uppercase tracking-wider">
              {language === 'hi' ? 'प्रकाशन जल्द ही आ रहे हैं' : language === 'gu' ? 'પ્રકાશનો ટૂંક સમયમાં આવી રહ્યા છે' : 'Publications Coming Soon'}
            </p>
            <p className="text-[9px] text-text-muted mt-1 leading-relaxed">
              {language === 'hi'
                ? 'मोनोग्राफ, शोध पत्र और वैदिक पत्रिकाओं को प्रकाशन के लिए अंतिम रूप दिया जा रहा है।'
                : language === 'gu'
                ? 'મોનોગ્રાફ્સ, સંશોધન પત્રો અને વૈદિક જર્નલ્સ પ્રકાશન માટે આખરી ઓપ આપવામાં આવી રહ્યા છે.'
                : 'Monographs, research papers, and Vedic journals are being finalized for publication.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {pubs.map((pub: any, i) => (
              <a key={i} href={pub.fileUrl || '#'} target={pub.fileUrl ? "_blank" : "_self"} className="text-center group cursor-pointer block">
                <div className="relative overflow-hidden border border-border-main rounded-sm shadow-sm group-hover:border-blue-600 transition-all">
                  {pub.imgUrl ? (
                    <img src={pub.imgUrl} alt={pub.titleEn} className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-slate-100 flex items-center justify-center">
                      <BookOpen size={24} className="text-slate-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">View</span>
                  </div>
                </div>
                <p className="text-[9px] font-bold mt-2 text-text-muted leading-tight line-clamp-2">
                  {language === 'hi' ? pub.titleHi || pub.titleEn : language === 'gu' ? pub.titleGu || pub.titleEn : pub.titleEn}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Policy Briefs */}
      <div>
        <h4 className="text-[11px] font-bold text-primary border-b border-border-main pb-1 mb-4 uppercase tracking-tighter">
          {language === 'hi' ? 'नीति विवरण' : language === 'gu' ? 'નીતિ પત્રો' : 'Policy Briefs'}
        </h4>
        {policyBriefs.length === 0 ? (
          <div className="p-4 bg-surface/40 border border-blue-100 rounded-sm text-center flex flex-col items-center">
            <FileText size={18} className="text-blue-700/60 mb-2" />
            <p className="text-[10px] text-primary font-black uppercase tracking-wider">
              {language === 'hi' ? 'नीति विवरण जल्द ही आ रहे हैं' : language === 'gu' ? 'નીતિ પત્રો ટૂંક સમયમાં આવી રહ્યા છે' : 'Policy Briefs Coming Soon'}
            </p>
            <p className="text-[9px] text-text-muted mt-1 leading-relaxed">
              {language === 'hi'
                ? 'विशेषज्ञ टिप्पणियां, शिक्षा मसौदे और अनुसंधान विवरण तैयार किए जा रहे हैं।'
                : language === 'gu'
                ? 'નિષ્ણાત ભાષ્યો, શિક્ષણના મુસદ્દાઓ અને સંશોધન પત્રો તૈયાર કરવામાં આવી રહ્યા છે.'
                : 'Expert commentaries, education drafts, and research briefs are being curated.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {policyBriefs.map((pub: any, i) => (
              <a key={i} href={pub.fileUrl || '#'} target={pub.fileUrl ? "_blank" : "_self"} className="text-center group cursor-pointer block">
                <div className="relative overflow-hidden border border-border-main rounded-sm shadow-sm group-hover:border-blue-600 transition-all">
                  {pub.imgUrl ? (
                    <img src={pub.imgUrl} alt={pub.titleEn} className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-slate-100 flex items-center justify-center">
                      <FileText size={24} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <p className="text-[9px] font-bold mt-2 text-text-muted leading-tight line-clamp-2">
                  {language === 'hi' ? pub.titleHi || pub.titleEn : language === 'gu' ? pub.titleGu || pub.titleEn : pub.titleEn}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-[11px] font-bold text-orange-800 border-b border-border-main pb-1 mb-4 uppercase tracking-tighter">
          {language === 'hi' ? 'न्यूज़लेटर्स' : language === 'gu' ? 'ન્યૂઝલેટર્સ' : 'Newsletters'}
        </h4>
        {newsletters.length === 0 ? (
          <div className="p-4 bg-orange-50/40 border border-orange-100 rounded-sm text-center flex flex-col items-center">
            <Mail size={18} className="text-orange-700/60 mb-2" />
            <p className="text-[10px] text-orange-900 font-black uppercase tracking-wider">
              {language === 'hi' ? 'न्यूज़लेटर्स जल्द ही आ रहे हैं' : language === 'gu' ? 'ન્યૂઝલેટર્સ ટૂંક સમયમાં આવી રહ્યા છે' : 'Newsletters Coming Soon'}
            </p>
            <p className="text-[9px] text-text-muted mt-1 leading-relaxed">
              {language === 'hi'
                ? 'हमारे गुरुकुलों से मासिक हाइलाइट्स के साथ अपडेट रहने के लिए सदस्यता लें।'
                : language === 'gu'
                ? 'અમારા ગુરુકુલોની માસિક હાઇલાઇટ્સથી અપડેટ રહેવા માટે સબ્સ્ક્રાઇબ કરો.'
                : 'Subscribe to stay updated with monthly highlights from our Gurukulams.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {newsletters.map((item: any, i) => (
              <a key={i} href={item.fileUrl || '#'} target={item.fileUrl ? "_blank" : "_self"} className="flex gap-3 items-center group cursor-pointer p-1 hover:bg-orange-50 rounded-sm transition-colors block">
                <div className="bg-orange-100 p-2 rounded-full text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-blue-800 group-hover:underline">
                    {language === 'hi' ? item.titleHi || item.titleEn : language === 'gu' ? item.titleGu || item.titleEn : item.titleEn}
                  </p>
                  <p className="text-[9px] text-gray-400 font-semibold">
                    {language === 'hi' ? item.dateHi || item.dateEn : language === 'gu' ? item.dateGu || item.dateEn : item.dateEn}
                  </p>
                </div>
                <ChevronRight size={12} className="text-gray-300 group-hover:text-accent" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Key Resources */}
      <div>
        <h4 className="text-[11px] font-bold text-slate-800 border-b border-border-main pb-1 mb-4 uppercase tracking-tighter">
          {language === 'hi' ? 'प्रमुख संसाधन' : language === 'gu' ? 'મુખ્ય સંસાધનો' : 'Key Resources'}
        </h4>
        {resources.length === 0 ? (
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-sm text-center flex flex-col items-center">
            <Download size={18} className="text-slate-600/60 mb-2" />
            <p className="text-[10px] text-slate-800 font-black uppercase tracking-wider">
              {language === 'hi' ? 'संसाधन जल्द ही आ रहे हैं' : language === 'gu' ? 'સંસાધનો ટૂંક સમયમાં આવી રહ્યા છે' : 'Resources Coming Soon'}
            </p>
            <p className="text-[9px] text-text-muted mt-1 leading-relaxed">
              {language === 'hi'
                ? 'अकादमिक कैलेंडर, पाठ्यक्रम दिशानिर्देश और रिपोर्ट जल्द ही डाउनलोड करने योग्य होंगे।'
                : language === 'gu'
                ? 'શૈક્ષણિક કેલેન્ડર, અભ્યાસક્રમની માર્ગદર્શિકા અને અહેવાલો ટૂંક સમયમાં ડાઉનલોડ કરવા યોગ્ય બનશે.'
                : 'Academic calendars, curriculum guidelines, and reports will be downloadable shortly.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {resources.map((pub: any, i) => (
              <a key={i} href={pub.fileUrl || '#'} target={pub.fileUrl ? "_blank" : "_self"} className="text-center group cursor-pointer block">
                <div className="w-full aspect-square bg-background border border-border-main rounded-sm group-hover:bg-primary-light group-hover:border-blue-600 flex items-center justify-center transition-all shadow-sm">
                  <Download size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-[9px] font-bold mt-2 text-text-muted leading-tight">
                  {language === 'hi' ? pub.titleHi || pub.titleEn : language === 'gu' ? pub.titleGu || pub.titleEn : pub.titleEn}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
