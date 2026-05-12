import React from 'react';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-white">
      {/* Main Header */}
      <div className="py-6 shadow-sm">
        <div className="institutional-container flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Triyambakam Logo" className="h-20 lg:h-28 w-auto hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Center: Text */}
          <div className="text-center flex-1 px-2 lg:px-4 w-full">
            <h1 className="text-2xl font-serif font-bold text-[#006400] leading-tight tracking-wide">त्र्यंबकम गुरुकुलम एसोसिएशन</h1>
            <h2 className="text-lg font-serif font-bold text-[#006400] tracking-tight">Triyambakam Gurukulam Association</h2>
            <p className="text-[11px] text-gray-500 font-semibold mt-1 uppercase tracking-widest">(A Premier Educational Research & Cultural Academy)</p>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-xl hover:-translate-y-1">
              Donate Now
            </button>
            <img src={logo} alt="Secondary Logo" className="h-16 w-auto opacity-40 grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
