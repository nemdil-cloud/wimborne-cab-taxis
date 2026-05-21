import React, { useState } from 'react';
import { Star, MessageSquareCode, BadgeCheck, ChevronRight, User } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsList() {
  const [filterService, setFilterService] = useState<string>('all');

  // Service list filter categories
  const categories = [
    { label: 'All Customer Reviews', id: 'all' },
    { label: 'Specialist WAV', id: 'Special Need WAV Transfer' },
    { label: 'Business & Airports', id: 'Airport Business Transfer' },
    { label: 'Hospitals & Care', id: 'Hospital & Care Companion' }
  ];

  const filteredReviews = filterService === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.serviceType === filterService);

  return (
    <section id="testimonials" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title blocks */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left space-y-3 max-w-2xl">
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-amber-400 bg-amber-400/5 px-3.5 py-1.5 rounded-full border border-amber-400/10 w-fit">
              Dorset Reviews
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Loved By The Communities We Serve
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Find out why families, businesses, and clinics across Wimborne, Poole, and greater Dorset trust Wimborne Cab Taxis for essential everyday transfers.
            </p>
          </div>

          {/* Review Stats badge */}
          <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl w-fit">
            <div className="text-left font-sans">
              <span className="block text-2xl font-black text-amber-400 leading-none">4.9 / 5</span>
              <span className="text-[10px] text-zinc-500 font-semibold tracking-wider">Independent Rating</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current stroke-0" />
                ))}
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">100% Verified Trips</span>
            </div>
          </div>
        </div>

        {/* Categories togglers */}
        <div className="flex gap-2 pb-4 overflow-x-auto no-scrollbar mb-10 border-b border-zinc-900/60 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterService(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterService === cat.id
                  ? 'bg-amber-400 text-black shadow-md font-bold'
                  : 'bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 min-h-[220px]">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/30 border border-zinc-800/85 p-6 sm:p-8 rounded-2xl flex flex-col justify-between gap-6 transition hover:border-zinc-700/60 hover:bg-zinc-900/40 shadow-sm"
            >
              <div className="space-y-4">
                {/* Stars row */}
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-400">
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current stroke-0" />
                    ))}
                  </div>
                  
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700/30">
                    Verified Customer
                  </span>
                </div>

                {/* Comment Body */}
                <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Bottom detail row */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-400/10 border border-amber-400/10 text-[#FFE082] flex items-center justify-center font-bold">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  
                  <div className="text-left">
                    <span className="block text-sm font-bold text-white">{item.name}</span>
                    <span className="block text-[11px] text-zinc-500">{item.location}, Dorset</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{item.serviceType}</span>
                  <span className="text-[10px] text-zinc-500 leading-none">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
