import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Users, 
  Wine, 
  Phone, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocationContext } from '../../context/LocationContext';
import { saveBulkInquiry, HARYANA_EXCISE_RULES } from '../../services/complianceService';

export const BulkOrderDesk: React.FC = () => {
  const { user, isMember, triggerProtectedAction } = useAuth();
  const { currentDistrict } = useLocationContext();

  const [formData, setFormData] = useState({
    eventType: 'Wedding & Sangeet',
    eventDate: '',
    guestCount: 150,
    estimatedBottles: 80,
    preferredCategories: ['Single Malt Whisky', 'Craft Gin', 'Beer'],
    venueLocation: `${currentDistrict} Farmhouse / Banquet`,
    contactName: '',
    contactPhone: user?.mobile || '',
    l50PermitRequired: true,
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  const liquorCategories = [
    'Single Malt Whisky',
    'Scotch / Blended Whisky',
    'Craft Gin',
    'Tequila & Mezcal',
    'Vodka',
    'Champagne & Wine',
    'Beer Kegs & Pints'
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => {
      const exists = prev.preferredCategories.includes(category);
      if (exists) {
        return { ...prev, preferredCategories: prev.preferredCategories.filter(c => c !== category) };
      } else {
        return { ...prev, preferredCategories: [...prev.preferredCategories, category] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger protected action for guest users
    if (!isMember) {
      triggerProtectedAction('Bulk Wedding & Corporate L-2 Vendor Desk Access', () => {
        executeSubmission();
      });
      return;
    }

    executeSubmission();
  };

  const executeSubmission = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `NLP-BULK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      saveBulkInquiry({
        id: generatedId,
        eventType: formData.eventType,
        eventDate: formData.eventDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        guestCount: formData.guestCount,
        estimatedBottles: formData.estimatedBottles,
        preferredCategories: formData.preferredCategories,
        venueLocation: formData.venueLocation,
        contactName: formData.contactName || 'Valued Organizer',
        contactPhone: formData.contactPhone || '9876543210',
        l50PermitRequired: formData.l50PermitRequired,
        submittedAt: new Date().toISOString(),
        status: 'PENDING_OFFICIAL_QUOTE'
      });
      setInquiryId(generatedId);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Building2 className="w-4 h-4" />
            <span>Official Licensed Vendor Concierge</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-white">
            Bulk Order & Wedding Procurement Desk
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Direct coordination desk connecting wedding planners, event organizers, and corporate hosts with authorized Haryana L-2 retail desks for official rate-cards, batch hologram verifications, and L-50 one-day permit compliance.
          </p>
        </div>

        {/* Regulatory Safeguard Notice */}
        <div className="mt-5 p-3.5 rounded-2xl bg-night-950/90 border border-amber-500/30 flex items-start gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 space-y-1">
            <span className="font-bold text-amber-300 block">Haryana Excise Regulatory Guardrail:</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              {HARYANA_EXCISE_RULES.disclaimer} All bulk quantities are supplied strictly from authorized L-2 premises accompanied by official excise holograms and invoice. Our concierge also assists with Haryana L-50 temporary event bar permits.
            </p>
          </div>
        </div>
      </div>

      {inquiryId ? (
        /* Submission Success Confirmation */
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
              Inquiry Dispatched to L-2 Vendor Desk
            </span>
            <h3 className="text-2xl font-black text-white">Bulk Procurement Request Received!</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Reference Token: <strong className="font-mono text-amber-400">{inquiryId}</strong>
            </p>
          </div>

          <div className="bg-night-950 p-5 rounded-2xl border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Event Type:</span>
              <span className="font-bold text-white">{formData.eventType}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">Estimated Bottles:</span>
              <span className="font-bold text-amber-400">{formData.estimatedBottles} Units</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-slate-400">L-50 Event Permit Desk:</span>
              <span className="font-bold text-emerald-400">Included In Concierge</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400">Assigned Vendor:</span>
              <span className="font-bold text-white">L-2 Central Hub ({currentDistrict})</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            A certified corporate vendor representative will contact you via WhatsApp / Call within 2 business hours.
          </p>

          <button
            onClick={() => setInquiryId(null)}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-night-950 text-xs font-bold hover:brightness-110 transition-all"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Event Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Occasion / Event Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full bg-night-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              >
                <option value="Wedding & Sangeet">Wedding & Sangeet Celebration</option>
                <option value="Corporate Annual Gala">Corporate Annual Gala / Team Offsite</option>
                <option value="Private Farmhouse Party">Private Farmhouse / Villa Gathering</option>
                <option value="Cocktail & Milestone Birthday">Cocktail Night & Milestone Birthday</option>
                <option value="Festival & Community Meet">Festival & Large Community Gathering</option>
              </select>
            </div>

            {/* Event Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Tentative Event Date</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full bg-night-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Guest Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Estimated Guest Count: <span className="text-amber-400">{formData.guestCount} People</span>
              </label>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Estimated Bottles */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                Estimated Bottle Requirement: <span className="text-amber-400">{formData.estimatedBottles} Bottles</span>
              </label>
              <input
                type="range"
                min="12"
                max="500"
                step="6"
                value={formData.estimatedBottles}
                onChange={(e) => setFormData({ ...formData, estimatedBottles: Number(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            {/* Venue Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Venue Location / Sector</label>
              <input
                type="text"
                required
                placeholder="e.g. Chattarpur Farm / Golf Course Ext Rd, Gurugram"
                value={formData.venueLocation}
                onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                className="w-full bg-night-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Contact Person Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Organizer / Host Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-night-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* Contact Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">Direct WhatsApp / Contact Mobile</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full bg-night-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
              />
            </div>

            {/* L-50 Temporary Permit Assistance Checkbox */}
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="l50Checkbox"
                checked={formData.l50PermitRequired}
                onChange={(e) => setFormData({ ...formData, l50PermitRequired: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded"
              />
              <label htmlFor="l50Checkbox" className="text-xs text-slate-300 cursor-pointer">
                <strong>Require Haryana L-50 Temporary Event Permit Assistance</strong>
                <span className="block text-[11px] text-slate-400">Official one-day permit desk for legal serving</span>
              </label>
            </div>

          </div>

          {/* Preferred Beverage Labels */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-300 block">
              Required Spirits & Beverage Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {liquorCategories.map((cat) => {
                const selected = formData.preferredCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selected
                        ? 'bg-amber-400 text-night-950 font-bold shadow'
                        : 'bg-night-900 text-slate-400 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '} {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Specific Brands or Chilling Requirements</label>
            <textarea
              rows={3}
              placeholder="e.g. Need 24 bottles of Glenfiddich 12, 12 bottles of Roku Gin, plus 10 bags of clean ice & Schweppes tonic water..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full bg-night-900 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-night-950 font-black text-sm tracking-wide hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Transmitting Inquiry to L-2 Desks...</span>
            ) : (
              <>
                <span>Connect with Licensed L-2 Wholesale Desks</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
};
