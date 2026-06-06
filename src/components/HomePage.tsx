import React, { useState, useEffect } from 'react';
import { SareeProduct } from '../types';
import { ArrowRight, Sparkles, Compass, BookOpen, Feather } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  products: SareeProduct[];
  onQuickView: (product: SareeProduct) => void;
  onAddToCart: (product: SareeProduct) => void;
  setCurrentPage: (page: 'home' | 'shop' | 'lookbook' | 'masterclass') => void;
  onOpenQuickGuide: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onQuickView,
  onAddToCart,
  setCurrentPage,
  onOpenQuickGuide,
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track scroll for the premium "Section Stacking Card" effect
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const percentage = (window.scrollY / totalHeight) * 100;
      setScrollPercent(percentage);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styleTips = [
    {
      title: "The Blazer Clash",
      desc: "Drape 'The Electric Aubergine' under a structured modern teal blazer for a sharp, editorial posture."
    },
    {
      title: "Modern Corsetry",
      desc: "Swap the classical petticoat blouse with a modern matte obsidian black corset to accentuate the sheer organza fall."
    },
    {
      title: "Terracotta Monotones",
      desc: "Use minimal clay earrings and matching earthy makeup to let the raw Banarasi silk speak for itself."
    }
  ];

  const currentTip = styleTips[currentTipIndex];

  // 1. New Arrival Section Products
  const newArrivalProducts = products.filter(p => p.tag === 'New Arrival' || p.id === 'sd-002' || p.id === 'sd-005');

  // 2. Best Selling Saree Section Products
  const bestSellingProducts = products.slice(0, 3);

  // 3. Softy, Airy, Comfortable Section Products
  const softAiryComfortableProducts = products.filter(p => 
    p.drapingDifficulty === 'Beginner' || 
    p.fabric.toLowerCase().includes('organza') || 
    p.fabric.toLowerCase().includes('cotton') ||
    p.fabric.toLowerCase().includes('georgette')
  ).slice(0, 3);



  return (
    <div className="space-y-12 animate-fade-in pb-16">
      
      {/* Magazine-style Asymmetrical Hero Banner */}
      <section className="relative bg-parchment px-4 sm:px-6 lg:px-8 border-b border-subtle-grey min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          
          {/* Editorial Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5 md:space-y-6">

              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-plum tracking-tight leading-[0.95] font-serif">
                Sovereignty <br />
                <span className="text-teal italic font-medium">In Six</span> <br />
                Yards.
              </h1>

              <p className="text-sm md:text-base text-mauve font-light max-w-lg leading-relaxed">
                Welcome to SaareeDrapes, a high-fashion publishing of modern ethnic luxury. We design using unbleached <span className="text-plum font-semibold">Raw Parchment</span> silks, clashing against <span className="text-teal font-semibold">Electric Teal</span> and <span className="text-terracotta font-semibold">Burnt Terracotta</span>.
              </p>

              {/* Dynamic Stylist Tip Slider */}
              <div className="bg-elevated border border-subtle-grey p-3 md:p-4 shadow-sm max-w-md">
                <div className="flex justify-between items-center text-[9px] font-bold tracking-widest text-terracotta uppercase mb-2 font-sans">
                  <span>EDITORIAL BOARD STYLING TIP</span>
                  <button 
                    onClick={() => setCurrentTipIndex((prev) => (prev + 1) % styleTips.length)}
                    className="text-teal hover:underline"
                  >
                    NEXT ADVICE →
                  </button>
                </div>
                <h4 className="text-xs font-bold text-plum uppercase tracking-wider font-sans">
                  {currentTip.title}
                </h4>
                <p className="text-xs text-mauve italic font-serif mt-1">
                  “{currentTip.desc}”
                </p>
              </div>

              {/* Editorial Buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => {
                    setCurrentPage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-teal hover:bg-plum text-parchment font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-3 px-6 transition-all duration-200 flex items-center gap-2 shadow-md"
                >
                  VIEW CATALOGUE
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('masterclass');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="border border-plum hover:bg-plum hover:text-parchment text-plum font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-2.5 px-5 transition-all bg-transparent"
                >
                  LEARN DRAPING ACADEMY
                </button>
              </div>
            </div>

            {/* Large Visual Frame on Right */}
            <div className="lg:col-span-6 relative h-[380px] md:h-[460px] lg:h-[520px] flex items-center justify-center">
              
              {/* Primary Image Frame */}
              <div className="absolute z-20 w-[75%] h-[88%] left-4 top-4 border-4 border-plum shadow-xl overflow-hidden group">
                <img
                  src="https://images.pexels.com/photos/6842791/pexels-photo-6842791.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                  alt="High fashion luxury saree shot"
                  className="w-full h-full object-cover object-top transition-transform duration-[6000ms] group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 bg-plum/90 text-parchment text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">
                  COVER POSTER: THE NEO-HERITAGE ARMOR
                </div>
              </div>

              {/* Secondary overlapping image */}
              <div className="absolute z-10 w-[48%] h-[60%] right-2 bottom-2 border border-subtle-grey shadow-lg overflow-hidden hidden sm:block">
                <img
                  src="https://images.pexels.com/photos/29049398/pexels-photo-29049398.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                  alt="Burnt Terracotta raw texture close up"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* THE STICKY STACKED CARD SECTIONS OF THE HOME PAGE              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Stack Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pb-4">
          <span className="text-xs font-bold tracking-[0.3em] text-terracotta uppercase block">
            THE FOUR STACKED EXHIBITS
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-plum font-serif tracking-tight">
            Interactive <span className="text-teal italic font-normal font-serif">Loom Showcase</span>
          </h2>
          <p className="text-xs text-mauve font-sans">
            Scroll downward slowly. Our four primary collections stack sequentially. Each giant section card contains multiple luxury products for a fluid, highly modern browsing experience.
          </p>
        </div>

        {/* Stacking Card Sections Container */}
        <div className="relative space-y-16 pb-24">
          
          {/* SECTION 1 STICKY CARD: NEW ARRIVAL */}
          {(() => {
            const index = 0;
            const stickyTop = 90 + (index * 24);
            const scaleValue = 1 - (Math.max(0, scrollPercent - (index * 15)) * 0.0005);
            const activeScale = Math.max(0.94, scaleValue);
            
            // Calculate smooth opacity fade as next cards stack over this one
            const opacityValue = 1 - (Math.max(0, scrollPercent - ((index + 1) * 18)) * 0.025);
            const activeOpacity = Math.max(0.3, opacityValue);

            return (
              <div
                className="sticky w-full rounded-none overflow-hidden flex flex-col justify-between transition-all duration-300 border border-subtle-grey bg-plum text-parchment"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 10,
                  transform: `scale(${activeScale})`,
                  opacity: activeOpacity,
                  transformOrigin: 'top center',
                  boxShadow: '0 -15px 40px rgba(45, 10, 49, 0.15)',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="p-6 md:p-10 space-y-6">
                  
                  {/* Section header banner inside sticky card */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-parchment/20 pb-6 gap-4">
                    <div>
                      <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 bg-teal text-parchment">
                        EXHIBIT 01 • FRESHLY DRAUGHTED
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold font-serif mt-2">
                        New Arrival Capsule
                      </h3>
                      <p className="text-xs text-parchment/80 font-sans">
                        Features our bold raw clays, neon teal threads, and mathematical geometric block prints.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentPage('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-teal hover:bg-parchment hover:text-plum text-parchment text-xs font-bold tracking-widest uppercase py-2 px-4 transition-colors"
                    >
                      VIEW ALL NEW RELEASES &rarr;
                    </button>
                  </div>

                  {/* Multiple products cards inside card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-plum">
                    {newArrivalProducts.map((prod) => (
                      <div key={`stack-new-${prod.id}`} className="h-[460px] bg-elevated border border-subtle-grey p-1">
                        <ProductCard
                          product={prod}
                          onQuickView={onQuickView}
                          onAddToCart={onAddToCart}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Section Footer */}
                  <div className="flex justify-between items-center text-[9px] tracking-widest text-parchment/60 pt-4 border-t border-parchment/10">
                    <span>SAAREEDRAPES EDITORIAL VOL. IV</span>
                    <span>SCROLL TO NEXT SECTION &darr;</span>
                  </div>

                </div>
              </div>
            );
          })()}

          {/* SECTION 2 STICKY CARD: BEST SELLING SAAREE */}
          {(() => {
            const index = 1;
            const stickyTop = 90 + (index * 24);
            const scaleValue = 1 - (Math.max(0, scrollPercent - (index * 15)) * 0.0005);
            const activeScale = Math.max(0.94, scaleValue);

            // Calculate smooth opacity fade as next cards stack over this one
            const opacityValue = 1 - (Math.max(0, scrollPercent - ((index + 1) * 18)) * 0.025);
            const activeOpacity = Math.max(0.3, opacityValue);

            return (
              <div
                className="sticky w-full rounded-none overflow-hidden flex flex-col justify-between transition-all duration-300 border border-subtle-grey bg-teal text-parchment"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 15,
                  transform: `scale(${activeScale})`,
                  opacity: activeOpacity,
                  transformOrigin: 'top center',
                  boxShadow: '0 -15px 40px rgba(45, 10, 49, 0.18)',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="p-6 md:p-10 space-y-6">
                  
                  {/* Section header banner inside sticky card */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-parchment/20 pb-6 gap-4">
                    <div>
                      <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 bg-plum text-teal">
                        EXHIBIT 02 • HIGH-DEMAND PIECES
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold font-serif mt-2">
                        Bestselling Saree Masterpieces
                      </h3>
                      <p className="text-xs text-parchment/80 font-sans">
                        These are the master weavings that occupy museum catalogs and lead worldwide fashion weeks.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentPage('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-plum hover:bg-parchment hover:text-plum text-parchment text-xs font-bold tracking-widest uppercase py-2 px-4 transition-colors"
                    >
                      VIEW ALL BESTSELLERS &rarr;
                    </button>
                  </div>

                  {/* Multiple products cards inside card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-plum">
                    {bestSellingProducts.map((prod) => (
                      <div key={`stack-best-${prod.id}`} className="h-[460px] bg-elevated border border-subtle-grey p-1">
                        <ProductCard
                          product={prod}
                          onQuickView={onQuickView}
                          onAddToCart={onAddToCart}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Section Footer */}
                  <div className="flex justify-between items-center text-[9px] tracking-widest text-parchment/60 pt-4 border-t border-parchment/10">
                    <span>SAAREEDRAPES METALLIC COOPERATIVES</span>
                    <span>SCROLL TO NEXT SECTION &darr;</span>
                  </div>

                </div>
              </div>
            );
          })()}

          {/* SECTION 3 STICKY CARD: SOFTY, AIRY, COMFORTABLE */}
          {(() => {
            const index = 2;
            const stickyTop = 90 + (index * 24);
            const scaleValue = 1 - (Math.max(0, scrollPercent - (index * 15)) * 0.0005);
            const activeScale = Math.max(0.94, scaleValue);

            // Calculate smooth opacity fade as next cards stack over this one
            const opacityValue = 1 - (Math.max(0, scrollPercent - ((index + 1) * 18)) * 0.025);
            const activeOpacity = Math.max(0.3, opacityValue);

            return (
              <div
                className="sticky w-full rounded-none overflow-hidden flex flex-col justify-between transition-all duration-300 border border-subtle-grey bg-elevated text-plum"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 20,
                  transform: `scale(${activeScale})`,
                  opacity: activeOpacity,
                  transformOrigin: 'top center',
                  boxShadow: '0 -15px 40px rgba(45, 10, 49, 0.2)',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="p-6 md:p-10 space-y-6">
                  
                  {/* Section header banner inside sticky card */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-subtle-grey pb-6 gap-4">
                    <div>
                      <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 bg-terracotta text-parchment flex items-center gap-1.5 w-fit">
                        <Feather size={12} />
                        EXHIBIT 03 • SOFTY, AIRY, COMFORTABLE
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold font-serif mt-2 text-plum">
                        Weightless & Breathable Weaves
                      </h3>
                      <p className="text-xs text-mauve font-sans">
                        Sheer organza and cotton fabrics that drape instantly, dry flat, and weightlessly float.
                      </p>
                    </div>
                    
                    <button
                      onClick={onOpenQuickGuide}
                      className="bg-teal hover:bg-plum text-parchment text-xs font-bold tracking-widest uppercase py-2 px-4 transition-colors"
                    >
                      DRAPING DENSITY CHART &rarr;
                    </button>
                  </div>

                  {/* Multiple products cards inside card */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-plum">
                    {softAiryComfortableProducts.map((prod) => (
                      <div key={`stack-airy-${prod.id}`} className="h-[460px] bg-parchment border border-subtle-grey p-1">
                        <ProductCard
                          product={prod}
                          onQuickView={onQuickView}
                          onAddToCart={onAddToCart}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Section Footer */}
                  <div className="flex justify-between items-center text-[9px] tracking-widest text-mauve pt-4 border-t border-subtle-grey/60">
                    <span>ZERO-GRAVITY SHEER SILK PATTERNS</span>
                    <span>SCROLL TO FINAL PILLAR &darr;</span>
                  </div>

                </div>
              </div>
            );
          })()}

          {/* SECTION 4 STICKY CARD: BROWSE SAREE BY FABRIC */}
          {(() => {
            const index = 3;
            const stickyTop = 90 + (index * 24);
            const scaleValue = 1 - (Math.max(0, scrollPercent - (index * 15)) * 0.0005);
            const activeScale = Math.max(0.94, scaleValue);

            // Final card does not fade as aggressively unless scrolled past the entire container
            const opacityValue = 1 - (Math.max(0, scrollPercent - ((index + 1) * 18)) * 0.025);
            const activeOpacity = Math.max(0.4, opacityValue);

            return (
              <div
                className="sticky w-full rounded-none overflow-hidden flex flex-col justify-between transition-all duration-300 border border-subtle-grey bg-terracotta text-parchment"
                style={{
                  top: `${stickyTop}px`,
                  zIndex: 25,
                  transform: `scale(${activeScale})`,
                  opacity: activeOpacity,
                  transformOrigin: 'top center',
                  boxShadow: '0 -15px 40px rgba(45, 10, 49, 0.22)',
                  willChange: 'transform, opacity'
                }}
              >
                <div className="p-6 md:p-10 space-y-6">
                  
                  {/* Section header banner inside sticky card */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-parchment/20 pb-6 gap-4">
                    <div>
                      <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase px-2.5 py-1 bg-plum text-terracotta">
                        EXHIBIT 04 • ANCESTRAL TAXONOMY
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold font-serif mt-2">
                        Browse Saree by Weaving Fabric
                      </h3>
                      <p className="text-xs text-parchment/80 font-sans">
                        Explore our three core fabric frameworks with custom region origin mappings.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setCurrentPage('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-plum hover:bg-parchment hover:text-plum text-parchment text-xs font-bold tracking-widest uppercase py-2 px-4 transition-colors"
                    >
                      FILTER ENTIRE WARDROBE &rarr;
                    </button>
                  </div>

                  {/* Multiple products cards inside card representing the Fabric Weaves exactly like Section 1, 2 and 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-plum">
                    {[products[2], products[1], products[3]].map((prod) => {
                      if (!prod) return null;
                      return (
                        <div key={`stack-fabric-${prod.id}`} className="h-[460px] bg-parchment border border-subtle-grey p-1">
                          <ProductCard
                            product={prod}
                            onQuickView={onQuickView}
                            onAddToCart={onAddToCart}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Section Footer */}
                  <div className="flex justify-between items-center text-[9px] tracking-widest text-parchment/60 pt-4 border-t border-parchment/10">
                    <span>SAAREEDRAPES ANCESTRAL DIRECTIVE • 2026</span>
                    <span>END OF COMPACT SPREAD &uarr;</span>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>

      </section>

      {/* ========================================== */}
      {/* BRAND PORTALS                              */}
      {/* ========================================== */}
      <section className="bg-plum text-parchment py-16 border-y border-subtle-grey relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
            <span className="text-[9px] uppercase tracking-[0.3em] text-teal font-bold block">
              DIGITAL PORTALS
            </span>
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-parchment">
              Enter the Academic Heritage
            </h3>
            <p className="text-xs text-parchment/70 font-sans">
              Choose your destination. Every page is formatted like a high-fashion luxury magazine layout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Lookbook Portal */}
            <div className="bg-[#1E0621] border border-parchment/10 p-8 flex flex-col justify-between space-y-8 hover:border-teal transition-all duration-300">
              <div className="space-y-3">
                <BookOpen className="text-teal" size={24} />
                <h4 className="text-xl font-bold font-serif text-parchment">
                  Editorial Lookbook Vol. IV
                </h4>
                <p className="text-xs text-parchment/70 leading-relaxed font-sans">
                  Horizontal high-fashion photography spreads featuring real Indian runway models. Hear the ambient synth sounds of native weavers.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('lookbook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold uppercase tracking-widest text-teal hover:text-parchment transition-colors text-left block"
              >
                ENTER LOOKBOOK &rarr;
              </button>
            </div>

            {/* Academy Portal */}
            <div className="bg-[#1E0621] border border-parchment/10 p-8 flex flex-col justify-between space-y-8 hover:border-teal transition-all duration-300">
              <div className="space-y-3">
                <Compass className="text-terracotta" size={24} />
                <h4 className="text-xl font-bold font-serif text-parchment">
                  Draping Academy Masterclass
                </h4>
                <p className="text-xs text-parchment/70 leading-relaxed font-sans">
                  Step-by-step dynamic simulators for Nivi, Bengali, and modern Belted styles. Includes a custom width calculator matching physical frame dimensions.
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentPage('masterclass');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold uppercase tracking-widest text-teal hover:text-parchment transition-colors text-left block"
              >
                ENTER MASTERCLASS &rarr;
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Brand Trust compact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-elevated border border-subtle-grey p-8 flex flex-col md:flex-row justify-between items-center gap-8 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-plum font-serif">
              Unsure about the draping style?
            </h4>
            <p className="text-xs text-mauve leading-relaxed max-w-lg font-sans">
              Draping a six-yard masterpiece is a beautiful ritual. Access our live interactive draping helper or get custom suggestions directly from local weaving guilds.
            </p>
          </div>
          <button
            onClick={onOpenQuickGuide}
            className="bg-teal hover:bg-plum text-parchment text-xs font-bold tracking-widest uppercase py-3.5 px-6 transition-colors shrink-0"
          >
            OPEN DRAPING Q&A HELPER &rarr;
          </button>
        </div>
      </section>

    </div>
  );
};
