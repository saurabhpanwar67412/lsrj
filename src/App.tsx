import React, { useState } from 'react';
import { PolicyProvider } from './context/PolicyContext';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { AgeGateModal } from './components/common/AgeGateModal';
import { AuthModal } from './components/common/AuthModal';

import { HomeView } from './components/customer/HomeView';
import { SearchView } from './components/customer/SearchView';
import { MapView } from './components/customer/MapView';
import { OutletDetailView } from './components/customer/OutletDetailView';
import { ProductDetailView } from './components/customer/ProductDetailView';
import { OfferDetailView } from './components/customer/OfferDetailView';
import { FavouritesView } from './components/customer/FavouritesView';
import { MembershipView } from './components/customer/MembershipView';
import { ProfileView } from './components/customer/ProfileView';

import { VendorDashboard } from './components/vendor/VendorDashboard';
import { VendorOnboarding } from './components/vendor/VendorOnboarding';
import { VendorCatalogue } from './components/vendor/VendorCatalogue';
import { VendorOffers } from './components/vendor/VendorOffers';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { LicenceQueue } from './components/admin/LicenceQueue';
import { PolicyEngineView } from './components/admin/PolicyEngineView';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeEntityId, setActiveEntityId] = useState<string | undefined>(undefined);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleNavigate = (view: string, id?: string) => {
    setCurrentView(view);
    if (id) setActiveEntityId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentView) {
      // Customer Views
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'search':
        return <SearchView onNavigate={handleNavigate} />;
      case 'map':
        return <MapView onNavigate={handleNavigate} />;
      case 'outlet-detail':
        return <OutletDetailView outletId={activeEntityId || 'out_1'} onNavigate={handleNavigate} />;
      case 'product-detail':
        return <ProductDetailView productId={activeEntityId || 'p1'} onNavigate={handleNavigate} />;
      case 'offer-detail':
        return <OfferDetailView offerId={activeEntityId || 'off_1'} onNavigate={handleNavigate} />;
      case 'favourites':
        return <FavouritesView onNavigate={handleNavigate} />;
      case 'membership':
        return <MembershipView onNavigate={handleNavigate} onOpenAuth={() => setShowAuthModal(true)} />;
      case 'profile':
        return <ProfileView onNavigate={handleNavigate} />;

      // Vendor Portal Views
      case 'vendor-dashboard':
        return <VendorDashboard onNavigate={handleNavigate} />;
      case 'vendor-onboarding':
        return <VendorOnboarding onNavigate={handleNavigate} />;
      case 'vendor-catalogue':
        return <VendorCatalogue onNavigate={handleNavigate} />;
      case 'vendor-offers':
        return <VendorOffers onNavigate={handleNavigate} />;

      // Admin Portal Views
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'admin-licences':
        return <LicenceQueue onNavigate={handleNavigate} />;
      case 'admin-policy':
        return <PolicyEngineView onNavigate={handleNavigate} />;

      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 flex flex-col justify-between">
      {/* Age & Legal Gate Modal */}
      <AgeGateModal onConfirm={() => {}} />

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <div>
        {/* Global Header */}
        <Header
          onOpenAuth={() => setShowAuthModal(true)}
          onNavigate={handleNavigate}
          currentView={currentView}
        />

        {/* Main Content Body */}
        <main className="pt-2">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <PolicyProvider>
          <AuthProvider>
            <LocationProvider>
              <AppContent />
            </LocationProvider>
          </AuthProvider>
        </PolicyProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
