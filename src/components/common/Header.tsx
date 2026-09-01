import React, { useState } from 'react';
import { MapPin, ChevronDown, Sun, Moon, Languages, Layers, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, DISTRICT_DEFAULTS } from '../../context/LocationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { DistrictCode, UserRole } from '../../types';

interface HeaderProps {
  onOpenAuth: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, onNavigate, currentView }) => {
  const { user, role, setRole } = useAuth();
  const { district, selectedArea, setDistrict } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'customer', label: 'Customer View' },
    { role: 'vendor_owner', label: 'Vendor Console' },
    { role: 'compliance_officer', label: 'Excise Audit' },
    { role: 'super_admin', label: 'Super Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 luxury-glass border-b px-3 sm:px-4 py-2.5 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
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
              {t('brandName')} <span className="text-amber-600 dark:text-amber-400 font-light">• {t('subBrand')}</span>
            </span>
            <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
              {t('tagline')}
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

        {/* Right Action Controls: Language, Theme, Role, Login */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Hindi / English Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full luxury-card text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:scale-105 transition-transform"
            title="Switch Language (Hindi / English)"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full luxury-card text-amber-500 hover:scale-105 transition-transform"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Quick Search */}
          <button
            onClick={() => onNavigate('search')}
            className="p-2 rounded-full luxury-card text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Role Persona Switcher */}
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
              className="w-8 h-8 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs shadow-md shadow-amber-500/20"
            >
              {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-md shadow-amber-500/20 whitespace-nowrap"
            >
              {t('loginSignup')}
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
