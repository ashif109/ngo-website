import React from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { CAPACITY_PROGRAMS } from '../../data/siteData';

const ForthcomingPrograms: React.FC = () => {
  return (
    <section className="bg-[#002147] py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-2xl -ml-32 -mb-32"></div>

      <div className="institutional-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-[0.2em] mb-3">
              <Calendar size={16} /> Knowledge Calendar 2026
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-white leading-tight">
              Forthcoming <span className="text-orange-500">Programmes</span>
            </h2>
          </div>
          <button className="px-6 py-3 border border-blue-400/30 text-blue-100 hover:bg-white hover:text-blue-900 transition-all text-[11px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2">
            View All Events <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPACITY_PROGRAMS.slice(0, 4).map((prog, i) => (
            <div 
              key={i} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-sm hover:bg-white/10 transition-all group cursor-pointer border-l-4 border-orange-500"
              onClick={() => {
                if (prog.link) window.open(prog.link, '_blank');
              }}
            >
              <div className="mb-4 text-orange-500">
                <BookOpen size={24} />
              </div>
              <p className="text-blue-100 text-[13px] font-medium leading-relaxed group-hover:text-white transition-colors whitespace-pre-line">
                {prog.text}
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Read More</span>
                <ArrowRight size={14} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForthcomingPrograms;
