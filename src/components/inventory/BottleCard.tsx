import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Wine,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LiquorBrand } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useLocationContext } from '../../context/LocationContext';

interface BottleCardProps {
  bottle: LiquorBrand;
  onSelectVend?: (vendId: string) => void;
}

export const BottleCard: React.FC<BottleCardProps> = ({ bottle, onSelectVend }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [alertSet, setAlertSet] = useState(false);
  const { isMember, triggerProtectedAction } = useAuth();
  const { currentDistrict } = useLocationContext();

  const handleSetAlert = () => {
    triggerProtectedAction('Real-Time Foreign Liquor Stock Alerts', () => {
      setAlertSet(true);
      setTimeout(() => setAlertSet(false), 4000);
    });
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
      case 'IN_STOCK':
        return (
          <span className="flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> In Stock Nearby
          </span>
        );
      case 'Low Stock':
      case 'LOW_STOCK':
        return (
          <span className="flex items-center gap-1.5 text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Limited Stock
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs font-black text-rose-300 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5 text-rose-400" /> Out of Stock
          </span>
        );
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 border border-white/10 relative group hover:border-amber-400/50 transition-all duration-300">
      
      {/* Top Bar: Category & Origin */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
          {bottle.category}
        </span>
        <span className="text-xs text-slate-300 font-bold flex items-center gap-2">
          <span>{bottle.origin}</span>
          <span className="text-slate-500">•</span>
          <span>{bottle.abv}% ABV</span>
        </span>
      </div>

      {/* Product Image & Main Details */}
      <div className="flex gap-4 items-center">
        <div className="w-28 h-36 rounded-2xl bg-night-950 p-2.5 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden relative group-hover:border-amber-400/40 transition-all">
          <img
            src={bottle.image}
            alt={bottle.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-400 transition-colors truncate">
            {bottle.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {bottle.description}
          </p>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xl sm:text-2xl font-black text-amber-400">
              ₹{bottle.indicativePrice.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-bold">
              / {bottle.volume} (Official MRP)
            </span>
          </div>

          <div className="pt-1.5">
            {getStockBadge(bottle.overallStatus)}
          </div>
        </div>
      </div>

      {/* Tasting Profile */}
      <div className="bg-night-900 p-3 rounded-2xl border border-white/10">
        <span className="text-xs font-black text-slate-300 uppercase tracking-wider block mb-1.5">
          Tasting Profile
        </span>
        <div className="flex flex-wrap gap-1.5">
          {bottle.tastingNotes.map((note, index) => (
            <span key={index} className="text-xs bg-night-800 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 font-semibold">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Nearby Stores Accordion Toggle */}
      <div className="border-t border-white/10 pt-3 space-y-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs sm:text-sm font-black text-slate-200 hover:text-amber-400 transition-colors py-1.5"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Check Licensed Stores in {currentDistrict} ({bottle.availableVends.length})</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
        </button>

        {isExpanded && (
          <div className="space-y-2 pt-1 animate-fadeIn">
            {bottle.availableVends.map((vend) => (
              <div 
                key={vend.vendId}
                className="flex items-center justify-between bg-night-900 p-3 rounded-2xl border border-white/10 text-xs sm:text-sm"
              >
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{vend.vendName}</h4>
                  <span className="text-xs text-slate-400 font-semibold">📍 {vend.distanceKm} km away</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    vend.status === 'In Stock'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : vend.status === 'Low Stock'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}>
                    {vend.status}
                  </span>
                  {onSelectVend && (
                    <button
                      onClick={() => onSelectVend(vend.vendId)}
                      className="text-xs text-amber-400 hover:underline font-extrabold"
                    >
                      Locate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Button: VIP Stock Alert */}
        <div className="pt-2">
          <button
            onClick={handleSetAlert}
            className="w-full py-3 px-4 rounded-2xl btn-secondary text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm"
          >
            {alertSet ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">VIP Stock Alert Activated!</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Notify When Stock Restocked Nearby</span>
              </>
            )}
          </button>
        </div>

        {/* Statutory compliance note */}
        <p className="text-xs text-slate-400 text-center pt-1 font-medium">
          In-person verification & purchase at licensed retail vends required. Online alcohol delivery is strictly prohibited.
        </p>
      </div>

    </div>
  );
};
