import React from 'react';
import { Calendar, ArrowLeft, ArrowRight, BookOpen, FileText, Globe, MapPin, Laptop, Sparkles, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/ContactSection';
import DonateModal from '../components/common/DonateModal';
import VolunteerModal from '../components/common/VolunteerModal';

const EventsPage: React.FC = () => {
  const { language } = useLanguage();



  return (
    <>
      <Header />
      <Navbar />

      <main className="flex-grow bg-[#002147] text-white py-16 relative overflow-hidden">
        {/* Glowing Decorative Backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-[120px] -mr-64 -mt-64 z-0 pointer-events-none"></div>
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] -ml-48 z-0 pointer-events-none"></div>

        <div className="institutional-container relative z-10">
          
          {/* Breadcrumb Navigation */}
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigateToHome'));
            }}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-all text-xs font-black uppercase tracking-widest mb-10 cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
            {language === 'hi' ? 'मुख्य पृष्ठ पर वापस' : language === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
          </motion.button>

          {/* Page Header */}
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <Calendar size={18} className="animate-pulse" /> {language === 'hi' ? 'ज्ञान कैलेंडर 2026' : language === 'gu' ? 'જ્ઞાન કેલેન્ડર 2026' : 'Knowledge Calendar 2026'}
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight mb-6 uppercase tracking-tight">
              {language === 'hi' ? 'आगामी' : language === 'gu' ? 'આગામી' : 'Forthcoming'} <span className="text-orange-500 underline decoration-wavy decoration-orange-600/30">{language === 'hi' ? 'कार्यक्रम' : language === 'gu' ? 'કાર્યક્રમો' : 'Programs'}</span>
            </h1>
            <p className="text-blue-100/80 text-base leading-relaxed">
              {language === 'hi'
                ? '2026 के लिए निर्धारित हमारे व्यापक शैक्षणिक कार्यक्रमों, गतिशील हैकाथॉन और प्राचीन विरासत कांग्रेस का अन्वेषण करें। वैदिक ज्ञान की जड़ों को समकालीन अनुप्रयोगों के साथ एकीकृत करने की हमारी खोज में हमसे जुड़ें।'
                : language === 'gu'
                ? '2026 માટે નિર્ધારિત અમારા વ્યાપક શૈક્ષણિક કાર્યક્રમો, ગતિશીલ હેકાથોન અને પ્રાચીન વારસાની પરિષદની શોધ કરો. વૈદિક જ્ઞાનના મૂળને સમકાલીન ઉપયોગો સાથે એકીકૃત કરવાની અમારી શોધમાં અમારી સાથે જોડાઓ.'
                : 'Explore our comprehensive academic events, dynamic hackathons, and ancient heritage congresses scheduled for 2026. Join us on our quest to integrate the roots of Vedic knowledge with contemporary applications.'}
            </p>
          </div>

          {/* UPCOMING EVENTS SECTION */}
          <div className="space-y-8 mb-20">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl font-serif font-black text-white uppercase">
                {language === 'hi' ? 'आगामी कार्यक्रम' : language === 'gu' ? 'આગામી કાર્યક્રમો' : 'Upcoming Events'}
              </h2>
              <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mt-1.5">
                {language === 'hi' ? 'भविष्य की गतिविधियाँ' : language === 'gu' ? 'ભવિષ્યની પ્રવૃત્તિઓ' : 'Future Initiatives'}
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-sm text-center relative overflow-hidden flex flex-col items-center justify-center border-l-4 border-orange-500 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.03] via-transparent to-transparent pointer-events-none"></div>

              <div className="bg-orange-600/15 border border-orange-500/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-600/5">
                <Sparkles size={28} className="text-orange-400 animate-pulse" />
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-black text-white mb-4 uppercase tracking-tight">
                {language === 'hi' ? 'नए कार्यक्रम जल्द ही घोषित किए जाएंगे' : language === 'gu' ? 'નવા કાર્યક્રમો ટૂંક સમયમાં જાહેર કરવામાં આવશે' : 'New Programs & Events Coming Soon'}
              </h3>
              
              <p className="text-blue-100/70 text-sm max-w-xl leading-relaxed mb-8">
                {language === 'hi'
                  ? 'हम वर्तमान में 2026 की दूसरी छमाही के लिए अकादमिक सम्मेलनों, राष्ट्रीय वैदिक विज्ञान संगोष्ठियों और तकनीकी नवाचार मंचों का नियोजन कर रहे हैं। पंजीकरण खुलने पर अपडेट प्राप्त करने के लिए हमारे साथ बने रहें।'
                  : language === 'gu'
                  ? 'અમે હાલમાં 2026 ના ઉત્તરાર્ધ માટે શૈક્ષણિક પરિષદો, રાષ્ટ્રીય વૈદિક વિજ્ઞાન પરિસંવાદો અને તકનીકી નવીનતા મંચોનું આયોજન અને શેડ્યૂલ કરી રહ્યા છીએ. નોંધણી ખુલવા પર અપડેટ્સ મેળવવા માટે અમારી સાથે જોડાયેલા રહો.'
                  : 'We are currently curating and scheduling our series of academic conferences, national Vedic science colloquia, and technological innovation forums for the latter half of 2026. Stay tuned to receive updates as soon as registrations open.'}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => window.location.hash = '#/admissions'}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-orange-600/10 hover:shadow-orange-600/30 hover:-translate-y-0.5"
                >
                  <Sparkles size={14} />
                  {language === 'hi' ? 'प्रवेश एवं रुचि दर्ज करें' : language === 'gu' ? 'રસ અને પ્રવેશ નોંધાવો' : 'Register Interest & Admissions'}
                </button>
                
                <button 
                  onClick={() => window.location.hash = '#/contact-us'}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all flex items-center gap-2 border border-white/10 hover:border-white/20 cursor-pointer shadow-lg"
                >
                  <Globe size={14} className="text-orange-400" />
                  {language === 'hi' ? 'अकादमिक परिषद से संपर्क करें' : language === 'gu' ? 'શૈક્ષણિક પરિષદનો સંપર્ક કરો' : 'Contact Academic Council'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* PAST EVENTS SECTION */}
          <div className="space-y-8">
            <div className="border-b border-white/10 pb-6">
              <h2 className="text-2xl font-serif font-black text-white uppercase">
                {language === 'hi' ? 'पिछली गतिविधियाँ और मील के पत्थर' : language === 'gu' ? 'ભૂતકાળની ઇવેન્ટ્સ અને સીમાચિહ્નો' : 'Past Events & Milestones'}
              </h2>
              <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mt-1.5">
                {language === 'hi' ? 'सफल आयोजन इतिहास' : language === 'gu' ? 'સફળ ઇવેન્ટ ઇતિહાસ' : 'Successful Event History'}
              </p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-sm relative overflow-hidden border-t-4 border-blue-500 shadow-2xl mb-12"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Event Main Description */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold uppercase tracking-widest py-1.5 px-3.5 rounded-sm">
                    <Info size={12} /> {language === 'hi' ? 'सफलतापूर्वक संपन्न' : language === 'gu' ? 'સફળતાપૂર્વક પૂર્ણ' : 'Successfully Completed'}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-white leading-snug mb-2 uppercase">
                      {language === 'hi' ? 'BUILD WITH AI - 30, 31 मई 2026' : language === 'gu' ? 'BUILD WITH AI - 30, 31 મે 2026' : 'BUILD WITH AI - 30th, 31st May 2026'}
                    </h3>
                    <h4 className="text-lg font-bold text-blue-200">
                      {language === 'hi' ? 'हैकाडे आगरा - साझेदारी और सहयोग' : language === 'gu' ? 'હેકડે આગ્રા - ભાગીદારી અને સહયોગ' : 'HackDay Agra - Partnership & Collaboration'}
                    </h4>
                    <p className="text-xs text-orange-400 font-bold uppercase tracking-wider mt-1.5">
                      {language === 'hi' ? 'त्र्यंबकम गुरुकुलम एसोसिएशन - आधिकारिक सह-आयोजक' : language === 'gu' ? 'ત્રણયંબકમ ગુરુકુલમ એસોસિએશન - સત્તાવાર સહ-આયોજક' : 'Triyambakam Gurukulam Association - Official Co-Organiser'}
                    </p>
                  </div>

                  <p className="text-blue-100/90 text-sm leading-relaxed">
                    {language === 'hi' 
                      ? 'त्र्यंबकम गुरुकुलम एसोसिएशन द्वारा सह-आयोजित एक प्रतिष्ठित राष्ट्रीय हैकाथॉन। इस मील का पत्थर पहल को भविष्य के लिए तैयार नवप्रवर्तकों, डेवलपर्स के दिमाग और पारंपरिक विचारकों को एक साथ आने और आधुनिक आर्टिफिशियल इंटेलिजेंस और प्राचीन भारतीय तर्कशास्त्र (तर्क शास्त्र) के अभिसरण पर तकनीकी अनुप्रयोगों का निर्माण करने के लिए प्रेरित करने के लिए डिज़ाइन किया गया था।'
                      : language === 'gu'
                      ? 'ત્રણ્યંબકમ ગુરુકુલમ એસોસિએશન દ્વારા સહ-આયોજિત એક પ્રતિષ્ઠિત રાષ્ટ્રીય હેકાથોન. આ સીમાચિહ્નરૂપ પહેલ ભવિષ્ય માટે તૈયાર નવા પ્રવાહના સર્જકો, ડેવલપરના મગજ અને પરંપરાગત વિચારકોને એકસાથે આવવા અને આધુનિક આર્ટિફિશિયલ ઇન્ટેલિજન્સ અને પ્રાચીન ભારતીય તર્કશાસ્ત્ર (તર્ક શાસ્ત્ર) ના મિલન પર ટેકનોલોજીકલ એપ્લિકેશન્સ બનાવવા માટે પ્રેરણા આપવા માટે રચાયેલ હતી.'
                      : 'A prestigious national hackathon co-organised by Triyambakam Gurukulam Association. This milestone initiative was designed to inspire future-ready innovators, developer minds, and traditional thinkers to come together and build technical applications at the intersection of modern Artificial Intelligence and ancient Indian logic (Tarka Shastra).'}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => window.open('https://drive.google.com/file/d/1qh_i5m78sX6ffAlZGEzeinNaGFf2w_-C/view?usp=drive_link', '_blank')}
                      className="flex-1 sm:flex-initial bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-all flex items-center justify-center gap-2.5 border border-white/10 hover:border-white/20 cursor-pointer shadow-lg"
                    >
                      <FileText size={16} className="text-orange-400" />
                      {language === 'hi' ? 'रिपोर्ट पढ़ें (PDF)' : language === 'gu' ? 'રિપોર્ટ વાંચો (PDF)' : 'Read Report (PDF)'}
                    </button>
                    
                    <button 
                      onClick={() => window.open('https://hackday-agra-2026-727545432353.us-west1.run.app/', '_blank')}
                      className="flex-1 sm:flex-initial bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-orange-600/10 hover:shadow-orange-600/30 hover:-translate-y-0.5"
                    >
                      <Globe size={16} />
                      {language === 'hi' ? 'हैकाथॉन वेबसाइट' : language === 'gu' ? 'હેકાથોન વેબસાઇટ' : 'Hackathon Website'}
                    </button>
                  </div>
                </div>

                {/* Event Round Timelines */}
                <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 p-6 sm:p-8 rounded-sm space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <Info size={16} className="text-orange-400" />
                    <h4 className="text-sm font-black uppercase tracking-wider text-white">
                      {language === 'hi' ? 'आयोजित कार्यक्रम विवरण' : language === 'gu' ? 'આયોજિત ઇવેન્ટ વિગતો' : 'Event Milestones'}
                    </h4>
                  </div>

                  <div className="relative border-l border-white/10 pl-5 ml-2.5 space-y-8 py-2">
                    <div className="relative group/round">
                      <div className="absolute -left-[31px] top-0 bg-[#002147] border-2 border-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-xs font-black uppercase text-blue-400 tracking-wider">
                          {language === 'hi' ? 'ऑनलाइन दौर' : language === 'gu' ? 'ઓનલાઇન રાઉન્ડ' : 'Online Round'}
                        </span>
                        <div className="text-white font-serif font-black text-sm">
                          {language === 'hi' ? '30 मई 2026' : language === 'gu' ? '30 મે 2026' : '30th May 2026'}
                        </div>
                        <p className="text-blue-200/70 text-xs">
                          {language === 'hi' 
                            ? 'देश भर की टीमों ने प्रारंभिक विचारों और कोड को प्रस्तुत किया।'
                            : language === 'gu'
                            ? 'દેશભરની ટીમોએ પ્રારંભિક વિચારો અને કોડ સબમિટ કર્યો.'
                            : 'Teams from across the country submitted initial ideas and source code.'}
                        </p>
                      </div>
                    </div>

                    <div className="relative group/round">
                      <div className="absolute -left-[31px] top-0 bg-[#002147] border-2 border-orange-500 rounded-full w-5 h-5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-xs font-black uppercase text-orange-400 tracking-wider">
                          {language === 'hi' ? 'ऑफलाइन दौर' : language === 'gu' ? 'ઓફલાઇન રાઉન્ડ' : 'Offline Round'}
                        </span>
                        <div className="text-white font-serif font-black text-sm">
                          {language === 'hi' ? '31 मई 2026' : language === 'gu' ? '31 મે 2026' : '31st May 2026'}
                        </div>
                        <p className="text-blue-200/70 text-xs">
                          {language === 'hi'
                            ? 'शॉर्टलिस्ट किए गए फाइनलिस्ट ने आगरा में भव्य फिनाले में लाइव प्रदर्शन किया।'
                            : language === 'gu'
                            ? 'શોર્ટલિસ્ટ થયેલા ફાઇનલિસ્ટોએ આગ્રામાં ગ્રાન્ડ ફિનાલેમાં લાઇવ પ્રદર્શન કર્યું.'
                            : 'Shortlisted finalists presented live demonstrations at the grand finale in Agra.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
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

export default EventsPage;
