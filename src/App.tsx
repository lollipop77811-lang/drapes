import { useState, useMemo } from 'react';
import { SAMPLE_PRODUCTS } from './data/products';
import { SareeProduct, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { DrapingMasterclass } from './components/DrapingMasterclass';
import { Lookbook } from './components/Lookbook';
import { QuickDrapingGuide } from './components/QuickDrapingGuide';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { ChevronRight } from 'lucide-react';

export default function App() {
  // Multi-Page Routing State
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'lookbook' | 'masterclass'>('home');
  
  // Global States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SareeProduct | null>(null);
  const [isQuickGuideOpen, setIsQuickGuideOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [sortBy, setSortBy] = useState('curated');

  // Get unique filter values from data
  const fabrics = useMemo(() => {
    return Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.fabric)));
  }, []);

  const origins = useMemo(() => {
    return Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.origin)));
  }, []);

  const difficulties = useMemo(() => {
    return Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.drapingDifficulty)));
  }, []);

  // Toast triggers
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart Actions
  const handleAddToCart = (product: SareeProduct, blouseSize: string = 'Unstitched Pure Silk Panel') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedBlouseSize === blouseSize
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }

      return [...prevCart, { product, quantity: 1, selectedBlouseSize: blouseSize }];
    });

    showToast(`Added "${product.name}" (${blouseSize}) to your bag.`);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    const itemToRemove = cart.find((item) => item.product.id === productId);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.product.name}" from bag.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFabric('all');
    setSelectedDifficulty('all');
    setSelectedOrigin('all');
    setSortBy('curated');
    showToast('All catalog filters reset to pristine state.', 'info');
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...SAMPLE_PRODUCTS];

    // Filter by Fabric
    if (selectedFabric !== 'all') {
      result = result.filter((p) => p.fabric === selectedFabric);
    }

    // Filter by Difficulty
    if (selectedDifficulty !== 'all') {
      result = result.filter((p) => p.drapingDifficulty === selectedDifficulty);
    }

    // Filter by Origin
    if (selectedOrigin !== 'all') {
      result = result.filter((p) => p.origin === selectedOrigin);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.fabric.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort Products
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedFabric, selectedDifficulty, selectedOrigin, searchQuery, sortBy]);



  const handleQuickViewOther = (prod: SareeProduct) => {
    setSelectedProduct(prod);
  };

  return (
    <div className="min-h-screen bg-parchment text-plum flex flex-col font-sans selection:bg-teal selection:text-parchment">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-plum border-2 border-teal text-parchment p-4 shadow-2xl flex items-center gap-3 animate-slide-left max-w-sm">
          <div className="w-2 h-2 rounded-full bg-teal animate-ping" />
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-teal">PATRON NOTIFICATION</p>
            <p className="text-xs font-medium font-sans leading-snug">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Elegant Top Navbar */}
      <Navbar
        cart={cart}
        onCartOpen={() => setIsCartOpen(true)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenQuickGuide={() => setIsQuickGuideOpen(true)}
      />

      {/* Render Current Page View */}
      <main className="flex-grow">
        
        {/* HOME PAGE VIEW */}
        {currentPage === 'home' && (
          <HomePage
            products={SAMPLE_PRODUCTS}
            onQuickView={(p) => setSelectedProduct(p)}
            onAddToCart={(p) => handleAddToCart(p, 'Unstitched Pure Silk Panel')}
            setCurrentPage={setCurrentPage}
            onOpenQuickGuide={() => setIsQuickGuideOpen(true)}
          />
        )}

        {/* COLLECTION CATALOG SHOP VIEW */}
        {currentPage === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Sidebar: Filters */}
              <div className="lg:col-span-3 lg:sticky lg:top-28">
                <FilterSidebar
                  selectedFabric={selectedFabric}
                  setSelectedFabric={setSelectedFabric}
                  selectedDifficulty={selectedDifficulty}
                  setSelectedDifficulty={setSelectedDifficulty}
                  selectedOrigin={selectedOrigin}
                  setSelectedOrigin={setSelectedOrigin}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  fabrics={fabrics}
                  origins={origins}
                  difficulties={difficulties}
                  resetFilters={resetFilters}
                />
                
                {/* Interactive Style Challenge Block */}
                <div className="mt-6 bg-teal text-parchment p-6 space-y-4 border border-subtle-grey">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-parchment/80 font-bold block">
                    STYLE BOARD CLASH
                  </span>
                  <p className="text-sm font-serif italic leading-relaxed">
                    “For high fashion styling, we advise wearing our gold zari Kanjeevaram over a tailored turtleneck blouse.”
                  </p>
                  <div 
                    className="text-[10px] font-sans font-bold border-t border-parchment/20 pt-3 flex items-center justify-between cursor-pointer hover:underline"
                    onClick={() => setCurrentPage('masterclass')}
                  >
                    <span>SEE DRAPING ARCHIVE</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>

              {/* Right Saree Products Grid */}
              <div className="lg:col-span-9 space-y-8">
                
                {/* Header & Search info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-subtle-grey">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-mauve font-sans">
                      Neo-Heritage Saree Collection
                    </p>
                    <h3 className="text-xl font-bold text-plum font-serif">
                      Showing {filteredProducts.length} curated piece{filteredProducts.length === 1 ? '' : 's'}
                    </h3>
                  </div>
                  
                  {/* Active Filter Pills */}
                  <div className="flex flex-wrap gap-2">
                    {selectedFabric !== 'all' && (
                      <span className="bg-teal/10 text-teal border border-teal/30 text-[10px] uppercase px-2.5 py-1 font-bold font-sans flex items-center gap-1.5">
                        Fabric: {selectedFabric}
                        <button onClick={() => setSelectedFabric('all')} className="hover:text-terracotta font-black font-sans">×</button>
                      </span>
                    )}
                    {selectedOrigin !== 'all' && (
                      <span className="bg-terracotta/10 text-terracotta border border-terracotta/30 text-[10px] uppercase px-2.5 py-1 font-bold font-sans flex items-center gap-1.5">
                        Origin: {selectedOrigin}
                        <button onClick={() => setSelectedOrigin('all')} className="hover:text-teal font-black font-sans">×</button>
                      </span>
                    )}
                    {selectedDifficulty !== 'all' && (
                      <span className="bg-plum/10 text-plum border border-plum/30 text-[10px] uppercase px-2.5 py-1 font-bold font-sans flex items-center gap-1.5">
                        Drape: {selectedDifficulty}
                        <button onClick={() => setSelectedDifficulty('all')} className="hover:text-teal font-black font-sans">×</button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="bg-plum/10 text-plum border border-plum/30 text-[10px] uppercase px-2.5 py-1 font-bold font-sans flex items-center gap-1.5">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="hover:text-teal font-black font-sans">×</button>
                      </span>
                    )}
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-elevated border border-subtle-grey p-12 text-center space-y-6">
                    <p className="text-xl font-bold text-plum font-serif italic">
                      “No weaves found matching this physical parameter.”
                    </p>
                    <p className="text-xs text-mauve max-w-md mx-auto font-sans">
                      Our master weavers create in ultra-limited drops. Reset your filters to display our iconic Electric Teal, Burnt Terracotta, and Deep Aubergine mainstays.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="bg-teal hover:bg-plum text-parchment font-sans font-bold text-xs tracking-widest uppercase py-3 px-6 transition-colors"
                    >
                      RESET CURRENT FILTER CRITERIA
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={(p) => setSelectedProduct(p)}
                        onAddToCart={(p) => handleAddToCart(p, 'Unstitched Pure Silk Panel')}
                      />
                    ))}
                  </div>
                )}

                {/* Bottom craft tag */}
                <div className="bg-plum text-parchment p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-teal/40 mt-8">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-teal font-bold">
                      CRAFT INTEGRITY SEAL
                    </p>
                    <h4 className="text-lg font-bold font-serif text-parchment mt-1">
                      Certified Silk Mark Handloom Sarees
                    </h4>
                    <p className="text-xs text-parchment/70 font-sans max-w-lg mt-1">
                      We source directly from verified traditional weavers. Fair pricing structures allow for structural investments back into independent artisan homes.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsQuickGuideOpen(true)}
                    className="bg-teal hover:bg-teal/90 text-parchment text-[10px] font-bold uppercase tracking-widest py-2.5 px-4 transition-colors shrink-0 font-sans"
                  >
                    READ TRUST COMPACT &rarr;
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* EDITORIAL LOOKBOOK VIEW */}
        {currentPage === 'lookbook' && (
          <Lookbook
            products={SAMPLE_PRODUCTS}
            onQuickView={(p) => setSelectedProduct(p)}
          />
        )}

        {/* DRAPING ACADEMY VIEW */}
        {currentPage === 'masterclass' && (
          <DrapingMasterclass />
        )}



      </main>

      {/* Quick Draping Q&A Modal */}
      <QuickDrapingGuide
        isOpen={isQuickGuideOpen}
        onClose={() => setIsQuickGuideOpen(false)}
      />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        allProducts={SAMPLE_PRODUCTS}
        onQuickViewOther={handleQuickViewOther}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Luxury Footer */}
      <Footer />

    </div>
  );
}
