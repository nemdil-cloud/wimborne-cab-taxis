import React from 'react';
import * as Icons from 'lucide-react';
import { SERVICES } from '../data';

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-amber-400 bg-amber-400/5 px-3.5 py-1.5 rounded-full border border-amber-400/10">
            Dorset Private Hire Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Specialized Transport Tailored For You
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            From specialized Wheelchair Accessible Vehicles (WAV) to executive airport transfers, Wimborne Cab Taxis provides secure, punctual, and highly assisted travel.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => {
            // Dynamically import matching Lucide Icons safely
            const IconName = service.iconName;
            const IconComponent = (Icons as any)[IconName] || Icons.Car;
            const isWAV = service.id === 'special-needs';

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-6 sm:p-8 bg-zinc-900/40 border transition-all duration-300 shadow-gold-glow-hover flex flex-col justify-between ${
                  isWAV 
                    ? 'border-amber-400/45 bg-amber-400/[0.02] ring-1 ring-amber-400/20 md:col-span-2 lg:col-span-1 shadow-gold-soft' 
                    : 'border-zinc-800/80 hover:border-zinc-700/60'
                }`}
              >
                <div className="space-y-4">
                  {/* Icon Box */}
                  <div className={`p-3.5 rounded-xl w-fit transition-all duration-300 ${
                    isWAV 
                      ? 'bg-amber-400 text-black group-hover:scale-105' 
                      : 'bg-zinc-800/60 text-amber-400 group-hover:bg-amber-400 group-hover:text-black'
                  }`}>
                    <IconComponent className="h-6 w-6 stroke-[2]" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold font-display text-white tracking-wide group-hover:text-amber-400 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Additional contextual visual attributes */}
                <div className="mt-6 pt-4 border-t border-zinc-950/40 flex items-center justify-between text-xs">
                  {isWAV ? (
                    <div className="flex items-center gap-1.5 text-[#FFE082] font-semibold text-[11px] uppercase tracking-wide">
                      <Icons.Heart className="h-3.5 w-3.5 fill-current animate-pulse text-amber-400" />
                      WAV Badge Certified
                    </div>
                  ) : (
                    <span className="text-zinc-500 font-medium">Licensed Operators</span>
                  )}
                  <span className="text-amber-500 hover:text-amber-400 font-semibold group-hover:translate-x-1.5 transition-transform duration-200 inline-flex items-center gap-1 cursor-pointer">
                    Book Service <Icons.ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Core Accessibility Promise Banner */}
        <div id="wav-specialist" className="mt-16 bg-gradient-to-r from-zinc-900/90 to-zinc-950/70 p-6 sm:p-8 lg:p-10 rounded-3xl border border-amber-400/20 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-gold-soft">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400 border border-amber-400/20">
                <Icons.Accessibility className="h-5 w-5" />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFE082]">
                Our Specialty: Wheelchair WAV Care
              </span>
            </div>
            
            <h3 className="font-display text-xl sm:text-2xl font-black text-white">
              Pristine Wheelchair Accessible Vehicles (WAV)
            </h3>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              We understand that transporting special needs passengers requires specialized vehicles and patience. Our WAV taxis have non-slip low-gradient assistance ramps, safety harnesses, and drivers who hold active Dorset licensing badges. We proudly support GP, hospital clinic visits, social club drives, and disabled transfers with dignified care.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5"><Icons.ShieldCheck className="h-4 w-4 text-amber-400" /> Council Badged WAV & DBS Checked</span>
              <span className="flex items-center gap-1.5"><Icons.Heart className="h-4 w-4 text-amber-400" /> Dedicated Passenger Escorts</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto">
            <a
              href="tel:004447757127214"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border border-amber-400/20 text-[#FFE082] bg-zinc-950 hover:bg-zinc-900/80 active:scale-95 transition text-sm text-center font-mono tracking-wider cursor-pointer"
            >
              <Icons.Phone className="h-4.5 w-4.5" />
              07757 127214 WAV Hotline
            </a>
            
            <button
              onClick={() => {
                const calc = document.getElementById('fare-calculator');
                if (calc) {
                  calc.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  // Find wheelchair checkbox in state (BookingEngine will read isWheelchairRequired as true if we set a trigger, wait we have a standard anchor scroll)
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-gold-gradient text-black hover:brightness-110 active:scale-95 transition text-sm cursor-pointer"
            >
              <Icons.Sparkles className="h-4.5 w-4.5" />
              Book Accessibility Ride Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
