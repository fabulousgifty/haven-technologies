import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Laptop,
  Home,
  TrendingUp,
  Briefcase,
  Layers,
  HeartHandshake,
  Compass,
  Award,
  ChevronRight,
  Zap,
  Truck,
  Users,
  Star,
  Camera,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { generateWhatsAppUrl, getGeneralEnquiryMessage } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const {
    setActivePage,
    setCategoryFilter,
    products,
    siteConfig,
  } = useApp();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);
  // If fewer than 4 featured, take first 4 products
  const displayProducts =
    featuredProducts.length >= 4 ? featuredProducts : products.slice(0, 6);

  const whatsappGeneralUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getGeneralEnquiryMessage()
  );

  const handleCategoryCardClick = (cat: string) => {
    setCategoryFilter(cat);
    setActivePage('products');
  };

  const categoryCards = [
    {
      title: 'Phones & Accessories',
      category: 'Phones',
      description: 'Flagship & budget-friendly smartphones, fast GaN chargers, durable power banks, and noise-cancelling earbuds.',
      icon: Smartphone,
      accent: 'bg-blue-50 text-[#1769E0]',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Gadgets & Tech Tools',
      category: 'Gadgets',
      description: 'High-performance laptops, content creation gear, smart watches, and productivity tools.',
      icon: Laptop,
      accent: 'bg-indigo-50 text-indigo-600',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Cameras & Pro Lenses',
      category: 'Cameras & Lenses',
      description: 'Sony Alpha & Canon EOS R full-frame bodies, G-Master & RF glass, creator vlogging kits, and action cameras.',
      icon: Camera,
      accent: 'bg-rose-50 text-rose-600',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Home Appliances',
      category: 'Home Appliances',
      description: 'Clean solar inverters, smart AI washer-dryers, low-power airfryers, and cordless home vacuums.',
      icon: Home,
      accent: 'bg-emerald-50 text-[#16A34A]',
      image: 'https://images.unsplash.com/photo-1558441719-8b449c6ff670?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Trading Technology',
      category: 'Trading Tools',
      description: 'Automated MT4/MT5 forex bots, volatility filters, multi-timeframe swing indicators, and risk management tools.',
      icon: TrendingUp,
      accent: 'bg-amber-50 text-amber-700',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Business Technology',
      category: 'Business Technology',
      description: 'Starlink high-speed satellite kits, enterprise security gateways, failover routing, and thermal label printers.',
      icon: Briefcase,
      accent: 'bg-slate-100 text-slate-800',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const whyHavenCards = [
    {
      title: 'Expert Guidance',
      desc: 'We cut through confusing manufacturer specs to tell you exactly how a device performs in real Nigerian everyday use.',
      icon: Compass,
    },
    {
      title: 'Smart Value',
      desc: 'No overpaying for hyped features you will never use. We match devices accurately to your actual budget and workflow.',
      icon: Award,
    },
    {
      title: 'Quality First',
      desc: 'Every sourced device and software tool is verified for hardware authenticity, battery longevity, and genuine warranty.',
      icon: ShieldCheck,
    },
    {
      title: 'Personal Support',
      desc: 'Direct WhatsApp communication with knowledgeable technology advisors before, during, and after your acquisition.',
      icon: HeartHandshake,
    },
  ];

  const personaCards = [
    {
      title: 'Corporate Professionals',
      subtitle: 'Efficiency & Reliability',
      text: 'Work laptops with all-day battery, noise-cancelling earbuds for meetings, and enterprise satellite failover connections.',
      highlight: 'Featured: M4 MacBook Pro & GaN multi-chargers',
    },
    {
      title: 'Modern Families',
      subtitle: 'Peace of Mind at Home',
      text: 'Silent solar inverter systems, smart AI laundry units that eliminate outdoor drying, and healthy rapid airfryers.',
      highlight: 'Featured: EcoFlow Solar & LG AI Washer-Dryers',
    },
    {
      title: 'Graduates & Corps Members',
      subtitle: 'Maximum Value for Money',
      text: 'High-spec affordable smartphones, 2-day battery backups, and portable chargers to stay productive on tight budgets.',
      highlight: 'Featured: Redmi Note 14 Pro+ & Anker PowerCore',
    },
    {
      title: 'Tech Enthusiasts & Traders',
      subtitle: 'Automation & Precision',
      text: 'Algorithmic MT4/MT5 trading software with strict risk rules, 120Hz displays, and pro mobile creator setups.',
      highlight: 'Featured: Haven Apex FX Suite & DJI Pocket 3',
    },
  ];

  return (
    <div id="haven-homepage" className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. HERO SECTION (PRD #8) */}
      <section
        id="homepage-hero-section"
        className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F8FAFC]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF2FF] border border-blue-200/80">
                <span className="w-2 h-2 rounded-full bg-[#1769E0]"></span>
                <span className="text-xs font-bold tracking-wider text-[#1769E0] uppercase font-heading">
                  HAVEN TECHNOLOGIES
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight leading-[1.15]">
                The right technology for your needs,{' '}
                <span className="text-[#1769E0] underline decoration-[#1769E0]/30 underline-offset-4">
                  without the guesswork.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl">
                From smartphones and accessories to gadgets, home appliances and automated trading tools, we help you discover, compare and choose technology that fits your needs, lifestyle and budget.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  id="hero-whatsapp-primary-cta"
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-base px-7 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat with us on WhatsApp</span>
                </a>

                <button
                  id="hero-explore-products-btn"
                  onClick={() => setActivePage('products')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0B1F3A] font-semibold text-base px-7 py-4 rounded-xl border border-slate-300 transition-all cursor-pointer"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Trust Indicators (PRD #8 + User Milestones) */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1769E0]" />
                  <span className="font-bold text-[#0B1F3A]">500+ Clients Served</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-[#0B1F3A]">95% Satisfaction Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>100% Genuine Hardware</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Owerri • Lagos • Abuja • Nationwide</span>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-gradient-to-tr from-slate-100 to-white p-4 sm:p-6 border border-slate-200/80 shadow-xl">
                {/* Hero Featured Collage */}
                <div className="aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-slate-200 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80"
                    alt="Haven Sourced Technology"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#1769E0] text-white px-2.5 py-0.5 rounded">
                      Featured Sourcing
                    </span>
                    <h3 className="font-heading font-bold text-lg text-white mt-1">
                      Curated Flagships &amp; Professional Tools
                    </h3>
                    <p className="text-xs text-slate-200 mt-0.5">
                      Hand-inspected authenticity &amp; verified performance
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1 (Bottom Left): Clients Served & Genuine Guarantee */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#0B1F3A] block">
                      500+ Clients Served
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Trusted retail &amp; sourcing nationwide
                    </span>
                  </div>
                </div>

                {/* Floating Badge 2 (Top Right): Satisfaction Rate */}
                <div className="absolute -top-4 -right-4 bg-[#0B1F3A] text-white rounded-2xl p-3.5 shadow-lg border border-slate-700 hidden sm:flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block leading-tight text-white">95% Satisfaction Rate</span>
                    <span className="text-[10px] text-slate-300 block">Verified client rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1B. KEY TRUST METRICS STRIP (500+ Clients & 95% Satisfaction Rate) */}
      <section id="homepage-trust-metrics-bar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 relative z-10">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-lg shadow-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {/* Metric 1: Clients Served */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-2 sm:pt-0">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
                  500+
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1769E0] text-[10px] font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <span className="text-sm font-bold text-[#0B1F3A] mt-1">Clients Served</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Professionals, creators, and businesses equipped across Nigeria
              </p>
            </div>

            {/* Metric 2: Satisfaction Rate */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B1F3A] tracking-tight">
                  95%
                </span>
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
              </div>
              <span className="text-sm font-bold text-[#0B1F3A] mt-1">Satisfaction Rate</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Customer satisfaction score across all device deliveries
              </p>
            </div>

            {/* Metric 3: Genuine Devices */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#16A34A] tracking-tight">
                  100%
                </span>
                <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
              </div>
              <span className="text-sm font-bold text-[#0B1F3A] mt-1">Genuine Hardware</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct factory-sealed &amp; tested authentic specifications
              </p>
            </div>

            {/* Metric 4: Showrooms & Delivery */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left pt-4 sm:pt-0 sm:pl-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-heading text-[#1769E0] tracking-tight">
                  3 Hubs
                </span>
                <Truck className="w-5 h-5 text-[#1769E0]" />
              </div>
              <span className="text-sm font-bold text-[#0B1F3A] mt-1">Nationwide Coverage</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Owerri, Lagos, Abuja with fast dispatch to all 36 states
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SECTION (PRD #8) */}
      <section id="homepage-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              Technology Directory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mt-1">
              Technology for the way you live and work.
            </h2>
          </div>
          <button
            onClick={() => setActivePage('products')}
            className="text-sm font-bold text-[#1769E0] hover:text-blue-700 flex items-center gap-1 cursor-pointer self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                id={`category-card-${idx}`}
                onClick={() => handleCategoryCardClick(cat.category)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#1769E0] hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.accent}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-[#1769E0] flex items-center gap-1 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0B1F3A] group-hover:text-[#1769E0] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Advisory &amp; Sourcing</span>
                  <span className="text-emerald-700 font-semibold">Available</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WHY HAVEN SECTION (PRD #8) */}
      <section id="homepage-why-haven-section" className="bg-[#0B1F3A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              The Haven Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mt-1">
              Too many choices. One trusted technology guide.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              Electronics retailers push whatever inventory sits on their shelves. Haven Technologies evaluates your actual requirements first, helping you acquire devices that offer lasting value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyHavenCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1769E0]/20 text-[#1769E0] flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS (PRD #8) */}
      <section id="homepage-featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mt-1">
              Technology worth having.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Rigorous reliability, durable performance, and strong return on investment.
            </p>
          </div>

          <button
            onClick={() => setActivePage('products')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1769E0] hover:text-blue-700 cursor-pointer self-start sm:self-auto"
          >
            <span>Browse Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. CONSULTANCY CTA SECTION (PRD #8) */}
      <section id="homepage-consultancy-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF2FF] rounded-3xl p-8 sm:p-12 border border-blue-200/90 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              Personalized Advisory
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
              Not sure what to buy? Let's find the right option for you.
            </h2>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
              Choosing between phone specifications, inverter capacities, or trading automation tools can feel overwhelming. Share your daily routine, budget, and priorities with our specialists, and we will formulate an objective recommendation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="consultancy-banner-start-btn"
                onClick={() => setActivePage('consultancy')}
                className="bg-[#1769E0] hover:bg-blue-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer text-center"
              >
                Get a Technology Recommendation
              </button>

              <a
                id="consultancy-banner-whatsapp-direct"
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-slate-50 text-[#0B1F3A] font-semibold text-sm px-6 py-3.5 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#16A34A] fill-current" />
                <span>Ask via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUDIENCE / LIFESTYLE SECTION (PRD #8) */}
      <section id="homepage-audience-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
            Tailored Sourcing
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mt-1">
            Technology for every lifestyle.
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Every user profile encounters unique technological bottlenecks. Here is how we customize sourcing:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personaCards.map((persona, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider">
                  {persona.subtitle}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#0B1F3A] mt-1 mb-3">
                  {persona.title}
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {persona.text}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] font-medium text-slate-500">
                {persona.highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CTA BANNER (PRD #8) */}
      <section id="homepage-final-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1F3A] text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              Ready to Upgrade
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
              Your next technology purchase starts here.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Skip the confusion and questionable third-party sellers. Get verified technology advice and direct sourcing from Haven Technologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              id="final-cta-whatsapp-btn"
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-base px-8 py-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              id="final-cta-explore-products-btn"
              onClick={() => setActivePage('products')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base px-8 py-4 rounded-xl border border-slate-700 transition-all cursor-pointer"
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
