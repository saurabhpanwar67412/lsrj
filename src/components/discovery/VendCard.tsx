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
  Sparkles,
  ArrowRight
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

  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerProtectedAction('Priority Aahata Table Booking', () => {
      onOpenBooking(item);
    });
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-5 flex flex-col justify-between space-y-4 relative overflow-hidden group border border-white/10 hover:border-amber-400/50 transition-all duration-300">
      
      {/* Featured Tag */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-night-950 font-black text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
          ★ Featured Venue
        </div>
      )}

      {/* Image Container */}
      <div 
        onClick={() => onOpenDetails(item)}
        className="relative h-52 sm:h-56 rounded-2xl overflow-hidden cursor-pointer bg-night-900"
      >
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/95 via-night-950/30 to-transparent" />

        {/* Place Type Badge */}
        <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
          isAahata 
            ? 'bg-amber-500 text-night-950' 
            : 'bg-night-900/90 text-amber-300 border border-amber-500/40'
        }`}>
          {item.type}
        </span>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-night-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-extrabold text-amber-400 border border-white/15 shadow-md">
          <Star className="w-4 h-4 fill-amber-400" />
          <span>{item.rating}</span>
          <span className="text-xs text-slate-300">({item.reviewsCount})</span>
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 right-3 text-xs font-black text-white bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl border border-white/15">
          📍 {item.distanceKm} km away
        </div>
      </div>

      {/* Details Body */}
      <div className="space-y-3 flex-1">
        <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
          <span className="text-amber-400 font-extrabold uppercase tracking-wide">{item.sector}</span>
          <span className="flex items-center gap-1.5 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{item.timing.open} – {item.timing.close}</span>
          </span>
        </div>

        <h3 
          onClick={() => onOpenDetails(item)}
          className="text-lg sm:text-xl font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer leading-tight"
        >
          {item.name}
        </h3>

        <p className="text-sm text-slate-300 line-clamp-1 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 shrink-0 text-amber-400/80" />
          <span>{item.address}</span>
        </p>

        {/* Member Discount / Privilege Banner */}
        <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-black text-amber-300">
              {item.discountText}
            </span>
          </div>
          {isMember && (
            <span className="text-xs font-black text-night-950 bg-amber-400 px-2 py-0.5 rounded-lg shrink-0">
              VIP Unlocked
            </span>
          )}
        </div>

        {/* Amenities Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.amenities.slice(0, 3).map((amenity, idx) => (
            <span 
              key={idx}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-night-800 text-slate-200 border border-white/10"
            >
              ✓ {amenity}
            </span>
          ))}
          {item.amenities.length > 3 && (
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-night-800 text-slate-400">
              +{item.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-white/10 flex items-center gap-2.5">
        <button
          onClick={() => onOpenDetails(item)}
          className="btn-secondary flex-1 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold text-center"
        >
          Venue Info & Corkage
        </button>

        {isAahata && (
          <button
            onClick={handleBookingClick}
            className="btn-gold flex-1 py-3 px-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 text-center shadow-md"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Table</span>
          </button>
        )}
      </div>

    </div>
  );
};
