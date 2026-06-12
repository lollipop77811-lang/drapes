import React, { useState, useEffect } from 'react';
import { SareeProduct } from '../types';
import { Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: SareeProduct;
  onQuickView: (product: SareeProduct) => void;
  onAddToCart: (product: SareeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Standardized coordinates from -0.5 to 0.5
    const xc = (x / rect.width) - 0.5;
    const yc = (y / rect.height) - 0.5;
    
    // Max tilt angle: 7 degrees for subtle luxury feel
    const maxTilt = 7;
    const rotateY = xc * maxTilt;
    const rotateX = -yc * maxTilt; // Negative so it tilts toward cursor on Y-axis
    
    // Shadow shift: opposite to cursor position
    const shadowX = -xc * 18;
    const shadowY = -yc * 18;
    const shadowBlur = 22;
    const shadowOpacity = 0.18; // Deeper shadow for State 2

    // Apply style properties
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.style.setProperty('--shadow-x', `${shadowX}px`);
    card.style.setProperty('--shadow-y', `${shadowY + 8}px`); // Offset downwards slightly
    card.style.setProperty('--shadow-blur', `${shadowBlur}px`);
    card.style.setProperty('--shadow-opacity', `${shadowOpacity}`);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
    card.style.setProperty('--shadow-x', '0px');
    card.style.setProperty('--shadow-y', '4px');
    card.style.setProperty('--shadow-blur', '12px');
    card.style.setProperty('--shadow-opacity', '0.06');
  };

  // Determine tag color
  const getTagClasses = () => {
    switch (product.tagColor) {
      case 'teal':
        return 'bg-teal text-parchment';
      case 'terracotta':
        return 'bg-terracotta text-parchment';
      case 'plum':
      default:
        return 'bg-plum text-parchment';
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView(product)}
      style={{
        transform: isMobile 
          ? 'none' 
          : 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
        boxShadow: isMobile 
          ? '0px 4px 12px rgba(45, 10, 49, 0.06)' 
          : 'var(--shadow-x, 0px) var(--shadow-y, 4px) var(--shadow-blur, 12px) rgba(45, 10, 49, var(--shadow-opacity, 0.06))',
        willChange: 'transform, box-shadow',
        transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative w-full bg-elevated border border-subtle-grey p-4 preserve-3d cursor-pointer transition-all duration-300 flex flex-col justify-between h-[490px] overflow-hidden select-none"
    >
      {/* Tag Badge */}
      {product.tag && (
        <div className="absolute top-6 left-6 z-30">
          <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold font-sans ${getTagClasses()}`}>
            {product.tag}
          </span>
        </div>
      )}

      {/* Image Container (preserves 3D space for child zooms) */}
      <div className="relative w-full h-[340px] bg-[#ECEAE4] overflow-hidden preserve-3d">
        {/* Primary Saree Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-400 ease-out group-hover:scale-108 will-change-transform"
          loading="lazy"
        />

        {/* Secondary Detail Image on hover (if available) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} texture detail`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
        )}

        {/* State 2 Reveal Overlay: Gradient from transparent to plum at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-plum/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Quick Actions overlay - float using translateZ */}
        <div 
          className="absolute bottom-4 left-0 right-0 px-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20"
          style={{ transform: 'translateZ(15px)' }}
          onClick={(e) => e.stopPropagation()} // Prevent triggering card click
        >
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-elevated hover:bg-plum hover:text-parchment text-plum text-xs font-semibold tracking-wider py-2 px-3 transition-colors duration-250 font-sans flex items-center justify-center gap-1.5 border border-subtle-grey shadow-sm"
          >
            <Eye size={13} />
            QUICK VIEW
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-teal hover:bg-plum text-parchment text-xs font-semibold p-2.5 transition-colors duration-250 flex items-center justify-center shadow-sm"
            title="Add to Cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Text Parallax section */}
      <div 
        className="mt-4 flex flex-col justify-between flex-grow preserve-3d"
        style={{ transform: !isMobile && isHovered ? 'translateZ(20px)' : 'none', transition: 'transform 0.3s ease-out' }}
      >
        <div>
          {/* Fabric Label */}
          <span className="text-[11px] uppercase tracking-wider text-mauve font-sans block mb-1">
            {product.fabric} • <span className="italic font-serif">{product.origin}</span>
          </span>

          {/* Product Title */}
          <h3 className="text-lg font-medium text-plum font-serif leading-tight group-hover:text-teal transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-subtle-grey/60">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-plum font-sans">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-mauve">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-teal font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Detail →
          </span>
        </div>
      </div>
    </div>
  );
};
