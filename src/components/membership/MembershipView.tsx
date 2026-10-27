import React from 'react';
import { 
  Crown, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  HelpCircle,
  Zap,
  Building,
  GlassWater,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockMembershipPlans } from '../../data/mockData';
import { MembershipTierId } from '../../types';

export const MembershipView: React.FC = () => {
  const { tier, upgradeMembership, openMembershipModal } = useAuth();

  const handleSelectPlan = (tierId: MembershipTierId) => {
    openMembershipModal();
  };

  const faqs = [
    {
      q: 'Why do I need a NightLife Pass membership?',
      a: 'Haryana Excise strictly regulates alcohol retail. NightLife Pass is a luxury lifestyle membership that negotiates guaranteed food, mixer, and table reservation discounts at partner Aahatas, while providing verified real-time stock directories for foreign single malts and spirits.'
    },
    {
      q: 'Does NightLife Pass sell or deliver liquor online?',
      a: 'Never. Online alcohol retail or home delivery is strictly prohibited under Haryana Excise Act. Our platform facilitates in-person discovery at licensed L-2 retail vends and dining discounts at authorized partner Aahatas.'
    },
    {
      q: 'How do I redeem my 10-15% dining discount at Aahatas?',
      a: 'Simply show your active VIP Membership QR badge or registered mobile number at the reception or billing counter of any partner Aahata before ordering your food, ice, and mixers.'
    },
    {
      q: 'Can I cancel or change my plan anytime?',
      a: 'Yes, memberships can be upgraded at any time. Plans are valid for 1 full year from the date of activation.'
    }
  ];

  return (
    <div className="space-y-12 py-4">
      
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Crown className="w-4 h-4" />
          <span>Elevate Your Gurugram & Faridabad Nightlife</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Unlock Guaranteed Privileges at <br className="hidden sm:inline" />
          <span className="gold-text">Partner Aahatas & Vends</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Select your pass to enjoy instant 10–15% food & mixer discounts, priority weekend cabana reservations, and real-time imported single malt stock tracking.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {mockMembershipPlans.map((plan) => {
          const isCurrent = tier === plan.id;
          const isPrime = plan.id === 'PRIME_ACCESS';

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 ${
                isPrime
                  ? 'glass-panel border-2 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.25)] scale-105 z-10'
                  : 'glass-panel border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 font-black text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 py-2 border-y border-white/5">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹{plan.price}</span>
                  <span className="text-xs text-slate-400 font-semibold">{plan.duration}</span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-2.5 pt-2">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-night-900 text-slate-500 border border-white/10 cursor-default'
                      : isPrime
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-night-950 hover:brightness-110 shadow-lg shadow-amber-500/25'
                      : 'bg-night-900 hover:bg-night-800 text-amber-300 border border-amber-500/30 hover:border-amber-400'
                  }`}
                >
                  {isCurrent ? (
                    <span>Active Plan</span>
                  ) : (
                    <>
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Compliance Guarantee Box */}
      <div className="max-w-4xl mx-auto glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block font-bold text-sm mb-0.5">
            100% Haryana Excise Regulatory Compliant Membership
          </strong>
          Membership fees cover digital concierge services, verified inventory discovery, and hospitality discounts at licensed partner Aahatas. Under no circumstances is liquor purchased, billed, or fulfilled directly online.
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-4 pt-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-400">Everything you need to know about your pass.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel p-4 rounded-2xl border border-white/5 space-y-1.5">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
