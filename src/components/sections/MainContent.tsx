import React from 'react';
import { Globe, ArrowRight, GraduationCap, Clock, Lock, Sparkles, ArrowUpRight, Mail } from 'lucide-react';
import { EDUCATION_ITEMS } from '../../data/siteData';
import { useLanguage } from '../../context/LanguageContext';

import { submitGeneralForm } from '../../services/api';

const AdmissionsSubscribeForm: React.FC = () => {
  const { language } = useLanguage();
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(language === 'hi' ? 'कृपया एक वैध ईमेल पता दर्ज करें।' : language === 'gu' ? 'કૃપા કરીને માન્ય ઇમેઇલ સરનામું દાખલ કરો.' : 'Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await submitGeneralForm('Admissions Early Alert Subscription', { email });
      if (res.success) {
        setStatus('success');
        setMessage(language === 'hi' ? 'उत्कृष्ट! आपका ईमेल प्रारंभिक प्रवेश अलर्ट के लिए पंजीकृत है।' : language === 'gu' ? 'ઉત્કૃષ્ટ! તમારું ઇમેઇલ પ્રારંભિક પ્રવેશ ચેતવણીઓ માટે રજીસ્ટર થયેલ છે.' : 'Excellent! Your email is registered for early admission alerts.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error subscribing. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage(language === 'hi' ? 'त्रुटि! कृपया पुनः प्रयास करें।' : 'Error subscribing. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          disabled={status === 'loading' || status === 'success'}
          placeholder={language === 'hi' ? 'अपना ईमेल पता दर्ज करें' : language === 'gu' ? 'તમારું ઇમેઇલ સરનામું દાખલ કરો' : 'Enter your email address'}
          className="flex-grow px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 bg-white border border-transparent rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-semibold"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-700 text-blue-950 font-black text-xs uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer"
        >
          {status === 'loading' 
            ? (language === 'hi' ? 'सदस्यता ली जा रही है...' : language === 'gu' ? 'સબ્સ્ક્રાઇબ થઈ રહ્યું છે...' : 'Subscribing...') 
            : status === 'success' 
            ? (language === 'hi' ? 'सदस्यता ली गई!' : language === 'gu' ? 'સબ્સ્ક્રાઇબ થયું!' : 'Subscribed!') 
            : (language === 'hi' ? 'अलर्ट प्राप्त करें' : language === 'gu' ? 'ચેતવણી મેળવો' : 'Get Alerts')}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-[10px] text-red-300 font-semibold mt-1">⚠️ {message}</p>
      )}
      {status === 'success' && (
        <p className="text-[10px] text-green-300 font-bold mt-1">✓ {message}</p>
      )}
    </form>
  );
};

