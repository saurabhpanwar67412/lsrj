import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  Utensils, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { AahataDeal } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { saveVoucherOrder } from '../../services/complianceService';

interface VoucherModalProps {
  deal: AahataDeal;
  onClose: () => void;
  onSuccess: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ deal, onClose, onSuccess }) => {
  const { user, isMember, triggerProtectedAction } = useAuth();
  const [paymentStep, setPaymentStep] = useState<'review' | 'paying' | 'confirmed'>('review');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [upiId, setUpiId] = useState('');

  const savings = deal.worthValue - deal.price;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('paying');

    setTimeout(() => {
      const generatedCode = `NLP-VCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setVoucherCode(generatedCode);

      saveVoucherOrder({
        id: generatedCode,
        dealId: deal.id,
        dealTitle: deal.title,
        venueName: deal.venueName,
        pricePaid: deal.price,
        foodCreditValue: deal.worthValue,
        purchasedAt: new Date().toISOString(),
        expiresAt: deal.validTill,
        status: 'ACTIVE',
        userMobile: user?.mobile || '9876543210'
      });

      setPaymentStep('confirmed');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {paymentStep === 'review' && (
          <form onSubmit={handlePurchase} className="space-y-5">
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Aahata Dining Voucher
              </span>
              <h3 className="text-xl font-black text-white mt-2">{deal.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Valid at: <strong className="text-white">{deal.venueName}</strong></span>
              </p>
            </div>

            {/* Voucher Price Card */}
            <div className="bg-night-950/80 p-4 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">You Pay Today:</span>
                  <span className="text-2xl font-black text-amber-400">₹{deal.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Food & Mixer Cover:</span>
                  <span className="text-2xl font-black text-emerald-400">₹{deal.worthValue}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-semibold">Instant Guaranteed Food Savings:</span>
                <span className="text-emerald-400 font-black text-sm">+₹{savings}</span>
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                What's Included
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {deal.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance Guarantee */}
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-[11px] text-amber-300/90 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong className="text-white">Strict Compliance Notice:</strong> This pre-sale voucher is strictly for culinary food, mocktails, ice, and table cover at the partner Aahata. Alcohol is never sold online and must be acquired legally via the adjoining L-2 retail counter.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">Select Fast Payment Method</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-night-950/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Instant UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-sm'
                      : 'bg-night-950/60 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card / Netbanking</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Enter UPI ID (e.g. mobile@okhdfcbank)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-night-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-night-950 font-black text-sm tracking-wide hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Authorize Payment of ₹{deal.price}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {paymentStep === 'paying' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
            <h4 className="text-lg font-bold text-white">Securing Food Voucher...</h4>
            <p className="text-xs text-slate-400">
              Communicating with partner Aahata system & issuing Haryana compliance token.
            </p>
          </div>
        )}

        {paymentStep === 'confirmed' && (
          <div className="py-4 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest">
                Payment Authorized & Activated
              </span>
              <h3 className="text-xl font-black text-white mt-1">Your Aahata Voucher is Ready!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Show this digital pass at the entrance of <strong className="text-white">{deal.venueName}</strong> for instant credit.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="bg-night-950 p-5 rounded-2xl border-2 border-dashed border-amber-500/40 text-center space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-white/5 pb-2">
                <span>VOUCHER TOKEN:</span>
                <span className="text-amber-400 font-bold">{deal.venueName}</span>
              </div>

              <div className="py-2">
                <span className="font-mono text-2xl font-black tracking-widest text-amber-400 block">
                  {voucherCode}
                </span>
                <span className="text-[11px] text-emerald-400 font-bold">
                  Food Credit Worth ₹{deal.worthValue}
                </span>
              </div>

              <div className="text-[10px] text-slate-500 pt-1 border-t border-white/5 flex items-center justify-between">
                <span>Expires: {deal.validTill}</span>
                <span>BYOB Approved</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-amber-500 text-night-950 font-bold text-xs hover:brightness-110 transition-all"
            >
              Done & Return to Deals
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
