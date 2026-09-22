import React, { useState } from 'react';
import {
  MessageCircle,
  Smartphone,
  Laptop,
  Home,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Send,
  Camera,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generateWhatsAppUrl, getConsultancyEnquiryMessage } from '../utils/whatsapp';

export const ConsultancyPage: React.FC = () => {
  const { siteConfig, showToast } = useApp();

  // State for interactive Technology Needs Assessment Tool
  const [selectedService, setSelectedService] = useState('Smartphone Selection');
  const [budgetRange, setBudgetRange] = useState('₦500,000 – ₦1,500,000');
  const [primaryPriority, setPrimaryPriority] = useState('Battery Life & Durability');
  const [specificNotes, setSpecificNotes] = useState('');

  const services = [
    {
      title: 'Phone Selection',
      icon: Smartphone,
      accent: 'bg-blue-50 text-[#1769E0]',
      desc: 'We compare camera optics, real-world battery endurance, processing performance, internal storage, display readability under sunlight, and long-term resale value across Apple, Samsung, Google, and Xiaomi.',
      checklist: [
        'Camera performance & zoom quality',
        'Battery longevity & Nigerian charging speeds',
        'Storage capacity & longevity',
        'Display brightness & drop durability',
      ],
    },
    {
      title: 'Gadget Recommendations',
      icon: Laptop,
      accent: 'bg-indigo-50 text-indigo-600',
      desc: 'Identify productivity tools that genuinely improve your daily workflow. From M-series MacBooks and ergonomic mice to travel vlogging gimbals and fast GaN multi-chargers.',
      checklist: [
        'Remote work & coding performance',
        'Noise-cancelling headsets for meetings',
        'High-wattage laptop power banks',
        'Compact multi-device desk power',
      ],
    },
    {
      title: 'Home Technology',
      icon: Home,
      accent: 'bg-emerald-50 text-[#16A34A]',
      desc: 'Select reliable home appliances based on drum capacity, electrical inverter compatibility, energy consumption, spare parts availability, and long-term durability in Nigeria.',
      checklist: [
        'Solar generator & battery bank sizing',
        'AI washer-dryers with low energy draw',
        'Healthy digital airfryers',
        'Smart home sensors & surveillance',
      ],
    },
    {
      title: 'Cameras & Creator Gear',
      icon: Camera,
      accent: 'bg-rose-50 text-rose-600',
      desc: 'Expert advisory on mirrorless full-frame vs APS-C bodies, prime vs zoom lens selection, low-light event photography, church broadcast video rigs, and creator audio setups.',
      checklist: [
        'Sony E-Mount vs Canon RF optics',
        'Church live-stream & podcast setups',
        'Low-light wedding & event coverage',
        'Vlogging gimbals, ring lights & mics',
      ],
    },
    {
      title: 'Trading Technology',
      icon: TrendingUp,
      accent: 'bg-amber-50 text-amber-700',
      desc: 'Objective guidance on algorithmic trading automation, VPS hosting, volatility news filters, and strict drawdown controls. We explain risks, limitations, and realistic execution parameters.',
      checklist: [
        'MT4 / MT5 automation compatibility',
        'Strict drawdown ceiling parameters',
        'Ultra-low latency VPS configuration',
        'Honest risk vs. reward evaluation',
      ],
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Tell Us What You Need',
      desc: 'Share your everyday use-case, pain points with previous devices, and ideal budget ceiling.',
    },
    {
      step: '02',
      title: 'We Assess Your Needs',
      desc: 'Our specialists evaluate genuine hardware durability, Nigerian power conditions, and value-for-money.',
    },
    {
      step: '03',
      title: 'We Recommend Options',
      desc: 'You receive 2–3 clear, unbiased recommendations with pros, cons, and verified pricing.',
    },
    {
      step: '04',
      title: 'You Make an Informed Decision',
      desc: 'Choose with absolute confidence. We arrange authentic sourcing, inspection, and swift nationwide delivery from our hubs in Owerri, Lagos, and Abuja.',
    },
  ];

  // Generated WhatsApp inquiry with specific assessment parameters
  const generateInteractiveConsultationUrl = () => {
    const customBrief = `Hello Haven Technologies, I would like an expert technology consultation.\n\nService: ${selectedService}\nBudget Range: ${budgetRange}\nTop Priority: ${primaryPriority}${
      specificNotes.trim() ? `\nAdditional Notes: ${specificNotes.trim()}` : ''
    }\n\nPlease recommend the best options for my needs.`;

    return generateWhatsAppUrl(siteConfig.whatsappNumber, customBrief);
  };

  const genericConsultancyUrl = generateWhatsAppUrl(
    siteConfig.whatsappNumber,
    getConsultancyEnquiryMessage()
  );

  return (
    <div id="haven-consultancy-page" className="space-y-20 sm:space-y-28 py-10 sm:py-16 pb-20">
      {/* 1. HERO (PRD #11) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#1769E0]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] font-heading">
              Technology Advisory Service
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1F3A] font-heading tracking-tight leading-tight">
            Don't just buy technology.{' '}
            <span className="text-[#1769E0] block sm:inline">Buy the right technology.</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            With thousands of phones, gadgets, appliances and technology tools available, choosing the right product can be difficult. We help you narrow down your options based on your needs, budget and priorities.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              id="consultancy-hero-whatsapp-btn"
              href={genericConsultancyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-base px-7 py-4 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Start a WhatsApp Consultation</span>
            </a>

            <a
              href="#interactive-assessment"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0B1F3A] font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 transition-colors"
            >
              <span>Build My Recommendation Spec</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. SERVICES BREAKDOWN (PRD #11) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
            Our Advisory Domains
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mt-1">
            Where we provide clarity and guidance.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, idx) => {
            const IconComp = svc.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs hover:border-[#1769E0] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${svc.accent}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#0B1F3A]">
                      {svc.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Evaluation Criteria:
                    </span>
                    {svc.checklist.map((item, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href={generateWhatsAppUrl(
                      siteConfig.whatsappNumber,
                      `Hello Haven Technologies, I would like a consultation regarding ${svc.title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#1769E0] hover:text-blue-700"
                  >
                    <span>Consult on {svc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CONSULTANCY PROCESS (PRD #11) */}
      <section className="bg-[#0B1F3A] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mt-1">
              A straightforward, 4-step advisory process.
            </h2>
            <p className="text-slate-300 text-sm mt-3">
              We eliminate buyer regret through transparent analysis before you invest a single Naira.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 relative"
              >
                <div className="text-3xl font-heading font-black text-[#1769E0]/80">
                  {step.step}
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE TECHNOLOGY NEEDS ASSESSMENT WIZARD */}
      <section id="interactive-assessment" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#1769E0] text-xs font-bold uppercase tracking-wider font-heading">
              Interactive Advisor
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
              Create Your Technology Specification
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Select your parameters below to generate a tailored consultation brief. Our team will review it and reply on WhatsApp with exact device recommendations.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Category */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                1. What category are you evaluating?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {[
                  'Smartphone Selection',
                  'Cameras & Creator Gear',
                  'Laptops & Gadgets',
                  'Home Appliances',
                  'Trading Technology',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedService(item)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      selectedService === item
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                2. Approximate budget range (NGN ₦)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Under ₦350,000',
                  '₦350,000 – ₦800,000',
                  '₦800,000 – ₦2,000,000',
                  '₦2,000,000 +',
                ].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setBudgetRange(range)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      budgetRange === range
                        ? 'bg-[#1769E0] text-white border-[#1769E0] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Top Priority */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                3. Primary Priority
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Battery Life & Durability',
                  'Top-Tier Camera / Video',
                  'Coding / Work Multitasking',
                  'Energy Efficiency & Solar Low-Draw',
                  'Algorithmic Risk Management',
                  'Maximum Value for Money',
                ].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setPrimaryPriority(priority)}
                    className={`py-3 px-3 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      primaryPriority === priority
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Specific Notes */}
            <div>
              <label className="block text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2">
                4. Any specific preferences or constraints? (Optional)
              </label>
              <textarea
                rows={2}
                value={specificNotes}
                onChange={(e) => setSpecificNotes(e.target.value)}
                placeholder="e.g. Must support dual physical SIM cards, or must be able to run on a 1kVA inverter setup..."
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0]"
              />
            </div>

            {/* Submit to WhatsApp */}
            <div className="pt-4 border-t border-slate-100">
              <a
                id="interactive-spec-whatsapp-submit"
                href={generateInteractiveConsultationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-base py-4 px-6 rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Send Specification to WhatsApp Advisor</span>
              </a>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Instantly opens WhatsApp with your pre-formatted specification. Free advisory consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA (PRD #11) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF2FF] rounded-3xl p-8 sm:p-14 text-center space-y-4 border border-blue-200">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
            Let's find your best option.
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Direct advice from unbiased technology specialists. No high-pressure sales scripts, just honest guidance.
          </p>
          <div className="pt-2">
            <a
              id="consultancy-final-cta-whatsapp"
              href={genericConsultancyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-base px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Start a WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
