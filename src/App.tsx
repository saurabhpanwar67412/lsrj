import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LocationProvider, useLocation } from './context/LocationContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AgeGateModal } from './components/common/AgeGateModal';
import { AuthModal } from './components/common/AuthModal';
import { MembershipModal } from './components/common/MembershipModal';
import { TableBookingModal } from './components/aahata/TableBookingModal';
import { AahataDetailModal } from './components/aahata/AahataDetailModal';

import { VendMapList } from './components/discovery/VendMapList';
import { InventoryLocator } from './components/inventory/InventoryLocator';
import { DealsHub } from './components/deals/DealsHub';
import { BulkOrderDesk } from './components/bulk/BulkOrderDesk';
import { MembershipView } from './components/membership/MembershipView';

import { 
  mockVendAahatas, 
  mockLiquorBrands, 
  mockAahataDeals 
} from './data/mockData';
import { VendAahata } from './types';
import { 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  Wine, 
  Compass, 
  CalendarCheck, 
  ArrowRight,
  MapPin,
  CheckCircle2
} from 'lucide-react';

function MainLayout() {
  const [currentTab, setCurrentTab] = useState<string>('discovery');
  const [bookingVenue, setBookingVenue] = useState<VendAahata | null>(null);
  const [detailVenue, setDetailVenue] = useState<VendAahata | null>(null);
  const { isMember, openMembershipModal, openAuthModal, user } = useAuth();
  const { district } = useLocation();

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVendFromInventory = (vendId: string) => {
    const venue = mockVendAahatas.find(v => v.id === vendId);
    if (venue) {
      setCurrentTab('discovery');
      setDetailVenue(venue);
    }
  };

  return (
    <div className="min-h-screen bg-night-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-night-950 font-sans">
      
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={handleTabChange} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Hero Banner only shown on Discovery tab */}
        {currentTab === 'discovery' && (
          <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-10 border border-amber-500/20 shadow-2xl bg-gradient-to-br from-night-900/90 via-night-950 to-night-900">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Members Get Access Before Everyone Else</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Unlock Better Beverage Privileges & <br />
                <span className="gold-text">Guaranteed Aahata Table Reservations</span>
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
                Haryana's premier compliance-first discovery platform. Track verified foreign liquor inventory across licensed L-2 retail vends, enjoy 10–15% dining discounts at partner Aahatas, and book front-row sports cabanas.
              </p>

              {/* Fast Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!isMember ? (
                  <button
                    onClick={openMembershipModal}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-night-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-night-950" />
                    <span>Join NightLife VIP (From ₹499/yr)</span>
                  </button>
                ) : (
                  <div className="px-4 py-2.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>VIP Member Active ({user?.membershipTier})</span>
                  </div>
                )}

                <button
                  onClick={() => handleTabChange('inventory')}
                  className="px-5 py-3.5 rounded-2xl bg-night-900/90 border border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-white font-bold text-xs transition-all flex items-center gap-2"
                >
                  <Wine className="w-4 h-4 text-amber-400" />
                  <span>Locate Foreign Single Malts</span>
                </button>

                <button
                  onClick={() => handleTabChange('deals')}
                  className="px-5 py-3.5 rounded-2xl bg-night-900/90 border border-white/10 hover:border-amber-400/40 text-slate-200 hover:text-white font-bold text-xs transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Explore Pre-Sale Dining Deals</span>
                </button>
              </div>

              {/* Quick Trust Pillars */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Haryana Excise Verified
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" /> Gurugram & Faridabad Licensed Zones
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero Online Alcohol Sales (In-Person Retail)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Views */}
        {currentTab === 'discovery' && (
          <VendMapList
            venues={mockVendAahatas}
            onOpenBooking={(venue) => setBookingVenue(venue)}
            onOpenDetails={(venue) => setDetailVenue(venue)}
          />
        )}

        {currentTab === 'inventory' && (
          <InventoryLocator
            bottles={mockLiquorBrands}
            onSelectVend={handleSelectVendFromInventory}
          />
        )}

        {currentTab === 'deals' && (
          <DealsHub
            deals={mockAahataDeals}
          />
        )}

        {currentTab === 'bulk' && (
          <BulkOrderDesk />
        )}

        {currentTab === 'membership' && (
          <MembershipView />
        )}

      </main>

      {/* Global Modals */}
      <AgeGateModal />
      <AuthModal />
      <MembershipModal />

      {bookingVenue && (
        <TableBookingModal
          venue={bookingVenue}
          onClose={() => setBookingVenue(null)}
          onSuccess={() => {}}
        />
      )}

      {detailVenue && (
        <AahataDetailModal
          venue={detailVenue}
          onClose={() => setDetailVenue(null)}
          onOpenBooking={(venue) => {
            setDetailVenue(null);
            setBookingVenue(venue);
          }}
        />
      )}

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <MainLayout />
      </LocationProvider>
    </AuthProvider>
  );
}
