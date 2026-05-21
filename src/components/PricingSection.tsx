import React from 'react';
import { Plane, Ship, Anchor, Train, ChevronRight, Check, CheckCircle2 } from 'lucide-react';

interface PricingSectionProps {
  onSelectRoute: (routeId: string) => void;
}

export default function PricingSection({ onSelectRoute }: PricingSectionProps) {
  // Static lists of popular fixed routes
  const popularTrips = [
    {
      id: 'bournemouth-airport',
      name: 'Bournemouth Airport (BOH)',
      type: 'airport',
      icon: Plane,
      fromCity: 'Wimborne Towns',
      sedanPrice: 25.00,
      execPrice: 40.00,
      wavPrice: 32.00,
      minPrice: 45.00,
      distance: '8.2 Miles',
      time: '15 mins'
    },
    {
      id: 'heathrow-airport',
      name: 'London Heathrow Airport (LHR)',
      type: 'airport',
      icon: Plane,
      fromCity: 'East Dorset Region',
      sedanPrice: 180.00,
      execPrice: 245.00,
      wavPrice: 215.00,
      minPrice: 280.00,
      distance: '88.4 Miles',
      time: '1 hr 35 mins'
    },
    {
      id: 'gatwick-airport',
      name: 'London Gatwick Airport (LGW)',
      type: 'airport',
      icon: Plane,
      fromCity: 'East Dorset Region',
      sedanPrice: 210.00,
      execPrice: 290.00,
      wavPrice: 245.00,
      minPrice: 320.00,
      distance: '104.2 Miles',
      time: '1 hr 55 mins'
    },
    {
      id: 'southampton-port',
      name: 'Southampton Cruise Terminal',
      type: 'port',
      icon: Anchor,
      fromCity: 'Wimborne & Poole',
      sedanPrice: 75.00,
      execPrice: 115.00,
      wavPrice: 95.00,
      minPrice: 130.00,
      distance: '34.1 Miles',
      time: '45 mins'
    }
  ];

  return (
    <section id="pricing-models" className="py-20 bg-[#0a0a0c] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-amber-500 bg-amber-500/5 px-3.5 py-1.5 rounded-full border border-amber-500/10">
            Guaranteed Estimates
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white animate-fadeIn">
            Fixed Airport & Long Distance Rates
          </h2>
          <p className="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Enjoy fixed-price security. We offer locked quotes for popular airport transfers and ports with complimentary flight tracking and meet & greet. No hidden delays surcharge.
          </p>
        </div>

        {/* Dynamic Bento Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {popularTrips.map((trip) => {
            const IconComp = trip.icon;
            return (
              <div
                key={trip.id}
                className="bg-zinc-950 rounded-2xl border border-zinc-800/80 p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-amber-400/20 shadow-gold-glow-hover"
              >
                <div>
                  {/* Header Title segment */}
                  <div className="flex items-start justify-between gap-4 border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-amber-400/10 text-[#FFE082] rounded-xl border border-amber-400/15">
                        <IconComp className="h-5w-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-display font-black text-lg text-white tracking-wide">
                          {trip.name}
                        </h3>
                        <span className="text-xs text-zinc-500 font-medium">
                          From {trip.fromCity} &bull; {trip.distance} ({trip.time})
                        </span>
                      </div>
                    </div>
                    {/* Status badge */}
                    <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                      Calculated Fixed Est
                    </span>
                  </div>

                  {/* Prices Columns */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 text-center">
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Standard</span>
                      <span className="font-mono text-[#FFE082] font-extrabold text-[#FFE082] text-lg sm:text-xl">£{trip.sedanPrice}</span>
                    </div>

                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 text-center ring-1 ring-[#FFE082]/10">
                      <span className="block text-[10px] uppercase font-bold text-amber-400 mb-1">Executive</span>
                      <span className="font-mono text-white font-extrabold text-lg sm:text-xl">£{trip.execPrice}</span>
                    </div>

                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 text-center">
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">♿ WAV Wheelchair</span>
                      <span className="font-mono text-[#FFE082] font-extrabold text-lg sm:text-xl">£{trip.wavPrice}</span>
                    </div>

                    <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 text-center">
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">8-Seater</span>
                      <span className="font-mono text-white font-extrabold text-lg sm:text-xl">£{trip.minPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Action CTA bar */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Includes Flight Tracking</span>
                  </div>

                  <button
                    onClick={() => onSelectRoute(trip.id)}
                    className="flex items-center gap-1 text-xs font-bold font-sans px-4 py-2 bg-amber-500/10 border border-amber-400/20 text-[#FFE082] rounded-xl hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
                  >
                    Select & Book Route
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing structural transparency indicators */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center bg-zinc-900/20 p-6 rounded-2xl border border-zinc-900">
          <div className="space-y-1">
            <span className="block text-sm font-bold text-white">No Surge Pricing</span>
            <p className="text-xs text-zinc-500">Fixed rate bookings remain identical regardless of bad weather or high traffic times.</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-zinc-900 pt-4 sm:pt-0">
            <span className="block text-sm font-bold text-white">45-Min Free Airport Waiting</span>
            <p className="text-xs text-zinc-500">Complimentary 45-minute airport parking and driver waiting window once flight lands.</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 pt-4 sm:pt-0">
            <span className="block text-sm font-bold text-white">Fully Cashless Payments</span>
            <p className="text-xs text-zinc-500">Pay inside vehicles using Visa, Mastercard, AMEX, Apple Pay or contactless card machines.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
