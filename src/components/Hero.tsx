import React from 'react';
import { Phone, CalendarRange, Shield, Heart, Plane, Star } from 'lucide-react';
import BookingEngine from './BookingEngine';

interface HeroProps {
  targetDropoffId: string;
}

export default function Hero({ targetDropoffId }: HeroProps) {
  const scrollToCalculator = () => {
    const calc = document.getElementById('fare-calculator');
    if (calc) {
      calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] bg-[#050507] text-left pt-6 pb-20 flex items-center overflow-hidden">
      {/* Background radial glowing ambient light (luxury tech feel) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-400/[0.03] blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and bullet pitches */}
          <div className="space-y-6 lg:col-span-6 xl:col-span-7">
            
            {/* Glowing authority trust badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/5 border border-amber-400/25 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15e] text-amber-400">
                Wimborne Minster &bull; Poole &bull; Bournemouth &bull; Dorset
              </span>
            </div>

            {/* Core catchy headline */}
            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight">
              Premium Private Hire & <span className="text-gold-gradient">Specialist WAV Taxis</span>
            </h1>

            {/* Subheading focusing on exact user items */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              Dorset's dedicated cab operator. Providing council-licensed, badged wheelchair accessible vehicles (WAV), DBS-certified school runs, and comfortable airport, clinic, and hospital passenger transport with dignified care.
            </p>

            {/* Quick trust metrics row */}
            <div className="grid grid-cols-3 gap-4 border-y border-zinc-900 py-4 max-w-lg">
              <div className="space-y-0.5">
                <span className="block font-mono text-xl sm:text-2xl font-black text-white">4.9★</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Top Google Rated</span>
              </div>
              <div className="space-y-0.5 border-x border-zinc-900 px-4">
                <span className="block font-mono text-xl sm:text-2xl font-black text-white">100%</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">DBS & WAV Badges</span>
              </div>
              <div className="space-y-0.5 pl-2">
                <span className="block font-mono text-xl sm:text-2xl font-black text-white">Fixed</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Airport Quotes</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Tap to Call */}
              <a
                href="tel:004447757127214"
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-base font-bold bg-gold-gradient text-black hover:brightness-110 shadow-gold-heavy active:scale-95 transition tracking-wider font-mono cursor-pointer"
              >
                <Phone className="h-5 w-5 stroke-[2.5]" />
                Call 07757 127214
              </a>

              {/* Browse Services scroll anchor */}
              <button
                onClick={scrollToCalculator}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-extrabold border border-zinc-805 bg-zinc-950 hover:bg-zinc-90 w-full sm:w-auto hover:border-zinc-700 hover:text-white text-zinc-300 active:scale-95 transition cursor-pointer"
              >
                <CalendarRange className="h-5 w-5" />
                Plan Custom Route
              </button>
            </div>

            {/* Security Guarantee indicators */}
            <div className="flex items-center gap-4 text-[11px] text-zinc-500 pt-1 font-sans">
              <span className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-amber-500" /> Council Badges Approved
              </span>
              <span className="h-1.5 w-1.5 bg-zinc-800 rounded-full" />
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-amber-500" /> Assisted Passenger Care
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Booking Wizard Panel */}
          <div id="fare-calculator" className="lg:col-span-6 xl:col-span-5 w-full">
            <BookingEngine initialTargetDropoff={targetDropoffId} />
          </div>

        </div>
      </div>
    </section>
  );
}
