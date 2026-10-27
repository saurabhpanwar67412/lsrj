import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AgeGateModal: React.FC = () => {
  const { isAgeVerified, verifyAge } = useAuth();
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [dobYear, setDobYear] = useState('2000');
  const [dobMonth, setDobMonth] = useState('01');
  const [dobDay, setDobDay] = useState('01');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (isAgeVerified) return null;

  const handleDobConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(dobYear, 10);
    if (age >= 21) {
      verifyAge();
    } else {
      setErrorMsg('Under Haryana Excise Law, access is restricted to individuals aged 21 and above.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-2xl animate-fadeIn">
      <div className="w-full max-w-lg p-7 sm:p-9 rounded-3xl glass-panel border border-amber-500/40 shadow-glow-gold relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
              MANDATORY STATUTORY COMPLIANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Are you 21 years of age or older?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Per the <strong className="text-white">Haryana Excise Policy</strong>, discovery of licensed beverage retail vends, Aahata premises, and stock tracking in <strong className="text-amber-400">Gurugram & Faridabad</strong> requires users to be at least 21 years of age.
          </p>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm font-bold flex items-center gap-2.5 text-left">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!showDobPicker ? (
            <div className="space-y-3 pt-3">
              <button
                onClick={verifyAge}
                className="btn-gold w-full py-4 px-6 rounded-2xl text-base font-black flex items-center justify-center gap-2.5 shadow-xl"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span>I am 21 or Older — Enter Platform</span>
              </button>

              <button
                onClick={() => setShowDobPicker(true)}
                className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-4 font-bold"
              >
                Verify with Date of Birth instead
              </button>
            </div>
          ) : (
            <form onSubmit={handleDobConfirm} className="space-y-4 pt-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Day</label>
                  <select
                    value={dobDay}
                    onChange={(e) => setDobDay(e.target.value)}
                    aria-label="Birth day"
                    className="w-full px-3 py-3 rounded-2xl bg-night-900 border border-white/15 text-white text-sm font-bold"
                  >
                    {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Month</label>
                  <select
                    value={dobMonth}
                    onChange={(e) => setDobMonth(e.target.value)}
                    aria-label="Birth month"
                    className="w-full px-3 py-3 rounded-2xl bg-night-900 border border-white/15 text-white text-sm font-bold"
                  >
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Year</label>
                  <select
                    value={dobYear}
                    onChange={(e) => setDobYear(e.target.value)}
                    aria-label="Birth year"
                    className="w-full px-3 py-3 rounded-2xl bg-night-900 border border-white/15 text-white text-sm font-bold"
                  >
                    {Array.from({ length: 60 }, (_, i) => String(2005 - i)).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Confirm Legal Drinking Age</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          <div className="pt-2 text-xs text-slate-400 font-medium">
            Alcohol cannot be purchased online. Consumption permitted only at licensed premises or private residences under legal possession quotas.
          </div>
        </div>

      </div>
    </div>
  );
};
