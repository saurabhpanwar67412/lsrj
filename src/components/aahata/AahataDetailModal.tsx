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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gallery Section */}
        <div className="space-y-3">
          <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={venue.images[selectedImg] || venue.images[0]}
              alt={venue.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-500 text-night-950 shadow">
                  {venue.type}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 drop-shadow-md">
                  {venue.name}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-amber-400 border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{venue.rating}</span>
                <span className="text-[10px] text-slate-400">({venue.reviewsCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          {venue.images.length > 1 && (
            <div className="flex gap-2">
              {venue.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-16 h-12 rounded-xl overflow-hidden border transition-all ${
                    selectedImg === i ? 'border-amber-400 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Badges / Credentials Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="bg-night-950 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">Excise License</span>
            <span className="font-mono font-bold text-amber-400 text-[11px] truncate block">
              {venue.licenseNumber}
            </span>
          </div>

          <div className="bg-night-950 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">Timings</span>
            <span className="font-bold text-white text-[11px] block">
              {venue.timing.open} – {venue.timing.close}
            </span>
          </div>

          <div className="bg-night-950 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">Distance</span>
            <span className="font-bold text-amber-400 text-[11px] block">
              📍 {venue.distanceKm} km from you
            </span>
          </div>

          <div className="bg-night-950 p-2.5 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 block">BYOB Status</span>
            <span className="font-bold text-emerald-400 text-[11px] block">
              {venue.corkagePolicy}
            </span>
          </div>
        </div>

        {/* Description & Address */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">About Venue</h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {venue.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{venue.address}</span>
          </div>
        </div>

        {/* VIP Member Perks */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Exclusive NightLife Pass Privileges
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            {venue.discountText}. Plus priority seating during peak hours and complimentary ice bucket setups.
          </p>
        </div>

        {/* Verified Amenities */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Amenities</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {venue.amenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300 bg-night-950 p-2 rounded-xl border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDirections}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-night-900 border border-white/10 hover:border-amber-400/40 text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
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
              className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book VIP Priority Table</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
