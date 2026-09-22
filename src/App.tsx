import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ConsultancyPage } from './pages/ConsultancyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { activePage, selectedProduct, setSelectedProduct } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1F3A] font-sans">
      {/* Global Header & Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'products' && <ProductsPage />}
        {activePage === 'consultancy' && <ConsultancyPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Product Detail Modal (Reusable Template from PRD #10) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Admin Catalog CMS Modal (PRD #18) */}
      <AdminCMSModal />

      {/* Cart Drawer Slide-over */}
      <CartDrawer />

      {/* Floating and Sticky Bottom WhatsApp Triggers (PRD #15, #16) */}
      <WhatsAppFloating />

      {/* Non-intrusive Feedback Toast */}
      <Toast />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
