import React, { useState } from 'react';
import { Crown, Check, ShieldCheck, Zap, Sparkles, RefreshCw, FileText, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBackend } from '../../services/mockBackend';
import { formatINR } from '../../utils/formatters';
import { CustomerPlanId, PlatformOrder } from '../../types';

interface MembershipViewProps {
  onNavigate: (view: string, id?: string) => void;
  onOpenAuth: () => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { user, isGuest } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<CustomerPlanId>('PREMIUM');
  const [loading, setLoading] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState<PlatformOrder | null>(null);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  const plans = [
    {
      id: 'FREE' as CustomerPlanId,
      name: 'Guest Discovery',
      price: 0,
      period: 'Forever Free',
      description: 'Standard access to verified outlet listings & public product catalogue.',
      features: [
        'Browse Haryana licensed L-2 / L-14A outlets',
        'Search brands & pack sizes',
        'View operating hours & directions',
        'Guest age confirmation gate',
      ],
      popular: false,
    },
    {
      id: 'PREMIUM' as CustomerPlanId,
      name: 'Platform Premium Pass',
      price: 499,
      period: 'per year',
      description: 'Enhanced stock availability alerts & saved product signals.',
      features: [
        'All Free features included',
        'Instant SMS & Push availability alerts for saved malts',
        'Unlimited favourite brands & outlets',
        'Timestamped stock freshness signals',
        'Verified permitted offer alerts',
        'DPDP compliant data management',
      ],
      popular: true,
    },
    {
      id: 'PRO' as CustomerPlanId,
      name: 'VIP Pro Reserve',
      price: 999,
      period: 'per year',
      description: 'Exclusive lounge tasting passes & concierge support.',
      features: [
        'All Premium features included',
        'VIP Lounge Tasting Pass Access at participating outlets',
        'Priority stock alert notifications',
        'Concierge support ticket resolution',
        'Exclusive festival preview alerts',
      ],
      popular: false,
    },
  ];

  const handleStartCheckout = (planId: CustomerPlanId, price: number) => {
    if (isGuest) {
      onOpenAuth();
      return;
    }
    setLoading(true);
    // Create server platform order
    const order = mockBackend.createPlatformOrder(user!.uid, 'CUSTOMER_MEMBERSHIP', planId, price);
    setLoading(false);
    setCheckoutModal(order);
  };

  const handleSimulatePayment = async () => {
    if (!checkoutModal) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200)); // Simulate gateway
    const result = mockBackend.simulatePaymentWebhook(checkoutModal.id);
    setLoading(false);
    setCheckoutModal(null);
    setSuccessReceipt(result);
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Discovery
      </button>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-amber-500/30 text-amber-400 text-xs font-extrabold">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Platform Value Subscription</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Elevate Your Discovery with <span className="gradient-text-gold">Platform Membership</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300">
          Subscribe to enhanced technology features: instant stock availability alerts, saved search notifications, and VIP lounge access signals.
        </p>

        <div className="text-[11px] text-amber-400/90 font-medium bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 max-w-lg mx-auto">
          ⚖️ <strong>Legal Notice:</strong> Membership purchases sell tech platform capabilities only. Per Haryana Excise Policy, membership benefits do NOT constitute liquor discounts or unlawful inducements.
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between relative transition-all ${
              plan.popular
                ? 'border-amber-500 shadow-2xl shadow-amber-500/10 bg-gradient-to-b from-amber-950/20 to-[#131926]'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">
                MOST POPULAR
              </span>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">
                  {plan.price === 0 ? 'Free' : formatINR(plan.price)}
                </span>
                <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{plan.description}</p>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {plan.id === 'FREE' ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl glass-card text-slate-400 text-xs font-bold"
                >
                  Current Default Plan
                </button>
              ) : (
                <button
                  onClick={() => handleStartCheckout(plan.id, plan.price)}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-md shadow-amber-500/20"
                >
                  Subscribe to {plan.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Payment Gateway Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-2xl space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Platform Payment Gateway</h3>
              <p className="text-xs text-slate-400">Secure Server Order Verification</p>
            </div>

            <div className="glass-card rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono text-amber-300">{checkoutModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gateway Ref:</span>
                <span className="font-mono text-slate-300">{checkoutModal.gatewayOrderId}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                <span className="text-white">Total Amount:</span>
                <span className="text-amber-400">{formatINR(checkoutModal.amount)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleSimulatePayment}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Razorpay / Stripe Payment</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCheckoutModal(null)}
                className="w-full py-2.5 rounded-xl glass-card text-slate-400 text-xs font-semibold"
              >
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Receipt Modal */}
      {successReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-emerald-500/40 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">Membership Activated!</h3>
            <p className="text-xs text-slate-300">
              Your platform membership entitlement has been activated server-side via verified webhook.
            </p>

            <div className="glass-card rounded-xl p-3 text-left text-xs space-y-1.5 border border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-amber-400">{successReceipt.order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Plan:</span>
                <span className="font-bold text-white">{successReceipt.membership?.planId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expires:</span>
                <span className="text-slate-300">
                  {new Date(successReceipt.membership?.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSuccessReceipt(null)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs"
            >
              Done & Return to Discovery
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
