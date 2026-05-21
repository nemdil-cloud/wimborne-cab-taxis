import React from 'react';
import { Mail, Phone, MapPin, Shield, Heart, Store, CalendarRange, Clock } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const operatingAreas = [
    'Wimborne Minster', 'Poole', 'Bournemouth', 'Dorset Coast', 
    'Broadstone', 'Corfe Mullen', 'Colehill', 'Parley', 'Ferndown'
  ];

  const quickLinks = [
    { name: 'Services Grid', href: '#services' },
    { name: 'Fare Estimator', href: '#fare-calculator' },
    { name: 'WAV Specialists', href: '#wav-specialist' },
    { name: 'Fixed Transverse', href: '#pricing-models' },
    { name: 'Customer Reviews', href: '#testimonials' },
    { name: 'Frequently FAQs', href: '#faq' }
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-left relative z-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand details and App Badges */}
          <div className="space-y-6">
            <Logo />
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Dorset's trusted choice for specialized private hire transfers. Offering Wheelchair-Accessible Vehicles (WAV), DBS-checked school runs, and fixed airport transfers since 2012.
            </p>

            {/* iOS & Android Badges Mockups */}
            <div className="space-y-3 pt-2">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[#FFE082]">
                Download Passenger App
              </span>
              <div className="flex flex-wrap gap-2.5">
                {/* App Store Badge SVG */}
                <a
                  href="#download"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition select-none cursor-pointer"
                  onClick={(e) => { e.preventDefault(); alert('The WCT Dorset App is arriving soon on the iOS App Store! Use our online dispatch wizard for booking now.'); }}
                >
                  <Store className="h-4 w-4 text-amber-500" />
                  <div className="text-left leading-none">
                    <span className="block text-[8px] text-zinc-500 uppercase">App Store</span>
                    <span className="text-[10px] font-bold tracking-tight">Soon for iOS</span>
                  </div>
                </a>

                {/* Google Play Store Badge SVG */}
                <a
                  href="#download"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition select-none cursor-pointer"
                  onClick={(e) => { e.preventDefault(); alert('The WCT Dorset App is arriving soon on Google Play! Use our online dispatch wizard for booking now.'); }}
                >
                  <Store className="h-4 w-4 text-amber-500" />
                  <div className="text-left leading-none">
                    <span className="block text-[8px] text-zinc-500 uppercase">Google Play</span>
                    <span className="text-[10px] font-bold tracking-tight">Soon for Android</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFE082] border-b border-zinc-900 pb-2">
              Private Hire Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-amber-400 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Operating Districts */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFE082] border-b border-zinc-900 pb-2">
              Dorset Service Towns
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {operatingAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-850 text-zinc-300 hover:text-amber-400 hover:border-amber-400/20 transition cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              <span>Full East Dorset Transfers</span>
            </div>
          </div>

          {/* Column 4: Main Contact Details */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-[#FFE082] border-b border-[#18181a] pb-2">
              Contact Dispatch
            </h4>
            
            <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-300">
              {/* Phone Line */}
              <a
                href="tel:004447757127214"
                className="flex items-center gap-3 group text-zinc-300 hover:text-amber-300 transition"
              >
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:bg-amber-400/10 transition-colors">
                  <Phone className="h-4.5 w-4.5 text-amber-500" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-sans font-medium text-zinc-500">24/7 Phone bookings</span>
                  <span className="text-sm font-bold tracking-wider">07757 127214</span>
                </div>
              </a>

              {/* Email Line */}
              <a
                href="mailto:info@taxi-bournemouth.com"
                className="flex items-center gap-3 group text-zinc-300 hover:text-amber-300 transition"
              >
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:bg-amber-400/10 transition-colors">
                  <Mail className="h-4.5 w-4.5 text-amber-500" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-sans font-medium text-zinc-500">Email Enquiries</span>
                  <span className="text-xs font-bold font-sans block truncate max-w-[190px]">info@taxi-bournemouth.com</span>
                </div>
              </a>
            </div>

            <div className="text-[11px] text-zinc-500 space-y-2 pt-2 border-t border-zinc-900">
              <div className="flex items-start gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Pre-bookings operating 24 hours daily. Office hours: 07:00 – 23:00.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Banner: Legal Disclaimers & Licenses */}
        <div className="pt-8 mt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-amber-500" /> Badged Dorset Council Private Hire Operators</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-amber-500" /> DBS-Checked Drivers</span>
          </div>

          <p className="text-center sm:text-right">
            &copy; {currentYear} Wimborne Cab Taxis (WCT). All Rights Reserved. info@taxi-bournemouth.com.
          </p>
        </div>
      </div>
    </footer>
  );
}
