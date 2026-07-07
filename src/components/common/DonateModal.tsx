import React, { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, Loader2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../services/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const DonateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ donorName: '', phone: '', email: '', amount: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openDonateModal', handleOpen);
    return () => window.removeEventListener('openDonateModal', handleOpen);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyIcon = (text: string, field: string) => (
    <button 
      onClick={() => handleCopy(text, field)}
      className="ml-2 text-gray-400 hover:text-secondary transition-colors focus:outline-none"
      title="Copy to clipboard"
    >
      {copiedField === field ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const res = await loadRazorpayScript();
    if (!res) {
      setStatus('error');
      setErrorMessage('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // 1. Create order on our backend
      const orderData = await createRazorpayOrder({
        ...formData,
        amount: Number(formData.amount)
      });

      if (!orderData.order) {
        setStatus('error');
        setErrorMessage('Failed to initiate order. Please try again.');
        return;
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TYsEw9804jG1rK', // Fallback to test key if env not set
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Triyambakam Gurukulam',
        description: 'Donation',
        order_id: orderData.order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            setStatus('loading');
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.message === 'Payment verified successfully') {
              setStatus('success');
            } else {
              setStatus('error');
              setErrorMessage('Payment verification failed.');
            }
          } catch (err) {
            setStatus('error');
            setErrorMessage('Network error during verification.');
          }
        },
        prefill: {
          name: formData.donorName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#1a365d' // Primary color
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        setStatus('error');
        setErrorMessage(response.error.description || 'Payment failed.');
      });
      paymentObject.open();

      // We reset status to idle so the form is interactable if they close the modal
      setStatus('idle');
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
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-primary-light p-6 text-white relative flex-shrink-0">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Support Our Mission</h2>
              <p className="text-white/80 text-sm">Your contribution helps us preserve wisdom and empower the future.</p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              
              {!showForm ? (
                <>
                  {/* Sanskrit Quote Section */}
                  <div className="bg-orange-50 border-l-4 border-secondary p-6 rounded-r-lg mb-8 shadow-sm">
                    <p className="text-xl md:text-2xl font-serif text-center text-primary font-bold mb-4 leading-relaxed">
                      "अन्नदानं परं दानं विद्यादानं अतः परम् |<br/>
                      अन्नेन क्षणिका तृप्तिः यावज्जीवं च विद्यया ||"
                    </p>
                    <div className="space-y-3 text-sm text-text-muted">
                      <p><span className="font-bold text-text-main">Hindi Meaning:</span> अन्नदान श्रेष्ठ दान है, परंतु विद्यादान उससे भी श्रेष्ठ है। क्योंकि अन्न से क्षणिक (थोड़ी देर की) तृप्ति होती है, जबकि विद्या से जीवन भर की तृप्ति होती है。</p>
                      <p><span className="font-bold text-text-main">English Meaning:</span> Donating food is a great charity, but donating knowledge is even greater. Because food gives temporary satisfaction, whereas knowledge provides lifelong fulfillment.</p>
                    </div>
                  </div>

                  {/* Donation Details Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Bank Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-text-main border-b pb-2 mb-4 flex items-center">
                          <span className="bg-primary-light w-2 h-6 mr-2 rounded-sm"></span> Organization Details
                        </h3>
                        <div className="bg-background p-4 rounded-lg border border-border-main">
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Account Name / Trust Name</p>
                          <p className="font-bold text-text-main text-lg flex items-center justify-between">
                            TRIYAMBAKAM GURUKULAM ASSOCIATION
                            {copyIcon("TRIYAMBAKAM GURUKULAM ASSOCIATION", "trustName")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-text-main border-b pb-2 mb-4 flex items-center">
                          <span className="bg-secondary w-2 h-6 mr-2 rounded-sm"></span> Bank Details
                        </h3>
                        <div className="bg-background p-4 rounded-lg border border-border-main space-y-4">
                          <div>
                            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Bank</p>
                            <p className="font-bold text-text-main">HDFC Bank</p>
                          </div>
                          <div>
                            <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Account Number</p>
                            <p className="font-bold text-text-main text-xl tracking-widest text-primary-light flex items-center justify-between">
                              50200119100544
                              {copyIcon("50200119100544", "accountNumber")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Actions */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-text-main border-b pb-2 mb-4 flex items-center">
                          <span className="bg-green-600 w-2 h-6 mr-2 rounded-sm"></span> Contact Details
                        </h3>
                        <div className="bg-background p-4 rounded-lg border border-border-main">
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Mobile Number</p>
                          <p className="font-bold text-text-main text-lg flex items-center justify-between">
                            +91 94121 62807
                            {copyIcon("+91 94121 62807", "mobile")}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-text-main border-b pb-2 mb-4 flex items-center">
                          <span className="bg-gray-600 w-2 h-6 mr-2 rounded-sm"></span> Address
                        </h3>
                        <div className="bg-background p-4 rounded-lg border border-border-main">
                          <p className="text-text-main leading-relaxed">
                            F No 1006, 10th Floor, BL-A, OM Shree Platinum Basai<br />
                            Agra – 282001<br />
                            Uttar Pradesh, India
                          </p>
                        </div>
                      </div>
                      
                      {/* Trust Badge & Donate Button */}
                      <div className="mt-8 flex flex-col items-center justify-center p-4 bg-blue-50 border border-blue-100 rounded-lg space-y-3">
                        <div className="flex items-center text-blue-900 font-bold">
                          <CreditCard className="mr-2" size={20} />
                          <span>100% Secure Online Payment</span>
                        </div>
                        <button 
                          onClick={() => setShowForm(true)}
                          className="w-full bg-secondary text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg"
                        >
                          Donate Online via Razorpay
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="max-w-xl mx-auto py-4">
                  {status === 'success' ? (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                      <h3 className="text-2xl font-bold text-text-main mb-2">Thank You for Your Donation!</h3>
                      <p className="text-text-muted mb-6">Your payment was successful. We truly appreciate your support to our Gurukulam.</p>
                      <button 
                        onClick={() => { setIsOpen(false); setStatus('idle'); setShowForm(false); setFormData({ donorName: '', phone: '', email: '', amount: '' }); }}
                        className="bg-primary-light text-white px-6 py-2 rounded-sm font-bold text-sm uppercase tracking-wider hover:bg-primary transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => setShowForm(false)} className="text-primary-light text-sm font-bold mb-6 hover:underline flex items-center">
                        &larr; Back to Bank Details
                      </button>
                      <h3 className="text-xl font-bold text-text-main mb-6 border-b pb-2">Online Donation Form</h3>
                      <form onSubmit={handlePayment} className="space-y-4">
                        {status === 'error' && (
                          <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">
                            {errorMessage}
                          </div>
                        )}
                        <div>
                          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Donor Name *</label>
                          <input required type="text" value={formData.donorName} onChange={e => setFormData({...formData, donorName: e.target.value})} className="w-full p-3 border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Phone *</label>
                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all" placeholder="+91 9876543210" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Email</label>
                            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Amount (₹) *</label>
                          <input required type="number" min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full p-3 border border-border-main rounded-sm focus:ring-2 focus:ring-[#9D2928] focus:border-transparent outline-none transition-all" placeholder="5000" />
                        </div>
                        
                        <button 
                          disabled={status === 'loading'}
                          type="submit" 
                          className="w-full mt-4 bg-secondary text-white px-8 py-4 rounded-sm font-black text-sm uppercase tracking-wider hover:bg-red-700 transition-all shadow-xl hover-lift flex justify-center items-center disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                          {status === 'loading' ? <Loader2 className="animate-spin mr-2" size={20} /> : `Proceed to Pay ₹${formData.amount || '0'}`}
                        </button>
                        <p className="text-[10px] text-center text-text-muted mt-2">
                          By clicking Proceed, you agree to our terms and conditions. Payments are processed securely by Razorpay.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonateModal;
