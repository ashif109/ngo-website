import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, BookOpen, Compass, Award, 
  Book, Search, Info, HelpCircle, Download, FileText, CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import { submitGeneralForm } from '../services/api';

const ResourcesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<'ALL' | 'Education' | 'Culture' | 'Heritage' | 'Research'>('ALL');
  const [requestData, setRequestData] = useState({ name: '', email: '', details: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    document.title = `${t('resources.title')} | Triyambakam Gurukulam Association`;
  }, [language, t]);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitGeneralForm('Resource Request', requestData);
      if (res.success) {
        setStatus('success');
        setRequestData({ name: '', email: '', details: '' });
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting request. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting request. Please try again.');
      setStatus('idle');
    }
  };

  const resourceCategories = [
    {
      title: t('resources.cat1Title'),
      desc: t('resources.cat1Desc'),
      icon: BookOpen,
      tag: 'Education',
      color: "border-orange-500/30",
      accent: "text-orange-400"
    },
    {
      title: t('resources.cat2Title'),
      desc: t('resources.cat2Desc'),
      icon: Compass,
      tag: 'Culture',
      color: "border-blue-500/30",
      accent: "text-blue-400"
    },
    {
      title: t('resources.cat3Title'),
      desc: t('resources.cat3Desc'),
      icon: Award,
      tag: 'Heritage',
      color: "border-green-500/30",
      accent: "text-green-400"
    },
    {
      title: t('resources.cat4Title'),
      desc: t('resources.cat4Desc'),
      icon: Book,
      tag: 'Research',
      color: "border-indigo-500/30",
      accent: "text-indigo-400"
    },
    {
      title: t('resources.cat5Title'),
      desc: t('resources.cat5Desc'),
      icon: FileText,
      tag: 'Education',
      color: "border-teal-500/30",
      accent: "text-teal-400"
    },
    {
      title: t('resources.cat6Title'),
      desc: t('resources.cat6Desc'),
      icon: HelpCircle,
      tag: 'Research',
      color: "border-red-500/30",
      accent: "text-red-400"
    }
  ];

  // Client-side search and filtering logic
  const filteredCategories = resourceCategories.filter(cat => {
    const matchesSearch = cat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || cat.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="resources-main-content">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-800/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
            aria-label="Navigate back to homepage"
            id="back-to-home-btn"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <Sparkles size={16} className="animate-pulse" /> {t('resources.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('resources.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('resources.descTitle')}
            </p>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm mb-12 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              
              {/* Search Bar */}
              <div className="relative w-full md:max-w-md">
                <label htmlFor="search-input" className="sr-only">Search Resources</label>
                <input 
                  id="search-input"
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={`${t('resources.searchPlaceholder')}...`}
                  className="w-full pl-10 pr-4 py-3 bg-blue-950/80 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white"
                />
                <Search size={18} className="absolute left-3.5 top-3.5 text-blue-300/60" />
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                {(['ALL', 'Education', 'Culture', 'Heritage', 'Research'] as const).map((tag) => {
                  const tagText = tag === 'ALL' 
                    ? (language === 'hi' ? 'सभी (All)' : language === 'gu' ? 'બધા (All)' : 'All') 
                    : t(`resources.filter${tag}`);
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                        selectedTag === tag 
                          ? 'bg-orange-600 border-transparent text-white' 
                          : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {tagText}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

          {/* CATEGORIES GRID */}
          <div className="mb-24">
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((cat, idx) => {
                  const IconComp = cat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -6 }}
                      className={`bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-6 sm:p-8 rounded-sm shadow-xl transition-all duration-300 relative group ${cat.color}`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-sm bg-blue-950/80 border border-white/10 flex items-center justify-center text-xl shadow-md group-hover:bg-orange-600 group-hover:border-transparent transition-all">
                          <IconComp size={20} className={`${cat.accent} group-hover:text-white transition-colors`} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-orange-400 bg-orange-600/10 border border-orange-500/20 px-2 py-0.5 rounded-sm">{cat.tag}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-base font-serif font-bold text-white group-hover:text-orange-400 transition-colors">
                          {cat.title}
                        </h4>
                        <p className="text-blue-100/70 text-xs leading-relaxed">
                          {cat.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white/[0.01] border border-white/10 p-12 rounded-sm text-center">
                <span className="text-sm font-bold text-white/30 tracking-wider">
                  {language === 'hi' ? 'कोई परिणाम नहीं मिला' : language === 'gu' ? 'કોઈ પરિણામ મળ્યું નથી' : 'No matching resources found'}
                </span>
              </div>
            )}
          </div>

          {/* CURATED ANNOUNCEMENT BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-sm mb-24 flex flex-col md:flex-row gap-6 items-center justify-between shadow-lg border-l-4 border-orange-500"
          >
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-orange-600/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 mx-auto md:mx-0">
                <Info size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-white">
                  {language === 'hi' ? 'संसाधन क्यूरेशन' : language === 'gu' ? 'સંસાધન ક્યુરેશન' : 'Resource Curation'}
                </h4>
                <p className="text-blue-100/80 text-xs mt-1 leading-relaxed">
                  {t('resources.statusText')}
                </p>
              </div>
            </div>

            <button 
              onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
              className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
              id="resource-download-btn"
            >
              <Download size={14} /> {t('resources.btnDownload')}
            </button>
          </motion.div>

          {/* REQUEST FORM CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-orange-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-black text-white uppercase tracking-wider">{language === 'hi' ? 'अनुरोध दर्ज किया गया!' : language === 'gu' ? 'વિનંતી સબમિટ થઈ!' : 'Request Registered!'}</h3>
                  <p className="text-blue-200 text-sm max-w-md mx-auto leading-relaxed">
                    {language === 'hi' ? 'संसाधन अनुरोध के लिए धन्यवाद। हमारा अकादमिक विंग आपके अनुरोध की जांच करेगा।' : language === 'gu' ? 'સંસાધન વિનંતી બદલ આભાર. આપણી શૈક્ષણિક વિંગ તમારી વિનંતીની તપાસ કરશે.' : 'Thank you for your resource request. Our academic wing will process your request.'}
                  </p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all border border-white/5 cursor-pointer shadow-md"
                >
                  {language === 'hi' ? 'नया अनुरोध दर्ज करें' : language === 'gu' ? 'નવી વિનંતી સબમિટ કરો' : 'Submit Another Request'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-black text-white uppercase tracking-wide border-b border-white/10 pb-3 mb-2">
                    {t('resources.ctaTitle')}
                  </h3>
                  <p className="text-xs text-blue-200/70">{t('resources.ctaDesc')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name-input" className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{language === 'hi' ? 'पूरा नाम *' : language === 'gu' ? 'પૂરું નામ *' : 'Full Name *'}</label>
                    <input 
                      id="name-input"
                      required 
                      type="text" 
                      value={requestData.name} 
                      onChange={e => setRequestData({...requestData, name: e.target.value})} 
                      className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                      placeholder={language === 'hi' ? 'आपका नाम' : language === 'gu' ? 'તમારું નામ' : 'Your Name'} 
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{language === 'hi' ? 'ईमेल *' : language === 'gu' ? 'ઇમેઇલ *' : 'Email *'}</label>
                    <input 
                      id="email-input"
                      required 
                      type="email" 
                      value={requestData.email} 
                      onChange={e => setRequestData({...requestData, email: e.target.value})} 
                      className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                      placeholder="example@mail.com" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="details-input" className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{language === 'hi' ? 'सामग्री का विवरण *' : language === 'gu' ? 'સામગ્રીની વિગતો *' : 'Material Details / Topic Description *'}</label>
                  <textarea 
                    id="details-input"
                    required
                    rows={4} 
                    value={requestData.details} 
                    onChange={e => setRequestData({...requestData, details: e.target.value})} 
                    className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white resize-none" 
                    placeholder={language === 'hi' ? 'कृपया उल्लेख करें कि आपको किस पुस्तक या विषय सामग्री की आवश्यकता है...' : language === 'gu' ? 'કૃપા કરીને ઉલ્લેખ કરો કે તમને કઈ પુસ્તક અથવા વિષય સામગ્રીની જરૂર છે...' : 'Please specify what book, study guide, or topic reference you require...'}
                  ></textarea>
                </div>

                <button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-75"
                >
                  {status === 'loading' ? t('admissions.btnSubmitting') : t('resources.btnDownload')}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </main>

      <ContactSection />
      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default ResourcesPage;
