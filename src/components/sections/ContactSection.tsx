import React, { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { submitContact } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useSiteContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const res = await submitContact(formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(res.error || (language === 'hi' ? 'संदेश भेजने में विफल' : language === 'gu' ? 'સંદેશ મોકલવામાં નિષ્ફળ' : 'Failed to send message'));
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(language === 'hi' ? 'नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।' : language === 'gu' ? 'નેટવર્ક ભૂલ. કૃપા કરીને ફરી પ્રયાસ કરો.' : 'Network error. Please try again.');
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-background border-t border-border-main">
      <div className="institutional-container">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="bg-primary-light p-8 md:p-12 text-white md:w-2/5 flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              {language === 'hi' ? 'संपर्क करें' : language === 'gu' ? 'સંપર્ક કરો' : 'Get in Touch'}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              {language === 'hi' 
                ? 'हमारी पहलों के बारे में प्रश्न हैं या सहयोग करना चाहते हैं? हमें एक संदेश भेजें और हमारी टीम आपसे तुरंत संपर्क करेगी।'
                : language === 'gu'
                ? 'અમારી પહેલ વિશે પ્રશ્નો છે અથવા સહયોગ કરવા માંગો છો? અમને સંદેશ મોકલો અને અમારી ટીમ તરત જ તમારો સંપર્ક કરશે.'
                : 'Have questions about our initiatives or want to collaborate? Visit Gurukulam Agra to experience our heritage firsthand. The Triyambakam Gurukulam Association is proud to serve the community—send us a message and our team will get back to you promptly.'}
            </p>
            <div className="space-y-4">
              <p className="flex items-center text-sm font-bold"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">📞</span> {settings?.phone || '+91 94121 62807'}</p>
              <p className="flex items-center text-sm font-bold"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">📍</span> {settings?.address || (language === 'hi' ? 'आगरा, उत्तर प्रदेश' : language === 'gu' ? 'આગ્રા, ઉત્તર પ્રદેશ' : 'Agra, Uttar Pradesh')}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 md:w-3/5">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="text-green-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2">
                  {language === 'hi' ? 'संदेश भेजा गया!' : language === 'gu' ? 'સંદેશ મોકલાઈ ગયો!' : 'Message Sent!'}
                </h3>
                <p className="text-text-muted mb-6">
                  {language === 'hi'
                    ? 'हमसे संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।'
                    : language === 'gu'
                    ? 'અમારો સંપર્ક કરવા બદલ આભાર. અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.'
                    : 'Thank you for reaching out. We will get back to you soon.'}
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-primary-light font-bold text-sm uppercase tracking-wider hover:underline cursor-pointer"
                >
                  {language === 'hi' ? 'एक और संदेश भेजें' : language === 'gu' ? 'બીજો સંદેશ મોકલો' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                    {language === 'hi' ? 'आपका नाम *' : language === 'gu' ? 'તમારું નામ *' : 'Your Name *'}
                  </label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-background border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all font-semibold" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                    {language === 'hi' ? 'आपका ईमेल *' : language === 'gu' ? 'તમારું ઇમેઇલ *' : 'Your Email *'}
                  </label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-background border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all font-semibold" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">
                    {language === 'hi' ? 'संदेश *' : language === 'gu' ? 'સંદેશ *' : 'Message *'}
                  </label>
                  <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-3 bg-background border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all font-semibold" placeholder={language === 'hi' ? 'हम आपकी कैसे मदद कर सकते हैं?' : language === 'gu' ? 'અમે તમને કેવી રીતે મદદ કરી શકીએ?' : 'How can we help you?'}></textarea>
                </div>
                
                <button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full bg-primary-light text-white px-8 py-4 rounded-sm font-black text-sm uppercase tracking-wider hover:bg-primary transition-all shadow-xl hover-lift flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin mr-2" size={20} /> : (
                    <><Send size={16} className="mr-2" /> {language === 'hi' ? 'संदेश भेजें' : language === 'gu' ? 'સંદેશ મોકલો' : 'Send Message'}</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
