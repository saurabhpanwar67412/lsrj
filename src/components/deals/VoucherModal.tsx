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
  const { user } = useAuth();
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
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentStep === 'review' && (
          <form onSubmit={handlePurchase} className="space-y-5">
            <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Aahata Dining Voucher
              </span>
              <h3 className="text-2xl font-black text-white mt-2.5 leading-tight">{deal.title}</h3>
              <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Valid at: <strong className="text-white font-bold">{deal.venueName}</strong></span>
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-night-900 p-5 rounded-2xl border border-white/10 space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-black block">You Pay Online:</span>
                  <span className="text-3xl font-black text-amber-400">₹{deal.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-black block">Food Cover Credit:</span>
                  <span className="text-3xl font-black text-emerald-400">₹{deal.worthValue}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-sm">
                <span className="text-emerald-200 font-bold">Guaranteed Food Savings:</span>
                <span className="text-emerald-400 font-black text-base">+₹{savings} Extra Value</span>
              </div>
            </div>

            {/* Perks */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider mb-2.5">
                Voucher Benefits
              </h4>
              <ul className="space-y-2 text-sm text-slate-200">
                {deal.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance Guarantee */}
            <div className="bg-amber-500/15 border border-amber-500/30 p-3.5 rounded-2xl text-xs sm:text-sm text-amber-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white font-bold">Strict Compliance:</strong> This pre-sale voucher is strictly for culinary food, mocktails, ice, and table cover at the partner Aahata. Alcohol is never sold online and must be acquired legally via adjoining L-2 retail vends.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <span className="text-sm font-black text-slate-200 block">Select Instant Payment Method</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-sm font-black flex items-center justify-center gap-2.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-night-900 border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span>Instant UPI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-sm font-black flex items-center justify-center gap-2.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-night-900 border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span>Card / Netbanking</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="pt-1">
                  <input
                    type="text"
                    required
                    placeholder="Enter your UPI ID (e.g. mobile@okhdfcbank)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2.5 shadow-xl"
            >
              <span>Pay ₹{deal.price} & Receive Digital Voucher</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {paymentStep === 'paying' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
            <h4 className="text-xl font-black text-white">Securing Food Voucher...</h4>
            <p className="text-sm text-slate-300">
              Generating your unique Haryana compliant token and notifying venue reception.
            </p>
          </div>
        )}

        {paymentStep === 'confirmed' && (
          <div className="py-4 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                Payment Authorized & Activated
              </span>
              <h3 className="text-2xl font-black text-white mt-1">Your Aahata Voucher is Ready!</h3>
              <p className="text-sm text-slate-300 mt-1">
                Show this voucher token at the host counter of <strong className="text-white font-bold">{deal.venueName}</strong>.
              </p>
            </div>

            {/* Digital Pass Card */}
            <div className="bg-night-950 p-6 rounded-3xl border-2 border-dashed border-amber-500/50 text-center space-y-3 shadow-xl">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-white/10 pb-3 font-bold">
                <span>DIGITAL PASS TOKEN</span>
                <span className="text-amber-400 font-extrabold">{deal.venueName}</span>
              </div>

              <div className="py-3">
                <span className="font-mono text-3xl font-black tracking-widest text-amber-400 block">
                  {voucherCode}
                </span>
                <span className="text-sm text-emerald-400 font-extrabold mt-1 block">
                  Food Credit Worth ₹{deal.worthValue}
                </span>
              </div>

              <div className="text-xs text-slate-400 pt-2 border-t border-white/10 flex items-center justify-between font-semibold">
                <span>Validity: {deal.validTill}</span>
                <span className="text-amber-300">BYOB Approved Venue</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="btn-gold w-full py-3.5 rounded-2xl text-sm font-black"
            >
              Done & Return to Passes
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
