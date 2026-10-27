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
  CheckCircle2,
  Ticket,
  PackageCheck,
  Building2
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-8">
        
        {/* Hero Section on Discovery tab */}
        {currentTab === 'discovery' && (
          <div className="space-y-6">
            
            {/* Hero Main Card */}
            <div className="relative overflow-hidden rounded-3xl glass-panel p-7 sm:p-12 border border-white/15 shadow-2xl bg-gradient-to-br from-night-900 via-night-950 to-night-900">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Members Get Access Before Everyone Else</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
                  Unlock Better Beverage Privileges & <br />
                  <span className="gold-text">Guaranteed Aahata Reservations</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal">
                  Haryana's premier compliance-first discovery platform. Track verified foreign liquor inventory across licensed L-2 retail vends, enjoy 10–15% dining discounts at partner Aahatas, and book front-row sports cabanas.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  {!isMember ? (
                    <button
                      onClick={openMembershipModal}
                      className="btn-gold px-7 py-4 rounded-2xl text-sm sm:text-base font-black flex items-center gap-2.5 shadow-xl"
                    >
                      <Sparkles className="w-5 h-5 fill-night-950" />
                      <span>Join NightLife VIP (From ₹499/yr)</span>
                    </button>
                  ) : (
                    <div className="px-5 py-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>VIP Member Active ({user?.membershipTier})</span>
                    </div>
                  )}

                  <button
                    onClick={() => handleTabChange('inventory')}
                    className="btn-secondary px-6 py-4 rounded-2xl text-sm sm:text-base font-bold flex items-center gap-2"
                  >
                    <Wine className="w-5 h-5 text-amber-400" />
                    <span>Check Single Malt Stock</span>
                  </button>

                  <button
                    onClick={() => handleTabChange('deals')}
                    className="btn-secondary px-6 py-4 rounded-2xl text-sm sm:text-base font-bold flex items-center gap-2"
                  >
                    <Ticket className="w-5 h-5 text-amber-400" />
                    <span>Food Cover Passes</span>
                  </button>
                </div>

                {/* Trust Verification Pillars */}
                <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300 font-bold">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Haryana Excise Verified
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" /> {district} Zone Active
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> In-Person Retail Pickup Only
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Launch Feature Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div 
                onClick={() => handleTabChange('discovery')}
                className="glass-panel glass-panel-hover p-5 rounded-3xl border border-white/10 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  Aahatas & Vends
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                  Explore 40+ licensed BYOB dining lawns and retail bottleshops with live GPS radar.
                </p>
              </div>

              <div 
                onClick={() => handleTabChange('inventory')}
                className="glass-panel glass-panel-hover p-5 rounded-3xl border border-white/10 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Wine className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  Bottle Stock Locator
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                  Real-time stock indicators for single malts, tequila, and craft gins across retail vends.
                </p>
              </div>

              <div 
                onClick={() => handleTabChange('deals')}
                className="glass-panel glass-panel-hover p-5 rounded-3xl border border-white/10 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Ticket className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  Food Cover Deals
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                  Pay ₹500, get ₹750 food cover credit at top partner BYOB restaurants and lounges.
                </p>
              </div>

              <div 
                onClick={() => handleTabChange('bulk')}
                className="glass-panel glass-panel-hover p-5 rounded-3xl border border-white/10 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white group-hover:text-amber-400 transition-colors">
                  Bulk Order Desk
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-snug">
                  Official wedding and party quotations directly from licensed L-2 retail counters.
                </p>
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
