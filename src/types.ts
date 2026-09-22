export type ProductCategory =
  | 'Phones'
  | 'Accessories'
  | 'Gadgets'
  | 'Cameras & Lenses'
  | 'Home Appliances'
  | 'Trading Tools'
  | 'Business Technology';

export type AvailabilityStatus =
  | 'Available'
  | 'Limited Stock'
  | 'Out of Stock'
  | 'Coming Soon';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in NGN
  isPriceOnRequest?: boolean;
  availability: AvailabilityStatus;
  shortBenefit: string;
  description: string;
  features: string[];
  whyWeRecommend: string;
  bestFor: string;
  images: string[];
  tags: string[];
  isFeatured?: boolean;
  whatsappCustomMessage?: string;
}

export interface ConsultancyRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  budgetRange: string;
  details: string;
  createdAt: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  createdAt: string;
}

export interface SiteConfig {
  whatsappNumber: string;
  businessEmail: string;
  location: string;
  currency: 'NGN' | 'USD';
  exchangeRate: number; // USD to NGN
  adminPasscode?: string; // Secure passcode for owner portal
}

export interface CartItem {
  product: Product;
  quantity: number;
}
