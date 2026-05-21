import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarRange, Mail } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { title: 'Our Services', id: 'services' },
    { title: 'Interactive Fare Calculator', id: 'fare-calculator' },
    { title: 'Wheelchair WAV', id: 'wav-specialist' },
    { title: 'Reviews', id: 'testimonials' },
    { title: 'FAQs & Support', id: 'faq' }
  ];

  return (
    <>
      <nav
        id="wct-main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0c]/95 backdrop-blur-md py-3 shadow-lg border-b border-amber-400/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Logo />
            </div>

            {/* Desktop Navigation Links (Centered) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-amber-400 focus:text-amber-400 transition-colors duration-200 cursor-pointer rounded-md hover:bg-zinc-900/40"
                >
                  {link.title}
                </button>
              ))}
            </div>

            {/* Desktop CTAs (Right) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Telephone Hook */}
              <a
                href="tel:004447757127214"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-all duration-200 group border border-amber-400/20 rounded-lg hover:border-amber-400/40 hover:bg-amber-400/5"
              >
                <div className="p-1.5 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div className="text-left font-mono">
                  <span className="block text-[10px] uppercase font-sans tracking-wide text-zinc-400 leading-none">Call Dispatcher</span>
                  <span className="text-sm font-semibold tracking-wider">07757 127214</span>
                </div>
              </a>

              {/* Book Button */}
              <button
                onClick={() => scrollToSection('fare-calculator')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-gold-gradient text-black hover:brightness-110 shadow-gold-soft hover:shadow-gold-soft active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <CalendarRange className="h-4 w-4" />
                Book Online
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="tel:004447757127214"
                className="p-2.5 rounded-lg bg-amber-400/15 border border-amber-400/20 text-amber-400 active:scale-95 transition-transform"
                aria-label="Call Dispatch"
              >
                <Phone className="h-5 w-5" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 active:scale-95 transition-transform cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Panel with proper overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-[73px] z-40 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out border-t border-zinc-900 ${
            isOpen ? 'translate-x-0' : 'translate-x-[100%]'
          }`}
        >
          <div className="flex flex-col h-[calc(100vh-80px)] p-6 justify-between select-none">
            {/* Nav List */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#FFE082] mb-4 opacity-50">
                Quick Navigation
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full text-left py-3.5 px-4 text-base font-medium rounded-xl text-zinc-200 hover:text-amber-400 active:bg-zinc-900 hover:bg-zinc-900 border border-transparent hover:border-zinc-800/50 transition-all duration-200 cursor-pointer"
                >
                  {link.title}
                </button>
              ))}
            </div>

            {/* Mobile Contact & Booking Actions */}
            <div className="space-y-4 border-t border-zinc-900 pt-6 pb-12">
              <a
                href="tel:004447757127214"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold bg-neutral-900 border border-amber-400/35 text-amber-400 hover:bg-zinc-900 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span className="font-mono tracking-wider text-lg">07757 127214</span>
              </a>

              <button
                onClick={() => scrollToSection('fare-calculator')}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold bg-gold-gradient text-black hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <CalendarRange className="h-5 w-5" />
                Book / Fare Quote
              </button>

              <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs text-center">
                <Mail className="h-3.5 w-3.5" />
                <span>info@taxi-bournemouth.com</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to push content down when Nav is fixed */}
      <div className="h-20 lg:h-24" />
    </>
  );
}
