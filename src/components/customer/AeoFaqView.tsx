import React from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, MapPin, Crown, PackageCheck } from 'lucide-react';

export const AeoFaqView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const faqs = [
    {
      q: 'Where can I find licensed partner liquor stores near me in Gurgaon & Faridabad?',
      a: 'You can discover Haryana Excise L-2 and L-14A verified licensed partner stores using our Partner Stores Geo-Locator. Enter your location or enable browser geolocation to view stores sorted by distance (km and drive time), rating, opening hours, and available member discounts.',
    },
    {
      q: 'How does the platform membership work?',
      a: 'Platform members unlock exclusive member-only pricing (saving up to 20%), 24-hour early access to limited stock allocations before non-members, exclusive partner store discounts, and bulk order quotation benefits.',
    },
    {
      q: 'Can I place bulk liquor orders for weddings, corporate events, or private parties?',
      a: 'Yes. Our Bulk Orders Concierge allows you to select quantities in tiers (1–5, 6–20, 21–50, 50+ bottles) and request custom bulk pricing quotes directly from verified partner store managers in Gurgaon and Faridabad.',
    },
    {
      q: 'What is the minimum legal drinking age requirement?',
      a: 'Per Haryana Excise Policy (2025–2027), you must be at least 21 years of age to access liquor store discovery and complete store pickup orders. Physical government photo ID age verification is required at partner store pickup.',
    },
    {
      q: 'How does store pickup fulfillment work?',
      a: 'After selecting your products and partner store in your cart, confirm your age and select store pickup. Upon confirmation, you will receive a unique 6-digit Pickup Verification Code (e.g. PKP-849201). Show this code to the manager at the licensed store to collect your items.',
    },
  ];

  return (
    <div className="space-y-8 pb-24 pt-4 px-4 max-w-4xl mx-auto">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full luxury-card border border-amber-500/40 text-amber-500 text-xs font-bold">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Frequently Asked Questions & Guide</span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Platform Discovery & <span className="gold-gradient-text">Member FAQ</span>
        </h1>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="luxury-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-amber-500 font-extrabold">Q.</span> {item.q}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5 border-l-2 border-amber-500">
              {item.a}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
