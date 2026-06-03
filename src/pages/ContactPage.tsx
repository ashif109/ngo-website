import React, { useState } from 'react';
import { 
  ArrowLeft, Sparkles, MapPin, Mail, Phone, 
  Send, Loader2, CheckCircle2, MessageSquare, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

import { submitContact } from '../services/api';

const ContactPage: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await submitContact(formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error sending message. Please try again.');
        setStatus('idle');
      }
    } catch (err) {
      console.error(err);
      alert(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error sending message. Please try again.');
      setStatus('idle');
    }
  };

  const faqs = [
    {
      q: language === 'hi' ? 'गुरुकुल आगरा कहाँ स्थित है?' : 'Where is Gurukulam Agra located?',
      a: language === 'hi' 
        ? 'हमारा मुख्य कार्यालय बसई, फतेहाबाद रोड, आगरा - 282001, उत्तर प्रदेश में स्थित है।'
        : 'Our headquarters is located at Basai, Fatehabad Road, Agra - 282001, Uttar Pradesh, India.'
    },
    {
      q: language === 'hi' ? 'मैं स्वयंसेवक के रूप में कैसे शामिल हो सकता हूँ?' : 'How can I join as a volunteer?',
      a: language === 'hi'
        ? 'आप "स्वयंसेवक बनें" बटन पर क्लिक करके या इस पृष्ठ पर संपर्क फ़ॉर्म भरकर आवेदन कर सकते हैं। हमारी टीम आपको पंजीकरण प्रक्रिया के बारे में मार्गदर्शन करेगी।'
        : 'You can apply by clicking the "Become a Volunteer" button on our website or filling out the contact form on this page. Our coordinator will guide you.'
    },
    {
      q: language === 'hi' ? 'क्या आपकी कोई सक्रिय कक्षाएं हैं?' : 'Are there any active classes currently?',
      a: language === 'hi'
        ? 'वर्तमान में कोई सक्रिय प्रवेश प्रक्रिया नहीं चल रही है। हम आने वाले शैक्षिक सत्रों और सप्ताहांत कार्यशालाओं के लिए पाठ्यक्रम की योजना बना रहे हैं। आप हमारे प्रवेश पृष्ठ पर जाकर अपनी रुचि दर्ज कर सकते हैं।'
        : 'There are no active admissions at this moment. We are planning upcoming curriculum workshops and sessions. You can register your interest on our Admissions page.'
    }
  ];

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden" id="contact-page-content">
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
              <MessageSquare size={16} className="animate-pulse" /> {t('contact.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight">
              {t('contact.title')}
            </h1>
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {t('contact.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* LEFT COLUMN: CONTACT DETAILS (Col-span 5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Address Card */}
              <div className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-sm space-y-3">
                <div className="flex items-center gap-3 text-orange-400">
                  <MapPin size={20} />
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">{t('contact.addressLabel')}</h4>
                </div>
                <p className="text-blue-100/80 text-sm leading-relaxed">
                  F.No.1006 10th Floor BL-A, Om Shree Platinum Basai <br />
                  Agra - 282001, Uttar Pradesh, India
                </p>
              </div>

              {/* Email & Phone Card */}
              <div className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-sm space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-blue-300 tracking-wider">{t('contact.emailLabel')}</h5>
                    <p className="text-sm font-bold text-white mt-0.5">croping@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase text-blue-300 tracking-wider">{t('contact.phoneLabel')}</h5>
                    <p className="text-sm font-bold text-white mt-0.5">+91 94121 62807</p>
                  </div>
                </div>
              </div>

              {/* Social links card */}
              <div className="bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-sm space-y-4">
                <h4 className="text-xs font-black uppercase text-white tracking-wider border-b border-white/10 pb-2">
                  {t('contact.socialLabel')}
                </h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-blue-900 flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors font-black text-sm">f</a>
                  <a href="#" className="w-10 h-10 bg-sky-600 flex items-center justify-center rounded-full hover:bg-sky-500 transition-colors font-black text-sm">x</a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM (Col-span 7) */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-orange-500 overflow-hidden">
              {status === 'success' ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-black text-white uppercase tracking-wider">{t('contact.successTitle')}</h3>
                    <p className="text-blue-200 text-sm max-w-md mx-auto leading-relaxed">
                      {t('contact.successDesc')}
                    </p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm transition-all border border-white/5 cursor-pointer shadow-md"
                  >
                    {language === 'hi' ? 'एक और संदेश भेजें' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('contact.formName')}</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder={language === 'hi' ? 'आपका पूरा नाम' : 'Your name'} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('contact.formEmail')}</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder="example@mail.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('contact.formPhone')}</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone} 
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder="+91 XXXXX XXXXX" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('contact.formSubject')}</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.subject} 
                        onChange={e => setFormData({...formData, subject: e.target.value})} 
                        className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white" 
                        placeholder={language === 'hi' ? 'पूछताछ का विषय' : 'Subject of inquiry'} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">{t('contact.formMessage')}</label>
                    <textarea 
                      required
                      rows={5} 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      className="w-full p-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm text-white resize-none" 
                      placeholder={language === 'hi' ? 'अपना संदेश यहाँ लिखें...' : 'Type your query details...'}
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
                        <Send size={14} /> {t('contact.btnSend')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* GOOGLE MAPS EMBED */}
          <div className="mb-20">
            <h3 className="text-xl font-serif font-black text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
              📍 {t('contact.mapTitle')}
            </h3>
            <div className="w-full h-[400px] bg-blue-950/40 border border-white/10 rounded-sm overflow-hidden shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.0520261352495!2d78.046399!3d27.154388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974714f346df0df%3A0xe9f7cd55725db005!2sOm%20Shree%20Platinum!5e0!3m2!1sen!2sin!4v1780000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Office Location Map"
                aria-label="Om Shree Platinum Agra Map location"
              ></iframe>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="max-w-4xl mx-auto mb-10">
            <h3 className="text-xl font-serif font-black text-white uppercase tracking-wider mb-8 text-center border-b border-white/10 pb-4">
              💬 {t('contact.faqTitle')}
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-sm bg-white/[0.02] overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    <span className="font-serif font-bold text-sm sm:text-base text-white">{faq.q}</span>
                    {activeFaq === idx ? <ChevronUp size={16} className="text-orange-400" /> : <ChevronDown size={16} className="text-orange-400" />}
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
                        <p className="p-5 pt-0 text-xs sm:text-sm text-blue-200/80 leading-relaxed border-t border-white/5">
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
      </main>

      <Footer />
      <DonateModal />
      <VolunteerModal />
    </>
  );
};

export default ContactPage;
