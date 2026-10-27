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
    // If the deal is member-only and user is not a member, prompt paywall
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
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Tag className="w-4 h-4" />
            <span>Pre-Sale & Aahata Dining Passes</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Pre-Paid Cover Vouchers & Event Passes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Lock in heavy dining discounts on food, craft mixers, ice buckets, and premium live-match table reservations at partner Aahatas across Gurugram and Faridabad.
          </p>
        </div>

        {/* Highlight ticker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Up to 33% Extra Value</span>
              <span className="text-[11px] text-slate-400">On food, chakhna & mixers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Weekend Match Passes</span>
              <span className="text-[11px] text-slate-400">Guaranteed big-screen seats</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">100% BYOB Compliant</span>
              <span className="text-[11px] text-slate-400">Bring bottles from adjacent L-2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {activeSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn">
          <span>Your Aahata voucher was issued successfully! Check your phone SMS and present the code at venue reception.</span>
          <button onClick={() => setActiveSuccess(false)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {deals.map((deal) => {
          const savings = deal.worthValue - deal.price;

          return (
            <div 
              key={deal.id}
              className="glass-panel glass-panel-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-white/5 relative group overflow-hidden"
            >
              {/* Member Only Tag */}
              {deal.memberOnly && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                  ★ VIP Exclusive
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{deal.venueName}</span>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                  {deal.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {deal.description}
                </p>

                {/* Pricing Box */}
                <div className="bg-night-950/80 p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Voucher Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-amber-400">₹{deal.price}</span>
                      <span className="text-xs text-slate-500 line-through">₹{deal.worthValue}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-extrabold uppercase block">Instant Bonus</span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      Save ₹{savings}
                    </span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Voucher Benefits:
                  </span>
                  {deal.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Valid till {deal.validTill}</span>
                </span>

                <button
                  onClick={() => handleClaimDeal(deal)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-night-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                >
                  <span>{deal.memberOnly && !isMember ? 'Unlock as VIP' : 'Claim Voucher'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
