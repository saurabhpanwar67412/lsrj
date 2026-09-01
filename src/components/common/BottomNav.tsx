import React from 'react';
import { Home, Search, MapPin, Heart, User, Store, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const { role } = useAuth();
  const { t } = useLanguage();

  const isVendor = role.startsWith('vendor');
  const isAdmin = role.includes('compliance') || role.includes('admin');

  if (isVendor) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 luxury-glass border-t py-2.5 px-6 md:hidden">
        <div className="flex justify-around items-center">
          <button
            onClick={() => onNavigate('vendor-dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'vendor-dashboard' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="text-[10px]">Dashboard</span>
          </button>
          <button
            onClick={() => onNavigate('vendor-catalogue')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'vendor-catalogue' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px]">Stock</span>
          </button>
          <button
            onClick={() => onNavigate('vendor-onboarding')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'vendor-onboarding' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px]">Licence</span>
          </button>
        </div>
      </nav>
    );
  }

  if (isAdmin) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 luxury-glass border-t py-2.5 px-6 md:hidden">
        <div className="flex justify-around items-center">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'admin-dashboard' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px]">Console</span>
          </button>
          <button
            onClick={() => onNavigate('admin-licences')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentView === 'admin-licences' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="text-[10px]">Licences</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 luxury-glass border-t py-2.5 px-6 md:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'home' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">{t('discover')}</span>
        </button>

        <button
          onClick={() => onNavigate('map')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'map' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">{t('outletsMap')}</span>
        </button>

        <button
          onClick={() => onNavigate('favourites')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'favourites' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px]">{t('saved')}</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${
            currentView === 'profile' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">{t('account')}</span>
        </button>
      </div>
    </nav>
  );
};
