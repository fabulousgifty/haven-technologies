import React from 'react';
import {
  MessageCircle,
  ArrowUpRight,
  Check,
  Clock,
  AlertTriangle,
  ShoppingBag,
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { generateWhatsAppUrl, getProductEnquiryMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const {
    setSelectedProduct,
    formatDualPrice,
    siteConfig,
    cart,
    addToCart,
    setIsCartOpen,
  } = useApp();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    } else {
      setSelectedProduct(product);
    }
  };

  const inCartItem = cart.find((item) => item.product.id === product.id);
  const isOutOfStock = product.availability === 'Out of Stock';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const whatsappMessage =
    product.whatsappCustomMessage || getProductEnquiryMessage(product.name);

  const whatsappUrl = generateWhatsAppUrl(siteConfig.whatsappNumber, whatsappMessage);

  const prices = formatDualPrice(product.price, product.isPriceOnRequest);

  // Status badge styling
  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3" />
            Available
          </span>
        );
      case 'Limited Stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Clock className="w-3 h-3" />
            Limited Stock
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            Out of Stock
          </span>
        );
      case 'Coming Soon':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
            Coming Soon
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Product Image Area */}
      <div
        onClick={handleCardClick}
        className="relative aspect-4/3 bg-slate-100/70 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="text-[11px] font-medium tracking-wide uppercase bg-white/90 backdrop-blur-xs text-[#0B1F3A] px-2.5 py-0.5 rounded-md shadow-xs">
            {product.category}
          </span>
          {product.isFeatured && (
            <span className="text-[11px] font-semibold bg-[#1769E0] text-white px-2 py-0.5 rounded-md shadow-xs">
              Recommended
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10">
          {getAvailabilityBadge()}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3
            onClick={handleCardClick}
            className="font-heading font-bold text-base text-[#0B1F3A] hover:text-[#1769E0] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortBenefit}
          </p>
        </div>

        {/* Price & Action Strip */}
        <div className="pt-3 border-t border-slate-100 flex flex-col space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400 font-medium">Price:</span>
            <div className="text-right">
              <span className="font-heading font-extrabold text-base sm:text-lg text-[#0B1F3A] tracking-tight block">
                {prices.primary}
              </span>
              {product.price > 0 && !product.isPriceOnRequest && (
                <span className="text-[11px] text-slate-500 font-normal">
                  ≈ {prices.secondary}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full inline-flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : inCartItem
                ? 'bg-blue-50 hover:bg-blue-100 text-[#1769E0] border border-[#1769E0]/40'
                : 'bg-[#1769E0] hover:bg-[#145bca] text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isOutOfStock
                ? 'Out of Stock'
                : inCartItem
                ? `In Cart (${inCartItem.quantity}) • Add More`
                : 'Add to Cart'}
            </span>
          </button>

          {/* Secondary Actions: View Details & Quick WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`view-details-btn-${product.id}`}
              onClick={handleCardClick}
              className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2 px-2 rounded-xl transition-colors cursor-pointer"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              id={`whatsapp-ask-btn-${product.id}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-white bg-[#16A34A] hover:bg-[#15803d] py-2 px-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
