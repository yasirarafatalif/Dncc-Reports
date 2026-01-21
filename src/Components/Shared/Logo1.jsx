import React from "react";

const Logo1 = () => {
  return (
    <div className="flex justify-center items-center group cursor-pointer">
      <div className="relative flex items-center gap-3 px-4  rounded-2xl transition-all duration-500 ">
        
        {/* Animated Brand Icon */}
        <div className="relative">
          {/* Background Decorative Ring */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-[#aa84fc] to-[#4ade80] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main Box */}
          <div className="relative flex items-center justify-center w-14 h-14 bg-[#1e293b] rounded-xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[#aa84fc] italic">
              N
            </span>
            
            {/* Minimalist Dot/Accent */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#4ade80] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Brand Name & Tagline */}
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-3xl font-black tracking-tighter text-secondary font-[Poppins]">
              Nagorik
            </span>
            <span className="text-3xl font-light tracking-tighter text-[#aa84fc] font-[Poppins]">
              Sheba
            </span>
          </div>
          
          {/* Bottom Progress-style underline */}
          <div className="h-1 w-0 bg-gradient-to-r from-[#aa84fc] to-[#4ade80] rounded-full transition-all duration-500 group-hover:w-full"></div>
          
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mt-1">
            Smart Citizen Hub
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo1;