import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, MapPin, Store, ArrowRight, CreditCard, Lock, QrCode, FileText } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { mockBackend } from '../../services/mockBackend';
import { formatINR } from '../../utils/formatters';
import { Order } from '../../types';

interface CheckoutViewProps {
  onNavigate: (view: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onNavigate }) => {
  const { items, selectedStore, subtotalRegular, subtotalMember, totalSavings, clearCart } = useCart();
  const { user } = useAuth();

  const [ageConfirmed, setAgeConfirmed] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'PAY_AT_STORE' | 'UPI_ONLINE'>('PAY_AT_STORE');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = () => {
    if (!selectedStore) return;

    const order = mockBackend.createPickupOrder({
      customerUid: user?.uid || 'guest_user',
      customerMobile: user?.phoneNumber || '+91 98100 12345',
      storeId: selectedStore.id,
      storeName: selectedStore.name,
      storeAddress: selectedStore.address,
      items: items.map((i) => ({
        productId: i.productId,
        productName: i.product.productName,
        quantity: i.quantity,
        pricePaid: i.storeMemberPrice,
        regularPrice: i.regularPrice,
      })),
      subtotalRegular,
      memberSavings: totalSavings,
      totalPayable: subtotalMember,
    });

    setCreatedOrder(order);
    clearCart();
  };

  if (createdOrder) {
    return (
      <div className="space-y-6 pb-24 pt-6 px-4 max-w-2xl mx-auto">
        
        {/* Receipt Box */}
        <div className="luxury-card rounded-3xl p-8 border border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest block">
              STORE PICKUP CONFIRMED
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Order Placed Successfully!</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Show your pickup code to the manager at {createdOrder.storeName}
            </p>
          </div>

          {/* Pickup Code Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-1">
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
              YOUR PICKUP VERIFICATION CODE
            </span>
            <div className="text-3xl font-extrabold text-amber-500 tracking-widest font-mono">
              {createdOrder.pickupCode}
            </div>
            <span className="text-[11px] text-slate-400 block font-semibold">Valid for store verification</span>
          </div>

          {/* Details */}
          <div className="space-y-2 text-left text-xs p-4 rounded-2xl luxury-card border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Pickup Store:</span>
              <span className="font-bold text-slate-900 dark:text-white">{createdOrder.storeName}</span>
            </div>

            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Address:</span>
              <span className="font-semibold text-slate-900 dark:text-white line-clamp-1">{createdOrder.storeAddress}</span>
            </div>

            <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="text-slate-500">Total Payable:</span>
              <span className="font-bold text-amber-500">{formatINR(createdOrder.totalPayable)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Member Savings:</span>
              <span className="font-bold text-emerald-400">-{formatINR(createdOrder.memberSavings)}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3.5 rounded-2xl bg-amber-500 text-black font-extrabold text-xs shadow-md"
          >
            Return to Discovery Marketplace
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-4xl mx-auto">
      
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
        Partner Store Pickup Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Steps */}
        <div className="md:col-span-7 space-y-6">
          
          {/* Step 1: Selected Store */}
          <div className="luxury-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              STEP 1 • PICKUP LOCATION
            </span>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{selectedStore?.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{selectedStore?.address}</p>
          </div>

          {/* Step 2: Mandatory Age Gate */}
          <div className="luxury-card rounded-2xl p-5 border border-amber-500/30 space-y-3">
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              STEP 2 • HARYANA EXCISE AGE VERIFICATION
            </span>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-1 rounded text-amber-500 focus:ring-amber-500"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                I confirm that I am at least 21 years of age per the Haryana Excise Policy (2025–2027) and will present valid physical government age proof upon store pickup.
              </span>
            </label>
          </div>

          {/* Step 3: Payment Method */}
          <div className="luxury-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              STEP 3 • PAYMENT METHOD
            </span>

            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-amber-500/40 bg-amber-500/10 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'PAY_AT_STORE'}
                    onChange={() => setPaymentMethod('PAY_AT_STORE')}
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Pay at Licensed Store Upon Pickup</span>
                </div>
                <span className="text-[10px] font-extrabold text-amber-500">RECOMMENDED</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'UPI_ONLINE'}
                    onChange={() => setPaymentMethod('UPI_ONLINE')}
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">UPI / Instant Digital Voucher</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Summary */}
        <div className="md:col-span-5 space-y-4">
          <div className="luxury-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Checkout Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items ({items.length}):</span>
                <span>{formatINR(subtotalRegular)}</span>
              </div>

              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Member Discount Savings:</span>
                <span>-{formatINR(totalSavings)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">Final Amount Payable:</span>
                <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{formatINR(subtotalMember)}</span>
              </div>
            </div>

            <button
              disabled={!ageConfirmed}
              onClick={handlePlaceOrder}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2 ${
                ageConfirmed
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black gold-glow'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Confirm & Generate Pickup Code</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
