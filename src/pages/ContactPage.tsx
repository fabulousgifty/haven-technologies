import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Truck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  generateWhatsAppUrl,
  getGeneralEnquiryMessage,
  getContactFormWhatsAppMessage,
} from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const { siteConfig, addContactInquiry, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Product enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dropdown options strictly as specified in PRD #13
  const inquiryCategories = [
    'Product enquiry',
    'Phone recommendation',
    'Gadget recommendation',
    'Cameras & Lenses inquiry',
    'Home appliance',
    'Trading technology',
    'Business technology',
    'Partnership',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    addContactInquiry({
      fullName,
      email,
      phone,
      category,
      message,
      createdAt: new Date().toISOString(),
    });

    setIsSubmitted(true);
  };

  const whatsappDirectUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getGeneralEnquiryMessage()
  );

  const forwardFormToWhatsAppUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getContactFormWhatsAppMessage({
      fullName,
      category,
      message,
      phone,
    })
  );

  return (
    <div id="haven-contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* 1. HERO (PRD #13) */}
      <div className="text-left space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] font-heading">
            Direct Communication
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
          Let's talk technology.
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Have a product in mind? Need a recommendation? Want to discuss a technology solution? We're here to help.
        </p>
      </div>

      {/* 2. MAIN CONTACT LAYOUT (OPTIONS & FORM) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Cards (Left Column) */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Primary Highlight */}
          <div className="bg-[#EAF2FF] rounded-3xl p-6 sm:p-8 border border-blue-200/90 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#16A34A] text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider block">
                  Fastest Response Channel
                </span>
                <h3 className="font-heading font-bold text-xl text-[#0B1F3A]">
                  WhatsApp Advisory
                </h3>
                <span className="text-xs font-semibold text-emerald-800 inline-block mt-0.5">
                  {siteConfig.whatsappNumber.startsWith('+') ? siteConfig.whatsappNumber : `+${siteConfig.whatsappNumber}`}
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Connect directly with our senior technology advisors. Get real-time answers, product video verifications, and custom quotes within minutes.
            </p>

            <a
              id="contact-page-whatsapp-primary-cta"
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-sm py-3.5 px-5 rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </div>

          {/* Other Channels */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 text-[#1769E0]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0B1F3A]">
                  Email Inquiries
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  For corporate proposals, bulk institutional tenders, or partnerships:
                </p>
                <a
                  href={`mailto:${siteConfig.businessEmail}`}
                  className="text-xs font-semibold text-[#1769E0] hover:underline block mt-1"
                >
                  {siteConfig.businessEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-[#1769E0]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0B1F3A]">
                  Locations &amp; Logistics Hubs
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Operating advisory hubs with secure courier dispatch:
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1769E0]"></span>
                    <span>Owerri • Lagos • Abuja</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Nationwide Delivery Across All 36 States</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0B1F3A]">
                  Advisory Hours
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monday – Saturday: 8:00 AM – 8:00 PM (WAT)
                </p>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                  WhatsApp messages handled 7 days a week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Right Column) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16A34A] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">
                Inquiry Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for reaching out to Haven Technologies, <strong>{fullName}</strong>. A dedicated technology consultant will review your message and reply promptly.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={forwardFormToWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Also Send Message to WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setMessage('');
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-4 py-2"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-[#0B1F3A]">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out your details below and we will get back to you with personalized guidance.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  id="contact-fullname-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Adebayo Ogunlesi"
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] transition-colors"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. adebayo@example.com"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="contact-phone-input"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] transition-colors"
                  />
                </div>
              </div>

              {/* Dropdown Options (PRD #13) */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  What can we help you with? *
                </label>
                <select
                  id="contact-category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] cursor-pointer"
                >
                  {inquiryCategories.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tell Us What You Need */}
              <div>
                <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                  Tell us what you need *
                </label>
                <textarea
                  id="contact-message-input"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the product, features, specifications, or budget you are considering..."
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] transition-colors"
                />
              </div>

              {/* Submit Button (PRD #13) */}
              <div className="pt-2">
                <button
                  id="contact-form-submit-btn"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1769E0] hover:bg-blue-600 text-white font-bold text-sm py-4 px-6 rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </button>
              </div>
            </form>
          )}

          {/* Final CTA Strip (PRD #13) */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-medium">
              Prefer direct messaging?
            </span>
            <a
              id="contact-form-whatsapp-fallback-btn"
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#16A34A] hover:text-emerald-700 font-bold"
            >
              <span>Chat with Haven on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
