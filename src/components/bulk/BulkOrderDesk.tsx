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
      <div className="glass-panel p-6 sm:p-9 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Official Licensed Vendor Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Bulk Order & Wedding Procurement Desk
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Direct coordination desk connecting wedding hosts, party planners, and corporate organizers with authorized Haryana L-2 retail vends for official quotations, genuine excise holograms, and L-50 one-day permit assistance.
          </p>
        </div>

        {/* Regulatory Safeguard Notice */}
        <div className="mt-5 p-4 rounded-2xl bg-night-900 border border-amber-500/30 flex items-start gap-3.5 text-xs sm:text-sm">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-slate-200 space-y-1">
            <span className="font-extrabold text-amber-300 block">Haryana Excise Regulatory Guardrail:</span>
            <p className="text-slate-300 leading-relaxed">
              {HARYANA_EXCISE_RULES.disclaimer} All bulk quantities are supplied strictly from authorized L-2 retail premises accompanied by official excise holograms and invoice.
            </p>
          </div>
        </div>
      </div>

      {inquiryId ? (
        /* Submission Success Confirmation */
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Inquiry Dispatched to L-2 Vendor Desk
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Bulk Request Transmitted!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Reference Token: <strong className="font-mono text-amber-400 font-black">{inquiryId}</strong>
            </p>
          </div>

          <div className="bg-night-900 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto text-left text-sm space-y-3">
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-slate-400 font-bold">Event Type:</span>
              <span className="font-extrabold text-white">{formData.eventType}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-slate-400 font-bold">Estimated Bottles:</span>
              <span className="font-extrabold text-amber-400">{formData.estimatedBottles} Bottles</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2.5">
              <span className="text-slate-400 font-bold">L-50 Event Permit Concierge:</span>
              <span className="font-extrabold text-emerald-400">Included</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-400 font-bold">Assigned Licensed Vend:</span>
              <span className="font-extrabold text-white">L-2 Central Hub ({currentDistrict})</span>
            </div>
          </div>

          <p className="text-sm text-slate-300">
            A certified corporate vendor representative will contact you via WhatsApp / Call within 2 business hours.
          </p>

          <button
            onClick={() => setInquiryId(null)}
            className="btn-gold px-8 py-3 rounded-2xl text-sm font-black"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-9 rounded-3xl border border-white/10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Event Type */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">Occasion / Event Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Wedding & Sangeet">Wedding & Sangeet Celebration</option>
                <option value="Corporate Annual Gala">Corporate Annual Gala / Team Offsite</option>
                <option value="Private Farmhouse Party">Private Farmhouse / Villa Gathering</option>
                <option value="Cocktail & Milestone Birthday">Cocktail Night & Milestone Birthday</option>
                <option value="Festival & Community Meet">Festival & Large Community Gathering</option>
              </select>
            </div>

            {/* Event Date */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">Tentative Event Date</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-bold text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Guest Count */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">
                Estimated Guest Count: <span className="text-amber-400">{formData.guestCount} Guests</span>
              </label>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full h-2.5 bg-night-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Estimated Bottles */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">
                Estimated Bottle Requirement: <span className="text-amber-400">{formData.estimatedBottles} Bottles</span>
              </label>
              <input
                type="range"
                min="12"
                max="500"
                step="6"
                value={formData.estimatedBottles}
                onChange={(e) => setFormData({ ...formData, estimatedBottles: Number(e.target.value) })}
                className="w-full h-2.5 bg-night-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Venue Location */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">Venue Location / Sector</label>
              <input
                type="text"
                required
                placeholder="e.g. Chattarpur Farm / Golf Course Ext Rd, Gurugram"
                value={formData.venueLocation}
                onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Contact Person Name */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">Host / Organizer Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Contact Phone */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-200 block">WhatsApp / Contact Mobile</label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* L-50 Temporary Permit Assistance Checkbox */}
            <div className="flex items-center gap-3 pt-4 sm:pt-7">
              <input
                type="checkbox"
                id="l50Checkbox"
                checked={formData.l50PermitRequired}
                onChange={(e) => setFormData({ ...formData, l50PermitRequired: e.target.checked })}
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
              <label htmlFor="l50Checkbox" className="text-sm text-slate-200 cursor-pointer">
                <strong className="text-white font-bold block">Require Haryana L-50 Temporary Event Permit Assistance</strong>
                <span className="text-xs text-slate-400">Official one-day permit desk for legal serving</span>
              </label>
            </div>

          </div>

          {/* Preferred Beverage Labels */}
          <div className="space-y-2.5 pt-2">
            <label className="text-sm font-black text-slate-200 block">
              Required Spirits & Beverage Categories
            </label>
            <div className="flex flex-wrap gap-2.5">
              {liquorCategories.map((cat) => {
                const selected = formData.preferredCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                      selected
                        ? 'bg-amber-500 text-night-950 font-black shadow-md'
                        : 'bg-night-900 text-slate-300 border border-white/15 hover:border-white/30'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '} {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-200 block">Specific Brands or Chilling Requirements</label>
            <textarea
              rows={3}
              placeholder="e.g. Need 24 bottles of Glenfiddich 12, 12 bottles of Roku Gin, plus 10 bags of clean ice..."
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2.5 shadow-xl"
          >
            {isSubmitting ? (
              <span>Transmitting Inquiry to L-2 Wholesale Desks...</span>
            ) : (
              <>
                <span>Connect with Licensed L-2 Wholesale Desks</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
};
