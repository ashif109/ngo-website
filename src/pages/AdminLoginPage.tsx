import React, { useState, useEffect } from 'react';
import { Lock, Mail, Loader2, ShieldCheck, CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { checkAdminSetup, setupAdmin, loginAdmin } from '../services/api';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AdminLoginPage: React.FC = () => {
  const { language } = useLanguage();
  const [isSetupNeeded, setIsSetupNeeded] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = 'Admin Portal | Triyambakam Gurukulam Association';
    const fetchSetupStatus = async () => {
      try {
        const res = await checkAdminSetup();
        if (res.success) {
          setIsSetupNeeded(!res.isSetup); // If isSetup is false, it means we need to set up first
        }
      } catch (err) {
        console.error('Error fetching admin setup status:', err);
      }
    };
    fetchSetupStatus();
  }, []);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage(language === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setStatus('error');
      setErrorMessage(language === 'hi' ? 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए' : 'Password must be at least 6 characters');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await setupAdmin({ email, password });
      if (res.success) {
        setStatus('success');
        setTimeout(() => {
          setIsSetupNeeded(false);
          setStatus('idle');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }, 1500);
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Setup failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error during setup. Please try again.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await loginAdmin({ email, password });
      if (res.success) {
        setStatus('success');
        localStorage.setItem('adminToken', res.token);
        localStorage.setItem('adminEmail', res.email);
        setTimeout(() => {
          window.location.hash = '#/admin-dashboard';
        }, 1200);
      } else {
        setStatus('error');
        setErrorMessage(res.error || (language === 'hi' ? 'अमान्य ईमेल या पासवर्ड' : 'Invalid email or password'));
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-20 relative overflow-hidden" id="admin-login-content">
        {/* Glowing Decorative Background elements */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-800/15 rounded-full blur-[130px] -mr-72 -mt-72 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[110px] -ml-60 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10 flex flex-col items-center justify-center">
          
          {/* Back button */}
          <motion.button 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => window.location.hash = ''}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ' : 'Back to Home'}
          </motion.button>

          {isSetupNeeded === null ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-orange-400 mb-4" size={48} />
              <p className="text-blue-200 text-xs uppercase tracking-widest font-black">Initializing secure connection...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 sm:p-10 shadow-2xl relative border-t-4 border-orange-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl pointer-events-none"></div>

              {isSetupNeeded ? (
                // First-time admin setup form
                <>
                  <div className="text-center space-y-3 mb-8">
                    <div className="w-12 h-12 bg-orange-600/15 border border-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Sparkles size={22} className="animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-serif font-black uppercase text-white tracking-wide">
                      {language === 'hi' ? 'प्रारंभिक व्यवस्था' : 'First-time Setup'}
                    </h2>
                    <p className="text-blue-200 text-xs leading-relaxed max-w-xs mx-auto">
                      {language === 'hi' 
                        ? 'कोई व्यवस्थापक कॉन्फ़िगर नहीं किया गया है। कृपया अपना मुख्य व्यवस्थापक खाता बनाएं।' 
                        : 'No admin configured. Please create your primary administrator account.'}
                    </p>
                  </div>

                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center space-y-4"
                    >
                      <CheckCircle2 size={48} className="text-green-400 mx-auto animate-bounce" />
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">Account Created!</h3>
                      <p className="text-xs text-blue-200">Admin configured. Loading login screen...</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSetup} className="space-y-5">
                      {status === 'error' && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3.5 rounded-sm text-xs font-bold">
                          ⚠️ {errorMessage}
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">Admin Email</label>
                        <div className="relative">
                          <input 
                            required 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white" 
                            placeholder="admin@gurukulam.org" 
                          />
                          <Mail size={16} className="absolute left-3.5 top-4 text-blue-300/60" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">Create Password</label>
                        <div className="relative">
                          <input 
                            required 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white" 
                            placeholder="••••••••" 
                          />
                          <Lock size={16} className="absolute left-3.5 top-4 text-blue-300/60" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">Confirm Password</label>
                        <div className="relative">
                          <input 
                            required 
                            type="password" 
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white" 
                            placeholder="••••••••" 
                          />
                          <Lock size={16} className="absolute left-3.5 top-4 text-blue-300/60" />
                        </div>
                      </div>

                      <button 
                        disabled={status === 'loading'}
                        type="submit" 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {status === 'loading' ? <Loader2 className="animate-spin" size={14} /> : 'Initialize Admin'}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                // Standard login form
                <>
                  <div className="text-center space-y-3 mb-8">
                    <div className="w-12 h-12 bg-orange-600/15 border border-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <ShieldCheck size={24} className="animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-serif font-black uppercase text-white tracking-wide">
                      {language === 'hi' ? 'एडमिन लॉगिन' : 'Admin Portal'}
                    </h2>
                    <p className="text-blue-200 text-xs leading-relaxed">
                      {language === 'hi' 
                        ? 'गुरुकुल आगरा प्रबंधन पैनल तक पहुंच प्राप्त करने के लिए लॉगिन करें।' 
                        : 'Log in to access the Gurukulam Agra administrative dashboard.'}
                    </p>
                  </div>

                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center space-y-4"
                    >
                      <CheckCircle2 size={48} className="text-green-400 mx-auto animate-bounce" />
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider">Access Granted</h3>
                      <p className="text-xs text-blue-200">Loading admin console...</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-6">
                      {status === 'error' && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3.5 rounded-sm text-xs font-bold">
                          ⚠️ {errorMessage}
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">Admin Email</label>
                        <div className="relative">
                          <input 
                            required 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white" 
                            placeholder="admin@gurukulam.org" 
                          />
                          <Mail size={16} className="absolute left-3.5 top-4 text-blue-300/60" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-blue-300 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                          <input 
                            required 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3.5 bg-blue-950/40 border border-white/10 rounded-sm focus:ring-1 focus:ring-orange-500 outline-none text-sm text-white" 
                            placeholder="••••••••" 
                          />
                          <Lock size={16} className="absolute left-3.5 top-4 text-blue-300/60" />
                        </div>
                      </div>

                      <button 
                        disabled={status === 'loading'}
                        type="submit" 
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                      >
                        {status === 'loading' ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <>
                            <Lock size={14} /> {language === 'hi' ? 'प्रवेश करें' : 'Login Securely'}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </>
              )}
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminLoginPage;
