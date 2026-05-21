import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = 'h-12', showText = true }: LogoProps) {
  // Use the exact path to the generated image with proper cache-safety
  const logoSrc = "/src/assets/images/wct_logo_1779376745998.png";

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative group flex-shrink-0">
        {/* Glow backdrop effect */}
        <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full group-hover:bg-amber-400/30 transition-all duration-300" />
        
        {/* Logo Image */}
        <img
          src={logoSrc}
          alt="Wimbore Cab Taxis WCT Logo"
          className={`${className} relative z-10 rounded-full border border-amber-400/35 shadow-gold-soft bg-black object-contain transition-transform duration-500 group-hover:scale-105`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback inside in case image is hard to render, preserving the exact luxury branding
            e.currentTarget.style.display = 'none';
            const textFallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
            if (textFallback) {
              (textFallback as HTMLElement).style.display = 'flex';
            }
          }}
        />

        {/* Dynamic Vector Fallback if image has issues loading */}
        <div 
          className="logo-fallback hidden flex-col items-center justify-center p-1 font-display w-12 h-12 rounded-full border-2 border-amber-400 bg-black text-amber-400 text-xs font-bold leading-none select-none z-10"
          style={{ display: 'none' }}
        >
          <span className="text-[10px] tracking-widest text-[#FFE082]">WCT</span>
          <span className="text-[7px] text-gray-400 mt-0.5">CAB</span>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-display text-lg sm:text-xl font-bold tracking-wider bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Wimborne Cab
          </span>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#FFE082] uppercase font-bold">
              TAXIS & WAV
            </span>
            <span className="h-1 w-1 rounded-full bg-amber-400" />
            <span className="font-sans text-[8px] text-zinc-400 tracking-wider">
              DORSET
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
