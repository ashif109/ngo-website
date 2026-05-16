import React, { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { submitContact } from '../../services/api';

const ContactSection: React.FC = () => {
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
        setErrorMessage(res.error || 'Failed to send message');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="institutional-container">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="bg-[#0055a5] p-8 md:p-12 text-white md:w-2/5 flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Get in Touch</h2>
            <p className="text-white/80 text-sm leading-relaxed mb-8">
              Have questions about our initiatives or want to collaborate? Send us a message and our team will get back to you promptly.
            </p>
            <div className="space-y-4">
              <p className="flex items-center text-sm font-bold"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">📞</span> +91 94121 62807</p>
              <p className="flex items-center text-sm font-bold"><span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">📍</span> Agra, Uttar Pradesh</p>
            </div>
          </div>

          <div className="p-8 md:p-12 md:w-3/5">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="text-green-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We will get back to you soon.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[#0055a5] font-bold text-sm uppercase tracking-wider hover:underline"
                >
                  Send another message
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
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#0055a5] focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#0055a5] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message *</label>
                  <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#0055a5] focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                
                <button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full bg-[#0055a5] text-white px-8 py-4 rounded-sm font-black text-sm uppercase tracking-wider hover:bg-[#003366] transition-all shadow-xl hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin mr-2" size={20} /> : (
                    <><Send size={16} className="mr-2" /> Send Message</>
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
