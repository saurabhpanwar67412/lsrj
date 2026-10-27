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
  const { tier, openMembershipModal } = useAuth();

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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-widest">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Elevate Your Gurugram & Faridabad Nightlife</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Unlock Guaranteed Privileges at <br className="hidden sm:inline" />
          <span className="gold-text">Partner Aahatas & Vends</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                isPrime
                  ? 'glass-panel border-2 border-amber-400 shadow-glow-gold scale-105 z-10'
                  : 'glass-panel border border-white/15 hover:border-white/30'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 font-black text-xs uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-300 mt-1 font-medium">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1.5 py-3 border-y border-white/10">
                  <span className="text-4xl font-black text-white">₹{plan.price}</span>
                  <span className="text-sm text-slate-300 font-bold">/ {plan.duration}</span>
                </div>

                {/* Feature Checklist */}
                <ul className="space-y-3 pt-2">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed font-medium">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
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
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-night-900 text-slate-500 border border-white/10 cursor-default'
                      : isPrime
                      ? 'btn-gold shadow-xl'
                      : 'btn-secondary text-amber-300 border-amber-500/40 hover:border-amber-400'
                  }`}
                >
                  {isCurrent ? (
                    <span>Current Active Plan</span>
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
      <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-7 rounded-3xl border border-white/15 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div className="text-sm text-slate-200 leading-relaxed">
          <strong className="text-white block font-extrabold text-base mb-1">
            100% Haryana Excise Regulatory Compliant Membership
          </strong>
          Membership fees cover digital concierge services, verified inventory discovery, and hospitality discounts at licensed partner Aahatas. Under no circumstances is liquor purchased, billed, or fulfilled directly online.
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-4 pt-4">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-black text-white">Frequently Asked Questions</h3>
          <p className="text-sm text-slate-300">Everything you need to know about your pass and rights.</p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <h4 className="text-base font-extrabold text-amber-300 flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed pl-7 font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
