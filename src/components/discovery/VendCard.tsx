import React from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Navigation, 
  Tv, 
  Utensils, 
  CalendarCheck,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { VendAahata } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface VendCardProps {
  item: VendAahata;
  onOpenBooking: (item: VendAahata) => void;
  onOpenDetails: (item: VendAahata) => void;
}

export const VendCard: React.FC<VendCardProps> = ({ item, onOpenBooking, onOpenDetails }) => {
  const { isMember, triggerProtectedAction } = useAuth();

  const isAahata = item.type.includes('Aahata') || item.type.includes('BYOB');

  const handleBookingClick = () => {
    triggerProtectedAction('Priority Aahata Table Booking', () => {
      onOpenBooking(item);
    });
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-4 sm:p-5 flex flex-col justify-between space-y-4 relative overflow-hidden group">
      
      {/* Top Banner Tag */}
      {item.featured && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
          Featured Venue
        </div>
      )}

      {/* Image Container */}
      <div 
        onClick={() => onOpenDetails(item)}
        className="relative h-44 sm:h-48 rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent" />

        {/* Place Type Badge */}
        <span className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md ${
          isAahata 
            ? 'bg-amber-500/90 text-night-950' 
            : 'bg-night-900/90 text-amber-400 border border-amber-500/30'
        }`}>
          {item.type}
        </span>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-night-950/80 backdrop-blur-md px-2 py-1 rounded-xl text-xs font-bold text-amber-400 border border-white/10">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{item.rating}</span>
          <span className="text-[10px] text-slate-400">({item.reviewsCount})</span>
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-xl border border-white/10">
          📍 {item.distanceKm} km away
        </div>
      </div>

      {/* Details Body */}
      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-amber-400">{item.sector}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{item.timing.open} – {item.timing.close}</span>
          </span>
        </div>

        <h3 
          onClick={() => onOpenDetails(item)}
          className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
        >
          {item.name}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
          <span>{item.address}</span>
        </p>

        {/* Member Discount Ribbon for Aahatas */}
        {isAahata && item.foodDiscountPercent > 0 && (
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VIP Pass Benefit:</span>
            </span>
            <span className="font-extrabold text-white bg-amber-500/20 px-2 py-0.5 rounded-md">
              Flat {item.foodDiscountPercent}% OFF Food & Mixers
            </span>
          </div>
        )}

        {/* Amenities Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.hasScreening && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-semibold">
              <Tv className="w-3 h-3" />
              <span>Live Screening</span>
            </span>
          )}
          {item.amenities.slice(0, 2).map((amenity, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-night-900 border border-slate-800 text-[10px] font-medium text-slate-400"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
        {isAahata ? (
          <button
            onClick={handleBookingClick}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-night-950 font-extrabold text-xs shadow-glow-amber transition-all flex items-center justify-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book Table (VIP Pass)</span>
          </button>
        ) : (
          <button
            onClick={() => onOpenDetails(item)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-night-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>L-2 Vend Credentials</span>
          </button>
        )}

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in Google Maps"
          className="p-2.5 rounded-xl bg-night-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
        >
          <Navigation className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
};
