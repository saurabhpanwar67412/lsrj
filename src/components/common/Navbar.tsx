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
  Navigation,
  ArrowRight
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
    { id: 'inventory', label: 'Spirits & Single Malts', icon: Wine },
    { id: 'deals', label: 'Food Passes & Deals', icon: Ticket },
    { id: 'bulk', label: 'Bulk Order Desk', icon: PackageCheck },
    { id: 'membership', label: 'VIP Pass', icon: Crown },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setShowMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-night-950/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('discovery')}
          className="flex items-center gap-3 group focus:outline-none shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 flex items-center justify-center text-night-950 font-black text-lg shadow-glow-amber group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 fill-night-950" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                NightLife <span className="gold-text">Pass</span>
              </span>
            </div>
            <span className="block text-xs text-amber-400 font-extrabold tracking-wide uppercase">
              Haryana Excise Compliance
            </span>
          </div>
        </button>

        {/* District Location Selector */}
        <div className="relative hidden md:block">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-night-850 border border-white/15 text-sm font-bold">
            <button
              onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl hover:bg-night-800 text-slate-100 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-extrabold text-white">{district}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-0.5" />
            </button>

            <button
              onClick={requestCurrentLocation}
              disabled={isLocating}
              title="Use GPS Location"
              className="p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-night-800 transition-colors"
            >
              <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>

          {showDistrictDropdown && (
            <div className="absolute top-full left-0 mt-2 w-52 p-2 rounded-2xl bg-night-900 border border-white/20 shadow-2xl z-50 animate-fadeIn">
              <div className="text-xs font-black text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                Select Licensed District
              </div>
              {(['Gurugram', 'Faridabad'] as District[]).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDistrict(d);
                    setShowDistrictDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                    district === d
                      ? 'bg-amber-500 text-night-950 font-black'
                      : 'text-slate-200 hover:bg-night-800'
                  }`}
                >
                  <span>{d}</span>
                  {district === d && <span className="text-xs font-black">Active</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-night-900/90 p-1.5 rounded-2xl border border-white/10">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 font-extrabold shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-night-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-night-950' : 'text-amber-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action: Auth & VIP Pass Button */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openMembershipModal}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border transition-all ${
                  isMember
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-night-850 text-slate-300 border-white/15 hover:border-amber-400'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span>{tier === 'GUEST' ? 'Upgrade to VIP' : tier}</span>
              </button>

              <button
                onClick={logout}
                title="Log out"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-night-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="btn-gold px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-xl bg-night-850 text-slate-200 border border-white/10 hover:text-white"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="lg:hidden mt-3 p-4 rounded-3xl bg-night-900 border border-white/15 space-y-3 animate-fadeIn">
          {/* Mobile District Selector */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-night-850 border border-white/10">
            <span className="text-xs font-bold text-slate-400 uppercase">Selected District:</span>
            <div className="flex gap-2">
              {(['Gurugram', 'Faridabad'] as District[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDistrict(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    district === d ? 'bg-amber-500 text-night-950' : 'bg-night-800 text-slate-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold ${
                    isActive
                      ? 'bg-amber-500 text-night-950 font-black'
                      : 'text-slate-200 hover:bg-night-800'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
