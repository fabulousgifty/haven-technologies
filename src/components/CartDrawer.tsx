import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateWhatsAppUrl, getCartCheckoutMessage } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartTotalUsd,
    cartItemCount,
    currency,
    toggleCurrency,
    siteConfig,
    setActivePage,
  } = useApp();

  const [deliveryCity, setDeliveryCity] = useState<'Owerri' | 'Lagos' | 'Abuja' | 'Nationwide Delivery'>('Owerri');
  const [customerNote, setCustomerNote] = useState<string>('');

  if (!isCartOpen) return null;

  const checkoutMessage = getCartCheckoutMessage({
    items: cart.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    })),
    totalNgn: cartTotal,
    totalUsd: cartTotalUsd,
    currency,
    deliveryCity,
    customerNote: customerNote.trim() || undefined,
    exchangeRate: siteConfig.exchangeRate,
  });

  const checkoutWhatsAppUrl = generateWhatsAppUrl(siteConfig.whatsappNumber, checkoutMessage);

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActivePage('products');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-[#0B1F3A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1769E0] flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Technology Cart
              </h2>
              <p className="text-xs text-slate-300">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Currency Toggle in Cart */}
            <button
              onClick={toggleCurrency}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors flex items-center gap-1.5"
              title="Toggle currency between NGN and USD"
            >
              <RefreshCw className="w-3 h-3 text-[#60A5FA]" />
              <span>{currency === 'NGN' ? '₦ NGN' : '$ USD'}</span>
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
              Your Cart is Empty
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mt-1 mb-6 leading-relaxed">
              Explore our curated selection of flagship phones, HP laptops, noise-cancelling headsets, and smart home appliances.
            </p>
            <button
              onClick={handleContinueShopping}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1769E0] hover:bg-[#145bca] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-slate-100">
            <div className="space-y-3 pt-1">
              {cart.map((item) => {
                const itemNgn = item.product.price * item.quantity;
                const itemUsd = Math.round(itemNgn / siteConfig.exchangeRate);
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-200 flex-shrink-0"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0B1F3A] line-clamp-2 leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-red-500 p-1 -mr-1 transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="inline-block text-[10px] font-semibold text-[#1769E0] bg-blue-50 px-2 py-0.5 rounded-md mt-1">
                          {item.product.category}
                        </span>
                      </div>

                      {/* Pricing & Stepper */}
                      <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-slate-200/60">
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                            {currency === 'USD'
                              ? `$${itemUsd.toLocaleString('en-US')}`
                              : `₦${itemNgn.toLocaleString('en-NG')}`}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {currency === 'USD'
                              ? `≈ ₦${itemNgn.toLocaleString('en-NG')}`
                              : `≈ $${itemUsd.toLocaleString('en-US')}`}
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#0B1F3A]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Hub Selection */}
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>Delivery Hub / Destination</span>
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Owerri', 'Lagos', 'Abuja', 'Nationwide Delivery'] as const).map((hub) => (
                  <button
                    key={hub}
                    type="button"
                    onClick={() => setDeliveryCity(hub)}
                    className={`py-2 px-2.5 rounded-xl text-left font-medium border transition-colors ${
                      deliveryCity === hub
                        ? 'border-[#1769E0] bg-blue-50/70 text-[#1769E0] font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {hub}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Customer Note */}
            <div className="pt-4 space-y-1.5">
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                Order Note / Specs (Optional)
              </label>
              <input
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="e.g. Color preference, expedited courier, specific laptop spec"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] bg-slate-50 focus:bg-white transition-colors"
              />
            </div>

            {/* Trust highlights */}
            <div className="pt-4 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                <span>Genuine product guarantee with comprehensive warranty &amp; inspection.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1769E0] flex-shrink-0" />
                <span>Direct WhatsApp checkout with real technology advisors — no automated bots.</span>
              </div>
            </div>
          </div>
        )}

        {/* Drawer Footer / Checkout summary */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Estimated Total (NGN &amp; USD):</span>
                <span className="font-semibold text-slate-700">
                  {currency === 'USD'
                    ? `₦${cartTotal.toLocaleString('en-NG')}`
                    : `$${cartTotalUsd.toLocaleString('en-US')} USD`}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-[#0B1F3A]">Total Amount:</span>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A]">
                    {currency === 'USD'
                      ? `$${cartTotalUsd.toLocaleString('en-US')}`
                      : `₦${cartTotal.toLocaleString('en-NG')}`}
                  </span>
                  <span className="text-xs text-slate-500 block font-normal">
                    {currency === 'USD' ? 'USD Equivalent' : 'Nigerian Naira'}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button: WhatsApp Checkout */}
            <a
              id="cart-checkout-whatsapp-btn"
              href={checkoutWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Checkout via WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Secondary Controls */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <button
                onClick={clearCart}
                className="hover:text-red-600 transition-colors underline"
              >
                Clear Cart
              </button>
              <button
                onClick={handleContinueShopping}
                className="hover:text-[#1769E0] transition-colors font-medium"
              >
                Continue Shopping &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
