import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import PricingSection from './components/PricingSection';
import TestimonialsList from './components/TestimonialsList';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function App() {
  const [targetDropoffId, setTargetDropoffId] = useState<string>('');

  // Lifted state handler to pass chosen pricing route pre-sets up to the top visual form
  const handleSelectRoute = (routeId: string) => {
    setTargetDropoffId(routeId);
    
    // Smooth scroll the visitor back up to the form
    const element = document.getElementById('fare-calculator');
    if (element) {
      const offset = 110; // Spacing offset to center the form nicely on target devices
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

  return (
    <div id="wct-landing-app" className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-amber-450 selection:text-black">
      {/* Top Translucent Header */}
      <Navbar />

      {/* Main Stream of Sections */}
      <main id="wct-main-content">
        {/* Section 1: Dynamic Hero & Booking reserver */}
        <Hero targetDropoffId={targetDropoffId} />

        {/* Section 2: Services Grid (Wheelchair, Schools, etc) */}
        <ServicesGrid />

        {/* Section 3: Airport Fixed Pricing Indicators */}
        <PricingSection onSelectRoute={handleSelectRoute} />

        {/* Section 4: Customer Testimonials & Reviews */}
        <TestimonialsList />

        {/* Section 5: Expandable FAQ Guides */}
        <FaqSection />
      </main>

      {/* Dynamic Licensing and Address Footer */}
      <Footer />
    </div>
  );
}
