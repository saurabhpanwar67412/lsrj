import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles, MapPin, Phone, HelpCircle } from 'lucide-react';

export const Footer: React.FC<{ onSelectTab: (tab: string) => void }> = ({ onSelectTab }) => {
  return (
    <footer className="bg-night-950 border-t border-slate-800/80 text-slate-400 text-xs py-10 px-4 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Compliance Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-night-900 border border-amber-500/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Haryana Excise & Taxation Compliance Notice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                NightLife Pass operates strictly within the framework of the Haryana Excise Act and Haryana Excise Policy (2025–2027). This platform is an information directory, inventory stock indicator, and dining/Aahata cover reservation portal. <strong className="text-amber-400">NightLife Pass does not engage in direct online alcohol sales or home delivery</strong>. All liquor retail purchases must be executed in person at licensed L-2 / L-14A vends by individuals aged 21 years or older.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-2 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
            <div className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase">
              21+ ONLY • STRICT AGE VERIFICATION
            </div>
            <span className="text-[11px] text-slate-400 text-center md:text-right">
              Do Not Drink and Drive. Consumption of alcohol is injurious to health.
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>NightLife Pass</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier nightlife, licensed vend, and Aahata food cover discovery network for Millennium City Gurugram and Faridabad.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Platform Discovery</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onSelectTab('discovery')} className="hover:text-amber-400 transition-colors">
                  Licensed L-2 & L-14A Vends
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('discovery')} className="hover:text-amber-400 transition-colors">
                  Partner Aahatas & BYOB Gardens
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('inventory')} className="hover:text-amber-400 transition-colors">
                  Foreign Liquor Stock Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('deals')} className="hover:text-amber-400 transition-colors">
                  Aahata Food & Match Vouchers
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Privilege & Bulk</h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onSelectTab('membership')} className="hover:text-amber-400 transition-colors">
                  Basic VIP (₹499/yr)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('membership')} className="hover:text-amber-400 transition-colors">
                  Prime Access Pass (₹1,499/yr)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('membership')} className="hover:text-amber-400 transition-colors">
                  Corporate Multi-Seat Pass
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('bulk')} className="hover:text-amber-400 transition-colors">
                  L-2 Wedding & Party Quotations
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">Coverage Pilot</h5>
            <p className="text-xs text-slate-300">
              Cyber Hub • Sector 29 • Golf Course Road • Sohna Road • Sector 15 Faridabad • NIT Mathura Road
            </p>
            <div className="text-[11px] text-amber-500/90 pt-1 font-mono">
              Pilot Version 2.4.0 (HR-EXCISE-PILOT)
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} NightLife Pass Network. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-slate-400">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400">Excise Compliance Matrix</span>
            <span>•</span>
            <span className="hover:text-slate-400">Responsible Drinking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
