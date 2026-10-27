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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-night-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="w-full max-w-4xl p-5 sm:p-8 rounded-3xl bg-night-850 border border-amber-500/30 shadow-glow-gold relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeMembershipModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>EXCLUSIVE NIGHTLIFE MEMBERSHIP CLUB</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {pendingActionName ? (
              <span>Unlock <span className="gold-text">{pendingActionName}</span></span>
            ) : (
              <span>Upgrade to <span className="gold-text">NightLife Pass VIP</span></span>
            )}
          </h2>

          <p className="text-xs text-slate-300">
            Gain priority table reservations at partner Aahatas, flat food/chakhna discounts, rare liquor bottle locator alerts, and bulk party quotation concierge.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isSelected = selectedTier === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedTier(plan.id)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-amber-500/15 via-night-800 to-night-900 border-amber-400 shadow-glow-amber'
                    : 'bg-night-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {plan.name}
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-amber-400 bg-amber-400 text-black' : 'border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">/{plan.duration}</span>
                    </div>
                    <span className="text-[11px] text-amber-400/90 font-medium block mt-0.5">
                      {plan.tagline}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`mt-4 w-full py-2.5 rounded-xl font-bold text-xs transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-night-950 font-extrabold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {isSelected ? 'Selected Plan' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Statutory Regulatory Notice */}
        <div className="p-3.5 rounded-2xl bg-night-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 mb-5">
          <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-slate-200">Haryana Excise Compliance Guarantee</span>
            <p className="leading-relaxed">
              Payment gateway strictly processes platform annual membership fees, Aahata kitchen food vouchers, and table booking covers. In compliance with Haryana Excise Laws, <strong className="text-amber-400">NightLife Pass never processes direct alcohol sales online</strong>. Liquor purchases are executed in-person at licensed L-2 retail vends.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Active plan will be valid for 365 days across all Gurugram & Faridabad partner venues.
          </div>

          <button
            onClick={handleActivate}
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-night-950 font-extrabold text-xs shadow-glow-amber transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <span>Activating Membership...</span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-night-950" />
                <span>Simulate Pay & Activate {MEMBERSHIP_PLANS.find(p => p.id === selectedTier)?.name}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
