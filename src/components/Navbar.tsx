import React, { useState } from 'react';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import { NAV_MAIN, NAV_SECONDARY } from '../data/siteData';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 shadow-lg relative">
      {/* Primary Navigation */}
      <div className="bg-[#0055a5] text-white relative z-20">
        <div className="institutional-container">
          <div className="flex items-center justify-between lg:justify-start">
            
            <div className="flex items-center lg:flex-wrap overflow-x-auto no-scrollbar lg:overflow-visible flex-1 lg:flex-none">
              <div className="p-4 border-r border-white/10 hover:bg-[#003366] transition-colors cursor-pointer group">
                <Globe size={16} className="group-hover:rotate-12 transition-transform" />
              </div>
              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center">
                {NAV_MAIN.map((item, i) => (
                  <div key={i} className="px-5 py-4 text-[11px] font-bold border-r border-white/10 hover:bg-[#003366] transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap group">
                    {item} 
                    <ChevronDown size={10} className="group-hover:translate-y-0.5 transition-transform opacity-70" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div 
              className="lg:hidden p-4 cursor-pointer hover:bg-[#003366] transition-colors flex items-center gap-2 font-bold text-xs tracking-wider"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              MENU {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#004a8f] border-t border-white/10 shadow-2xl z-10 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col">
            {NAV_MAIN.map((item, i) => (
              <div key={i} className="px-6 py-4 text-xs font-bold border-b border-white/10 hover:bg-[#003366] transition-colors cursor-pointer flex items-center justify-between text-white tracking-wide">
                {item}
                <ChevronDown size={14} className="opacity-70" />
              </div>
            ))}
            <div className="bg-[#003366] p-6 grid grid-cols-2 gap-y-6 gap-x-4">
               {NAV_SECONDARY.map((item, i) => (
                 <span key={i} className="text-[10px] font-bold text-white/80 hover:text-white cursor-pointer uppercase tracking-wider">
                   {item}
                 </span>
               ))}
               <button className="col-span-2 mt-2 bg-orange-600 text-white px-4 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all text-center shadow-xl">
                 Donate Now
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Navigation */}
      <div className="hidden lg:block bg-[#003366] py-2 border-t border-white/5">
        <div className="institutional-container flex gap-6 text-[10px] font-bold text-white/80">
          {NAV_SECONDARY.map((item, i) => (
            <span key={i} className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 transition-all group-hover:w-full"></span>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
