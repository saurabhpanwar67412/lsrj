import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  ChevronDown, 
  Crown, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Wine, 
  Ticket, 
  PackageCheck, 
  User, 
  LogOut,
  Navigation
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { District } from '../../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { user, tier, isMember, logout, openAuthModal, openMembershipModal } = useAuth();
  const { district, setDistrict, isLocating, requestCurrentLocation } = useLocation();
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navLinks = [
    { id: 'discovery', label: 'Vends & Aahatas', icon: Compass },
    { id: 'inventory', label: 'Live Bottle Stock', icon: Wine },
    { id: 'deals', label: 'Aahata Deals', icon: Ticket },
    { id: 'bulk', label: 'Bulk Order Desk', icon: PackageCheck },
    { id: 'membership', label: 'VIP Pass', icon: Crown },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setShowMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-night-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('discovery')}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-300 flex items-center justify-center text-night-950 font-extrabold text-sm shadow-glow-amber group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-night-950" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-wider uppercase text-white group-hover:text-amber-400 transition-colors font-sans">
                NightLife <span className="gold-text">Pass</span>
              </span>
            </div>
            <span className="block text-[9px] text-amber-500/90 font-bold tracking-wider uppercase">
              Haryana Excise Compliance Pilot
            </span>
          </div>
        </button>

        {/* District Location Selector */}
        <div className="relative hidden sm:block">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-night-900 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-200 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-bold text-white">{district}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            <button
              onClick={requestCurrentLocation}
              disabled={isLocating}
              title="Use Device Location"
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

          {showDistrictDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 p-2 rounded-2xl bg-night-900 border border-slate-700 shadow-2xl z-50 animate-fade-in">
              <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Select NCR District
              </div>
              {(['Gurugram', 'Faridabad'] as District[]).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDistrict(d);
                    setShowDistrictDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                    district === d
                      ? 'bg-amber-500/20 text-amber-400 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{d}</span>
                  {district === d && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Status & Action Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openMembershipModal}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold shadow-sm transition-all ${
                  isMember
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 shadow-glow-amber'
                    : 'bg-night-900 border border-slate-700 text-slate-300 hover:border-amber-400'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {tier === 'PRIME_ACCESS' ? 'Prime Pass' : tier === 'CORPORATE_PASS' ? 'Corporate Pass' : tier === 'BASIC_VIP' ? 'VIP Pass' : 'Guest Mode'}
                </span>
                {!isMember && <span className="text-[10px] text-amber-400 font-normal underline ml-1">Upgrade</span>}
              </button>

              <button
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-xl bg-night-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={openAuthModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-night-950 font-extrabold text-xs shadow-glow-amber transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / OTP</span>
              </button>

              <button
                onClick={openMembershipModal}
                className="hidden sm:flex px-3.5 py-2 rounded-xl bg-night-900 border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 text-xs font-bold transition-all items-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Join VIP</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-xl bg-night-900 border border-slate-800 text-slate-300 hover:text-white lg:hidden"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="lg:hidden mt-3 pt-3 border-t border-slate-800/80 space-y-3 animate-fade-in">
          {/* Mobile District Switcher */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-night-900 border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold">Current District:</span>
            <div className="flex items-center gap-2">
              {(['Gurugram', 'Faridabad'] as District[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDistrict(d)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    district === d ? 'bg-amber-500 text-night-950 font-extrabold' : 'text-slate-400'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold text-left transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-night-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
