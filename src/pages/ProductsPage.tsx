import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Check,
  Smartphone,
  Camera,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

const CATEGORY_TABS: (ProductCategory | 'All')[] = [
  'All',
  'Phones',
  'Accessories',
  'Gadgets',
  'Cameras & Lenses',
  'Home Appliances',
  'Trading Tools',
  'Business Technology',
];

export const ProductsPage: React.FC = () => {
  const {
    products,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [phoneSubFilter, setPhoneSubFilter] = useState<'all' | 'apple' | 'samsung' | 'new' | 'active' | 'used'>('all');
  const [accessorySubFilter, setAccessorySubFilter] = useState<'all' | 'oraimo' | 'newage' | 'acefast' | 'powerbanks' | 'audio'>('all');
  const [cameraSubFilter, setCameraSubFilter] = useState<'all' | 'cameras' | 'lenses' | 'sony' | 'canon' | 'vlogging'>('all');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (categoryFilter !== 'All' && p.category !== categoryFilter) {
          return false;
        }

        // Phone specific sub-filter
        if (categoryFilter === 'Phones' && phoneSubFilter !== 'all') {
          if (phoneSubFilter === 'apple') {
            const isApple = p.tags.includes('Apple') || p.name.toLowerCase().includes('iphone');
            if (!isApple) return false;
          } else if (phoneSubFilter === 'samsung') {
            const isSamsung = p.tags.includes('Samsung') || p.name.toLowerCase().includes('samsung');
            if (!isSamsung) return false;
          } else if (phoneSubFilter === 'new') {
            const isNew = p.tags.includes('Brand New') || p.features.some(f => f.toLowerCase().includes('brand new'));
            if (!isNew) return false;
          } else if (phoneSubFilter === 'active') {
            const isActive = p.tags.includes('Active') || p.tags.includes('Open Box') || p.features.some(f => f.toLowerCase().includes('active') || f.toLowerCase().includes('open box'));
            if (!isActive) return false;
          } else if (phoneSubFilter === 'used') {
            const isUsed = p.tags.includes('UK Used') || p.features.some(f => f.toLowerCase().includes('uk used') || f.toLowerCase().includes('used'));
            if (!isUsed) return false;
          }
        }

        // Accessory specific sub-filter (Oraimo, New Age, Acefast, Powerbanks, Audio)
        if (categoryFilter === 'Accessories' && accessorySubFilter !== 'all') {
          if (accessorySubFilter === 'oraimo') {
            const isOraimo = p.tags.includes('Oraimo') || p.name.toLowerCase().includes('oraimo');
            if (!isOraimo) return false;
          } else if (accessorySubFilter === 'newage') {
            const isNewAge = p.tags.includes('New Age') || p.name.toLowerCase().includes('new age');
            if (!isNewAge) return false;
          } else if (accessorySubFilter === 'acefast') {
            const isAcefast = p.tags.includes('Acefast') || p.name.toLowerCase().includes('acefast');
            if (!isAcefast) return false;
          } else if (accessorySubFilter === 'powerbanks') {
            const isPowerBank = p.tags.includes('Power Bank') || p.name.toLowerCase().includes('power bank') || p.name.toLowerCase().includes('powercore');
            if (!isPowerBank) return false;
          } else if (accessorySubFilter === 'audio') {
            const isAudio =
              p.tags.includes('Audio') ||
              p.tags.includes('Earbuds') ||
              p.tags.includes('Earpiece') ||
              p.tags.includes('AirPods') ||
              p.tags.includes('Headphones') ||
              p.name.toLowerCase().includes('airpods') ||
              p.name.toLowerCase().includes('freepods') ||
              p.name.toLowerCase().includes('earbuds') ||
              p.name.toLowerCase().includes('earpiece') ||
              p.name.toLowerCase().includes('headphones');
            if (!isAudio) return false;
          }
        }

        // Camera specific sub-filter
        if (categoryFilter === 'Cameras & Lenses' && cameraSubFilter !== 'all') {
          if (cameraSubFilter === 'cameras') {
            const isCam = p.tags.includes('Camera') || p.name.toLowerCase().includes('camera');
            if (!isCam) return false;
          } else if (cameraSubFilter === 'lenses') {
            const isLens = p.tags.includes('Lens') || p.name.toLowerCase().includes('lens');
            if (!isLens) return false;
          } else if (cameraSubFilter === 'sony') {
            const isSony = p.tags.includes('Sony') || p.name.toLowerCase().includes('sony');
            if (!isSony) return false;
          } else if (cameraSubFilter === 'canon') {
            const isCanon = p.tags.includes('Canon') || p.name.toLowerCase().includes('canon');
            if (!isCanon) return false;
          } else if (cameraSubFilter === 'vlogging') {
            const isVlog =
              p.tags.includes('Vlogging') ||
              p.tags.includes('Creator') ||
              p.tags.includes('Action Camera') ||
              p.name.toLowerCase().includes('vlogging') ||
              p.name.toLowerCase().includes('action');
            if (!isVlog) return false;
          }
        }

        // Availability filter
        if (inStockOnly && p.availability !== 'Available') {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesBenefit = p.shortBenefit.toLowerCase().includes(q);
          const matchesDesc = p.description.toLowerCase().includes(q);
          const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesName && !matchesBenefit && !matchesDesc && !matchesTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [products, categoryFilter, phoneSubFilter, accessorySubFilter, cameraSubFilter, inStockOnly, searchQuery, sortBy]);

  const isTradingSelected = categoryFilter === 'Trading Tools';
  const isPhonesSelected = categoryFilter === 'Phones';
  const isAccessoriesSelected = categoryFilter === 'Accessories';
  const isCamerasSelected = categoryFilter === 'Cameras & Lenses';

  return (
    <div id="haven-products-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* 1. HERO (PRD #9) */}
      <div className="text-left space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] font-heading">
          Curated Sourcing Catalog
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] font-heading tracking-tight">
          Find technology that fits your needs.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore our selection of phones, accessories, gadgets, appliances and technology solutions. Every product is backed by expert advisory and instant WhatsApp enquiry.
        </p>
      </div>

      {/* 2. CONTROLS BAR: SEARCH, SORT, CATEGORIES */}
      <div className="space-y-4 pt-2">
        {/* Top search & sorting strip */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="products-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by device name, specs, or keyword..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1769E0] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* In-stock toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                inStockOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${inStockOnly ? 'opacity-100' : 'opacity-30'}`} />
              <span>In Stock Only</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
              <select
                id="products-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold text-[#0B1F3A] bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#1769E0] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500">
          <span className="text-[11px] font-medium text-slate-400">Popular:</span>
          {[
            { label: 'iPhone 17 Pro', query: 'iPhone 17' },
            { label: 'iPhone 16 Pro Max', query: 'iPhone 16' },
            { label: 'Samsung Fold 7 / 6', query: 'Fold' },
            { label: 'Samsung S25 / S24', query: 'S25' },
            { label: 'UK Used iPhones', query: 'UK Used' },
            { label: 'HP Laptops', query: 'HP' },
            { label: 'Solar Inverters', query: 'Inverter' },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setCategoryFilter('All');
                setSearchQuery(item.query);
              }}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors text-[11px] font-medium cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[11px] text-[#1769E0] hover:underline font-semibold ml-1 cursor-pointer"
            >
              Reset Search
            </button>
          )}
        </div>

        {/* Category Pill Filters (PRD #9) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TABS.map((cat) => {
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                id={`category-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  setCategoryFilter(cat);
                  if (cat !== 'Phones') setPhoneSubFilter('all');
                  if (cat !== 'Accessories') setAccessorySubFilter('all');
                  if (cat !== 'Cameras & Lenses') setCameraSubFilter('all');
                }}
                className={`text-xs font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0B1F3A] text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Phone Brand & Condition Sub-filters */}
        {isPhonesSelected && (
          <div className="bg-slate-100/80 p-2 sm:p-2.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none animate-in fade-in">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 whitespace-nowrap flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#1769E0]" />
              Filter By:
            </span>
            {[
              { id: 'all', label: 'All Phones' },
              { id: 'apple', label: 'Apple iPhone' },
              { id: 'samsung', label: 'Samsung Galaxy' },
              { id: 'new', label: 'Brand New Sealed' },
              { id: 'active', label: 'Active / Open Box' },
              { id: 'used', label: 'UK Used' },
            ].map((sub) => {
              const isActive = phoneSubFilter === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setPhoneSubFilter(sub.id as any)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1769E0] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Accessory Brand & Type Sub-filters (Oraimo, New Age, Acefast, Power Banks, AirPods) */}
        {isAccessoriesSelected && (
          <div className="bg-slate-100/80 p-2 sm:p-2.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none animate-in fade-in">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 whitespace-nowrap flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#1769E0]" />
              Filter By:
            </span>
            {[
              { id: 'all', label: 'All Accessories' },
              { id: 'oraimo', label: 'Oraimo' },
              { id: 'newage', label: 'New Age' },
              { id: 'acefast', label: 'Acefast' },
              { id: 'powerbanks', label: 'Power Banks' },
              { id: 'audio', label: 'AirPods & Earbuds' },
            ].map((sub) => {
              const isActive = accessorySubFilter === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setAccessorySubFilter(sub.id as any)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1769E0] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Cameras & Lenses Sub-filters (Sony, Canon, Lenses, Creator) */}
        {isCamerasSelected && (
          <div className="bg-slate-100/80 p-2 sm:p-2.5 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none animate-in fade-in">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 whitespace-nowrap flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-[#1769E0]" />
              Filter By:
            </span>
            {[
              { id: 'all', label: 'All Cameras & Lenses' },
              { id: 'cameras', label: 'Camera Bodies' },
              { id: 'lenses', label: 'Pro Lenses' },
              { id: 'sony', label: 'Sony Alpha & GM' },
              { id: 'canon', label: 'Canon EOS R & RF' },
              { id: 'vlogging', label: 'Vlogging & Action' },
            ].map((sub) => {
              const isActive = cameraSubFilter === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setCameraSubFilter(sub.id as any)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1769E0] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Device Genuine Assurance & Warranty Banner */}
      {isPhonesSelected && (
        <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-slate-700 leading-relaxed animate-in fade-in">
          <ShieldCheck className="w-5 h-5 text-[#1769E0] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <strong className="font-heading font-bold text-sm text-[#0B1F3A]">
                Haven Mobile Device Guarantee &amp; Warranty Policy
              </strong>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                100% Genuine &amp; Tested
              </span>
            </div>
            <p className="text-slate-600">
              All devices (Brand New, Active, and UK Used) are thoroughly inspected, factory unlocked, and IMEI verified.
            </p>
            <div className="inline-block mt-1 font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2.5 py-1 rounded-md text-[11px]">
              NB: Standard mobile industry policy — no warranty on screen damage.
            </div>
          </div>
        </div>
      )}

      {/* Trading Safety Compliance Banner if viewing trading tools */}
      {isTradingSelected && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed animate-in fade-in">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">
              Trading Technology Risk Disclosure (PRD #24)
            </strong>
            Automated trading involves financial risk. Past performance does not guarantee future results. Technology or automation tools cannot guarantee profits. We provide disciplined tools and VPS setup support without unrealistic income promises.
          </div>
        </div>
      )}

      {/* 3. PRODUCT GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>
            Showing <strong className="text-[#0B1F3A]">{filteredProducts.length}</strong> products
            {categoryFilter !== 'All' && ` in ${categoryFilter}`}
          </span>
          {(searchQuery || categoryFilter !== 'All' || inStockOnly) && (
            <button
              onClick={() => {
                setCategoryFilter('All');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="text-[#1769E0] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#0B1F3A]">
              No matching products found
            </h3>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              We couldn't find any products matching your current filters. You can clear your search or message our advisors directly to source specific custom hardware.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCategoryFilter('All');
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="bg-[#1769E0] text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
