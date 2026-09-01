import React from 'react';
import { Store, ShieldCheck, Clock, Layers, TrendingUp, Search, Eye, Navigation, Plus, ArrowRight } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/formatters';

interface VendorDashboardProps {
  onNavigate: (view: string) => void;
}

export const VendorDashboard: React.FC<VendorDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const vendors = mockBackend.getVendors();
  const outlets = mockBackend.getOutlets();
  const licences = mockBackend.getLicences();

  const myVendor = vendors[0] || { tradeName: 'Cyber Hub Discovery Store', status: 'ACTIVE' };
  const myOutlet = outlets[0] || { name: 'L1 Discovery Outlet — Cyber Hub', status: 'ACTIVE', isVerified: true };
  const myLicence = licences[0] || { number: 'HR-GUR-L2-2025-0042', expiryDate: '2027-03-31', verificationStatus: 'APPROVED' };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      {/* Vendor Header & Status Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-[#131926] to-[#0B0F17] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> EXCISE COMPLIANT VENDOR
            </span>
            <span className="text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
              Licence: {myLicence.number}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-white">{myVendor.tradeName}</h1>
          <p className="text-xs text-slate-300">
            SaaS Management Console • Valid Haryana Licence till <strong className="text-amber-300">{myLicence.expiryDate}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate('vendor-catalogue')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" /> Update Stock & Prices
          </button>
          <button
            onClick={() => onNavigate('vendor-onboarding')}
            className="px-4 py-2.5 rounded-xl glass-card text-xs font-bold text-slate-200 hover:text-white"
          >
            Licence Documents
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Outlet Views (30d)</span>
          <span className="text-2xl font-extrabold text-white">4,820</span>
          <span className="text-[10px] text-emerald-400 font-bold block">↑ +14.2% search visibility</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Directions Clicked</span>
          <span className="text-2xl font-extrabold text-amber-400">1,240</span>
          <span className="text-[10px] text-slate-400 block">High intent navigation</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Active Products</span>
          <span className="text-2xl font-extrabold text-white">48</span>
          <span className="text-[10px] text-slate-400 block">Timestamped inventory</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">SaaS Plan Status</span>
          <span className="text-2xl font-extrabold text-emerald-400">Growth</span>
          <span className="text-[10px] text-slate-400 block">₹4,999/month</span>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('vendor-catalogue')}
          className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/50 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300">Inventory & Stock Signals</h3>
          <p className="text-xs text-slate-400">Update live availability (In Stock / Low Stock / Out of Stock) and MRPs.</p>
        </div>

        <div
          onClick={() => onNavigate('vendor-offers')}
          className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/50 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300">Submit Permitted Offer</h3>
          <p className="text-xs text-slate-400">Submit promo draft for excise compliance officer review and approval.</p>
        </div>

        <div
          onClick={() => onNavigate('vendor-onboarding')}
          className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-amber-500/50 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300">Licence Compliance Audit</h3>
          <p className="text-xs text-slate-400">View uploaded Haryana excise certificate, licence status, and renewals.</p>
        </div>
      </div>

    </div>
  );
};
