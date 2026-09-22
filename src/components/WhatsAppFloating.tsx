import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';

export const WhatsAppFloating: React.FC = () => {
  const { siteConfig, cartItemCount, setIsCartOpen } = useApp();
  const whatsappUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getGeneralEnquiryMessage()
  );

  return (
    <>
      {/* Desktop Floating WhatsApp Pill Button (bottom-right) */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <a
          id="floating-whatsapp-desktop-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#16A34A] hover:bg-[#15803d] text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer active:scale-95"
          title="Chat directly with a Haven Technology Consultant"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
          </div>
          <div className="text-left leading-none">
            <span className="text-[11px] block text-emerald-100 font-medium tracking-wide">
              Online Now
            </span>
            <span className="text-sm font-bold tracking-tight">
              Chat on WhatsApp
            </span>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar with Cart quick trigger (PRD #15) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-lg flex items-center gap-2">
        {cartItemCount > 0 && (
          <button
            id="mobile-sticky-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-3 bg-blue-50 text-[#1769E0] rounded-xl border border-blue-200 cursor-pointer flex-shrink-0"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#1769E0] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
              {cartItemCount}
            </span>
          </button>
        )}
        <a
          id="mobile-sticky-whatsapp-bar"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#16A34A] active:bg-[#15803d] text-white py-3 px-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Talk to Advisor on WhatsApp</span>
        </a>
      </div>
    </>
  );
};
