import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  Search,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { useApp, PageId } from '../context/AppContext';
import { generateWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';
import { HavenLogo } from './HavenLogo';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    siteConfig,
    currency,
    setCurrency,
    toggleCurrency,
    setCategoryFilter,
    cartItemCount,
    setIsCartOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'consultancy', label: 'Consultancy' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getGeneralEnquiryMessage()
  );

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      {/* Top micro-announcement bar */}
      <div className="bg-[#0B1F3A] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              Haven Technologies • Over 500+ Clients Served • 95% Satisfaction Rate • Nationwide Delivery
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            {/* Direct Dual Currency Toggle Segment */}
            <div className="flex items-center bg-slate-800/90 rounded-md p-0.5 border border-slate-700">
              <button
                type="button"
                id="header-currency-ngn"
                onClick={() => setCurrency('NGN')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  currency === 'NGN'
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Display prices in Nigerian Naira (₦)"
              >
                ₦ NGN
              </button>
              <button
                type="button"
                id="header-currency-usd"
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Display prices in US Dollars ($)"
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo-link"
          onClick={() => handleNavClick('home')}
          className="text-left flex items-center gap-3 cursor-pointer group"
        >
          <HavenLogo size={44} className="flex-shrink-0" />
          <div>
            <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight text-[#0B1F3A] block leading-none">
              HAVEN
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#1769E0] uppercase block mt-1">
              TECHNOLOGIES
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#1769E0] font-semibold'
                    : 'text-slate-600 hover:text-[#0B1F3A]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1769E0] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-search-quick-btn"
            onClick={() => {
              setActivePage('products');
            }}
            className="p-2 text-slate-500 hover:text-[#0B1F3A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Browse all products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Button with Count Badge */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-[#0B1F3A] hover:bg-blue-50/70 rounded-xl transition-all border border-slate-200 hover:border-[#1769E0]/40 cursor-pointer flex items-center gap-2 group"
            title="Open technology cart"
            aria-label={`Cart contains ${cartItemCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-[#1769E0] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-[#0B1F3A] hidden lg:inline">
              Cart
            </span>
          </button>

          {/* Primary CTA: WhatsApp */}
          <a
            id="nav-whatsapp-primary-btn"
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803d] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu trigger & visible Cart + WhatsApp button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Cart Button */}
          <button
            id="mobile-nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#0B1F3A]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 bg-[#1769E0] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <a
            id="mobile-nav-whatsapp-btn"
            href={whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#16A34A] text-white text-xs font-semibold px-3 py-2 rounded-lg"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2"
        >
          <div className="space-y-1 pt-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#EAF2FF] text-[#1769E0] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            {/* View Cart in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-between bg-slate-100 text-[#0B1F3A] font-semibold py-2.5 px-4 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#1769E0]" />
                <span>View Technology Cart</span>
              </div>
              <span className="text-xs bg-[#1769E0] text-white px-2 py-0.5 rounded-full font-bold">
                {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
              </span>
            </button>

            <a
              id="mobile-drawer-whatsapp-cta"
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#16A34A] text-white font-semibold py-3 px-4 rounded-xl shadow-xs"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat with Us on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <button
                onClick={toggleCurrency}
                className="w-full flex items-center justify-center gap-1 font-medium text-slate-700 py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Switch Currency: {currency === 'NGN' ? '₦ NGN (Active)' : '$ USD (Active)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
