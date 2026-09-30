import React, { useState } from 'react';
import { PackageCheck, Calendar, Users, Building, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { BulkQuantityTier } from '../../types';

interface BulkOrdersViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const BulkOrdersView: React.FC<BulkOrdersViewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const stores = mockBackend.getPartnerStores();

  const [formData, setFormData] = useState({
    customerName: user?.displayName || '',
    customerMobile: user?.phoneNumber || '',
    customerEmail: '',
    eventType: 'Wedding' as any,
    eventDate: '',
    preferredStoreId: stores[0]?.id || 'out_1',
    quantityTier: 'TIER_21_50' as BulkQuantityTier,
    estimatedBottles: 30,
    specialNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = mockBackend.submitBulkOrder({
      customerUid: user?.uid || 'guest_bulk',
      customerName: formData.customerName || 'Bulk Customer',
      customerMobile: formData.customerMobile || '+91 98100 00000',
      eventType: formData.eventType,
      eventDate: formData.eventDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      preferredStoreId: formData.preferredStoreId,
      quantityTier: formData.quantityTier,
      estimatedBottles: Number(formData.estimatedBottles),
      items: [
        { productId: 'p_gold_champagne', productName: 'Armand de Brignac Gold Champagne', quantity: 6 },
        { productId: 'p1', productName: 'Glenfiddich 12Y Single Malt', quantity: 12 },
        { productId: 'p_indri', productName: 'Indri Trini Single Malt', quantity: 12 },
      ],
    });
    setSubmittedId(result.id);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-24 pt-4 px-4 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full luxury-card border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold">
          <PackageCheck className="w-4 h-4 text-amber-500" />
          <span>Events, Weddings & Corporate Concierge</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Bulk Orders & <span className="gold-gradient-text">Event Concierge</span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Order in bulk for weddings, corporate celebrations, parties, and hotel/restaurant allocations with exclusive partner store discount tiers!
        </p>
      </div>

      {/* Quantity Tier Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { tier: '1–5 Bottles', discount: 'Standard MRP / Member Price', badge: 'Tier 1' },
          { tier: '6–20 Bottles', discount: 'Extra 5% Bulk Partner Off', badge: 'Tier 2' },
          { tier: '21–50 Bottles', discount: 'Extra 12% Bulk Partner Off', badge: 'Tier 3 (Popular)' },
          { tier: '50+ Bottles', discount: 'Extra 20% + Free Store Priority', badge: 'Tier 4 VIP' },
        ].map((t, idx) => (
          <div key={idx} className="luxury-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">{t.badge}</span>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{t.tier}</h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.discount}</p>
          </div>
        ))}
      </div>

      {/* Form or Confirmation */}
      {submitted ? (
        <div className="luxury-card rounded-3xl p-8 border border-emerald-500/40 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bulk Enquiry Submitted!</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Your bulk enquiry reference is <strong className="text-amber-500">{submittedId}</strong>. Our partner store manager at {stores.find(s => s.id === formData.preferredStoreId)?.name} will review your quantities and contact you within 2 hours.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-2xl bg-amber-500 text-black font-extrabold text-xs shadow-md"
          >
            Return to Discovery Home
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="luxury-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Request Bulk Order Pricing Quote
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fill in your event details to receive custom partner store bulk quotes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mobile Number (OTP Verified)</label>
              <input
                type="tel"
                required
                value={formData.customerMobile}
                onChange={(e) => setFormData({ ...formData, customerMobile: e.target.value })}
                placeholder="+91 98100 12345"
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Event Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-semibold bg-transparent"
              >
                <option value="Wedding">Wedding Celebration</option>
                <option value="Corporate">Corporate Gala / Party</option>
                <option value="Party">Private House Party</option>
                <option value="Hotel/Restaurant">Hotel / Restaurant Bulk</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Event Date</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Total Bottles</label>
              <input
                type="number"
                min={5}
                max={500}
                value={formData.estimatedBottles}
                onChange={(e) => setFormData({ ...formData, estimatedBottles: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Partner Outlet</label>
              <select
                value={formData.preferredStoreId}
                onChange={(e) => setFormData({ ...formData, preferredStoreId: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs font-semibold bg-transparent"
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.district})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-xl gold-glow transition-all flex items-center justify-center gap-2"
          >
            <span>Request Bulk Pricing Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

    </div>
  );
};
