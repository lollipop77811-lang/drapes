import React, { useState, useRef, useEffect } from 'react';
import { SareeProduct } from '../types';
import { X, ShoppingBag, Check, Sparkles, Info, Ruler } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductQuickViewProps {
  product: SareeProduct | null;
  onClose: () => void;
  onAddToCart: (product: SareeProduct, blouseSize: string) => void;
  allProducts: SareeProduct[];
  onQuickViewOther: (product: SareeProduct) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  allProducts,
  onQuickViewOther,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState('Unstitched Pure Silk Panel');
  const [drapingStyle, setDrapingStyle] = useState<'nivi' | 'bengali' | 'modern-belted'>('nivi');
  const [successAdded, setSuccessAdded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedSize('Unstitched Pure Silk Panel');
    setDrapingStyle('nivi');
    setSuccessAdded(false);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  // Generate related products: same fabric or different, up to 2
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  const sizes = [
    'Unstitched Pure Silk Panel',
    'Blouse Size S (Bust 34")',
    'Blouse Size M (Bust 36")',
    'Blouse Size L (Bust 38")',
    'Blouse Size XL (Bust 40")',
  ];

  const getDrapingInstructions = () => {
    switch (drapingStyle) {
      case 'bengali':
        return {
          pleats: 'Wide, flat front pleats (typically 2-3 massive box folds).',
          pallu: 'Thrust forward over the right shoulder, then draped backward over the left.',
          time: '12 mins • Effortless & Dramatic',
          tip: 'Use our organic Terracotta Clay weights on the pallu corner to hold the dramatic fall.'
        };
      case 'modern-belted':
        return {
          pleats: 'Tight, knife pleats (5-6 folds) secured near the navel.',
          pallu: 'Neat, ultra-slim pleats draped over the shoulder and fastened with an electric teal modern corset belt.',
          time: '8 mins • Editorial Avant-Garde',
          tip: 'Perfect for showcasing high-neck sheer blouses and heavy silver chokers.'
        };
      case 'nivi':
      default:
        return {
          pleats: '6 to 8 neat, even pleats tucked into the waistband facing left.',
          pallu: 'Swept gracefully across the torso and pinned on the left shoulder with 1.5 meters of soft flow.',
          time: '15 mins • Time-honored Elegance',
          tip: 'Let the heavy handloom zari borders cascade loosely to show the authentic weave.'
        };
    }
  };

  const drapingInfo = getDrapingInstructions();

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setSuccessAdded(true);
    setTimeout(() => setSuccessAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-plum/80 backdrop-blur-sm flex items-start justify-center p-4 md:p-8 select-none">
      <div 
        className="relative bg-parchment w-full max-w-5xl border-4 border-plum shadow-2xl flex flex-col animate-scale-in my-4 md:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-plum text-parchment hover:bg-teal transition-colors border border-subtle-grey"
          aria-label="Close detail view"
        >
          <X size={20} />
        </button>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-subtle-grey">
          
          {/* Left side: Sticky image viewer & textures (5 cols) */}
          <div className="lg:col-span-5 bg-elevated border-r border-subtle-grey p-6 flex flex-col justify-between gap-4">
            
            <div className="relative h-[380px] bg-parchment border border-subtle-grey overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 right-3 bg-plum/90 text-parchment text-[9px] uppercase tracking-widest px-2 py-1 font-bold font-sans">
                Model View
              </span>
            </div>

            {/* Secondary Detail Image & Fabric Tag */}
            {product.secondaryImage && (
              <div className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-4 h-24 border border-subtle-grey overflow-hidden bg-parchment">
                  <img
                    src={product.secondaryImage}
                    alt="Fabric Close-up"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="col-span-8 space-y-1">
                  <span className="text-[10px] font-extrabold text-terracotta tracking-widest uppercase block">
                    AUTHENTIC TEXTURE WEAVE
                  </span>
                  <p className="text-[11px] text-plum font-sans leading-tight">
                    Close-up of the {product.fabric} weave. Made with twisted gold zari threads.
                  </p>
                </div>
              </div>
            )}

            {/* Weaving Statistics */}
            <div className="bg-parchment p-3.5 border border-subtle-grey space-y-2">
              <h4 className="text-xs font-bold text-plum font-serif flex items-center gap-1">
                <Info size={12} className="text-teal" /> WEAVER INFORMATION
              </h4>
              <p className="text-[11px] text-mauve leading-relaxed font-sans">
                Hand-crafted in <strong className="text-plum">{product.origin}</strong>. Estimated weaving time: 18-22 days by a designated master artisan under local handloom support cooperatives.
              </p>
            </div>
          </div>

          {/* Right side: Content & Interactive Customizer (7 cols) */}
          <div ref={scrollRef} className="lg:col-span-7 p-6 md:p-8 flex flex-col gap-6">
            
            {/* Header and Meta */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-teal font-bold px-2 py-0.5 bg-teal/10">
                  {product.fabric}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-mauve">
                  Origin: {product.origin}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-plum font-serif leading-none tracking-tight">
                {product.name}
              </h2>

              {/* Price Block */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-2xl font-bold text-plum font-sans">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-mauve">₹{product.originalPrice}</span>
                )}
                <span className="text-xs font-bold text-terracotta uppercase tracking-widest ml-2">
                  Complimentary Blouse Fabric Included
                </span>
              </div>
            </div>

            {/* Description and Editorial Board Quote */}
            <div className="space-y-3">
              <p className="text-xs md:text-sm text-plum leading-relaxed font-sans">
                {product.description}
              </p>
              
              <div className="border-l-2 border-teal pl-4 py-1 bg-teal/5">
                <p className="text-xs italic font-serif text-mauve">
                  {product.editorialNote}
                </p>
              </div>
            </div>

            {/* Interactive Blouse Size Customizer */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-subtle-grey/80 pb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center bg-plum text-parchment text-[10px] font-bold font-sans"
                    aria-hidden
                  >
                    1
                  </span>
                  <h3 className="text-[11px] font-extrabold tracking-[0.14em] text-plum uppercase font-sans flex items-center gap-1.5 leading-snug">
                    <Ruler size={13} className="text-terracotta shrink-0" aria-hidden />
                    Select Blouse Stitching Style
                  </h3>
                </div>
                <span className="text-[10px] text-teal hover:underline cursor-pointer font-sans shrink-0">
                  Blouse Sizing Guide PDF
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`text-left text-xs p-3 border transition-all duration-200 flex items-center justify-between ${
                      selectedSize === sz
                        ? 'border-teal bg-teal/5 text-plum font-semibold ring-1 ring-teal'
                        : 'border-subtle-grey bg-elevated text-mauve hover:text-plum hover:bg-parchment'
                    }`}
                  >
                    <span>{sz}</span>
                    {selectedSize === sz && <Check size={12} className="text-teal" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Draping Simulator Widget */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-subtle-grey/80 pb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center bg-plum text-parchment text-[10px] font-bold font-sans"
                    aria-hidden
                  >
                    2
                  </span>
                  <h3 className="text-[11px] font-extrabold tracking-[0.14em] text-plum uppercase font-sans flex items-center gap-1.5 leading-snug">
                    <Sparkles size={13} className="text-terracotta shrink-0" aria-hidden />
                    Live Draping Style Preview
                  </h3>
                </div>
                <span className="text-[10px] text-teal font-sans shrink-0">
                  Draping Level: {product.drapingDifficulty}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(['nivi', 'bengali', 'modern-belted'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setDrapingStyle(style)}
                    className={`text-left text-xs p-3 border transition-all duration-200 flex items-center justify-between capitalize ${
                      drapingStyle === style
                        ? 'border-teal bg-teal/5 text-plum font-semibold ring-1 ring-teal'
                        : 'border-subtle-grey bg-elevated text-mauve hover:text-plum hover:bg-parchment'
                    }`}
                  >
                    <span>{style.replace('-', ' ')}</span>
                    {drapingStyle === style && <Check size={12} className="text-teal shrink-0" />}
                  </button>
                ))}
              </div>

              <div className="border border-teal bg-teal/5 text-plum ring-1 ring-teal p-3 space-y-2 text-xs font-sans">
                <p>
                  <span className="font-semibold text-mauve uppercase tracking-wider text-[10px] block mb-0.5">
                    Pleat Strategy
                  </span>
                  {drapingInfo.pleats}
                </p>
                <p>
                  <span className="font-semibold text-mauve uppercase tracking-wider text-[10px] block mb-0.5">
                    Pallu Direction
                  </span>
                  {drapingInfo.pallu}
                </p>
                <p className="italic">
                  <span className="font-semibold text-mauve uppercase tracking-wider text-[10px] block mb-0.5 not-italic">
                    Curator Pro Tip
                  </span>
                  {drapingInfo.tip}
                </p>
              </div>
            </div>

            {/* CTA Buttons: Electric Teal and Deep Plum */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-subtle-grey">
              <button
                onClick={handleAdd}
                className="flex-1 bg-teal hover:bg-plum text-parchment font-sans font-bold text-xs tracking-widest uppercase py-4 px-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag size={15} />
                {successAdded ? 'ADDED TO DRAPES BAG!' : 'ADD SAAREE TO BAG'}
              </button>

              <button
                onClick={onClose}
                className="sm:w-36 border border-plum text-plum hover:bg-plum hover:text-parchment text-xs font-bold uppercase py-4 transition-colors font-sans text-center"
              >
                CLOSE VIEWER
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Section: "You May Also Like" featuring the 3D-Tilt Cards */}
        <div className="p-6 md:p-8 bg-parchment border-t border-subtle-grey">
          <h3 className="text-lg md:text-xl font-bold text-plum font-serif mb-4 tracking-tight text-center md:text-left">
            You May Also Like — <span className="italic font-normal text-teal font-serif">Alternative Drapes</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {relatedProducts.map((relatedProd) => (
              <div key={`related-${relatedProd.id}`} className="h-[490px]">
                <ProductCard
                  product={relatedProd}
                  onQuickView={(p) => onQuickViewOther(p)}
                  onAddToCart={(p) => onAddToCart(p, 'Unstitched Pure Silk Panel')}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