const MainContent: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="lg:col-span-3 space-y-16">
      {/* Education */}
      <section className="space-y-8">
        <h3 className="section-title text-primary-light text-[13px] font-black border-l-4 border-blue-900 pl-3 uppercase">
          {language === 'hi' ? 'शिक्षा और नवाचार' : language === 'gu' ? 'શિક્ષણ અને નવીનતા' : 'Education & Innovation'}
        </h3>
        
        {EDUCATION_ITEMS.length === 0 ? (
          <div className="space-y-8 mt-6">
            {/* Main Premium Announcement Banner */}
            <div className="relative overflow-hidden rounded-sm border border-blue-100 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white p-6 md:p-8 shadow-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-light/5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="bg-primary-light text-white p-4 rounded-sm shadow-md shrink-0">
                  <GraduationCap size={32} className="animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-surface text-primary text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      {language === 'hi' ? 'प्रवेश 2026-27' : language === 'gu' ? 'પ્રવેશ 2026-27' : 'Admissions 2026-27'}
                    </span>
                    <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={8} /> {language === 'hi' ? 'पाठ्यक्रम समीक्षा' : language === 'gu' ? 'અભ્યાસક્રમ સમીક્ષા' : 'Curriculum Review'}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif font-black text-blue-950 mb-2 leading-tight">
                    {language === 'hi' 
                      ? 'अकादमिक पाठ्यक्रम और प्रवेश जल्द ही शुरू हो रहे हैं' 
                      : language === 'gu'
                      ? 'શૈક્ષણિક અભ્યાસક્રમો અને પ્રવેશ ટૂંક સમયમાં આવી રહ્યા છે'
                      : 'Academic Curriculums & Admissions Coming Soon'}
                  </h4>
                  <p className="text-[13px] text-text-muted leading-relaxed max-w-2xl">
                    {language === 'hi'
                      ? 'हमारी प्रतिष्ठित शैक्षणिक परिषद वर्तमान में पाठ्यक्रम रूपरेखा को अंतिम रूप दे रही है जो पारंपरिक वैदिक ज्ञानमीमांसा को समकालीन वैज्ञानिक मॉडलों (एआई नैतिकता, क्वांटम तर्क और विरासत शासन) के साथ सहजता से एकीकृत करती है। सीधे प्रवेश आवेदन पोर्टल जल्द ही खुलेंगे।'
                      : language === 'gu'
                      ? 'અમારી પ્રતિષ્ઠિત શૈક્ષણિક પરિષદ હાલમાં અભ્યાસક્રમની રૂપરેખાને આખરી ઓપ આપી રહી છે જે પરંપરાગત વૈદિક જ્ઞાનમીમાંસાને સમકાલીન વૈજ્ઞાનિક મોડલ્સ (એઆઈ નૈતિકતા, ક્વોન્ટમ તર્ક અને વારસા શાસન) સાથે એકીકૃત કરે છે. સીધા પ્રવેશ અરજી પોર્ટલ ટૂંક સમયમાં ખુલશે.'
                      : 'Our distinguished academic council is currently finalizing course syllabi that seamlessly integrate traditional Vedic epistemology with contemporary scientific models (AI ethics, quantum logic, and heritage governance). Direct admission application portals will open shortly.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Programs Sneak Peek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: language === 'hi' 
                    ? "वैदिक अध्ययन और संस्कृत व्याख्याशास्त्र" 
                    : language === 'gu'
                    ? "વૈદિક અભ્યાસ અને સંસ્કૃત વ્યાખ્યાશાસ્ત્ર"
                    : "Vedic Studies & Sanskrit Hermeneutics",
                  desc: language === 'hi'
                    ? "पाठ्य विश्लेषण, संस्कृत ध्वन्यात्मकता और तुलनात्मक भारतीय दर्शन पर केंद्रित एक शास्त्रीय पाठ्यक्रम।"
                    : language === 'gu'
                    ? "ટેક્સ્ટ વિશ્લેષણ, સંસ્કૃત ધ્વનિશાસ્ત્ર અને તુલનાત્મક ભારતીય ફિલસૂફી પર કેન્દ્રિત એક શાસ્ત્રીય અભ્યાસક્રમ."
                    : "A classical curriculum focusing on textual analysis, Sanskrit phonetics, and comparative Indian philosophies.",
                  type: language === 'hi' ? "एकीकृत डिग्री" : language === 'gu' ? "એકીકૃત ડિગ્રી" : "Integrated Degree",
                  status: language === 'hi' ? "प्रवेश समीक्षाधीन" : language === 'gu' ? "પ્રવેશ સમીક્ષા હેઠળ" : "Admissions Under Review"
                },
                {
                  title: language === 'hi'
                    ? "वैदिक गणित और कम्प्यूटेशनल तर्क"
                    : language === 'gu'
                    ? "વૈદિક ગણિત અને કમ્પ્યુટેશનલ તર્ક"
                    : "Vedic Mathematics & Computational Logic",
                  desc: language === 'hi'
                    ? "आधुनिक कम्प्यूटेशनल तर्क और एआई आर्किटेक्चर के साथ प्राचीन गणितीय एल्गोरिदम और सूत्रों को जोड़ना।"
                    : language === 'gu'
                    ? "આધુનિક કમ્પ્યુટેશનલ તર્ક અને એઆઈ આર્કિટેક્ચર સાથે પ્રાચીન ગાણિતિક અલ્ગોરિધમ્સ અને સૂત્રોને જોડવા."
                    : "Bridging ancient mathematical algorithms and sutras with modern computational logic and AI architecture.",
                  type: language === 'hi' ? "प्रमाणपत्र और MOOC" : language === 'gu' ? "પ્રમાણપત્ર અને MOOC" : "Certificate & MOOC",
                  status: language === 'hi' ? "पाठ्यक्रम तैयार" : language === 'gu' ? "અભ્યાસક્રમ તૈયાર" : "Syllabus Curated"
                },
                {
                  title: language === 'hi'
                    ? "सांस्कृतिक विरासत और प्रबंधन में पीजी डिप्लोमा"
                    : language === 'gu'
                    ? "સાંસ્કૃતિક વારસો અને વ્યવસ્થાપનમાં પીજી ડિપ્લોમા"
                    : "PG Diploma in Cultural Heritage & Management",
                  desc: language === 'hi'
                    ? "भारत के जीवित विरासत स्थलों और ज्ञान प्रणालियों के लिए वैश्विक संरक्षक तैयार करने के लिए डिज़ाइन किया गया व्यावसायिक प्रशिक्षण।"
                    : language === 'gu'
                    ? "ભારતના જીવંત વારસાના સ્થળો અને જ્ઞાન પ્રણાલીઓ માટે વૈશ્વિક રક્ષકો તૈયાર કરવા માટે રચાયેલ વ્યાવસાયિક તાલીમ."
                    : "Professional training designed to raise global custodians for India's living heritage sites and knowledge systems.",
                  type: language === 'hi' ? "स्नातकोत्तर डिप्लोमा" : language === 'gu' ? "અનુસ્નાતક ડિપ્લોમા" : "Postgraduate Diploma",
                  status: language === 'hi' ? "प्रत्यायन चरण" : language === 'gu' ? "પ્રમાણીકરણ તબક્કો" : "Accreditation Phase"
                },
                {
                  title: language === 'hi'
                    ? "नेतृत्व विकास और वैदिक नैतिकता"
                    : language === 'gu'
                    ? "નેતૃત્વ વિકાસ અને વૈદિક નૈતિકતા"
                    : "Leadership Development & Vedic Ethics",
                  desc: language === 'hi'
                    ? "नैतिक शासन and धर्म के सिद्धांतों पर आधारित दूरदर्शी नेताओं की अगली पीढ़ी को तैयार करना।"
                    : language === 'gu'
                    ? "નૈતિક શાસન અને ધર્મના સિદ્ધાંતો પર આધારિત દૂરદર્શી નેતાઓની આગામી પેઢીને તૈયાર કરવી."
                    : "Preparing the next generation of visionary leaders grounded in the principles of ethical governance and dharma.",
                  type: language === 'hi' ? "कार्यकारी कोहॉर्ट" : language === 'gu' ? "એક્ઝિક્યુટિવ કોહોર્ટ" : "Executive Cohort",
                  status: language === 'hi' ? "संरचना को अंतिम रूप देना" : language === 'gu' ? "માળખાને આખરી ઓપ આપવો" : "Finalizing Structure"
                }
              ].map((prog, idx) => (
                <div key={idx} className="group relative bg-background border border-border-main hover:border-secondary/60 p-5 rounded-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-surface/50 -mr-8 -mt-8 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">{prog.type}</span>
                      <span className="text-[9px] font-black text-text-muted flex items-center gap-1">
                        <Clock size={10} className="text-amber-600 animate-spin" style={{ animationDuration: '8s' }} /> {prog.status}
                      </span>
                    </div>
                    <h5 className="text-[14px] font-serif font-black text-primary group-hover:text-blue-700 transition-colors mb-2 leading-tight">
                      {prog.title}
                    </h5>
                    <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-dashed border-border-main flex justify-between items-center text-[10px] font-bold text-primary-light/80">
                    <span className="flex items-center gap-1.5 group-hover:text-primary">
                      <Lock size={10} /> {language === 'hi' ? 'पाठ्यक्रम लॉक हो रहा है' : language === 'gu' ? 'અભ્યાસક્રમ લોક થઈ રહ્યો છે' : 'Course Syllabus Locking'}
                    </span>
                    <span className="text-gray-400 group-hover:text-primary transition-colors flex items-center gap-0.5 font-medium cursor-pointer">
                      {language === 'hi' ? 'मुझे सूचित करें' : language === 'gu' ? 'મને જાણ કરો' : 'Notify Me'} <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Email Subscription Interactive Widget */}
            <div className="bg-primary-dark text-white rounded-sm p-6 relative overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,85,165,0.15),transparent)] pointer-events-none"></div>
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
                <Mail size={160} />
              </div>
              
              <div className="relative z-10 max-w-xl">
                <h4 className="font-serif font-black text-base md:text-lg mb-2 text-amber-400">
                  {language === 'hi' ? 'सबसे पहले जानने वाले बनें' : language === 'gu' ? 'સૌથી પહેલા જાણો' : 'Be the First to Know'}
                </h4>
                <p className="text-[12px] text-white/90 leading-relaxed mb-4">
                  {language === 'hi'
                    ? 'प्राथमिकता प्रवेश सूचनाएं, डाउनलोड करने योग्य पाठ्यक्रम ब्रोशर और मुफ्त वेबिनार के शुरुआती निमंत्रण प्राप्त करने के लिए हमारे वीआईपी घोषणाएं न्यूज़लेटर में शामिल हों।'
                    : language === 'gu'
                    ? 'અગ્રતા પ્રવેશ સૂચનાઓ, ડાઉનલોડ કરવા યોગ્ય અભ્યાસક્રમ બ્રોશરો અને મફત વેબિનારોના પ્રારંભિક આમંત્રણો મેળવવા માટે અમારા વીઆઈપી ન્યૂઝલેટરમાં જોડાઓ.'
                    : 'Join our VIP announcements newsletter to receive priority admission notifications, downloadable course brochures, and early invites to free webinars.'}
                </p>
                <AdmissionsSubscribeForm />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {EDUCATION_ITEMS.map((edu, i) => (
              <div key={i} className="institutional-card group hover:border-blue-900 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between p-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="bg-primary-light text-white p-4 rounded-sm w-fit mb-6 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                  </div>
                  <h4 className="text-[15px] font-serif font-black text-primary leading-tight group-hover:text-blue-700 mb-3">
                    {edu.title.split('\n').map((line: string, idx: number) => <span key={idx} className="block">{line}</span>)}
                  </h4>
                  <p className="text-[12px] text-text-muted mb-6 font-medium italic">{edu.subtitle}</p>
                </div>

                <div className="relative z-10 pt-6 border-t border-border-main flex items-center justify-between">
                  {edu.new ? (
                    <div className="flex items-center gap-3">
                      <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase animate-pulse">New Admission</span>
                      <p className="text-[10px] text-green-700 font-bold">{edu.tag}</p>
                    </div>
                  ) : <div />}
                  <ArrowRight size={20} className="text-secondary-light group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-orange-50 p-6 md:p-10 rounded-sm border border-orange-100 mt-12">
           <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10">
              <div className="flex-1 text-center lg:text-left">
                 <h3 className="text-2xl font-serif font-black text-orange-900 mb-3">
                   {language === 'hi' ? 'वैदिक डिजिटल क्रांति में शामिल हों' : language === 'gu' ? 'વૈદિક ડિજિટલ ક્રાંતિમાં જોડાઓ' : 'Join the Vedic Digital Revolution'}
                 </h3>
                 <p className="text-[14px] text-orange-800/80 leading-relaxed max-w-xl">
                   {language === 'hi'
                     ? '\'वैदिक एआई नैतिकता\' पर हमारे आगामी MOOC का पता लगाएं और बुद्धिमान परंपरा के भविष्य का हिस्सा बनें।'
                     : language === 'gu'
                     ? '\'વૈદિક એઆઈ નૈતિકતા\' પરના અમારા આગામી MOOC ની શોધ કરો અને બુદ્ધિશાળી પરંપરાના ભવિષ્યનો હિસ્સો બનો.'
                     : 'Explore our upcoming MOOC on \'Vedic AI Ethics\' and be part of the future of intelligent tradition.'}
                 </p>
              </div>
              <button className="w-full lg:w-auto px-10 py-4 bg-accent text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-lg rounded-sm whitespace-nowrap cursor-pointer">
                {language === 'hi' ? 'अभी पंजीकरण करें' : language === 'gu' ? 'હમણાં જ નોંધણી કરો' : 'Register Now'}
              </button>
           </div>
        </div>
      </section>

      {/* Foundation Message Section */}
      <section className="bg-primary text-white p-6 md:p-10 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="flex-1">
            <h3 className="font-serif font-black text-2xl mb-6 border-l-4 border-secondary pl-4">
              {language === 'hi' ? 'फाउंडेशन संदेश' : language === 'gu' ? 'ફાઉન્ડેશન સંદેશ' : 'Foundation Message'}
            </h3>
            <p className="text-lg text-white leading-relaxed italic font-light">
              {language === 'hi'
                ? '"हमारा मिशन गुरुकुल प्रणाली के गहन ज्ञान को पुनर्जीवित करना और इसे आधुनिक वैज्ञानिक अन्वेषण की सटीकता के साथ एकीकृत करना है। हमारा मानना है कि परंपरा और तकनीक का अभिसरण वैश्विक कल्याण की कुंजी है।"'
                : language === 'gu'
                ? '"અમારો મિશન ગુરુકુલમ પ્રણાલીના ગહન જ્ઞાનને પુનર્જીવિત કરવાનો અને તેને આધુનિક સંશોધનની ચોકસાઈ સાથે એકીકૃત કરવાનો છે. અમારું માનવું છે કે પરંપરા અને ટેકનોલોજીનું મિલન વૈશ્વિક કલ્યાણની ચાવી છે."'
                : '"Our mission is to resurrect the profound wisdom of the Gurukulam system and integrate it with the precision of modern inquiry. We believe that the convergence of tradition and technology is the key to global well-being."'}
            </p>
          </div>
          <button className="w-full md:w-auto justify-center px-8 py-4 border-2 border-white/30 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all rounded-sm flex items-center gap-3 cursor-pointer">
            {language === 'hi' ? 'हमारा इतिहास जानें' : language === 'gu' ? 'અમારો ઇતિહાસ જાણો' : 'Learn Our History'} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
