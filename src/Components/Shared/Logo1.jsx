import React from "react";

const Logo1 = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center gap-1">
        
        {/* N Letter */}
        <span className="text-4xl font-extrabold text-[#aa84fc] italic drop-shadow-sm">
          N
        </span>

        {/* Brand Name */}
        <span className="text-3xl font-bold tracking-wide  text-[#475669] font-[Poppins]">
          agorik
          <span className="text-[#aa84fc]">Sheba</span>
        </span>

      </div>
    </div>
  );
};

export default Logo1;
