/**
 * WhatsApp Helper Utilities for Haven Technologies
 * Primary conversion channel across all touchpoints
 */

// Default WhatsApp contact number for Haven Technologies (Nigeria)
export const DEFAULT_WHATSAPP_NUMBER = '2349131861630';

export function cleanPhoneNumber(phone?: string): string {
  if (!phone) return DEFAULT_WHATSAPP_NUMBER;
  // Remove non-numeric characters except leading '+'
  const cleaned = phone.replace(/[^\d]/g, '');
  return cleaned || DEFAULT_WHATSAPP_NUMBER;
}

export function formatPhoneDisplay(phone?: string): string {
  const cleaned = cleanPhoneNumber(phone);
  return `+${cleaned}`;
}

export function generateWhatsAppUrl(phone: string, message: string): string {
  const targetNumber = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${targetNumber}?text=${encodedText}`;
}

export function getProductEnquiryMessage(productName: string): string {
  // PRD #10 Exact Requirement:
  // "Hello Haven Technologies, I'm interested in the [Product Name]. Please can you provide more information and the current price?"
  return `Hello Haven Technologies, I'm interested in the ${productName}. Please can you provide more information and the current price?`;
}

export function getConsultancyEnquiryMessage(category?: string, budget?: string, priority?: string): string {
  if (category || budget || priority) {
    return `Hello Haven Technologies, I would like a personalized technology recommendation.\n\nCategory: ${category || 'General Technology'}\nBudget: ${budget || 'Flexible'}\nKey Priority: ${priority || 'General Guidance'}\n\nPlease advise on the best suited options for my needs.`;
  }
  return `Hello Haven Technologies, I would like to schedule a technology consultation to help me choose the right product for my needs and budget.`;
}

export function getGeneralEnquiryMessage(): string {
  return `Hello Haven Technologies, I'm reaching out from your website and would like to speak with a technology consultant.`;
}

export function getContactFormWhatsAppMessage(data: {
  fullName: string;
  category: string;
  message: string;
  phone?: string;
}): string {
  return `Hello Haven Technologies,\n\nName: ${data.fullName}\nPhone: ${data.phone || 'Not provided'}\nInquiry Type: ${data.category}\n\nMessage: ${data.message}`;
}

export function getCartCheckoutMessage(data: {
  items: Array<{ name: string; quantity: number; price: number }>;
  totalNgn: number;
  totalUsd: number;
  currency: 'NGN' | 'USD';
  deliveryCity?: string;
  customerNote?: string;
  exchangeRate?: number;
}): string {
  const rate = data.exchangeRate && data.exchangeRate > 0 ? data.exchangeRate : 1550;
  const itemsText = data.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString('en-NG')} / $${Math.round((item.price * item.quantity) / rate).toLocaleString('en-US')}`
    )
    .join('\n');

  return `Hello Haven Technologies, I would like to place an order from your website catalog:\n\n*ORDER ITEMS:*\n${itemsText}\n\n*ESTIMATED TOTAL:*\n• ₦${data.totalNgn.toLocaleString('en-NG')} (NGN)\n• $${data.totalUsd.toLocaleString('en-US')} (USD)\n\n*PREFERRED CURRENCY:* ${data.currency}\n*DELIVERY LOCATION:* ${data.deliveryCity || 'Nationwide Courier (Owerri / Lagos / Abuja / Other)'}\n${data.customerNote ? `*CUSTOMER NOTE:* ${data.customerNote}\n` : ''}\nPlease confirm product availability, payment details, and dispatch timeframe. Thank you!`;
}
