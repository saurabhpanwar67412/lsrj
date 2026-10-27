import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Utensils
} from 'lucide-react';
import { VendAahata } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { saveTableBooking } from '../../services/complianceService';

interface TableBookingModalProps {
  venue: VendAahata;
  onClose: () => void;
  onSuccess: () => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({ venue, onClose, onSuccess }) => {
  const { user, isMember } = useAuth();
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('20:00');
  const [guestCount, setGuestCount] = useState(4);
  const [seatingType, setSeatingType] = useState<'outdoor' | 'ac_indoor' | 'cabana'>('outdoor');
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  const timeSlots = ['18:30', '19:30', '20:30', '21:30', '22:30', '23:30'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const code = `NLP-TBL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      saveTableBooking({
        id: code,
        venueId: venue.id,
        venueName: venue.name,
        date: bookingDate,
        timeSlot: timeSlot,
        guestsCount: guestCount,
        userMobile: user?.mobile || '9876543210',
        userName: 'Valued VIP Member',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      });
      setConfirmationCode(code);
      setIsSubmitting(false);
    }, 1200);
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

        {confirmationCode ? (
          /* Confirmation Success View */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                Priority Table Reserved
              </span>
              <h3 className="text-xl font-black text-white mt-1">Reservation Confirmed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your reservation at <strong className="text-white">{venue.name}</strong> is locked.
              </p>
            </div>

            <div className="bg-night-950 p-5 rounded-2xl border border-white/10 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Confirmation Code:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{confirmationCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-bold text-white">{bookingDate} at {timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Party Size:</span>
                <span className="font-bold text-white">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">VIP Dining Benefit:</span>
                <span className="font-bold text-emerald-400">{venue.discountText}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">BYOB Corkage:</span>
                <span className="font-bold text-amber-300">{venue.corkagePolicy}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Please present your confirmation code at host desk on arrival. Tables held for 15 minutes past slot.
            </p>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-amber-500 text-night-950 font-bold text-xs hover:brightness-110 transition-all"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                VIP Priority Table
              </span>
              <h3 className="text-xl font-black text-white mt-1.5">{venue.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{venue.address}</span>
              </p>
            </div>

            {/* Member VIP Perks callout */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
              <span className="text-amber-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>VIP Perk Applied:</span>
              </span>
              <span className="font-extrabold text-white bg-black/40 px-2 py-0.5 rounded-lg border border-amber-500/20">
                {venue.discountText}
              </span>
            </div>

            {/* Date and Guests */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-night-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300">Guests</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-night-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {[2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map(n => (
                    <option key={n} value={n}>{n} Guests</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      timeSlot === slot
                        ? 'bg-amber-400 text-night-950 shadow-sm'
                        : 'bg-night-950/80 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300">Atmosphere & Seating</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSeatingType('outdoor')}
                  className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                    seatingType === 'outdoor'
                      ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                      : 'bg-night-950/60 border-white/10 text-slate-400'
                  }`}
                >
                  Lush Garden
                </button>
                <button
                  type="button"
                  onClick={() => setSeatingType('ac_indoor')}
                  className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                    seatingType === 'ac_indoor'
                      ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                      : 'bg-night-950/60 border-white/10 text-slate-400'
                  }`}
                >
                  Indoor AC
                </button>
                <button
                  type="button"
                  onClick={() => setSeatingType('cabana')}
                  className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all ${
                    seatingType === 'cabana'
                      ? 'bg-amber-500/10 border-amber-400 text-amber-300'
                      : 'bg-night-950/60 border-white/10 text-slate-400'
                  }`}
                >
                  VIP Cabana
                </button>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">Special Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, near match screen..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full bg-night-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Policy & Compliance Note */}
            <div className="text-[10px] text-slate-400 bg-night-950/60 p-2.5 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-slate-300 block">BYOB Guidelines:</span>
              <p>
                {venue.corkagePolicy}. Sealed bottles must carry genuine Haryana Excise stamps. Online alcohol sales are prohibited.
              </p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-night-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Locking Reservation...</span>
              ) : (
                <>
                  <span>Confirm Priority Table Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
