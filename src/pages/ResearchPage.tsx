import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, BookOpen, Compass, Award, 
  Book, Globe, Send, CheckCircle2, ChevronRight, FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import heritageImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg';

import { submitGeneralForm } from '../services/api';

const ResearchPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    proposal: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    document.title = `${t('research.title')} | Triyambakam Gurukulam Association`;
  }, [language, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitGeneralForm('Research Proposal', formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', topic: '', proposal: '' });
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting proposal. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting proposal. Please try again.');
      setStatus('idle');
    }
  };

  const focusAreas = [
    {
      title: t('research.focusArea1Title'),
      desc: t('research.focusArea1Desc'),
      icon: Globe,
      color: "border-secondary/30",
      accent: "text-orange-400"
    },
    {
      title: t('research.focusArea2Title'),
      desc: t('research.focusArea2Desc'),
      icon: BookOpen,
      color: "border-secondary/30",
      accent: "text-secondary"
    },
    {
      title: t('research.focusArea3Title'),
      desc: t('research.focusArea3Desc'),
      icon: Compass,
      color: "border-green-500/30",
      accent: "text-green-400"
    },
    {
      title: t('research.focusArea4Title'),
      desc: t('research.focusArea4Desc'),
      icon: Award,
      color: "border-indigo-500/30",
      accent: "text-indigo-400"
    },
    {
      title: t('research.focusArea5Title'),
      desc: t('research.focusArea5Desc'),
      icon: Book,
      color: "border-teal-500/30",
      accent: "text-teal-400"
    }
  ];

  const repoTypes = [
    { name: language === 'hi' ? "शोध पत्र (Research Papers)" : language === 'gu' ? "સંશોધન પત્રો (Research Papers)" : "Research Papers", count: "0" },
    { name: language === 'hi' ? "लेख (Articles)" : language === 'gu' ? "લેખો (Articles)" : "Articles", count: "0" },
    { name: language === 'hi' ? "नीति रिपोर्ट (Reports)" : language === 'gu' ? "નીતિ અહેવાલો (Reports)" : "Reports", count: "0" },
    { name: language === 'hi' ? "केस स्टडीज (Case Studies)" : language === 'gu' ? "કેસ સ્ટડીઝ (Case Studies)" : "Case Studies", count: "0" }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-primary-dark text-white py-16 relative overflow-hidden" id="research-main-content">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-dark/15 rounded-full blur-[140px] -mr-80 -mt-80 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-secondary-light hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
            aria-label="Navigate back to homepage"
            id="back-to-home-btn"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles size={16} className="animate-pulse" /> {t('research.badge')}
              </div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif font-black text-white leading-tight uppercase tracking-tight">
                {t('research.title')}
              </h1>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-secondary-light leading-relaxed border-l-4 border-secondary pl-4">
                {t('research.descTitle')}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {t('research.desc')}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 p-3 rounded-sm shadow-2xl relative overflow-hidden group">
                <div className="h-[280px] w-full rounded-sm overflow-hidden relative">
                  <img 
                    src={heritageImg} 
                    alt="Traditional Study and Research Documentation" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">{language === 'hi' ? 'शास्त्रीय अन्वेषण' : language === 'gu' ? 'શાસ્ત્રીય અન્વેષણ' : 'Classical Exploration'}</span>
                    <p className="text-white font-serif font-bold text-base uppercase">
                      {language === 'hi' ? 'भारतीय ज्ञान प्रणाली का पुनरुद्धार' : language === 'gu' ? 'ભારતીય જ્ઞાન પ્રણાલીનું પુનરુત્થાન' : 'Reviving Traditional Indian Pedagogy'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOCUS AREAS */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] bg-accent/10 border border-secondary/20 px-3.5 py-1.5 rounded-sm">
                {t('research.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-white tracking-tight">
                {t('research.focusTitle')}
              </h2>
              <p className="text-white/70 text-xs sm:text-sm">
                {t('research.focusDesc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {focusAreas.map((area, idx) => {
                const IconComp = area.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 p-6 sm:p-8 rounded-sm shadow-xl transition-all duration-300 relative group ${area.color}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 rounded-sm bg-primary-dark/80 border border-white/10 flex items-center justify-center text-xl shadow-md group-hover:bg-accent group-hover:border-transparent transition-all">
                        <IconComp size={20} className={`${area.accent} group-hover:text-white transition-colors`} />
                      </div>
                      <span className="text-[10px] font-black text-white/20 select-none group-hover:text-secondary/30 transition-colors">0{idx+1}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-serif font-bold text-white group-hover:text-orange-400 transition-colors">
                        {area.title}
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CURRENT STATUS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-dark to-primary-dark border border-white/10 p-8 sm:p-12 rounded-sm mb-24 shadow-2xl border-l-4 border-secondary relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-primary-dark border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-black uppercase text-orange-400 tracking-wider">
                {t('research.ctaSubtitle')}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white uppercase tracking-wider">
                {t('research.statusTitle')}
              </h3>
              <ul className="space-y-3 text-white/80 text-sm sm:text-base list-disc pl-5">
                <li>{t('research.statusText1')}</li>
                <li>{t('research.statusText2')}</li>
              </ul>
            </div>
          </motion.div>

          {/* KNOWLEDGE REPOSITORY & COLLABORATION FORM SPLIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Repository Placeholders */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <FileText size={18} className="text-orange-400" />
                <h3 className="text-lg font-serif font-black uppercase tracking-wider text-white">
                  {t('research.repoTitle')}
                </h3>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">
                {t('research.repoDesc')}
              </p>

              <div className="space-y-3">
                {repoTypes.map((repo, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-sm flex items-center justify-between hover:bg-white/[0.04] transition-all">
                    <span className="text-sm font-bold text-white/90">{repo.name}</span>
                    <span className="text-xs font-black text-orange-400 bg-accent/10 px-2 py-0.5 rounded-sm border border-secondary/20">{repo.count}</span>
                  </div>
                ))}
              </div>

              {/* Empty state disclaimer */}
              <div className="bg-secondary/5 border border-secondary/10 p-5 rounded-sm text-center">
                <p className="text-orange-400/90 text-xs font-medium leading-relaxed">
                  {t('research.repoPlaceholder')}
                </p>
              </div>
            </div>

            {/* Collaborate Registry Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-secondary"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none"></div>

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
                    <h3 className="text-2xl font-serif font-black text-white uppercase tracking-wider">{language === 'hi' ? 'प्रस्ताव जमा किया गया!' : language === 'gu' ? 'પ્રસ્તાવ સબમિટ થયો!' : 'Proposal Submitted!'}</h3>
                    <p className="text-secondary-light text-sm max-w-md mx-auto leading-relaxed">
                      {language === 'hi' ? 'आपके शोध प्रस्ताव के लिए धन्यवाद। हमारी शैक्षणिक समिति जल्द ही इसकी समीक्षा करेगी।' : language === 'gu' ? 'તમારા સંશોધન પ્રસ્તાવ બદલ આભાર. અમારી શૈક્ષણિક સમિતિ ટૂંક સમયમાં તેની સમીક્ષા કરશે.' : 'Thank you for your research proposal. Our academic committee will review it shortly.'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all border border-white/5 cursor-pointer shadow-md"
                  >
                    {language === 'hi' ? 'दूसरा प्रस्ताव दर्ज करें' : language === 'gu' ? 'બીજો પ્રસ્તાવ સબમિટ કરો' : 'Submit Another Proposal'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-black text-white uppercase tracking-wide border-b border-white/10 pb-3 mb-2">
                      {t('research.collaborateTitle')}
                    </h3>
                    <p className="text-xs text-secondary-light/70">{t('research.collaborateDesc')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name-input" className="block text-[10px] font-black text-secondary-light uppercase tracking-wider mb-2">{language === 'hi' ? 'पूरा नाम *' : language === 'gu' ? 'પૂરું નામ *' : 'Full Name *'}</label>
                      <input 
                        id="name-input"
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full p-3.5 bg-primary-dark/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder={language === 'hi' ? 'अन्वेषक का नाम' : language === 'gu' ? 'અન્વેષકનું નામ' : 'Researcher Name'} 
                      />
                    </div>
                    <div>
                      <label htmlFor="email-input" className="block text-[10px] font-black text-secondary-light uppercase tracking-wider mb-2">{language === 'hi' ? 'ईमेल *' : language === 'gu' ? 'ઇમેઇલ *' : 'Email *'}</label>
                      <input 
                        id="email-input"
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-3.5 bg-primary-dark/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder="researcher@mail.com" 
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="topic-input" className="block text-[10px] font-black text-secondary-light uppercase tracking-wider mb-2">{language === 'hi' ? 'अनुसंधान विषय *' : language === 'gu' ? 'સંશોધન વિષય *' : 'Research Topic *'}</label>
                    <input 
                      id="topic-input"
                      required 
                      type="text" 
                      value={formData.topic} 
                      onChange={e => setFormData({...formData, topic: e.target.value})} 
                      className="w-full p-3.5 bg-primary-dark/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                      placeholder={language === 'hi' ? 'उदा. वैदिक गणित और आधुनिक कंप्यूटर प्रणाली' : language === 'gu' ? 'દા.ત. વૈદિક ગણિત અને આધુનિક કોમ્પ્યુટર પ્રણાલી' : 'e.g. Vedic Mathematics and Modern Computing'} 
                    />
                  </div>

                  <div>
                    <label htmlFor="proposal-input" className="block text-[10px] font-black text-secondary-light uppercase tracking-wider mb-2">{language === 'hi' ? 'संक्षिप्त विवरण / प्रस्ताव *' : language === 'gu' ? 'સંક્ષિપ્ત વિગત / પ્રસ્તાવ *' : 'Brief Abstract / Proposal *'}</label>
                    <textarea 
                      id="proposal-input"
                      required
                      rows={4} 
                      value={formData.proposal} 
                      onChange={e => setFormData({...formData, proposal: e.target.value})} 
                      className="w-full p-3.5 bg-primary-dark/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white resize-none" 
                      placeholder={language === 'hi' ? 'अपने प्रस्तावित कार्य का एक संक्षिप्त विवरण प्रस्तुत करें...' : language === 'gu' ? 'તમારા પ્રસ્તાવિત કાર્યની ટૂંકી વિગત રજૂ કરો...' : 'Describe your proposed research objectives and significance...'}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      disabled={status === 'loading'}
                      type="submit" 
                      className="bg-accent hover:bg-orange-700 text-white py-3.5 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-75"
                    >
                      {status === 'loading' ? (
                        <span>{t('admissions.btnSubmitting')}</span>
                      ) : (
                        <>
                          <Send size={14} /> {t('research.btnProposal')}
                        </>
                      )}
                    </button>
                    <button 
                      type="button"
                      onClick={() => window.dispatchEvent(new Event('openVolunteerModal'))}
                      className="bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/5 shadow-md"
                    >
                      {t('research.btnContact')}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
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

export default ResearchPage;
