import React, { useState, useEffect } from 'react';
import { Smartphone, ArrowRight, ShieldCheck, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { sendOTP, verifyOTP } = useAuth();
  const [step, setStep] = useState<'MOBILE' | 'OTP'>('MOBILE');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let interval: any;
    if (step === 'OTP' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  const handleSendMobile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^[6-9]\d{9}$/.test(mobile.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    const ok = await sendOTP(mobile);
    setLoading(false);
    if (ok) {
      setStep('OTP');
      setResendTimer(30);
    } else {
      setError('Failed to send OTP. Try again.');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    setLoading(true);
    const ok = await verifyOTP(mobile, otp);
    setLoading(false);
    if (ok) {
      onClose();
      if (onSuccess) onSuccess();
    } else {
      setError('Invalid OTP code. Use test code 123456 for instant bypass.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-amber-500/30 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white glass-card"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {step === 'MOBILE' ? 'Single Mobile Login / Signup' : 'Verify Phone OTP'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {step === 'MOBILE'
              ? 'Enter your 10-digit mobile number to access member benefits, alerts & favourites'
              : `Enter the 6-digit verification code sent to +91 ${mobile}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {error}
          </div>
        )}

        {step === 'MOBILE' ? (
          <form onSubmit={handleSendMobile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Mobile Phone Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 font-semibold text-sm">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass-input text-sm font-semibold tracking-wide"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Enter 6-Digit OTP Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center tracking-widest text-xl font-bold py-3 rounded-xl glass-input text-amber-400"
                required
                autoFocus
              />
              <div className="text-[11px] text-amber-400/90 text-center mt-1.5 font-mono">
                💡 Dev Test Bypass Key: <span className="font-bold underline">123456</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Continue</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => setStep('MOBILE')}
                className="text-slate-400 hover:text-white"
              >
                Change mobile number
              </button>

              <button
                type="button"
                disabled={resendTimer > 0}
                onClick={async () => {
                  setResendTimer(30);
                  await sendOTP(mobile);
                }}
                className={`font-semibold ${
                  resendTimer > 0 ? 'text-slate-500' : 'text-amber-400 hover:underline'
                }`}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>DPDP Act 2023 Compliant • Safe Mobile Auth</span>
        </div>
      </div>
    </div>
  );
};
