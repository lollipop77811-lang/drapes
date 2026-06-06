import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, Sparkles, CreditCard, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [packagingOption, setPackagingOption] = useState<'standard' | 'heritage'>('standard');

  // Checkout state inputs
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const itemsPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const packagingPrice = packagingOption === 'heritage' ? 45 : 0;
  const shippingPrice = itemsPrice > 500 ? 0 : 35;
  const totalPrice = itemsPrice + packagingPrice + shippingPrice;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerAddress) {
      alert('Please complete all fields to experience the high-fashion checkout simulation.');
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutSuccess(false);
        onClose();
      }, 4000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-plum/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-parchment border-l-4 border-plum flex flex-col justify-between shadow-2xl relative animate-slide-left">
          
          {/* Header */}
          <div className="p-6 border-b border-subtle-grey flex items-center justify-between bg-elevated">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-teal" />
              <h2 className="text-lg font-bold text-plum tracking-wider uppercase font-sans">
                THE SAAREE BAG ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-plum hover:text-parchment text-plum transition-colors"
              aria-label="Close Bag"
            >
              <X size={20} />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutSuccess ? (
            <div className="flex-grow p-8 flex flex-col items-center justify-center text-center space-y-6 bg-elevated">
              <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-teal font-bold block">
                  ORDER TRANSMITTED
                </span>
                <h3 className="text-2xl font-bold text-plum font-serif">
                  Thank you, {customerName || 'Patron'}
                </h3>
                <p className="text-xs text-mauve leading-relaxed max-w-xs mx-auto font-sans">
                  Your order for bespoke handloom sarees has been dispatched to the artisan cluster in <span className="text-plum font-semibold font-serif italic">Varanasi / Kanchipuram</span>.
                </p>
              </div>

              <div className="bg-parchment p-4 border border-subtle-grey w-full space-y-2 text-left">
                <p className="text-[10px] uppercase tracking-wider text-mauve">SHIPPING CONFIRMATION</p>
                <p className="text-xs text-plum font-sans font-medium">Sent to: {customerEmail}</p>
                <p className="text-[10px] text-terracotta italic">Weaving process validated. Courier leaves in 24h.</p>
              </div>

              <p className="text-[10px] text-mauve animate-pulse">
                Returning to the editorial gallery shortly...
              </p>
            </div>
          ) : (
            /* Main Drawer body */
            <div className="flex-grow flex flex-col overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex-grow p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-subtle-grey/50 flex items-center justify-center text-mauve">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-sm text-plum font-serif italic">
                    “An empty bag is a blank page.”
                  </p>
                  <p className="text-xs text-mauve font-sans max-w-xs">
                    Select one of our Vol. IV drapes to feel the handwoven metallic silk.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-teal hover:bg-plum text-parchment font-sans font-bold text-xs tracking-widest uppercase py-3 px-6 transition-colors duration-200"
                  >
                    RETURN TO EXHIBIT
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Item List */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div 
                        key={`cart-${item.product.id}-${item.selectedBlouseSize}`}
                        className="bg-elevated border border-subtle-grey p-4 flex gap-4 items-start"
                      >
                        {/* Thumbnail image */}
                        <div className="w-16 h-24 bg-parchment overflow-hidden border border-subtle-grey/60 flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-grow space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-mauve block">
                            {item.product.fabric}
                          </span>
                          <h4 className="text-sm font-medium text-plum font-serif leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-teal italic font-sans block">
                            Blouse Option: {item.selectedBlouseSize || 'Unstitched Panel'}
                          </p>

                          {/* Price & Quantity Selector */}
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-bold text-plum font-sans">
                              ${item.product.price} x {item.quantity}
                            </span>
                            
                            {/* Quantity triggers */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 border border-subtle-grey flex items-center justify-center text-xs hover:bg-plum hover:text-parchment text-plum font-bold"
                              >
                                -
                              </button>
                              <span className="text-xs font-semibold font-sans">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 border border-subtle-grey flex items-center justify-center text-xs hover:bg-plum hover:text-parchment text-plum font-bold"
                              >
                                +
                              </button>
                              
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1 text-terracotta hover:text-plum transition-colors ml-2"
                                title="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Premium Editorial Packaging Selection */}
                  <div className="bg-elevated p-4 border border-subtle-grey space-y-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-terracotta font-bold block">
                      CHOOSE SAAREE PACKAGING
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPackagingOption('standard')}
                        className={`p-3 border text-left transition-all ${
                          packagingOption === 'standard'
                            ? 'border-teal bg-teal/5 text-plum font-bold'
                            : 'border-subtle-grey text-mauve'
                        }`}
                      >
                        <span className="text-xs block">Minimalist Portfolio</span>
                        <span className="text-[9px] text-mauve font-sans block mt-1">Recycled unbleached silk pouch (Free)</span>
                      </button>

                      <button
                        onClick={() => setPackagingOption('heritage')}
                        className={`p-3 border text-left transition-all ${
                          packagingOption === 'heritage'
                            ? 'border-teal bg-teal/5 text-plum font-bold'
                            : 'border-subtle-grey text-mauve'
                        }`}
                      >
                        <span className="text-xs block flex items-center gap-1">
                          Heritage Cedarbox
                          <Sparkles size={10} className="text-terracotta" />
                        </span>
                        <span className="text-[9px] text-mauve font-sans block mt-1">Hand-engraved cedarwood, heirloom mothproof (+$45)</span>
                      </button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-elevated p-4 border border-subtle-grey space-y-2 text-xs font-sans text-plum">
                    <div className="flex justify-between">
                      <span className="text-mauve">Saree Subtotal</span>
                      <span>${itemsPrice}</span>
                    </div>
                    {packagingOption === 'heritage' && (
                      <div className="flex justify-between text-terracotta">
                        <span>Heritage Cedar Box packaging</span>
                        <span>+$45</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-mauve">Silk-Route Courier Shipping</span>
                      <span>{shippingPrice === 0 ? <span className="text-teal font-bold">FREE OVER $500</span> : `$${shippingPrice}`}</span>
                    </div>
                    <div className="border-t border-subtle-grey pt-2 flex justify-between text-sm font-bold">
                      <span>Total Luxury Investment</span>
                      <span className="text-teal">${totalPrice}</span>
                    </div>
                  </div>

                  {/* Simulated Checkout Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 border-t border-subtle-grey pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-plum font-bold block">
                      3. PATRON SHIPPING ADDRESS (SIMULATION)
                    </span>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        required
                        placeholder="Patron Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-elevated border border-subtle-grey text-plum text-xs p-2 focus:outline-none focus:border-teal font-sans"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email (for courier tracking)"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-elevated border border-subtle-grey text-plum text-xs p-2 focus:outline-none focus:border-teal font-sans"
                      />
                      <textarea
                        required
                        placeholder="Global Courier Delivery Address"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={2}
                        className="w-full bg-elevated border border-subtle-grey text-plum text-xs p-2 focus:outline-none focus:border-teal font-sans resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isCheckingOut}
                      className="w-full bg-plum hover:bg-teal text-parchment font-sans font-bold text-xs tracking-widest uppercase py-4 transition-colors duration-250 flex items-center justify-center gap-2 mt-2"
                    >
                      <CreditCard size={14} />
                      {isCheckingOut ? 'TRANSMITTING TO SILK GUILD...' : 'AUTHORIZE COMPLIMENTARY CHECKOUT'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Footer quote */}
          <div className="p-4 bg-plum text-parchment text-center text-[9px] uppercase tracking-[0.2em]">
            DRAPES WITH GRACE • THE NEW ORDER OF ANCESTRAL MODERNISM
          </div>

        </div>
      </div>
    </div>
  );
};
