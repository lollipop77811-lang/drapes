import React, { useState } from 'react';
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

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (page: 'home' | 'shop' | 'lookbook' | 'masterclass') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-subtle-grey bg-parchment/95 backdrop-blur-md transition-all duration-250">
      {/* Editorial Announcement Marquee */}
      <div className="bg-plum text-parchment py-1.5 px-4 overflow-hidden text-center select-none">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left section: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleNavClick('home')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative ${
              currentPage === 'home' ? 'text-teal' : 'text-plum hover:text-teal'
            }`}
          >
            Home
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative ${
              currentPage === 'shop' ? 'text-teal' : 'text-plum hover:text-teal'
            }`}
          >
            Collection Catalog
            {currentPage === 'shop' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('lookbook')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative ${
              currentPage === 'lookbook' ? 'text-teal' : 'text-plum hover:text-teal'
            }`}
          >
            Lookbook Vol. IV
            {currentPage === 'lookbook' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('masterclass')}
            className={`text-[11px] font-bold tracking-widest uppercase pb-1 transition-colors relative ${
              currentPage === 'masterclass' ? 'text-teal' : 'text-plum hover:text-teal'
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
            className="text-plum p-2 hover:text-teal transition-colors"
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
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-plum font-serif group-hover:text-teal transition-colors leading-none">
              Saaree<span className="font-light italic text-teal">Drapes</span>
            </h1>
            <span className="text-[9px] uppercase tracking-[0.35em] text-mauve block mt-0.5 text-center">
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
              className="text-plum hover:text-teal p-2 transition-colors"
              title="Search Collection"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Quick Draping Guide Icon */}
          <button
            onClick={onOpenQuickGuide}
            className="hidden lg:flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-mauve hover:text-teal transition-colors border border-subtle-grey py-1.5 px-3 bg-elevated"
            title="Draping Helper Guide"
          >
            <Compass size={13} className="text-terracotta" />
            DRAPING Q&A
          </button>

          {/* Cart Icon with Badge */}
          <button
            onClick={onCartOpen}
            className="relative p-2.5 text-plum hover:text-teal transition-colors border border-subtle-grey bg-elevated rounded-none flex items-center justify-center"
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
        <div className="lg:hidden bg-parchment border-t border-subtle-grey px-4 py-6 space-y-4 shadow-lg animate-fade-in">
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
