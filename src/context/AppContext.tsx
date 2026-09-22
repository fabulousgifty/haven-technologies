import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SiteConfig, ContactInquiry, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

export type PageId = 'home' | 'products' | 'consultancy' | 'about' | 'contact';

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  formatPrice: (amount: number, isPriceOnRequest?: boolean, forceCurrency?: 'NGN' | 'USD') => string;
  formatDualPrice: (amount: number, isPriceOnRequest?: boolean) => { primary: string; secondary: string };
  currency: 'NGN' | 'USD';
  setCurrency: (currency: 'NGN' | 'USD') => void;
  toggleCurrency: () => void;
  // Cart state & handlers
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number; // in NGN
  cartTotalUsd: number; // in USD
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subscribers: Array<{ email: string; date: string; category?: string }>;
  addSubscriber: (email: string, category?: string) => { success: boolean; message: string };
  contactInquiries: ContactInquiry[];
  addContactInquiry: (inquiry: ContactInquiry) => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
  openAdminModal: boolean;
  setOpenAdminModal: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string, remember?: boolean) => boolean;
  logoutAdmin: () => void;
  updateAdminPasscode: (newPasscode: string) => boolean;
}

const DEFAULT_CONFIG: SiteConfig = {
  whatsappNumber: DEFAULT_WHATSAPP_NUMBER, // 2349131861630
  businessEmail: 'officialhaventechnologies@gmail.com',
  location: 'Owerri, Lagos & Abuja (Nationwide Delivery)',
  currency: 'NGN',
  exchangeRate: 1550, // 1 USD = 1,550 NGN
  adminPasscode: 'haven2026',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAdminModal, setOpenAdminModal] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('haven_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Products with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('haven_products_v7');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state with local storage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('haven_cart_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Config with local storage persistence and automated migration for official contact info and locations
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('haven_site_config_v3');
      if (saved) {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      }
      // Migrate from previous versions if needed
      const oldSaved =
        localStorage.getItem('haven_site_config_v2') ||
        localStorage.getItem('haven_site_config_v1');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          businessEmail: 'officialhaventechnologies@gmail.com',
          whatsappNumber: '2349131861630',
          location: 'Owerri, Lagos & Abuja (Nationwide Delivery)',
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  // Subscribers list
  const [subscribers, setSubscribers] = useState<Array<{ email: string; date: string; category?: string }>>(() => {
    try {
      const saved = localStorage.getItem('haven_subscribers_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Contact inquiries
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('haven_inquiries_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save products when modified
  useEffect(() => {
    try {
      localStorage.setItem('haven_products_v7', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Save cart when modified
  useEffect(() => {
    try {
      localStorage.setItem('haven_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save config when modified
  useEffect(() => {
    try {
      localStorage.setItem('haven_site_config_v3', JSON.stringify(siteConfig));
    } catch {
      // ignore
    }
  }, [siteConfig]);

  // Save subscribers
  useEffect(() => {
    try {
      localStorage.setItem('haven_subscribers_v1', JSON.stringify(subscribers));
    } catch {
      // ignore
    }
  }, [subscribers]);

  // Save inquiries
  useEffect(() => {
    try {
      localStorage.setItem('haven_inquiries_v1', JSON.stringify(contactInquiries));
    } catch {
      // ignore
    }
  }, [contactInquiries]);

  const setActivePage = (page: PageId) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toastTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = () => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToast(null);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 4000);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Added "${product.name}" to catalog.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`Updated "${updated.name}".`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
    showToast('Product removed from catalog.', 'info');
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Catalog restored to default Haven collection.');
  };

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...newConfig }));
    showToast('Settings saved successfully.');
  };

  const setCurrency = (currency: 'NGN' | 'USD') => {
    setSiteConfig((prev) => ({
      ...prev,
      currency,
    }));
    showToast(`Display currency changed to ${currency}`);
  };

  const toggleCurrency = () => {
    setSiteConfig((prev) => {
      const nextCurrency = prev.currency === 'NGN' ? 'USD' : 'NGN';
      showToast(`Switched currency to ${nextCurrency}`);
      return {
        ...prev,
        currency: nextCurrency,
      };
    });
  };

  const formatPrice = (
    amount: number,
    isPriceOnRequest?: boolean,
    forceCurrency?: 'NGN' | 'USD'
  ): string => {
    if (isPriceOnRequest || amount <= 0) {
      return 'Request Price';
    }
    const activeCurr = forceCurrency || siteConfig.currency;
    if (activeCurr === 'USD') {
      const usdAmount = amount / siteConfig.exchangeRate;
      return `$${usdAmount.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`;
    }
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  const formatDualPrice = (
    amount: number,
    isPriceOnRequest?: boolean
  ): { primary: string; secondary: string } => {
    if (isPriceOnRequest || amount <= 0) {
      return { primary: 'Request Price', secondary: 'Contact Consultant' };
    }
    const ngnFormatted = `₦${amount.toLocaleString('en-NG')}`;
    const usdVal = Math.round(amount / siteConfig.exchangeRate);
    const usdFormatted = `$${usdVal.toLocaleString('en-US')}`;

    if (siteConfig.currency === 'USD') {
      return { primary: usdFormatted, secondary: ngnFormatted };
    }
    return { primary: ngnFormatted, secondary: usdFormatted };
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1) => {
    if (product.availability === 'Out of Stock') {
      showToast(`${product.name} is currently out of stock.`, 'info');
      return;
    }
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Cart has been cleared.', 'info');
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotalUsd = Math.round(cartTotal / siteConfig.exchangeRate);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addSubscriber = (email: string, category?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    const exists = subscribers.some((s) => s.email === cleanEmail);
    if (exists) {
      return { success: true, message: "You're already subscribed to Haven insights!" };
    }
    const newSub = {
      email: cleanEmail,
      date: new Date().toISOString(),
      category: category || 'All Categories',
    };
    setSubscribers((prev) => [newSub, ...prev]);
    showToast('Thank you for subscribing! You will receive our curated technology guides.', 'success');
    return { success: true, message: 'Successfully subscribed to Haven Technologies updates.' };
  };

  const addContactInquiry = (inquiry: ContactInquiry) => {
    setContactInquiries((prev) => [inquiry, ...prev]);
    showToast('Your inquiry has been submitted. A consultant will reach out shortly.', 'success');
  };

  const loginAdmin = (passcode: string, remember: boolean = true): boolean => {
    const currentPasscode = siteConfig.adminPasscode || 'haven2026';
    if (passcode.trim() === currentPasscode) {
      setIsAdminAuthenticated(true);
      if (remember) {
        try {
          localStorage.setItem('haven_admin_auth', 'true');
        } catch {
          // ignore
        }
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('haven_admin_auth');
    } catch {
      // ignore
    }
    setOpenAdminModal(false);
    showToast('Owner session locked.', 'info');
  };

  const updateAdminPasscode = (newPasscode: string): boolean => {
    if (!newPasscode || newPasscode.trim().length < 4) {
      showToast('Passcode must be at least 4 characters long.', 'error');
      return false;
    }
    updateSiteConfig({ adminPasscode: newPasscode.trim() });
    showToast('Admin access passcode updated successfully.', 'success');
    return true;
  };

  // Secret Admin Access Triggers:
  // 1. URL hash / query param (e.g. /#admin, /#portal, /#cms, ?admin=true)
  useEffect(() => {
    const handleUrlTrigger = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash === '#admin' ||
        hash === '#portal' ||
        hash === '#cms' ||
        search.includes('admin=true') ||
        search.includes('admin=portal') ||
        search.includes('admin=1')
      ) {
        setOpenAdminModal(true);
      }
    };

    handleUrlTrigger();
    window.addEventListener('hashchange', handleUrlTrigger);
    return () => window.removeEventListener('hashchange', handleUrlTrigger);
  }, []);

  // 2. Global Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setOpenAdminModal((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        selectedProduct,
        setSelectedProduct,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        siteConfig,
        updateSiteConfig,
        formatPrice,
        formatDualPrice,
        currency: siteConfig.currency,
        setCurrency,
        toggleCurrency,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartTotalUsd,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        subscribers,
        addSubscriber,
        contactInquiries,
        addContactInquiry,
        toast,
        showToast,
        hideToast,
        openAdminModal,
        setOpenAdminModal,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateAdminPasscode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
