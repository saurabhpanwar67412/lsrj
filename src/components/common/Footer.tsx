import React from 'react';
import { ShieldCheck, AlertCircle, Sparkles, MapPin, Phone, HelpCircle } from 'lucide-react';

export const Footer: React.FC<{ onSelectTab: (tab: string) => void }> = ({ onSelectTab }) => {
  return (
    <footer className="bg-night-950 border-t border-white/10 text-slate-300 text-sm py-12 px-4 sm:px-6 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto space-y-9">
        
        {/* Compliance Banner */}
        <div className="p-6 sm:p-7 rounded-3xl bg-night-900 border border-amber-500/30 grid grid-cols-1 md:grid-cols-12 gap-5 items-center shadow-xl">
          <div className="md:col-span-8 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-base font-black text-white uppercase tracking-wider">
                Haryana Excise & Taxation Statutory Compliance Notice
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                NightLife Pass operates strictly within the framework of the Haryana Excise Act and Haryana Excise Policy. This platform is an information directory, inventory stock indicator, and dining/Aahata cover reservation portal. <strong className="text-amber-400 font-bold">NightLife Pass does not engage in direct online alcohol sales or home delivery</strong>. All liquor retail purchases must be executed in person at licensed L-2 / L-14A retail vends by individuals aged 21 years or older.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center gap-2.5 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
            <div className="px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              21+ ONLY • STRICT STATUTORY VERIFICATION
            </div>
            <span className="text-xs text-slate-400 text-center md:text-right font-medium">
              Do Not Drink and Drive. Consumption of alcohol is injurious to health.
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-black text-base">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>NightLife Pass</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              The premier nightlife, licensed retail vend, and Aahata food cover discovery network for Gurugram and Faridabad.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black text-xs uppercase tracking-wider">Platform Discovery</h5>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => onSelectTab('discovery')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Licensed L-2 & L-14A Vends
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('discovery')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Partner Aahatas & BYOB Gardens
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('inventory')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Foreign Liquor Stock Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('deals')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Aahata Food & Match Vouchers
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black text-xs uppercase tracking-wider">Privilege & Bulk</h5>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => onSelectTab('membership')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Basic VIP (₹499/yr)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('membership')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Prime Access Pass (₹1,499/yr)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('membership')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  Corporate Multi-Seat Pass
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('bulk')} className="text-slate-300 hover:text-amber-400 transition-colors">
                  L-2 Wedding & Party Quotations
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-black text-xs uppercase tracking-wider">Coverage Pilot</h5>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Cyber Hub • Sector 29 • Golf Course Road • Golf Course Extension • Sohna Road • Sector 15 Faridabad • NIT Mathura Road
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <span>© {new Date().getFullYear()} NightLife Pass. All rights reserved.</span>
          <span className="text-slate-400">Operating strictly under Haryana State Regulatory Framework.</span>
        </div>

      </div>
    </footer>
  );
};
