import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, ShieldCheck, CheckCircle2, Clock, ListFilter } from 'lucide-react';
import { useLocation } from '../../context/LocationContext';
import { mockBackend } from '../../services/mockBackend';
import { calculateDistanceKm, formatDistance, isOutletOpen } from '../../utils/formatters';
import { Outlet } from '../../types';

interface MapViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ onNavigate }) => {
  const { district, userCoords } = useLocation();
  const outlets = mockBackend.getOutlets(district);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(outlets[0] || null);

  return (
    <div className="space-y-4 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            Licensed Outlets Interactive Map
          </h1>
          <p className="text-xs text-slate-400">Verified L-2 & L-14A locations in {district}</p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-amber-400 font-semibold glass-card px-3 py-1.5 rounded-xl hover:bg-slate-800"
        >
          List View
        </button>
      </div>

      {/* Simulated Interactive Canvas Map View */}
      <div className="relative rounded-3xl h-[420px] glass-panel border border-amber-500/30 overflow-hidden bg-[#0F1420]">
        
        {/* Map Grid Background pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* User Location Pulse pin */}
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <span className="w-4 h-4 bg-sky-500 rounded-full animate-ping absolute" />
          <span className="w-4 h-4 bg-sky-400 border-2 border-white rounded-full relative z-10 shadow-lg" />
          <span className="text-[9px] bg-slate-900/90 text-sky-300 font-bold px-1.5 py-0.5 rounded mt-1 shadow">
            YOUR LOCATION
          </span>
        </div>

        {/* Outlet Pins */}
        {outlets.map((outlet, index) => {
          // Calculate relative offsets for display on map
          const offsetX = 30 + (index * 25) % 50;
          const offsetY = 25 + (index * 30) % 55;
          const isSelected = selectedOutlet?.id === outlet.id;

          return (
            <button
              key={outlet.id}
              onClick={() => setSelectedOutlet(outlet)}
              style={{ top: `${offsetY}%`, left: `${offsetX}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none transition-transform ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              <div className={`p-2 rounded-2xl flex items-center gap-1.5 shadow-xl border ${
                isSelected
                  ? 'bg-amber-500 text-black border-white font-extrabold'
                  : 'bg-slate-900/90 text-amber-400 border-amber-500/50'
              }`}>
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold whitespace-nowrap max-w-[120px] truncate">
                  {outlet.name.split('—')[0]}
                </span>
              </div>
            </button>
          );
        })}

        {/* Selected Outlet Quick Card Overlay */}
        {selectedOutlet && (
          <div className="absolute bottom-4 left-4 right-4 z-40 glass-panel rounded-2xl p-4 border border-amber-500/40 shadow-2xl bg-[#0B0F17]/95 animate-in slide-in-from-bottom-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Haryana Excise Licensed & Verified
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">{selectedOutlet.name}</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">{selectedOutlet.address}</p>
              </div>

              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/30 whitespace-nowrap">
                📍 {formatDistance(calculateDistanceKm(userCoords, selectedOutlet.geoPoint))}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Hours: {selectedOutlet.hours.open} - {selectedOutlet.hours.close}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('outlet-detail', selectedOutlet.id)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                >
                  View Inventory & Prices
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedOutlet.geoPoint.lat},${selectedOutlet.geoPoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl glass-card text-slate-200 hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
