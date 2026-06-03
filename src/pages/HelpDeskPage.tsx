import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, LifeBuoy, FileText, ChevronDown, ChevronUp,
  Mail, Send, CheckCircle2, Loader2, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import { submitGeneralForm } from '../services/api';

const HelpDeskPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Query',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const categories = [
    { value: 'General Query', label: language === 'hi' ? 'सामान्य प्रश्न' : 'General Query' },
    { value: 'Technical Issue', label: language === 'hi' ? 'तकनीकी समस्या' : 'Technical Issue' },
    { value: 'Membership', label: language === 'hi' ? 'सदस्यता' : 'Membership' },
    { value: 'Events', label: language === 'hi' ? 'कार्यक्रम और आयोजन' : 'Events' },
    { value: 'Volunteer Programs', label: language === 'hi' ? 'स्वयंसेवक कार्यक्रम' : 'Volunteer Programs' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await submitGeneralForm('Help Desk Ticket', formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', category: 'General Query', message: '' });
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting ticket. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error submitting ticket. Please try again.');
      setStatus('idle');
    }
  };

  const faqs = [
    {
      q: language === 'hi' ? 'क्या गुरुकुल आगरा सरकार द्वारा वित्तपोषित है?' : 'Is Gurukulam Agra government-funded?',
      a: language === 'hi'
        ? 'नहीं, त्र्यंबकम गुरुकुलम एसोसिएशन एक स्वतंत्र गैर-लाभकारी संगठन है जो पूरी तरह से सामुदायिक दान, स्वयंसेवकों और समर्थकों द्वारा वित्तपोषित है।'
        : 'No, Triyambakam Gurukulam Association is an independent non-profit organization funded entirely by community donations, volunteers, and supporters.'
    },
    {
      q: language === 'hi' ? 'दान की गई राशि का उपयोग कहाँ किया जाता है?' : 'Where are the donated funds utilized?',
      a: language === 'hi'
        ? 'सभी दान का उपयोग वैदिक शिक्षा, ग्रामीण कल्याण पहलों, सांस्कृतिक विरासत संरक्षण, और समाज सुधार से संबंधित पहलों को आयोजित करने में किया जाता है।'
        : 'All donations are utilized directly in backing Vedic education systems, rural welfare initiatives, documenting heritage, and conducting awareness campaigns.'
    },
    {
      q: language === 'hi' ? 'क्या मैं दूरस्थ रूप से सहायता कर सकता हूँ?' : 'Can I support remotely?',
      a: language === 'hi'
        ? 'हाँ! हम दूरस्थ स्वयंसेवक भूमिकाएं प्रदान करते हैं जैसे सामग्री संपादन, डिजिटल मीडिया प्रबंधन, अनुवाद, और अनुसंधान सहायता।'
        : 'Yes! We offer remote volunteer positions including content writing, digital media support, translation, and research archiving.'
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="help-desk-content">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-800/15 rounded-full blur-[130px] -mr-72 -mt-72 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.dispatchEvent(new CustomEvent('navigateToHome'))}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* HERO HEADER */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em]">
              <LifeBuoy size={16} className="animate-pulse" /> {t('help.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('help.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('help.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
            {/* LEFT COLUMN: SUPPORT TICKET FORM (Col-span 7) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-orange-500 overflow-hidden"
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
                    <h3 className="text-2xl font-serif font-black text-white uppercase tracking-wider">{t('help.successTitle')}</h3>
                    <p className="text-blue-200 text-sm max-w-md mx-auto leading-relaxed">
                      {t('help.successDesc')}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all border border-white/5 cursor-pointer shadow-md"
                  >
                    {language === 'hi' ? 'नया टिकट सबमिट करें' : 'Submit New Ticket'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-black text-white uppercase tracking-wide border-b border-white/10 pb-3 mb-5">
                      {t('help.formTitle')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">
                        {language === 'hi' ? 'आपका नाम *' : 'Your name *'}
                      </label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white" 
                        placeholder={language === 'hi' ? 'पूरा नाम' : 'Full Name'} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">
                        {language === 'hi' ? 'ईमेल पता *' : 'Email Address *'}
                      </label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white" 
                        placeholder="example@mail.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">
                        {language === 'hi' ? 'फ़ोन नंबर *' : 'Phone Number *'}
                      </label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white" 
                        placeholder="+91 XXXXX XXXXX" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('help.catTitle')}</label>
                      <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/90 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white cursor-pointer"
                      >
                        {categories.map((cat, idx) => (
                          <option key={idx} value={cat.value} className="bg-blue-950 text-white py-2">{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">
                      {language === 'hi' ? 'विवरण *' : 'Description of support query *'}
                    </label>
                    <textarea 
                      required 
                      rows={5} 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all text-sm text-white resize-none" 
                      placeholder={language === 'hi' ? 'कृपया अपनी समस्या यहाँ विस्तार से लिखें...' : "Provide detailed information..."}
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : (
                      <>
                        <Send size={14} /> {t('help.btnSubmit')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* RIGHT COLUMN: FAQ SECTION (Col-span 5) */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-sm font-black uppercase text-blue-300 tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
                <HelpCircle size={16} /> {t('help.faqTitle')}
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-white/10 rounded-sm bg-white/[0.02] overflow-hidden">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <span className="font-serif font-bold text-xs text-white leading-relaxed">{faq.q}</span>
                      {activeFaq === idx ? <ChevronUp size={12} className="text-orange-400" /> : <ChevronDown size={12} className="text-orange-400" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="p-4 pt-0 text-[11px] text-blue-200/80 leading-relaxed border-t border-white/5">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
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

export default HelpDeskPage;
