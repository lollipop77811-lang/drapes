import React from 'react';
import { Sparkles, ArrowRight, Compass, Shield } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenQuickGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenQuickGuide }) => {
  return (
    <section className="relative bg-plum py-4 md:py-8 border-b-4 border-plum overflow-hidden lg:h-[calc(100vh-80px)] lg:min-h-[580px] flex items-center">

      {/* Video background */}
      <video
        src="/img/Ankvid1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Tinted overlay for text readability */}
      <div className="absolute inset-0 bg-plum/55 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-plum/85 via-plum/45 to-plum/25 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent z-[1]" />

      {/* Fine print grid background watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] z-[2]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#F4F1EA_1px,transparent_1px),linear-gradient(to_bottom,#F4F1EA_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-teal filter blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-terracotta filter blur-3xl rounded-full" />
      </div>

      {/* Double fine-line editorial borders */}
      <div className="absolute top-2 left-2 right-2 bottom-2 border border-parchment/15 pointer-events-none select-none z-[2]" />
      <div className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-parchment/10 pointer-events-none select-none z-[2]" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Editorial Header Meta - Compact */}
        <div className="flex justify-between items-center border-b border-parchment/25 pb-2.5 mb-6 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-parchment/85 select-none">
          <span>VOLUME IV • RUNWAY CAPSULE</span>
          <span className="text-teal font-extrabold flex items-center gap-1.5">
            <Sparkles size={11} className="animate-spin" />
            NO MAROON. PURE REBELLION.
          </span>
          <span>EST. 2026</span>
        </div>

        {/* Main Content Grid - now full-width centered */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT: Content now spans across the hero, with a floating meta block on the right */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6 text-left">

            <div className="space-y-1">
              <span className="text-teal text-[10px] md:text-xs uppercase font-sans tracking-[0.4em] block">
                — ARCHITECTURAL DRAPES
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-parchment tracking-tight leading-[0.95] font-serif">
                Bespoke <br />
                <span className="text-teal italic font-light font-serif">Heritage</span> <br />
                Reinvented.
              </h1>
            </div>

            <p className="text-sm md:text-base text-parchment/80 leading-relaxed max-w-xl font-sans font-light">
              We dismantle the standard bridal velvet rules to bring you unbleached, structural raw silk. Detailed with modern mathematical geometry instead of traditional repetitive floral patterns.
            </p>

            <div className="bg-parchment/10 backdrop-blur-sm border border-parchment/25 p-4 space-y-2.5 max-w-xl shadow-sm">
              <span className="text-[9px] font-bold text-terracotta uppercase tracking-[0.2em] block border-b border-parchment/30 pb-1">
                WEAVE ARCHITECTURAL STATUS
              </span>

              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 text-[11px] font-sans text-parchment">
                <div className="flex justify-between border-b border-parchment/20 pb-1">
                  <span className="text-parchment/70 uppercase text-[9px]">1. Yarn</span>
                  <strong className="font-medium">100% Organic Mulberry</strong>
                </div>
                <div className="flex justify-between border-b border-parchment/20 pb-1">
                  <span className="text-parchment/70 uppercase text-[9px]">2. Loom Strategy</span>
                  <strong className="font-medium">240h High-Twist</strong>
                </div>
                <div className="flex justify-between border-b border-parchment/20 pb-1">
                  <span className="text-parchment/70 uppercase text-[9px]">3. Base Tint</span>
                  <strong className="font-medium">Raw Parchment</strong>
                </div>
                <div className="flex justify-between border-b border-parchment/20 pb-1">
                  <span className="text-parchment/70 uppercase text-[9px]">4. Accent Tone</span>
                  <strong className="font-medium">Teal &amp; Terracotta</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreClick}
                className="bg-teal hover:bg-terracotta text-parchment font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-3 px-6 transition-all duration-250 flex items-center gap-2 shadow-lg hover:shadow-teal/20 group"
              >
                EXPLORE CAPSULE
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-parchment" />
              </button>

              <button
                onClick={onOpenQuickGuide}
                className="border border-parchment/60 hover:bg-parchment hover:text-plum text-parchment font-sans font-bold text-[11px] tracking-[0.2em] uppercase py-2.5 px-4 transition-all duration-250 flex items-center gap-2 bg-parchment/10 backdrop-blur-sm"
              >
                <Compass size={12} className="text-terracotta" />
                DRAPING HELP
              </button>
            </div>

          </div>

          {/* RIGHT: Editorial meta block replacing the previous image cards */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-end gap-4 text-right">
            <div className="bg-parchment/10 backdrop-blur-sm border border-parchment/30 px-3 py-1.5 shadow-md flex items-center gap-1.5">
              <Shield size={12} className="text-teal" />
              <span className="text-[8px] font-bold uppercase tracking-widest font-sans text-parchment">
                Silk Mark Certified
              </span>
            </div>

            <div className="max-w-[260px] space-y-2">
              <div className="text-[8px] uppercase tracking-[0.3em] text-teal font-extrabold flex items-center justify-end gap-1">
                <Sparkles size={10} />
                Volume IV Saree Armor
              </div>
              <h3 className="text-xl font-serif italic text-parchment leading-tight">
                "Metallic Deep Aubergine & Teal warp."
              </h3>
              <p className="text-[8px] uppercase tracking-widest text-parchment/60">
                Studio Plate 01 • Styled by Editorial Board
              </p>
            </div>

            <div className="border-t border-parchment/20 pt-3 w-[200px] text-parchment/70 text-[9px] uppercase tracking-[0.3em] font-bold">
              Runway Capsule 2026
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
