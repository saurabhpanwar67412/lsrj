import React, { useState } from 'react';
import { 
  Sparkles, 
  Tag, 
  Utensils, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Percent,
  Calendar
} from 'lucide-react';
import { AahataDeal } from '../../types';
import { VoucherModal } from './VoucherModal';
import { useAuth } from '../../context/AuthContext';

interface DealsHubProps {
  deals: AahataDeal[];
}

export const DealsHub: React.FC<DealsHubProps> = ({ deals }) => {
  const { isMember, triggerProtectedAction } = useAuth();
  const [selectedDeal, setSelectedDeal] = useState<AahataDeal | null>(null);
  const [activeSuccess, setActiveSuccess] = useState(false);

  const handleClaimDeal = (deal: AahataDeal) => {
    if (deal.memberOnly && !isMember) {
      triggerProtectedAction('Member-Only Pre-Sale & Food Pass Discounts', () => {
        setSelectedDeal(deal);
      });
      return;
    }

    setSelectedDeal(deal);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="glass-panel p-6 sm:p-9 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest">
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Pre-Sale & Aahata Dining Passes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Pre-Paid Cover Vouchers & Event Passes
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Lock in heavy dining discounts on food, craft mixers, ice buckets, and premium live-match table reservations at partner Aahatas across Gurugram and Faridabad.
          </p>
        </div>

        {/* Highlight ticker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 bg-night-900/60 p-3.5 rounded-2xl border border-white/10">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">Up to 33% Extra Value</span>
              <span className="text-xs text-slate-300 font-medium">On food, chakhna & mixers</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-night-900/60 p-3.5 rounded-2xl border border-white/10">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">Weekend Match Passes</span>
              <span className="text-xs text-slate-300 font-medium">Guaranteed big-screen seats</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-night-900/60 p-3.5 rounded-2xl border border-white/10">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-sm font-black text-white block">100% BYOB Compliant</span>
              <span className="text-xs text-slate-300 font-medium">Bring bottles from adjacent L-2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {activeSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm font-bold flex items-center justify-between animate-fadeIn">
          <span>Your Aahata food voucher was issued successfully! Show your voucher code at the venue reception.</span>
          <button onClick={() => setActiveSuccess(false)} className="text-emerald-400 hover:text-white font-black text-base">✕</button>
        </div>
      )}

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal) => {
          const savings = deal.worthValue - deal.price;

          return (
            <div 
              key={deal.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between space-y-4 border border-white/10 relative group overflow-hidden hover:border-amber-400/50 transition-all duration-300"
            >
              {/* Member Only Tag */}
              {deal.memberOnly && (
                <div className="absolute top-5 right-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                  ★ VIP Exclusive
                </div>
              )}

              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{deal.venueName}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight">
                  {deal.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {deal.description}
                </p>

                {/* Pricing Box */}
                <div className="bg-night-900 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">You Pay Online:</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-black text-amber-400">₹{deal.price}</span>
                      <span className="text-sm text-slate-400 line-through font-bold">₹{deal.worthValue}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-black uppercase block">Guaranteed Food Credit:</span>
                    <span className="text-sm font-black text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-xl border border-emerald-500/30 inline-block mt-0.5">
                      ₹{deal.worthValue} (Save ₹{savings})
                    </span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                    Voucher Privileges:
                  </span>
                  {deal.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{deal.validTill}</span>
                </span>

                <button
                  onClick={() => handleClaimDeal(deal)}
                  className="btn-gold px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg"
                >
                  <span>{deal.memberOnly && !isMember ? 'Unlock as VIP' : 'Claim Food Voucher'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Voucher Purchase Modal */}
      {selectedDeal && (
        <VoucherModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          onSuccess={() => setActiveSuccess(true)}
        />
      )}
    </div>
  );
};
