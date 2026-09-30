import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ShieldCheck, ArrowRight, Lock, CheckCircle2, Crown, Percent } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';

interface EarlyAccessViewProps {
  onNavigate: (view: string, id?: string) => void;
  onOpenAuth: () => void;
}

export const EarlyAccessView: React.FC<EarlyAccessViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { user, isGuest } = useAuth();
  const { addToCart } = useCart();
  const earlySales = mockBackend.getEarlyAccessSales();

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 14,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimerDigit = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="space-y-8 pb-24 pt-4 px-4 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full luxury-card border border-amber-500/40 text-amber-500 dark:text-amber-400 text-xs font-extrabold">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>Members Only First Access</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Early Access <span className="gold-gradient-text">Member Flash Sales</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Members get access to limited stock allocations and deep partner discounts 24 hours before non-members!
        </p>
      </div>

      {/* Countdown Timer Display */}
      <div className="luxury-card rounded-3xl p-6 border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-[#10141E] to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
            FEATURED EARLY SALE COUNTDOWN
          </span>
          <h2 className="text-xl font-bold text-white">Armand de Brignac Gold Flash Lock</h2>
          <p className="text-xs text-slate-300">Limited allocation of 8 bottles available at L1 Discovery Hub Cyber City</p>
        </div>

        {/* Live Timer Boxes */}
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-extrabold text-2xl shadow-lg">
              {formatTimerDigit(timeLeft.hours)}
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">HOURS</span>
          </div>
          <span className="text-2xl font-bold text-amber-400">:</span>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-extrabold text-2xl shadow-lg">
              {formatTimerDigit(timeLeft.minutes)}
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">MINS</span>
          </div>
          <span className="text-2xl font-bold text-amber-400">:</span>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-black flex items-center justify-center font-extrabold text-2xl shadow-lg">
              {formatTimerDigit(timeLeft.seconds)}
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase mt-1 block">SECS</span>
          </div>
        </div>
      </div>

      {/* Early Access Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {earlySales.map((sale) => {
          const product = mockBackend.getProductById(sale.productId);
          const store = mockBackend.getPartnerStoreById(sale.partnerStoreId);
          const savings = sale.regularPrice - sale.memberPrice;

          return (
            <div
              key={sale.id}
              className="luxury-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-28 h-36 rounded-2xl bg-slate-100 dark:bg-slate-950 p-2 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800">
                  <img src={sale.imageUrl} alt={sale.productName} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="space-y-2 flex-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px] font-extrabold uppercase">
                    MEMBER EARLY ACCESS LOCK
                  </span>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">{sale.productName}</h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Store: <strong className="text-amber-600 dark:text-amber-400">{sale.partnerStoreName}</strong>
                  </p>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                      {formatINR(sale.memberPrice)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">{formatINR(sale.regularPrice)}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-500/10 text-rose-500">
                      SAVE {formatINR(savings)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  <span>Allocation Progress:</span>
                  <span className="text-amber-500 font-bold">{sale.availableQuantity} bottles remaining</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 w-3/4 rounded-full" />
                </div>
              </div>

              {/* CTA */}
              {isGuest ? (
                <button
                  onClick={onOpenAuth}
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Join Membership to Unlock Member Price</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (product && store) {
                      addToCart(product, store, 1);
                      onNavigate('cart');
                    }
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reserve Member Price & Select Store</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
