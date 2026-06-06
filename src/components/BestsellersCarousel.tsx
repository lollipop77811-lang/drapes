import React, { useRef } from 'react';
import { SareeProduct } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface BestsellersCarouselProps {
  products: SareeProduct[];
  onQuickView: (product: SareeProduct) => void;
  onAddToCart: (product: SareeProduct) => void;
}

export const BestsellersCarousel: React.FC<BestsellersCarouselProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products for bestseller collection
  const bestsellers = products.slice(0, 4); // The first 4 beautiful sarees

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const offset = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-16 bg-parchment border-b border-subtle-grey relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-terracotta uppercase mb-2">
              <Sparkles size={12} />
              <span>CRAFTED BY MASTER WEAVERS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-plum font-serif tracking-tight">
              Bestselling <span className="italic font-normal text-teal">Radical Weaves</span>
            </h2>
            <p className="text-sm text-mauve mt-2 max-w-lg font-sans">
              These editorial favorites are redefining saree wear, showcasing electric teal clashes, terracotta pigments, and unparalleled geometric precision.
            </p>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 border border-subtle-grey bg-elevated hover:bg-plum hover:text-parchment text-plum transition-colors duration-200 rounded-none flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 border border-subtle-grey bg-elevated hover:bg-plum hover:text-parchment text-plum transition-colors duration-200 rounded-none flex items-center justify-center"
              aria-label="Next slide"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Bestsellers List Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestsellers.map((product) => (
            <div
              key={`best-${product.id}`}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[360px] flex-shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}

          {/* Final "Explore More" Editorial card */}
          <div className="min-w-[280px] sm:min-w-[340px] md:min-w-[360px] flex-shrink-0 snap-start bg-plum p-8 flex flex-col justify-between border border-subtle-grey h-[490px]">
            <div className="space-y-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-teal font-bold block">
                SAAREEDRAPES VOL. IV
              </span>
              <h3 className="text-3xl font-bold text-parchment font-serif leading-tight">
                The Full Neo-Heritage Manifesto
              </h3>
              <p className="text-sm text-parchment/70 font-sans leading-relaxed">
                Unlock the entire editorial capsule. Features eight unrepeatable designs crafted with fine handspun organic threads, customized blouse panels, and exclusive styling guides.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-t border-parchment/20 pt-4">
                <p className="text-xs text-parchment/50 italic font-serif">
                  “A visual palette clean-cut, bold, and ready for the global stage.”
                </p>
              </div>
              <button
                onClick={() => {
                  window.scrollTo({ top: 1100, behavior: 'smooth' });
                }}
                className="w-full bg-teal hover:bg-teal/90 text-parchment text-xs font-bold tracking-widest uppercase py-3 px-4 transition-colors duration-250"
              >
                EXPLORE ALL DRAPES
              </button>
            </div>
          </div>
        </div>

        {/* Subtle pagination guide */}
        <div className="text-center text-[11px] text-mauve mt-4 font-sans">
          Swipe horizontally or use the arrows to feel the weave in 3D.
        </div>

      </div>
    </div>
  );
};
