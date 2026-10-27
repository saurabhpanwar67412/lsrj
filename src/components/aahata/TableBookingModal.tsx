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
  const { user } = useAuth();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-9 border border-amber-500/40 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmationCode ? (
          /* Confirmation Success View */
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                Priority Table Reserved
              </span>
              <h3 className="text-2xl font-black text-white mt-1">Reservation Confirmed!</h3>
              <p className="text-sm text-slate-300 mt-1">
                Your reservation at <strong className="text-white font-bold">{venue.name}</strong> is locked.
              </p>
            </div>

            <div className="bg-night-900 p-6 rounded-2xl border border-white/10 text-left text-sm space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-bold">Confirmation Code:</span>
                <span className="font-mono font-black text-amber-400 text-base">{confirmationCode}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-bold">Date & Time:</span>
                <span className="font-extrabold text-white">{bookingDate} at {timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-bold">Party Size:</span>
                <span className="font-extrabold text-white">{guestCount} Guests</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-slate-400 font-bold">VIP Dining Benefit:</span>
                <span className="font-extrabold text-emerald-400">{venue.discountText}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400 font-bold">BYOB Corkage:</span>
                <span className="font-extrabold text-amber-300">{venue.corkagePolicy}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic font-medium">
              Please present your confirmation code at host desk on arrival. Tables held for 15 minutes past slot.
            </p>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="btn-gold w-full py-3.5 rounded-2xl text-sm font-black"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                VIP Priority Table
              </span>
              <h3 className="text-2xl font-black text-white mt-2 leading-tight">{venue.name}</h3>
              <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{venue.address}</span>
              </p>
            </div>

            {/* Member VIP Perks callout */}
            <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between text-sm">
              <span className="text-amber-300 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>VIP Perk Applied:</span>
              </span>
              <span className="font-black text-white bg-black/60 px-3 py-1 rounded-xl border border-amber-500/30">
                {venue.discountText}
              </span>
            </div>

            {/* Date and Guests */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-200">Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-night-900 border border-white/15 rounded-2xl px-3.5 py-3 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-200">Guests</label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  aria-label="Number of guests"
                  className="w-full bg-night-900 border border-white/15 rounded-2xl px-3.5 py-3 text-sm font-semibold text-white focus:outline-none focus:border-amber-400"
                >
                  {[2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map(n => (
                    <option key={n} value={n}>{n} Guests</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-200">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2.5">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2.5 rounded-xl text-sm font-black transition-all ${
                      timeSlot === slot
                        ? 'bg-amber-500 text-night-950 shadow-md'
                        : 'bg-night-900 text-slate-300 border border-white/10 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Preference */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-200">Atmosphere & Seating</label>
              <div className="grid grid-cols-3 gap-2.5 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => setSeatingType('outdoor')}
                  className={`py-2.5 rounded-xl border font-bold text-center transition-all ${
                    seatingType === 'outdoor'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-black'
                      : 'bg-night-900 border-white/10 text-slate-300'
                  }`}
                >
                  Lush Garden
                </button>
                <button
                  type="button"
                  onClick={() => setSeatingType('ac_indoor')}
                  className={`py-2.5 rounded-xl border font-bold text-center transition-all ${
                    seatingType === 'ac_indoor'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-black'
                      : 'bg-night-900 border-white/10 text-slate-300'
                  }`}
                >
                  Indoor AC
                </button>
                <button
                  type="button"
                  onClick={() => setSeatingType('cabana')}
                  className={`py-2.5 rounded-xl border font-bold text-center transition-all ${
                    seatingType === 'cabana'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-black'
                      : 'bg-night-900 border-white/10 text-slate-300'
                  }`}
                >
                  VIP Cabana
                </button>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-200">Special Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Birthday celebration, near match screen..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Policy */}
            <div className="text-xs text-slate-300 bg-night-900 p-3 rounded-2xl border border-white/10 space-y-1 font-medium">
              <span className="font-black text-amber-300 block">BYOB Guidelines:</span>
              <p>
                {venue.corkagePolicy}. Sealed bottles must carry genuine Haryana Excise stamps. Online alcohol sales are prohibited.
              </p>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-4 rounded-2xl text-base font-black flex items-center justify-center gap-2 shadow-xl"
            >
              {isSubmitting ? (
                <span>Locking Reservation...</span>
              ) : (
                <>
                  <span>Confirm Priority Table Reservation</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
