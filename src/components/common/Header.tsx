import React, { useState } from 'react';
import { MapPin, ChevronDown, Sun, Moon, Languages, Layers, Search, ShoppingBag, Crown, Store, Flame, PackageCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { DistrictCode, UserRole } from '../../types';

interface HeaderProps {
  onOpenAuth: () => void;
  onNavigate: (view: string, id?: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, onNavigate, currentView }) => {
  const { user, role, setRole } = useAuth();
  const { district, setDistrict } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems } = useCart();

  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'customer', label: 'Customer View' },
    { role: 'vendor_owner', label: 'Vendor Console' },
    { role: 'compliance_officer', label: 'Excise Audit' },
    { role: 'super_admin', label: 'Super Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 luxury-glass border-b px-3 sm:px-4 py-2 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-2">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFF5D6] via-[#D4AF37] to-[#AA771C] flex items-center justify-center text-black font-extrabold text-xs shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <div className="text-left hidden xs:block sm:block">
              <span className="text-sm font-extrabold tracking-widest uppercase text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                LSR <span className="text-amber-600 dark:text-amber-400 font-light">• RESERVE</span>
              </span>
              <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                Gurgaon & Faridabad
              </span>
            </div>
          </button>

          {/* Location Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full luxury-card text-xs font-semibold hover:border-amber-500/40 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="font-bold text-slate-900 dark:text-white">{district}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {showLocationMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 luxury-card rounded-2xl p-2 z-50 shadow-2xl">
                <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                  Select Haryana District
                </div>
                {(['Gurugram', 'Faridabad'] as DistrictCode[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDistrict(d);
                      setShowLocationMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      district === d
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    {district === d && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Search Button */}
            <button
              onClick={() => onNavigate('shop')}
              className="p-2 rounded-full luxury-card text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors"
              title="Search Products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="p-2 rounded-full luxury-card text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors relative"
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-full luxury-card text-[11px] font-extrabold text-amber-600 dark:text-amber-400"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full luxury-card text-amber-500 hover:scale-105 transition-transform"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Role Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="p-2 rounded-full luxury-card text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Role Simulator"
              >
                <Layers className="w-4 h-4" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 luxury-card rounded-2xl p-2 z-50 shadow-2xl">
                  <div className="text-[10px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 mb-1">
                    Role Simulator
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setRole(r.role);
                        setShowRoleMenu(false);
                        if (r.role.includes('vendor')) onNavigate('vendor-dashboard');
                        else if (r.role.includes('compliance') || r.role.includes('admin')) onNavigate('admin-dashboard');
                        else onNavigate('home');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                        role === r.role
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Account / Login */}
            {user ? (
              <button
                onClick={() => onNavigate('profile')}
                className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/20 shrink-0"
              >
                {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs shadow-md whitespace-nowrap shrink-0"
              >
                Login
              </button>
            )}
          </div>

        </div>

        {/* Desktop Navigation Links Bar */}
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-200 dark:border-slate-800/60 pt-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-5">
            <button onClick={() => onNavigate('home')} className={currentView === 'home' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}>
              Home
            </button>
            <button onClick={() => onNavigate('shop')} className={currentView === 'shop' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}>
              Shop Catalogue
            </button>
            <button onClick={() => onNavigate('imported')} className={currentView === 'imported' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}>
              ✈️ Imported
            </button>
            <button onClick={() => onNavigate('local')} className={currentView === 'local' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}>
              🇮🇳 Local Reserve
            </button>
            <button onClick={() => onNavigate('early-access')} className={`flex items-center gap-1 ${currentView === 'early-access' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}`}>
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Early Access</span>
            </button>
            <button onClick={() => onNavigate('membership')} className={`flex items-center gap-1 ${currentView === 'membership' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}`}>
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Membership</span>
            </button>
            <button onClick={() => onNavigate('partner-stores')} className={`flex items-center gap-1 ${currentView === 'partner-stores' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}`}>
              <Store className="w-3.5 h-3.5 text-amber-500" />
              <span>Partner Stores</span>
            </button>
            <button onClick={() => onNavigate('bulk-orders')} className={`flex items-center gap-1 ${currentView === 'bulk-orders' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}`}>
              <PackageCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Bulk Orders</span>
            </button>
            <button onClick={() => onNavigate('faq')} className={currentView === 'faq' ? 'text-amber-500 font-extrabold' : 'hover:text-amber-500'}>
              FAQ & Guide
            </button>
          </div>
        </nav>

      </div>
    </header>
  );
};
