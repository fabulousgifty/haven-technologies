import React from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowRight,
  ShieldAlert,
  Lock,
} from 'lucide-react';
import { useApp, PageId } from '../context/AppContext';
import { generateWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';
import { HavenLogo } from './HavenLogo';

export const Footer: React.FC = () => {
  const { setActivePage, setCategoryFilter, siteConfig, setOpenAdminModal } = useApp();

  const navigateToCategory = (cat: string) => {
    setCategoryFilter(cat);
    setActivePage('products');
  };

  const whatsappUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getGeneralEnquiryMessage()
  );

  return (
    <footer id="main-site-footer" className="bg-[#0B1F3A] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <HavenLogo size={42} className="flex-shrink-0" />
              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight block">
                  HAVEN TECHNOLOGIES
                </span>
                <span className="text-[10px] tracking-widest text-[#1769E0] uppercase block">
                  Advisory, Direct Sourcing &amp; Retail
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The right technology for your needs, without the guesswork. Over 500+ satisfied clients served nationwide with a 95% verified satisfaction rate.
            </p>
            <div className="pt-2">
              <a
                id="footer-whatsapp-chat-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#16A34A] hover:text-emerald-400 font-medium"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Quick WhatsApp Advisory Support</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products &amp; Devices
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('consultancy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Technology Consultancy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact &amp; Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigateToCategory('Phones')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Phone Accessories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Gadgets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gadgets &amp; Tech Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Cameras & Lenses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cameras &amp; Lenses
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Home Appliances')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home Appliances
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Trading Tools')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Trading Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Business Technology')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Business Technology
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
              Connect
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1769E0] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Owerri • Lagos • Abuja</span>
                  <span className="text-xs text-slate-400 block mt-0.5">Nationwide Doorstep Delivery</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#1769E0] flex-shrink-0 mt-0.5" />
                <span className="break-all">{siteConfig.businessEmail}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <span>WhatsApp: {siteConfig.whatsappNumber.startsWith('+') ? siteConfig.whatsappNumber : `+${siteConfig.whatsappNumber}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRD #24: Trading Technology Safety/Compliance Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Trading Technology Disclosure:</strong> Automated trading involves financial risk. Past performance does not guarantee future results. Technology or automation tools cannot guarantee profits. We prioritize objective tools and risk management parameters.
          </p>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 Haven Technologies. All rights reserved.</span>
            <button
              id="footer-owner-access-stealth-trigger"
              onClick={() => setOpenAdminModal(true)}
              className="text-slate-600 hover:text-slate-400 p-1 rounded-sm opacity-30 hover:opacity-100 transition-opacity cursor-pointer inline-flex items-center"
              title="Portal Access"
              aria-label="Owner Access"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Advisory Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
