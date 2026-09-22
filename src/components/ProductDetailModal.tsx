import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Target,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  Share2,
  ChevronLeft,
  ShoppingBag,
  Plus,
  Minus,
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  generateWhatsAppUrl,
  getProductEnquiryMessage,
  getConsultancyEnquiryMessage,
} from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const {
    siteConfig,
    setActivePage,
    setSelectedProduct,
    products,
    showToast,
    addToCart,
    setIsCartOpen,
    formatDualPrice,
    formatPrice,
    cart,
  } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80'];

  const inCart = cart.find((item) => item.product.id === product.id);
  const isOutOfStock = product.availability === 'Out of Stock';

  const prices = formatDualPrice(product.price, product.isPriceOnRequest);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    onClose();
    setIsCartOpen(true);
  };

  // PRD #10 pre-filled message
  const prefilledEnquiryMessage =
    product.whatsappCustomMessage || getProductEnquiryMessage(product.name);
  const whatsappOrderUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    prefilledEnquiryMessage
  );

  // Consultancy message
  const consultantMessage = getConsultancyEnquiryMessage(
    product.category,
    formatPrice(product.price, product.isPriceOnRequest),
    `Evaluating ${product.name}`
  );
  const whatsappConsultantUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    consultantMessage
  );

  // Related products in the same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          showToast('Product link copied to clipboard.', 'success');
        })
        .catch(() => {
          showToast(`Shared: ${product.name}`, 'info');
        });
    } else {
      showToast(`Selected: ${product.name}`, 'info');
    }
  };

  const handleAskConsultant = () => {
    onClose();
    setActivePage('consultancy');
  };

  const isTradingProduct = product.category === 'Trading Tools';
  const isPhoneProduct = product.category === 'Phones';

  return (
    <div
      id="product-detail-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        id="product-detail-modal"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Actions */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Haven Catalog</span>
            <span>/</span>
            <span className="text-[#1769E0] font-semibold">{product.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="close-product-detail-btn"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-4/3 sm:aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#0B1F3A] px-2.5 py-1 rounded-md shadow-xs">
                  {product.availability}
                </div>
              </div>

              {/* Thumbnails if multiple images exist */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#1769E0] shadow-xs scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Pricing */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0]">
                  {product.category}
                </span>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] mt-1 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price Callout */}
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Estimated Sourcing Price:
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A]">
                      {prices.primary}
                    </span>
                    {product.price > 0 && !product.isPriceOnRequest && (
                      <span className="text-xs sm:text-sm text-slate-500 font-medium">
                        (≈ {prices.secondary})
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200 block">
                    Verified Authentic
                  </span>
                </div>
              </div>

              {/* Cart Quantity & Add to Cart Controls */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={isOutOfStock}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-[#0B1F3A]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      disabled={isOutOfStock}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    id="modal-add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-xs cursor-pointer ${
                      isOutOfStock
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : inCart
                        ? 'bg-blue-50 text-[#1769E0] border border-[#1769E0]/40 hover:bg-blue-100'
                        : 'bg-[#1769E0] hover:bg-[#145bca] text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isOutOfStock
                        ? 'Out of Stock'
                        : inCart
                        ? `Add More to Cart (${inCart.quantity} in cart)`
                        : 'Add to Cart'}
                    </span>
                  </button>

                  {/* Quick Buy / View Cart */}
                  {!isOutOfStock && (
                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="py-3 px-4 rounded-xl border border-slate-300 hover:border-[#1769E0] bg-white text-slate-700 hover:text-[#1769E0] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      View Cart
                    </button>
                  )}
                </div>
              </div>

              {/* Direct WhatsApp Ordering */}
              <div className="space-y-3 pt-1">
                <a
                  id="product-detail-whatsapp-order-btn"
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Enquire / Order Directly on WhatsApp</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    id="product-detail-whatsapp-consultant-btn"
                    href={whatsappConsultantUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors text-center"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ask a Consultant</span>
                  </a>

                  <button
                    id="product-detail-consultancy-page-btn"
                    onClick={handleAskConsultant}
                    className="flex items-center justify-center gap-1.5 bg-[#EAF2FF] hover:bg-blue-100 text-[#1769E0] text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors cursor-pointer text-center"
                  >
                    <span>Full Comparison</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Specifications & Features */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
              Key Features &amp; Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#1769E0] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer-Focused "Why We Recommend It" & "Best For" (PRD #10) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#EAF2FF]/60 rounded-2xl p-6 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-[#1769E0] font-heading font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Why We Recommend It</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {product.whyWeRecommend}
              </p>
            </div>

            <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-heading font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>Best For</span>
              </div>
              <p className="text-amber-900 text-sm leading-relaxed">
                {product.bestFor}
              </p>
            </div>
          </div>

          {/* Trading Technology Compliance & Risk Disclosure (PRD #24) */}
          {isTradingProduct && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block mb-0.5">
                  Regulatory &amp; Financial Risk Notice:
                </strong>
                Automated trading involves substantial financial risk. Past algorithmic performance does not guarantee future results. Automation tools cannot eliminate market risk or guarantee profits. Use strict drawdown limits.
              </div>
            </div>
          )}

          {/* Mobile Phone Verification & Warranty Policy */}
          {isPhoneProduct && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#1769E0] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-[#0B1F3A] block mb-0.5">
                  Haven Device Assurance &amp; Warranty Policy:
                </strong>
                Every phone in our collection is 100% genuine, factory unlocked, and thoroughly tested before dispatch.
                <span className="block mt-1 font-bold text-amber-900 bg-amber-100/80 border border-amber-300/70 px-2.5 py-1 rounded-md">
                  NB: Standard mobile industry policy — no warranty on screen damage.
                </span>
              </div>
            </div>
          )}

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
                You May Also Consider
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      setActiveImageIndex(0);
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-[#1769E0] transition-colors cursor-pointer bg-slate-50/50 group"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-200 mb-2">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-xs font-bold text-[#0B1F3A] line-clamp-1">
                      {rel.name}
                    </div>
                    <div className="text-xs text-[#1769E0] font-semibold mt-1">
                      {formatPrice(rel.price, rel.isPriceOnRequest)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
