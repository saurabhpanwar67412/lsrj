import React, { useState } from 'react';
import { X, Crown, Check, ShieldCheck, Zap, Sparkles, Building, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MEMBERSHIP_PLANS } from '../../data/mockData';
import { MembershipTierId } from '../../types';

export const MembershipModal: React.FC = () => {
  const { isMembershipModalOpen, closeMembershipModal, upgradeMembership, pendingActionName } = useAuth();
  const [selectedTier, setSelectedTier] = useState<MembershipTierId>('PRIME_ACCESS');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isMembershipModalOpen) return null;

  const handleActivate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeMembership(selectedTier);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/85 backdrop-blur-xl overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-4xl p-6 sm:p-9 rounded-3xl glass-panel border border-amber-500/40 shadow-glow-gold relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeMembershipModal}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>VIP MEMBERSHIP CLUB</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {pendingActionName ? (
              <span>Unlock <span className="gold-text">{pendingActionName}</span></span>
            ) : (
              <span>Upgrade to <span className="gold-text">NightLife Pass VIP</span></span>
            )}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Gain priority table reservations at partner Aahatas, flat food/chakhna discounts, rare liquor bottle locator alerts, and bulk party quotation concierge.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isSelected = selectedTier === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedTier(plan.id)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 shadow-glow-amber scale-[1.02]'
                    : 'bg-night-900 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-night-800 text-amber-300 border border-white/10">
                      {plan.badge}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-400 text-night-950' : 'border-slate-500'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-amber-400">₹{plan.price}</span>
                    <span className="text-xs text-slate-300 font-bold">/{plan.duration}</span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-200">
                    {plan.perks.slice(0, 3).map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Footer & Action */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-night-900 border border-white/10 text-xs text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p>
              Membership strictly covers food cover discounts and digital services. All liquor is sold only in-person at licensed Haryana vends.
            </p>
          </div>

          <button
            onClick={handleActivate}
            disabled={isProcessing}
            className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2 shadow-xl"
          >
            {isProcessing ? (
              <span>Activating Membership...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Confirm & Activate VIP Pass</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
