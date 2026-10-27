import React, { useState, useEffect, useRef } from 'react';
import { X, Smartphone, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, sendOtp, verifyOtp, pendingActionName } = useAuth();
  
  const [mobile, setMobile] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'OTP' && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isAuthModalOpen) return null;

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const sent = await sendOtp(mobile);
    setLoading(false);
    if (sent) {
      setStep('OTP');
      setCountdown(30);
      setCanResend(false);
      setTimeout(() => otpInputs.current[0]?.focus(), 150);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      setErrorMsg('Please enter all 4 digits of the verification code.');
      return;
    }
    setErrorMsg(null);
    setLoading(true);
    const success = await verifyOtp(fullOtp);
    setLoading(false);
    if (!success) {
      setErrorMsg('Invalid OTP code. For test simulation, enter any 4 digits (e.g. 1234).');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setOtp(['', '', '', '']);
    setCountdown(30);
    setCanResend(false);
    setErrorMsg(null);
    await sendOtp(mobile);
    otpInputs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-md p-6 sm:p-9 rounded-3xl glass-panel border border-white/20 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
            <Smartphone className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {step === 'PHONE' ? 'Sign In via OTP' : 'Verify Mobile Code'}
            </h2>
            <p className="text-sm text-slate-300">
              {pendingActionName ? (
                <span>To unlock <strong className="text-amber-400 font-bold">{pendingActionName}</strong></span>
              ) : (
                <span>Access verified Haryana retail vends & Aahata reservations</span>
              )}
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-bold text-left">
              {errorMsg}
            </div>
          )}

          {step === 'PHONE' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4 pt-2">
              <div className="text-left space-y-1.5">
                <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                  Indian Mobile Number
                </label>
                <div className="flex rounded-2xl overflow-hidden border border-white/20 bg-night-900 focus-within:border-amber-400 transition-colors shadow-inner">
                  <span className="px-4 py-3.5 bg-night-850 text-slate-200 font-bold text-sm border-r border-white/10 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98123 45678"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3.5 bg-transparent text-white placeholder-slate-500 font-bold text-base focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2 shadow-xl"
              >
                {loading ? (
                  <span>Dispatching OTP...</span>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifySubmit} className="space-y-5 pt-2">
              <div className="space-y-2">
                <span className="text-xs text-slate-300 font-semibold block">
                  Enter 4-digit code sent to <strong className="text-white">+91 {mobile}</strong>
                </span>

                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      aria-label={`Digit ${idx + 1}`}
                      className="w-14 h-16 rounded-2xl bg-night-900 border-2 border-white/20 text-center text-2xl font-black text-white focus:border-amber-400 focus:outline-none transition-all shadow-inner"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <button
                  type="button"
                  onClick={() => setStep('PHONE')}
                  className="hover:text-white underline font-bold"
                >
                  Change Mobile
                </button>

                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-amber-400 font-extrabold hover:underline"
                  >
                    Resend OTP Code
                  </button>
                ) : (
                  <span className="text-slate-400 font-semibold">Resend in {countdown}s</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2 shadow-xl"
              >
                {loading ? (
                  <span>Validating OTP...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted Mobile Authentication</span>
          </div>
        </div>

      </div>
    </div>
  );
};
