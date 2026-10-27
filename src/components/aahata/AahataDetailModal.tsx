import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  ShieldCheck, 
  Navigation, 
  CalendarCheck, 
  Sparkles, 
  Utensils, 
  Tv, 
  Music, 
  Car, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { VendAahata } from '../../types';

interface AahataDetailModalProps {
  venue: VendAahata;
  onClose: () => void;
  onOpenBooking: (venue: VendAahata) => void;
}

export const AahataDetailModal: React.FC<AahataDetailModalProps> = ({ venue, onClose, onOpenBooking }) => {
  const [selectedImg, setSelectedImg] = useState(0);

  const isAahata = venue.type.includes('Aahata') || venue.type.includes('BYOB');

  const handleDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${venue.coordinates.lat},${venue.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-9 border border-white/20 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Section */}
        <div className="space-y-3">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-night-900">
            <img
              src={venue.images[selectedImg] || venue.images[0]}
              alt={venue.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500 text-night-950 shadow-md">
                  {venue.type}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 drop-shadow-lg leading-tight">
                  {venue.name}
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-sm font-black text-amber-400 border border-white/15">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{venue.rating}</span>
                <span className="text-xs text-slate-300">({venue.reviewsCount})</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {venue.images.length > 1 && (
            <div className="flex gap-2.5">
              {venue.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === i ? 'border-amber-400 scale-105 shadow-md' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Credentials Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="bg-night-900 p-3.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-bold block">Excise License</span>
            <span className="font-mono font-black text-amber-400 text-xs sm:text-sm truncate block mt-0.5">
              {venue.licenseNumber}
            </span>
          </div>

          <div className="bg-night-900 p-3.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-bold block">Operating Hours</span>
            <span className="font-extrabold text-white text-xs sm:text-sm block mt-0.5">
              {venue.timing.open} – {venue.timing.close}
            </span>
          </div>

          <div className="bg-night-900 p-3.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-bold block">Distance</span>
            <span className="font-black text-amber-400 text-xs sm:text-sm block mt-0.5">
              📍 {venue.distanceKm} km from you
            </span>
          </div>

          <div className="bg-night-900 p-3.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-bold block">Corkage Status</span>
            <span className="font-extrabold text-emerald-400 text-xs sm:text-sm block mt-0.5">
              {venue.corkagePolicy}
            </span>
          </div>
        </div>

        {/* Description & Address */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">About Venue</h4>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {venue.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-300 pt-1">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{venue.address}</span>
          </div>
        </div>

        {/* VIP Member Perks */}
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Exclusive NightLife Pass Privileges
            </h4>
          </div>
          <p className="text-sm text-slate-200 font-semibold">
            {venue.discountText}. Includes priority seating during peak hours and complimentary ice bucket setups.
          </p>
        </div>

        {/* Verified Amenities */}
        <div className="space-y-2">
          <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">Verified Amenities</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {venue.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-night-900 p-2.5 rounded-xl border border-white/10 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDirections}
            className="btn-secondary w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
          >
            <Navigation className="w-4 h-4 text-amber-400" />
            <span>Open in Google Maps</span>
          </button>

          {isAahata && (
            <button
              onClick={() => {
                onClose();
                onOpenBooking(venue);
              }}
              className="btn-gold w-full sm:flex-1 py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-xl"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book VIP Priority Table</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
