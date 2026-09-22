import React from 'react';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Users,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Globe,
  Compass,
  Truck,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  const { siteConfig, setActivePage } = useApp();

  const whatsappUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getGeneralEnquiryMessage()
  );

  const coreValues = [
    {
      title: 'Trust',
      desc: 'We never compromise on product authenticity or warranty clarity. We only recommend hardware we would personally purchase for our families and businesses.',
      icon: ShieldCheck,
      accent: 'text-emerald-600 bg-emerald-50',
    },
    {
      title: 'Expertise',
      desc: 'Our advisory team continually tests real-world device performance, battery drain under Nigerian conditions, and ecosystem compatibility beyond spec sheets.',
      icon: Award,
      accent: 'text-[#1769E0] bg-blue-50',
    },
    {
      title: 'Value',
      desc: 'We guide you away from overpaying for frivolous marketing gimmicks. Every Naira spent should deliver tangible performance and durable daily utility.',
      icon: Compass,
      accent: 'text-amber-600 bg-amber-50',
    },
    {
      title: 'Customer First',
      desc: 'Our primary metric of success is your long-term satisfaction with your purchase. We are your enduring technology companion, not a one-off seller.',
      icon: HeartHandshake,
      accent: 'text-indigo-600 bg-indigo-50',
    },
  ];

  return (
    <div id="haven-about-page" className="space-y-20 sm:space-y-28 py-10 sm:py-16 pb-20">
      {/* 1. HERO & STORY (PRD #12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] font-heading">
              Our Story &amp; Ethos
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight leading-tight">
            Technology should make life easier,{' '}
            <span className="text-[#1769E0] block sm:inline">not more complicated.</span>
          </h1>

          <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            <p>
              Technology is evolving faster than ever. New phones, gadgets, appliances and digital tools appear every day, making it increasingly difficult to know what is actually worth buying.
            </p>
            <p>
              Haven Technologies was created to make that decision easier. We combine technology knowledge, authentic sourcing, and personalized consultancy to help customers choose technology with confidence.
            </p>
            <p className="font-medium text-[#0B1F3A]">
              With over 500+ satisfied clients served across Nigeria and a verified 95% customer satisfaction rate, we operate as a trusted technology guide and sourcing partner—not simply a generic electronics retailer.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BUSINESS MILESTONES & IMPACT */}
      <section id="about-business-milestones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1F3A] via-slate-900 to-[#0B1F3A] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#1769E0]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider font-heading mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Our Business Milestones
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              From our operational centers in Owerri, Lagos, and Abuja to clients nationwide across Nigeria, our growth reflects an uncompromising commitment to authentic hardware, honest consultancy, and customer satisfaction.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Milestone 1: 500+ Clients */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-[#1769E0] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">500+</span>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Clients</span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-100 mt-2">
                  Clients Served
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Trusted by software developers, creative pros, business founders, and families across Nigeria for authentic devices.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] font-semibold text-blue-300">
                Verified client engagements
              </div>
            </div>

            {/* Milestone 2: 95% Satisfaction */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">95%</span>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Satisfaction</span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-100 mt-2">
                  Satisfaction Rate
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Earned through zero-pressure recommendations, verified pre-delivery checks, and responsive WhatsApp support.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] font-semibold text-amber-300">
                Direct customer feedback
              </div>
            </div>

            {/* Milestone 3: 100% Genuine Hardware */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#16A34A] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#16A34A]">100%</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Authentic</span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-100 mt-2">
                  Genuine Hardware
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Every device is factory-sealed, manufacturer-warranted, and thoroughly verified against grey-market clones.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] font-semibold text-emerald-300">
                Zero counterfeit tolerance
              </div>
            </div>

            {/* Milestone 4: 3 Hubs & 36 States */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading text-white">36</span>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">States</span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-100 mt-2">
                  Nationwide Logistics
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Coordination bases in Owerri, Lagos, and Abuja with secure, fast doorstep delivery across the entire country.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700/60 text-[11px] font-semibold text-indigo-300">
                Owerri • Lagos • Abuja • Nationwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (PRD #12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#EAF2FF] text-[#1769E0] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] font-heading block">
              Our Mission
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-[#0B1F3A]">
              To make quality technology easier to understand, access and choose.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We remove the guesswork from purchasing consumer and enterprise technology by providing transparent, honest, and technically verified specifications tailored to your lifestyle and budget.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#0B1F3A] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-[#1769E0] flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-heading block">
              Our Vision
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-white">
              To become a trusted technology partner for individuals, families and businesses across Africa.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Establishing a continental benchmark for integrity in hardware sourcing, where every client feels guided by a personal, knowledgeable advisor who safeguards their capital.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (PRD #12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mt-1">
            Our Core Values
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            The standards that dictate how we evaluate hardware and treat every single customer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${val.accent}`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WHY HAVEN STANDS APART FROM GENERIC SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-12 border border-slate-200">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B1F3A] tracking-tight mb-6">
            The Haven Sourcing Guarantee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-slate-600">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F3A]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>100% Genuine Hardware</span>
              </div>
              <p className="text-xs leading-relaxed">
                Zero refurbished units disguised as brand new. Every device comes sealed in original manufacturer packaging with verified serial numbers.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F3A]">
                <Truck className="w-4 h-4 text-[#16A34A]" />
                <span>Nationwide Delivery</span>
              </div>
              <p className="text-xs leading-relaxed">
                Operating hubs in Owerri, Lagos, and Abuja with secure, swift doorstep delivery to all 36 states across Nigeria.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F3A]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Direct WhatsApp Access</span>
              </div>
              <p className="text-xs leading-relaxed">
                No automated answering bots or endless email queues. Speak with real technology consultants located right here in Nigeria.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#0B1F3A]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Ecosystem Synergy</span>
              </div>
              <p className="text-xs leading-relaxed">
                We make sure your phone, laptop, power bank, and home appliances work harmoniously together so you avoid redundant accessories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1F3A] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Work with a partner who puts your needs first.
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Whether you need a single reliable smartphone, a full home power backup setup, or office networking infrastructure, we are ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              id="about-whatsapp-chat-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              onClick={() => setActivePage('products')}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
