import React, { useState } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Sliders,
  Users,
  MessageSquare,
  Save,
  Check,
  Package,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Key,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { Product, ProductCategory, AvailabilityStatus } from '../types';
import { useApp } from '../context/AppContext';
import { HavenLogo } from './HavenLogo';

const CATEGORIES: ProductCategory[] = [
  'Phones',
  'Accessories',
  'Gadgets',
  'Cameras & Lenses',
  'Home Appliances',
  'Trading Tools',
  'Business Technology',
];

const AVAILABILITY_OPTIONS: AvailabilityStatus[] = [
  'Available',
  'Limited Stock',
  'Out of Stock',
  'Coming Soon',
];

export const AdminCMSModal: React.FC = () => {
  const {
    openAdminModal,
    setOpenAdminModal,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateAdminPasscode,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    siteConfig,
    updateSiteConfig,
    subscribers,
    contactInquiries,
    formatPrice,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'catalog' | 'new-product' | 'settings' | 'leads'>('catalog');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Authentication gate state
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [newPasscodeInput, setNewPasscodeInput] = useState('');
  const [showNewPasscode, setShowNewPasscode] = useState(false);

  // Form state for new / edit product
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: 'Phones',
    price: 0,
    isPriceOnRequest: false,
    availability: 'Available',
    shortBenefit: '',
    description: '',
    features: [''],
    whyWeRecommend: '',
    bestFor: '',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'],
    tags: ['Tech'],
    isFeatured: false,
    whatsappCustomMessage: '',
  });

  // Settings form
  const [configForm, setConfigForm] = useState({
    whatsappNumber: siteConfig.whatsappNumber,
    businessEmail: siteConfig.businessEmail,
    location: siteConfig.location,
    exchangeRate: siteConfig.exchangeRate,
  });

  if (!openAdminModal) return null;

  // Gatekeeper: Require owner authentication before showing store management
  if (!isAdminAuthenticated) {
    const handleAuthSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginAdmin(passcodeInput, rememberMe);
      if (success) {
        setAuthError(false);
        setPasscodeInput('');
        showToast('Welcome. Owner CMS unlocked.', 'success');
      } else {
        setAuthError(true);
        showToast('Incorrect owner passcode.', 'error');
      }
    };

    return (
      <div
        id="admin-auth-gate-backdrop"
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setOpenAdminModal(false);
          }
        }}
      >
        <div
          id="admin-auth-gate-modal"
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0B1F3A] text-white p-6 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Haven Technologies Owner Portal
                </h3>
                <p className="text-xs text-slate-300">
                  Restricted Administrative Environment
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenAdminModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
            <div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                This management interface is hidden from public visitors. Enter your owner passcode to access catalog editing, order settings, and customer leads.
              </p>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                  <span>Incorrect passcode. Please try again or check your default key.</span>
                </div>
              )}

              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Owner Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Enter passcode"
                  className="w-full pl-3 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0] focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#1769E0] focus:ring-[#1769E0]"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
              <div className="font-semibold text-slate-700 mb-0.5">Owner Access Credentials</div>
              <div>
                Default initial key: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[#1769E0] font-mono font-bold">haven2026</code>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                You can change this passcode inside Settings once logged in.
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpenAdminModal(false)}
                className="w-1/2 py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Return to Store
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 px-4 text-xs font-semibold text-white bg-[#1769E0] hover:bg-blue-600 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock CMS</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormData({
      ...prod,
      features: [...prod.features],
      images: [...prod.images],
      tags: [...prod.tags],
    });
    setActiveTab('new-product');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    const cleanedFeatures = (formData.features || []).filter((f) => f.trim().length > 0);
    const cleanedImages = (formData.images || []).filter((img) => img.trim().length > 0);

    const productPayload: Product = {
      id: editingProductId || `prod-custom-${Date.now()}`,
      name: formData.name || 'Untitled Product',
      category: formData.category || 'Phones',
      price: Number(formData.price) || 0,
      isPriceOnRequest: Boolean(formData.isPriceOnRequest),
      availability: formData.availability || 'Available',
      shortBenefit: formData.shortBenefit || 'Premium tech product curated by Haven.',
      description: formData.description || 'Verified technology product with tailored advisory support.',
      features: cleanedFeatures.length > 0 ? cleanedFeatures : ['Verified performance guarantee'],
      whyWeRecommend: formData.whyWeRecommend || 'Tested for durability, value, and ecosystem synergy.',
      bestFor: formData.bestFor || 'Professionals and households seeking reliable technology.',
      images: cleanedImages.length > 0 ? cleanedImages : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'],
      tags: formData.tags || ['Haven'],
      isFeatured: Boolean(formData.isFeatured),
      whatsappCustomMessage: formData.whatsappCustomMessage?.trim() || undefined,
    };

    if (editingProductId) {
      updateProduct(productPayload);
    } else {
      addProduct(productPayload);
    }

    // Reset
    setEditingProductId(null);
    setFormData({
      name: '',
      category: 'Phones',
      price: 0,
      isPriceOnRequest: false,
      availability: 'Available',
      shortBenefit: '',
      description: '',
      features: [''],
      whyWeRecommend: '',
      bestFor: '',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'],
      tags: ['Tech'],
      isFeatured: false,
      whatsappCustomMessage: '',
    });
    setActiveTab('catalog');
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(configForm);
  };

  const addFeatureRow = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ''],
    }));
  };

  const updateFeatureRow = (index: number, val: string) => {
    const updated = [...(formData.features || [])];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const removeFeatureRow = (index: number) => {
    const updated = (formData.features || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const copyLeadsToClipboard = () => {
    const leadsText = JSON.stringify({ subscribers, contactInquiries }, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(leadsText)
        .then(() => {
          showToast('Leads JSON copied to clipboard for CRM import.', 'success');
        })
        .catch(() => {
          showToast('Leads ready: Please check browser clipboard permissions.', 'info');
        });
    } else {
      showToast('Clipboard not supported in this browser context.', 'info');
    }
  };

  return (
    <div
      id="admin-cms-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        id="admin-cms-container"
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Top Bar */}
        <div className="bg-[#0B1F3A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HavenLogo size={34} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-lg text-white">
                  Haven Technologies Catalog &amp; Store Management
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Owner Authenticated
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Manage inventory, WhatsApp conversions, and captured client leads without writing code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-200 border border-red-500/30 transition-colors cursor-pointer"
              title="Lock CMS and require passcode next time"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock &amp; Sign Out</span>
            </button>
            <button
              onClick={() => setOpenAdminModal(false)}
              className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
              title="Close (stay authenticated)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Catalog ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setEditingProductId(null);
              setFormData({
                name: '',
                category: 'Phones',
                price: 0,
                isPriceOnRequest: false,
                availability: 'Available',
                shortBenefit: '',
                description: '',
                features: [''],
                whyWeRecommend: '',
                bestFor: '',
                images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'],
                tags: ['New'],
                isFeatured: false,
                whatsappCustomMessage: '',
              });
              setActiveTab('new-product');
            }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'new-product'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{editingProductId ? 'Edit Product' : 'Add New Product'}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Store Configuration</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'leads'
                ? 'border-[#1769E0] text-[#1769E0]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Captured Leads ({subscribers.length + contactInquiries.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          {/* TAB 1: Catalog List */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-[#0B1F3A]">
                  Active Products ({products.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProductId(null);
                      setActiveTab('new-product');
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#1769E0] hover:bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Product</span>
                  </button>
                  <button
                    onClick={resetProducts}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs px-2.5 py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    title="Restore default pre-seeded collection"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        <img
                          src={p.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-[#0B1F3A]">
                            {p.name}
                          </span>
                          {p.isFeatured && (
                            <span className="text-[10px] bg-blue-100 text-[#1769E0] font-semibold px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                          <span>{p.category}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">
                            {formatPrice(p.price, p.isPriceOnRequest)}
                          </span>
                          <span>•</span>
                          <span
                            className={`font-medium ${
                              p.availability === 'Available'
                                ? 'text-emerald-600'
                                : p.availability === 'Limited Stock'
                                ? 'text-amber-600'
                                : 'text-slate-400'
                            }`}
                          >
                            {p.availability}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => startEditProduct(p)}
                        className="p-1.5 text-slate-600 hover:text-[#1769E0] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Add / Edit Product */}
          {activeTab === 'new-product' && (
            <form onSubmit={handleSaveProduct} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Apple iPhone 16 Pro Max (256GB)"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as ProductCategory })
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Availability Status *
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: e.target.value as AvailabilityStatus,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  >
                    {AVAILABILITY_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Price (NGN ₦)
                  </label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    disabled={formData.isPriceOnRequest}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  />
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="priceOnRequestCheck"
                      checked={Boolean(formData.isPriceOnRequest)}
                      onChange={(e) =>
                        setFormData({ ...formData, isPriceOnRequest: e.target.checked })
                      }
                      className="rounded"
                    />
                    <label htmlFor="priceOnRequestCheck" className="text-xs text-slate-600">
                      Show as "Request Price"
                    </label>
                  </div>
                </div>

                <div className="flex items-center pt-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isFeatured)}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded w-4 h-4 text-[#1769E0]"
                    />
                    <span>Highlight in Featured Section (Homepage)</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.images?.[0] || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        images: [e.target.value, ...(formData.images?.slice(1) || [])],
                      })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Benefit (Displayed on product card)
                  </label>
                  <input
                    type="text"
                    value={formData.shortBenefit || ''}
                    onChange={(e) => setFormData({ ...formData, shortBenefit: e.target.value })}
                    placeholder="e.g. Unmatched battery endurance and anti-reflective display clarity."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a comprehensive product overview..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Key Features / Specifications
                    </label>
                    <button
                      type="button"
                      onClick={addFeatureRow}
                      className="text-xs text-[#1769E0] font-semibold hover:underline"
                    >
                      + Add Specification
                    </button>
                  </div>
                  {(formData.features || []).map((feat, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => updateFeatureRow(idx, e.target.value)}
                        placeholder="Feature specification..."
                        className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                      />
                      {(formData.features || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeatureRow(idx)}
                          className="text-slate-400 hover:text-red-500 text-xs px-2"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Why We Recommend It
                  </label>
                  <textarea
                    rows={2}
                    value={formData.whyWeRecommend || ''}
                    onChange={(e) => setFormData({ ...formData, whyWeRecommend: e.target.value })}
                    placeholder="Reasoning based on durability, value, and ecosystem..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Best For (Target Audience)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bestFor || ''}
                    onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                    placeholder="e.g. Remote workers, executives, families..."
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#1769E0] hover:bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProductId ? 'Save Changes' : 'Publish Product'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Configuration */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveConfig} className="space-y-6 max-w-xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Haven Official WhatsApp Number (Direct Conversion Link)
                  </label>
                  <input
                    type="text"
                    required
                    value={configForm.whatsappNumber}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, whatsappNumber: e.target.value })
                    }
                    placeholder="e.g. 2349131861630 (with country code, no +)"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    All website WhatsApp buttons will automatically route directly to this number.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={configForm.businessEmail}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, businessEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Business Location / Territory
                  </label>
                  <input
                    type="text"
                    value={configForm.location}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, location: e.target.value })
                    }
                    placeholder="e.g. Owerri, Lagos & Abuja (Nationwide Delivery)"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Displayed across footer, navigation bar, and contact dispatch sections.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    USD to NGN Exchange Rate (for Currency Switcher)
                  </label>
                  <input
                    type="number"
                    value={configForm.exchangeRate}
                    onChange={(e) =>
                      setConfigForm({ ...configForm, exchangeRate: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#1769E0] hover:bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Settings</span>
                </button>
              </div>

              {/* Owner Security & Passcode Management */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <Key className="w-4 h-4 text-[#1769E0]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#0B1F3A]">
                      Owner Portal Security &amp; Access Controls
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage your confidential administrative passcode and view hidden access channels
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Passcode update box */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Update Owner Passcode
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      Choose a confidential passcode known only to you. You will be prompted for this passcode whenever opening the owner portal.
                    </p>

                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type={showNewPasscode ? 'text' : 'password'}
                          value={newPasscodeInput}
                          onChange={(e) => setNewPasscodeInput(e.target.value)}
                          placeholder="Enter new secret passcode (min 4 chars)"
                          className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#1769E0]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPasscode(!showNewPasscode)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          title={showNewPasscode ? 'Hide passcode' : 'Show passcode'}
                        >
                          {showNewPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (updateAdminPasscode(newPasscodeInput)) {
                            setNewPasscodeInput('');
                          }
                        }}
                        className="inline-flex items-center gap-2 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Save New Passcode</span>
                      </button>
                    </div>
                  </div>

                  {/* Access Methods Card */}
                  <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100">
                    <h4 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>How to Access Your Hidden Portal</span>
                    </h4>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      Public navigation buttons have been completely removed. You can open this management modal at any time using:
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-100">
                        <span className="font-bold text-[#1769E0] flex-shrink-0">1. URL Route:</span>
                        <span>
                          Append <code className="bg-blue-100/80 px-1.5 py-0.5 rounded text-blue-800 font-mono font-bold">#admin</code> to your website address in any browser (e.g. <span className="font-mono text-slate-500">yoursite.com/#admin</span>).
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-100">
                        <span className="font-bold text-[#1769E0] flex-shrink-0">2. Keyboard Shortcut:</span>
                        <span>
                          Press <kbd className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">Ctrl + Shift + A</kbd> (or <kbd className="bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">Cmd + Shift + A</kbd> on Mac).
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-100">
                        <span className="font-bold text-[#1769E0] flex-shrink-0">3. Stealth Lock Icon:</span>
                        <span>
                          Click the discreet lock icon situated right beside the copyright notice in the footer.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 4: Captured Leads */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#0B1F3A]">
                    Lead Inquiries &amp; Newsletter Subscribers
                  </h3>
                  <p className="text-xs text-slate-500">
                    Collected seamlessly from website forms, ready for CRM or marketing email integration.
                  </p>
                </div>
                <button
                  onClick={copyLeadsToClipboard}
                  className="text-xs font-semibold text-[#1769E0] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Copy Leads Data
                </button>
              </div>

              {/* Newsletter list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Newsletter Subscribers ({subscribers.length})
                </h4>
                {subscribers.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No subscribers yet.</p>
                ) : (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 max-h-44 overflow-y-auto space-y-1.5 text-xs">
                    {subscribers.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0"
                      >
                        <span className="font-medium text-slate-800">{s.email}</span>
                        <span className="text-slate-400 text-[11px]">
                          {new Date(s.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact inquiries */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contact Form Inquiries ({contactInquiries.length})
                </h4>
                {contactInquiries.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No contact submissions yet.</p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {contactInquiries.map((inq, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{inq.fullName}</span>
                          <span className="text-slate-400 text-[10px]">
                            {new Date(inq.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-slate-600">
                          {inq.email} • {inq.phone}
                        </div>
                        <div className="inline-block bg-blue-100 text-[#1769E0] text-[10px] font-semibold px-2 py-0.5 rounded">
                          {inq.category}
                        </div>
                        <p className="text-slate-700 italic pt-1">"{inq.message}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
