import React, { useState } from 'react';
import { ShieldCheck, Scale, FileText, Activity, AlertTriangle, Users, Store, DollarSign, ArrowRight } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { formatINR } from '../../utils/formatters';

interface AdminDashboardProps {
  onNavigate: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const licences = mockBackend.getLicences();
  const pendingLicences = licences.filter((l) => l.verificationStatus === 'PENDING');
  const offers = mockBackend.getOffers();
  const pendingOffers = offers.filter((o) => o.status === 'SUBMITTED');
  const auditLogs = mockBackend.getAuditLogs();
  const outlets = mockBackend.getOutlets();

  const [emergencyAlert, setEmergencyAlert] = useState(false);

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      {/* Executive Header */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-[#131926] to-[#0B0F17] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-extrabold flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" /> EXCISE COMPLIANCE & GOVERNANCE CONSOLE
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-white">Haryana Pilot Operations Console</h1>
          <p className="text-xs text-slate-300">
            Real-time Haryana excise verification, policy engine controls, audit logging & licence management.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate('admin-licences')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Licence Queue ({pendingLicences.length})</span>
          </button>
          <button
            onClick={() => onNavigate('admin-policy')}
            className="px-4 py-2.5 rounded-xl glass-card text-xs font-bold text-slate-200 hover:text-white"
          >
            Policy Engine Rules
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Active Outlets</span>
          <span className="text-2xl font-extrabold text-white">{outlets.filter((o) => o.isVerified).length} / {outlets.length}</span>
          <span className="text-[10px] text-emerald-400 font-bold block">Gurgaon & Faridabad</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Pending Licence Reviews</span>
          <span className="text-2xl font-extrabold text-amber-400">{pendingLicences.length}</span>
          <span className="text-[10px] text-slate-400 block">Requires officer audit</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Pending Offer Review</span>
          <span className="text-2xl font-extrabold text-amber-400">{pendingOffers.length}</span>
          <span className="text-[10px] text-slate-400 block">Permitted promo submissions</span>
        </div>
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Platform SaaS MRR</span>
          <span className="text-2xl font-extrabold text-emerald-400">{formatINR(348000)}</span>
          <span className="text-[10px] text-slate-400 block">Tech platform revenue</span>
        </div>
      </div>

      {/* Verification Queues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Licence verification preview */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              Licence Compliance Queue
            </h2>
            <button
              onClick={() => onNavigate('admin-licences')}
              className="text-xs text-amber-400 font-semibold hover:underline"
            >
              View All ({licences.length})
            </button>
          </div>

          <div className="space-y-3">
            {licences.slice(0, 3).map((lic) => (
              <div key={lic.id} className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-300 font-bold block">{lic.number}</span>
                  <span className="text-xs font-bold text-white block">Type: {lic.type}</span>
                  <span className="text-[10px] text-slate-400">Doc: {lic.documentName}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold ${
                  lic.verificationStatus === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {lic.verificationStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Preview */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            Backend Audit Logs (Immutable)
          </h2>

          <div className="space-y-3">
            {auditLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="glass-card rounded-2xl p-3 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-mono text-[10px]">
                  <span className="text-amber-400 font-bold">{log.action}</span>
                  <span className="text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Actor: <strong className="text-white">{log.actorRole}</strong> ({log.actorUid})
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
