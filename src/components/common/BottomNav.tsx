import React from 'react';
import { Home, Search, Store, Flame, User, ShoppingBag, Crown } from 'lucide-react';
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

  if (isVendor || isAdmin) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 luxury-glass border-t py-2 px-4 lg:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            currentView === 'home' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Home className="w-4.5 h-4.5" />
          <span className="text-[10px]">{t('discover')}</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            currentView === 'shop' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Search className="w-4.5 h-4.5" />
          <span className="text-[10px]">Shop</span>
        </button>

        <button
          onClick={() => onNavigate('early-access')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            currentView === 'early-access' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Flame className="w-4.5 h-4.5 text-rose-500" />
          <span className="text-[10px]">Deals</span>
        </button>

        <button
          onClick={() => onNavigate('partner-stores')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            currentView === 'partner-stores' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <Store className="w-4.5 h-4.5" />
          <span className="text-[10px]">Stores</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-0.5 transition-colors ${
            currentView === 'profile' ? 'text-amber-500 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-amber-500'
          }`}
        >
          <User className="w-4.5 h-4.5" />
          <span className="text-[10px]">{t('account')}</span>
        </button>
      </div>
    </nav>
  );
};
