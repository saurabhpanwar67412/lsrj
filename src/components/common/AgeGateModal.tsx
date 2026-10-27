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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/90 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-night-850 border border-amber-500/30 shadow-glow-gold relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-900/30 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500/90 block">
              MANDATORY STATUTORY VERIFICATION
            </span>
            <h2 className="text-2xl font-extrabold text-white font-sans">
              Are you 21 years of age or older?
            </h2>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Per the <strong className="text-white">Haryana Excise Policy (2025–2027)</strong>, discovery of licensed beverage vends, Aahata facilities, and inventory availability in <strong className="text-amber-400">Gurugram & Faridabad</strong> requires users to be at least 21 years of age.
          </p>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {!showDobPicker ? (
            <div className="space-y-3 pt-2">
              <button
                onClick={verifyAge}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-night-950 font-extrabold text-sm shadow-glow-amber transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>I am 21 or Older — Enter NightLife Pass</span>
              </button>

              <button
                onClick={() => setShowDobPicker(true)}
                className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Verify with Date of Birth instead
              </button>
            </div>
          ) : (
            <form onSubmit={handleDobConfirm} className="space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Day</label>
                  <select
                    value={dobDay}
                    onChange={(e) => setDobDay(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-night-900 border border-slate-700 text-white text-xs font-semibold"
                  >
                    {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Month</label>
                  <select
                    value={dobMonth}
                    onChange={(e) => setDobMonth(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-night-900 border border-slate-700 text-white text-xs font-semibold"
                  >
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Year</label>
                  <select
                    value={dobYear}
                    onChange={(e) => setDobYear(e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-night-900 border border-slate-700 text-white text-xs font-semibold"
                  >
                    {Array.from({ length: 50 }, (_, i) => String(2005 - i)).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 font-extrabold text-sm shadow-glow-amber transition-all"
              >
                Confirm Age & Proceed
              </button>

              <button
                type="button"
                onClick={() => setShowDobPicker(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back to 1-Click Confirmation
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
            By proceeding, you agree to our Terms of Use and confirm compliance with local legal drinking age regulations.
          </div>
        </div>

      </div>
    </div>
  );
};
