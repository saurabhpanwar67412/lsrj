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
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> In Stock
          </span>
        );
      case 'Low Stock':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" /> Low Stock
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
            <XCircle className="w-3 h-3" /> Out of Stock
          </span>
        );
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-3xl p-5 flex flex-col justify-between space-y-4 border border-white/5 relative group">
      
      {/* Top Bar: Category & Origin */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
          {bottle.category}
        </span>
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
          <span>{bottle.origin}</span>
          <span className="text-slate-600">•</span>
          <span>{bottle.abv}% ABV</span>
        </span>
      </div>

      {/* Product Image & Main Details */}
      <div className="flex gap-4 items-center">
        <div className="w-24 h-32 rounded-2xl bg-night-950/80 p-2 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden relative group-hover:border-amber-400/30 transition-all">
          <img
            src={bottle.image}
            alt={bottle.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors truncate">
            {bottle.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2">
            {bottle.description}
          </p>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-black text-amber-400">
              ₹{bottle.indicativePrice.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              / {bottle.volume} (Haryana MRP Guide)
            </span>
          </div>

          <div className="pt-1">
            {getStockBadge(bottle.overallStatus)}
          </div>
        </div>
      </div>

      {/* Tasting Notes */}
      <div className="bg-night-950/60 p-2.5 rounded-2xl border border-white/5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Tasting Profile
        </span>
        <div className="flex flex-wrap gap-1">
          {bottle.tastingNotes.map((note, index) => (
            <span key={index} className="text-[10px] bg-night-900 text-slate-300 px-2 py-0.5 rounded-md border border-white/5">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Nearby Stores Accordion Toggle */}
      <div className="border-t border-white/10 pt-3 space-y-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-amber-400 transition-colors py-1"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Check Stores in {currentDistrict} ({bottle.availableVends.length})</span>
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isExpanded && (
          <div className="space-y-2 pt-1 animate-fadeIn">
            {bottle.availableVends.map((vend) => (
              <div 
                key={vend.vendId}
                className="flex items-center justify-between bg-night-950/80 p-2.5 rounded-xl border border-white/5 text-xs"
              >
                <div>
                  <h4 className="font-bold text-white text-[11px]">{vend.vendName}</h4>
                  <span className="text-[10px] text-slate-400">📍 {vend.distanceKm} km away</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    vend.status === 'In Stock'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : vend.status === 'Low Stock'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {vend.status}
                  </span>
                  {onSelectVend && (
                    <button
                      onClick={() => onSelectVend(vend.vendId)}
                      className="text-[10px] text-amber-400 hover:underline font-bold"
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
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={handleSetAlert}
            className="w-full py-2.5 px-3 rounded-xl bg-night-900 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            {alertSet ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">VIP Stock Alert Activated!</span>
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
        <p className="text-[9px] text-slate-500 text-center pt-1 italic">
          Statutory Notice: Alcohol cannot be purchased online. In-person verification & purchase at licensed retail vends required.
        </p>
      </div>

    </div>
  );
};
