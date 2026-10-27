import React, { useState, useEffect, useRef } from 'react';
import { X, Smartphone, KeyRound, ArrowRight, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, sendOtp, verifyOtp, pendingActionName } = useAuth();
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'OTP' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  if (!isAuthModalOpen) return null;

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage(null);
    setIsSending(true);
    await sendOtp(mobile);
    setIsSending(false);
    setStep('OTP');
    setCountdown(30);
    setTimeout(() => {
      inputRefs[0].current?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto submit if 4 digits filled
    if (newOtp.every((digit) => digit !== '')) {
      handleOtpVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleOtpVerify = async (codeToVerify?: string) => {
    const code = codeToVerify || otp.join('');
    if (code.length < 4) {
      setErrorMessage('Please enter all 4 digits of the OTP code.');
      return;
    }

    setErrorMessage(null);
    setIsVerifying(true);
    const success = await verifyOtp(code);
    setIsVerifying(false);

    if (!success) {
      setErrorMessage('Invalid verification code. Please try again.');
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setCountdown(30);
    setOtp(['', '', '', '']);
    await sendOtp(mobile);
    inputRefs[0].current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-night-850 border border-slate-700/80 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'PHONE' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-1">
                <Smartphone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Sign In to NightLife Pass</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pendingActionName
                  ? `Please verify your phone number to access ${pendingActionName}.`
                  : 'Enter your 10-digit mobile number for instant OTP authentication.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                Mobile Number (India +91)
              </label>
              <div className="flex rounded-2xl overflow-hidden border border-slate-700 focus-within:border-amber-500 bg-night-900 transition-colors">
                <span className="px-3.5 py-3 text-xs font-bold text-amber-400 bg-night-950/60 border-r border-slate-800 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="98100 12345"
                  className="w-full px-3.5 py-3 bg-transparent text-white text-sm font-semibold focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending || mobile.length < 10}
              className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                mobile.length >= 10 && !isSending
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-night-950 shadow-glow-amber cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSending ? (
                <span>Sending Code...</span>
              ) : (
                <>
                  <span>Send 4-Digit Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Simulated authentication mode active. Instant 4-digit OTP will be verified.</span>
            </div>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-1">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Enter 4-Digit Code</h2>
              <p className="text-xs text-slate-400">
                Code sent to <strong className="text-white">+91 {mobile}</strong>.{' '}
                <button
                  onClick={() => setStep('PHONE')}
                  className="text-amber-400 hover:underline ml-1 font-semibold"
                >
                  Change
                </button>
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}

            {/* 4 Digit Boxes */}
            <div className="flex justify-center gap-3 py-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-14 h-14 rounded-2xl text-center text-xl font-extrabold bg-night-900 border border-slate-700 text-amber-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                {countdown > 0 ? (
                  `Resend code in ${countdown}s`
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend OTP Code</span>
                  </button>
                )}
              </span>

              <span className="text-[11px] text-amber-500/80 font-mono">
                Hint: 1234
              </span>
            </div>

            <button
              onClick={() => handleOtpVerify()}
              disabled={isVerifying || otp.some((d) => !d)}
              className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                otp.every((d) => d !== '') && !isVerifying
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-night-950 shadow-glow-amber cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify & Enter Dashboard</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
