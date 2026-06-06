import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, Compass } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onCartOpen: () => void;
  currentPage: 'home' | 'shop' | 'lookbook' | 'masterclass';
  setCurrentPage: (page: 'home' | 'shop' | 'lookbook' | 'masterclass') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenQuickGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onCartOpen,
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  onOpenQuickGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (page: 'home' | 'shop' | 'lookbook' | 'masterclass') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-500 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Editorial Announcement Marquee - hidden at top, shows on scroll */}
      <div className={`bg-plum text-parchment overflow-hidden text-center select-none transition-all duration-500 overflow-hidden ${isScrolled ? 'py-1.5 px-4 max-h-10 opacity-100' : 'py-0 px-4 max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="inline-flex items-center gap-8 text-[9px] md:text-[10px] font-bold uppercase tracking-widest animate-marquee whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-teal rounded-full animate-ping" />
            Editorial Drop: Vol. IV Neo-Heritage Is Live
          </span>
          <span className="hidden md:inline">•</span>
          <span>Free Worldwide Silk-Route Express Courier Above $500</span>
          <span className="hidden md:inline">•</span>
          <span className="text-teal">No Maroon, No Cliché: High-Fashion Saree Evolution</span>
          <span className="hidden md:inline">•</span>
          <span>Draping Video Guides & Stylist Consultations Included</span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-parchment/95 backdrop-blur-md border-b border-subtle-grey' : ''}`}>
        
        {/* Left section: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
              currentPage === 'home' ? 'text-teal drop-shadow-none' : (isScrolled ? 'text-plum hover:text-teal drop-shadow-none' : 'text-parchment hover:text-teal')
            }`}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
              currentPage === 'shop' ? 'text-teal drop-shadow-none' : (isScrolled ? 'text-plum hover:text-teal drop-shadow-none' : 'text-parchment hover:text-teal')
            }`}
          >
            Collection Catalog
            {currentPage === 'shop' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
              currentPage === 'lookbook' ? 'text-teal drop-shadow-none' : (isScrolled ? 'text-plum hover:text-teal drop-shadow-none' : 'text-parchment hover:text-teal')
            }`}
          >
            Lookbook Vol. IV
            {currentPage === 'lookbook' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('masterclass')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${
              currentPage === 'masterclass' ? 'text-teal drop-shadow-none' : (isScrolled ? 'text-plum hover:text-teal drop-shadow-none' : 'text-parchment hover:text-teal')
            }`}
          >
            Draping Academy
            {currentPage === 'masterclass' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${isScrolled ? 'text-plum hover:text-teal drop-shadow-none' : 'text-parchment hover:text-teal'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Center: Logo Branding (Ultra-elegant modern Serif) */}
        <div className="text-center flex flex-col items-center">
          <button
            onClick={() => handleNavClick('home')}
            className="group inline-block select-none text-left cursor-pointer"
          >
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tighter font-serif group-hover:text-teal transition-colors leading-none ${isScrolled ? 'text-plum' : 'text-parchment drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]'}`}>
              Drapes<span className="font-light italic text-teal"> with Grace</span>
            </h1>
            <span className={`text-[9px] uppercase tracking-[0.35em] block mt-0.5 text-center transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${isScrolled ? 'text-mauve drop-shadow-none' : 'text-parchment/70'}`}>
              Editorial Heritage
            </span>
          </button>
        </div>

        {/* Right section: Actions & Search */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Input Toggle */}
          <div className="relative flex items-center">
            {showSearch && (
              <input
                type="text"
                placeholder="Search silk, region..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'shop') {
                    setCurrentPage('shop');
                  }
                }}
                className="border border-subtle-grey bg-elevated text-plum text-xs px-3 py-1.5 w-40 md:w-56 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal font-sans mr-2"
                autoFocus
              />
            )}
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                if (!showSearch && currentPage !== 'shop') {
                  setCurrentPage('shop');
                }
              }}
              className={`p-2 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${isScrolled ? 'text-plum hover:text-teal drop-shadow-none' : 'text-parchment hover:text-teal'}`}
              title="Search Collection"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Quick Draping Guide Icon */}
          <button
            onClick={onOpenQuickGuide}
            className={`hidden lg:flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase hover:text-teal transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${isScrolled ? 'text-mauve border border-subtle-grey bg-elevated drop-shadow-none' : 'text-parchment border-transparent bg-transparent'}`}
            title="Draping Helper Guide"
          >
            <Compass size={13} className="text-terracotta" />
            DRAPING Q&A
          </button>

          {/* Cart Icon with Badge */}
          <button
            onClick={onCartOpen}
            className={`relative p-2.5 transition-colors rounded-none flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${isScrolled ? 'text-plum hover:text-teal border border-subtle-grey bg-elevated drop-shadow-none' : 'text-parchment hover:text-teal border-transparent bg-transparent'}`}
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-teal text-parchment text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-parchment text-plum border-t border-subtle-grey px-4 py-6 space-y-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-sm font-bold tracking-widest uppercase py-2 px-3 rounded transition-colors ${
                currentPage === 'home' ? 'bg-teal/10 text-teal' : 'text-plum hover:bg-teal/5'
              }`}
            >
              Home Page
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`text-left text-sm font-bold tracking-widest uppercase py-2 px-3 rounded transition-colors ${
                currentPage === 'shop' ? 'bg-teal/10 text-teal' : 'text-plum hover:bg-teal/5'
              }`}
            >
              Collection Catalog
            </button>
            <button
              onClick={() => handleNavClick('lookbook')}
              className={`text-left text-sm font-bold tracking-widest uppercase py-2 px-3 rounded transition-colors ${
                currentPage === 'lookbook' ? 'bg-teal/10 text-teal' : 'text-plum hover:bg-teal/5'
              }`}
            >
              Lookbook Vol. IV
            </button>
            <button
              onClick={() => handleNavClick('masterclass')}
              className={`text-left text-sm font-bold tracking-widest uppercase py-2 px-3 rounded transition-colors ${
                currentPage === 'masterclass' ? 'bg-teal/10 text-teal' : 'text-plum hover:bg-teal/5'
              }`}
            >
              Draping Academy
            </button>
            <button
              onClick={() => {
                onOpenQuickGuide();
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-bold tracking-widest uppercase py-2 px-3 rounded transition-colors text-terracotta hover:bg-terracotta/5 flex items-center gap-2"
            >
              <Compass size={15} />
              Draping Q&A Helper
            </button>
          </div>
          <div className="pt-4 border-t border-subtle-grey flex flex-col gap-2 text-center text-[11px] text-mauve">
            <p>Need assistance? Speak to a private stylist.</p>
            <a href="tel:+1800DRAPES" className="font-bold text-plum hover:text-teal">
              +1-800-S-DRAPES
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
