import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, LifeBuoy, Mail, Phone, ExternalLink } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-[#0a0a0c] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-amber-500 bg-amber-500/5 px-3.5 py-1.5 rounded-full border border-amber-500/10">
            Assurance & Help
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Review licensing rules, wheelchair accessible certifications, airport transfer guarantees, and dispatch policies below.
          </p>
        </div>

        {/* Layout: Sidebar and FAQ List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Contact support box */}
          <div className="bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-zinc-800/80 space-y-6 text-left shadow-gold-soft">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/15">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-lg text-white">Need Custom Assistance?</span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              If you require a complex multi-car school run contract, an ongoing GP surgery transport schedule, or have unique accessibility queries, our Dorset dispatcher is happy to advise.
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-900 font-mono text-sm">
              <a
                href="tel:004447757127214"
                className="flex items-center gap-3 group text-[#FFE082] hover:text-amber-300 transition"
              >
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-amber-400/10 transition-colors">
                  <Phone className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-sans tracking-wide text-zinc-500">Call Operations</span>
                  <span className="text-sm font-semibold">07757 127214</span>
                </div>
              </a>

              <a
                href="mailto:info@taxi-bournemouth.com"
                className="flex items-center gap-3 group text-[#FFE082] hover:text-amber-300 transition"
              >
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:bg-amber-400/10 transition-colors">
                  <Mail className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-sans tracking-wide text-zinc-500">Email Enquiries</span>
                  <span className="text-xs font-semibold truncate max-w-[190px] block">info@taxi-bournemouth.com</span>
                </div>
              </a>
            </div>

            <div className="pt-4 mt-2">
              <span className="block text-[10px] uppercase font-sans tracking-widest text-zinc-500 mb-2">Our Operating Hubs</span>
              <div className="flex flex-wrap gap-1.5">
                {['Wimborne', 'Poole', 'Bournemouth', 'Dorset Coast'].map((h) => (
                  <span key={h} className="text-[9px] bg-zinc-900 px-2 py-1 rounded text-zinc-400 border border-zinc-850">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Accordion */}
          <div className="lg:col-span-2 space-y-4 text-left">
            {FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen 
                      ? 'border-amber-400/35 bg-zinc-900/20' 
                      : 'border-zinc-800/80 bg-zinc-950 hover:border-zinc-700/60'
                  }`}
                >
                  {/* Anchor Header Button */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus:text-amber-400 group cursor-pointer"
                  >
                    <span className="font-display font-extrabold text-[#FFE082] py-1 text-sm sm:text-base pr-4 leading-snug group-hover:text-amber-400 transition-colors">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </span>
                  </button>

                  {/* Collapsible Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-[300px] border-t border-zinc-900' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 sm:p-6 text-sm text-zinc-400 leading-relaxed font-normal bg-zinc-900/10">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
