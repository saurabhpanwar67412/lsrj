import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, Lock, Scale } from 'lucide-react';
import { usePolicy } from '../../context/PolicyContext';

interface AgeGateModalProps {
  onConfirm: () => void;
}

export const AgeGateModal: React.FC<AgeGateModalProps> = ({ onConfirm }) => {
  const { policy } = usePolicy();
  const [confirmed, setConfirmed] = useState<boolean>(() => {
    return localStorage.getItem('lsr_age_confirmed') === 'true';
  });

  if (confirmed) return null;

  const handleAgree = () => {
    localStorage.setItem('lsr_age_confirmed', 'true');
    setConfirmed(true);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-amber-500/30 shadow-2xl text-center space-y-5 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <Scale className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Haryana Excise Legal Gate
          </span>
          <h2 className="text-xl font-bold text-white mt-3">
            Age & Eligibility Verification
          </h2>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Per the official <strong className="text-amber-300">Haryana Excise Policy (2025–2027)</strong>, you must be at least{' '}
            <span className="text-amber-400 font-bold text-sm">{policy.minAge} years of age</span> to access verified liquor outlet discovery, product availability signals, and permitted offers in <strong className="text-white">Gurgaon & Faridabad</strong>.
          </p>
        </div>

        <div className="glass-card rounded-xl p-3 text-left text-[11px] text-slate-400 space-y-1.5 border border-slate-700/80">
          <div className="flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>This platform is a pure discovery layer. No liquor sales or home delivery are conducted.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>Strict age-gating & legal compliance enforced. Drink responsibly.</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleAgree}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Confirm I am {policy.minAge}+ Years Old</span>
          </button>
          
          <button
            onClick={() => {
              window.location.href = 'https://google.com';
            }}
            className="w-full py-2.5 rounded-xl glass-card text-slate-400 hover:text-white text-xs font-semibold"
          >
            Exit / Underage
          </button>
        </div>
      </div>
    </div>
  );
};
