import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { EDUCATION_ITEMS } from '../data/siteData';

const MainContent: React.FC = () => {
  return (
    <div className="lg:col-span-3 space-y-16">
      {/* Education */}
      <section className="space-y-8">
        <h3 className="section-title text-[#0055a5] text-[13px] font-black border-l-4 border-blue-900 pl-3 uppercase">
          Education & Innovation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {EDUCATION_ITEMS.map((edu, i) => (
            <div key={i} className="institutional-card group hover:border-blue-900 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between p-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-[#0055a5] text-white p-4 rounded-sm w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <h4 className="text-[15px] font-serif font-black text-blue-900 leading-tight group-hover:text-blue-700 mb-3">
                  {edu.title.split('\n').map((line, idx) => <span key={idx} className="block">{line}</span>)}
                </h4>
                <p className="text-[12px] text-gray-500 mb-6 font-medium italic">{edu.subtitle}</p>
              </div>

              <div className="relative z-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                {edu.new ? (
                  <div className="flex items-center gap-3">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-sm uppercase animate-pulse">New Admission</span>
                    <p className="text-[10px] text-green-700 font-bold">{edu.tag}</p>
                  </div>
                ) : <div />}
                <ArrowRight size={20} className="text-blue-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50 p-6 md:p-10 rounded-sm border border-orange-100 mt-12">
           <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-10">
              <div className="flex-1 text-center lg:text-left">
                 <h3 className="text-2xl font-serif font-black text-orange-900 mb-3">Join the Vedic Digital Revolution</h3>
                 <p className="text-[14px] text-orange-800/80 leading-relaxed max-w-xl">
                    Explore our upcoming MOOC on 'Vedic AI Ethics' and be part of the future of intelligent tradition.
                 </p>
              </div>
              <button className="w-full lg:w-auto px-10 py-4 bg-orange-600 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-lg rounded-sm whitespace-nowrap">
                Register Now
              </button>
           </div>
        </div>
      </section>

      {/* Foundation Message Section */}
      <section className="bg-blue-900 text-white p-6 md:p-10 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="flex-1">
            <h3 className="font-serif font-black text-2xl mb-6 border-l-4 border-orange-500 pl-4">Foundation Message</h3>
            <p className="text-lg text-blue-100 leading-relaxed italic font-light">
              "Our mission is to resurrect the profound wisdom of the Gurukulam system and integrate it with the precision of modern inquiry. We believe that the convergence of tradition and technology is the key to global well-being."
            </p>
          </div>
          <button className="w-full md:w-auto justify-center px-8 py-4 border-2 border-white/30 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-all rounded-sm flex items-center gap-3">
            Learn Our History <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainContent;
