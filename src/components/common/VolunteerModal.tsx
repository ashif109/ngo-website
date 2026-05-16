import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { submitVolunteer } from '../../services/api';

const VolunteerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interests: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openVolunteerModal', handleOpen);
    return () => window.removeEventListener('openVolunteerModal', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const payload = {
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim()).filter(i => i)
      };
      const res = await submitVolunteer(payload);
      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Failed to submit request');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]"
          >
            <div className="bg-[#006400] p-6 text-white relative flex-shrink-0">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Become a Volunteer</h2>
              <p className="text-white/80 text-sm">Join our mission to empower the future through education and culture.</p>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">Your volunteer request has been received. Our team will contact you shortly.</p>
                  <button 
                    onClick={() => { setIsOpen(false); setStatus('idle'); setFormData({ name: '', email: '', phone: '', interests: '', message: '' }); }}
                    className="bg-[#006400] text-white px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-[#004d00] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">
                      {errorMessage}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email *</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone *</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Area of Interest</label>
                    <input type="text" value={formData.interests} onChange={e => setFormData({...formData, interests: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" placeholder="E.g. Teaching, Event Management, Tech (comma separated)" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Message (Optional)</label>
                    <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" placeholder="Why do you want to volunteer?"></textarea>
                  </div>
                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-[#006400] text-white px-8 py-4 rounded-sm font-black text-sm uppercase tracking-wider hover:bg-[#004d00] transition-all shadow-xl hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VolunteerModal;
