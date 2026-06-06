import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-parchment text-plum border-t border-subtle-grey">
      {/* Main Links and Sign up Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Manifesto Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter font-serif">
              Drapes<span className="italic text-teal font-medium"> with Grace</span>
            </h2>
            
            <p className="text-sm text-mauve leading-relaxed font-sans">
              A radical modernism study in raw silk. We designed Drapes with Grace to empower contemporary minds with structural, three-dimensional handwoven art. No clichés, only unapologetic premium heritage.
            </p>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal font-sans block">
                OUR CRAFT GUARANTEE
              </span>
              <p className="text-[11px] text-plum italic leading-normal font-serif">
                All silk yarn is certified organic, dye pigments are 100% lead-free and naturally extracted, and weavers are compensated above high-fashion fair-trade guidelines.
              </p>
            </div>

            <div className="flex gap-3 text-[10px] font-bold uppercase tracking-widest font-sans text-teal pt-2">
              <span>#NeoHeritage</span>
              <span>#UnapologeticSilk</span>
            </div>
          </div>

          {/* Quick Links Columns (2 Cols each) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-plum font-sans">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs text-mauve font-sans">
              <li><a href="#" className="hover:text-teal transition-colors">Kanjeevaram Revival</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Neon Banarasi Series</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Sheer Organzas</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Terracotta Raw Silk</a></li>
              <li><a href="#" className="hover:text-teal transition-colors">Lookbook Vol. IV Special</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-plum font-sans">
              ARTISANAL ATELIERS
            </h4>
            <ul className="space-y-2 text-xs text-mauve font-sans leading-tight">
              <li>
                <span className="text-plum font-bold font-serif italic block">Soho Atelier</span>
                <span className="text-[10px]">42 Mercer St, New York</span>
              </li>
              <li>
                <span className="text-plum font-bold font-serif italic block">Mayfair Salon</span>
                <span className="text-[10px]">18 Bruton Pl, London</span>
              </li>
              <li>
                <span className="text-plum font-bold font-serif italic block">Varanasi Ghat Studio</span>
                <span className="text-[10px]">Shivala Ghat, Varanasi</span>
              </li>
            </ul>
          </div>

          {/* Editorial Newsletter Subscription (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold tracking-widest uppercase text-plum font-sans flex items-center gap-1.5">
              <Sparkles size={13} className="text-terracotta" />
              SUBSCRIBE TO DRAPES MANIFESTO
            </h4>
            <p className="text-xs text-mauve leading-relaxed font-sans">
              Patrons receive early private access to future handloom drops, custom stitching appointments, and exclusive masterclass invitations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Patron Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-elevated border border-subtle-grey text-plum text-xs p-3 focus:outline-none focus:border-teal flex-grow font-sans"
                  required
                />
                <button
                  type="submit"
                  className="bg-teal hover:bg-plum text-parchment p-3 transition-colors duration-200 flex items-center justify-center"
                  aria-label="Submit newsletter"
                >
                  <Send size={14} />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-teal font-bold font-sans animate-fade-in">
                  ✓ Added to the High-Fashion Patron list. Check your inbox shortly.
                </p>
              )}
            </form>

            {/* Trust Indicators */}
            <div className="bg-elevated p-3.5 border border-subtle-grey/80 flex gap-3 items-center mt-4">
              <ShieldCheck size={20} className="text-teal flex-shrink-0" />
              <div className="text-[10px] text-mauve leading-tight font-sans">
                <strong>SECURE ARTISAN VAULT</strong> • Pure handwoven authenticity guaranteed by local government silk-weaving seals.
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Secondary Footer Copyright and Meta */}
      <div className="border-t border-subtle-grey bg-plum py-8 text-center text-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] tracking-wider font-sans text-parchment/70">
            &copy; 2026 Drapes with Grace Inc. All rights reserved. Curated for the contemporary luxury patron.
          </p>
          
          <div className="flex gap-6 text-[11px] text-parchment/50 font-sans">
            <a href="#" className="hover:text-teal transition-colors">Patron Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-teal transition-colors">Silk Authenticity Index</a>
            <span>•</span>
            <a href="#" className="hover:text-teal transition-colors">Artisan Compensation Ledger</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
