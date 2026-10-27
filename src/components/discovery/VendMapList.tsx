import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Layers, 
  Navigation, 
  Compass, 
  ExternalLink, 
  Building2, 
  GlassWater,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { VendAahata, PlaceType } from '../../types';
import { VendCard } from './VendCard';
import { useLocationContext } from '../../context/LocationContext';

interface VendMapListProps {
  venues: VendAahata[];
  onOpenBooking: (item: VendAahata) => void;
  onOpenDetails: (item: VendAahata) => void;
}

export const VendMapList: React.FC<VendMapListProps> = ({ venues, onOpenBooking, onOpenDetails }) => {
  const { currentDistrict, userCoords } = useLocationContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'featured'>('distance');
  const [activeView, setActiveView] = useState<'grid' | 'map'>('grid');
  const [selectedMapPin, setSelectedMapPin] = useState<VendAahata | null>(null);

  // Available sectors in the current district
  const availableSectors = useMemo(() => {
    const sectors = new Set<string>();
    venues.forEach(v => {
      if (v.district === currentDistrict) {
        sectors.add(v.sector);
      }
    });
    return Array.from(sectors);
  }, [venues, currentDistrict]);

  // Filtered & sorted venues
  const filteredVenues = useMemo(() => {
    return venues
      .filter((venue) => {
        // District filter
        if (venue.district !== currentDistrict) return false;

        // Search filter
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = venue.name.toLowerCase().includes(query);
          const matchSector = venue.sector.toLowerCase().includes(query);
          const matchType = venue.type.toLowerCase().includes(query);
          if (!matchName && !matchSector && !matchType) return false;
        }

        // Sector filter
        if (selectedSector !== 'all' && venue.sector !== selectedSector) {
          return false;
        }

        // Type filter
        if (selectedType !== 'all') {
          if (selectedType === 'aahata' && !venue.type.includes('Aahata') && !venue.type.includes('BYOB')) {
            return false;
          }
          if (selectedType === 'l2' && !venue.type.includes('L-2')) {
            return false;
          }
          if (selectedType === 'byob' && !venue.type.includes('BYOB')) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') {
          return (a.distanceKm || 0) - (b.distanceKm || 0);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        return 0;
      });
  }, [venues, currentDistrict, searchTerm, selectedSector, selectedType, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header controls bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 sm:p-5 rounded-3xl border border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Haryana Verified Discovery Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Verified Vends & Partner Aahatas in {currentDistrict}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {filteredVenues.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Displaying licensed L-2 foreign liquor vends, L-14A establishments, and approved BYOB dining gardens.
          </p>
        </div>

        {/* View Switcher: Grid vs Interactive Map */}
        <div className="flex items-center gap-2 bg-night-950/80 p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveView('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeView === 'grid'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Venue Grid</span>
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeView === 'map'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Interactive Radar</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search by venue name, Golf Course Rd, Sector 29...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-night-900/90 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-all"
            />
          </div>

          {/* Sector Selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              aria-label="Filter by Sector"
              className="w-full bg-night-900/90 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/50"
            >
              <option value="all">All Sectors ({currentDistrict})</option>
              {availableSectors.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort venues by"
              className="w-full bg-night-900/90 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/50"
            >
              <option value="distance">Sort: Nearest Distance</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="featured">Sort: Featured & Verified</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Filter:
          </span>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedType === 'all'
                ? 'bg-amber-400 text-night-950 font-bold'
                : 'bg-night-900/80 text-slate-300 border border-white/10 hover:border-amber-400/40'
            }`}
          >
            All Venues
          </button>
          <button
            onClick={() => setSelectedType('aahata')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedType === 'aahata'
                ? 'bg-amber-400 text-night-950 font-bold'
                : 'bg-night-900/80 text-slate-300 border border-white/10 hover:border-amber-400/40'
            }`}
          >
            <GlassWater className="w-3 h-3" />
            <span>Partner Aahatas (Dine-in)</span>
          </button>
          <button
            onClick={() => setSelectedType('byob')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedType === 'byob'
                ? 'bg-amber-400 text-night-950 font-bold'
                : 'bg-night-900/80 text-slate-300 border border-white/10 hover:border-amber-400/40'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Luxury BYOB Gardens</span>
          </button>
          <button
            onClick={() => setSelectedType('l2')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedType === 'l2'
                ? 'bg-amber-400 text-night-950 font-bold'
                : 'bg-night-900/80 text-slate-300 border border-white/10 hover:border-amber-400/40'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>L-2 Retail Vends (Bottleshop)</span>
          </button>
        </div>
      </div>

      {/* Main Content: Grid vs Map */}
      {activeView === 'grid' ? (
        <div>
          {filteredVenues.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
              <Building2 className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No venues found matching your criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try loosening your search terms or clearing the sector filter to see all licensed premises in {currentDistrict}.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedSector('all');
                }}
                className="mt-2 px-4 py-2 bg-amber-500 text-night-950 text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVenues.map((venue) => (
                <VendCard
                  key={venue.id}
                  item={venue}
                  onOpenBooking={onOpenBooking}
                  onOpenDetails={onOpenDetails}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Interactive Map Radar View */
        <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-4 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Live GPS Radar Grid — {currentDistrict} Zone</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Click any coordinate pin to view licensing credentials, live BYOB table capacity, and opening hours.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              User Pin: {userCoords.lat.toFixed(4)}° N, {userCoords.lng.toFixed(4)}° E
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Simulated Interactive Radar Map canvas */}
            <div className="lg:col-span-7 bg-night-950/90 rounded-2xl p-6 relative min-h-[380px] border border-white/10 flex flex-col justify-between overflow-hidden shadow-inner">
              {/* Radar Grid Graphic Background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-72 h-72 rounded-full border border-amber-400 animate-ping" />
                <div className="w-48 h-48 rounded-full border border-amber-400/40 absolute" />
                <div className="w-24 h-24 rounded-full border border-amber-400/60 absolute" />
              </div>

              {/* User Center Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_15px_#22d3ee] animate-pulse" />
                <span className="text-[9px] font-extrabold uppercase bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-400/30 mt-1">
                  You (GPS)
                </span>
              </div>

              {/* Venue Marker Pins */}
              <div className="relative w-full h-80 z-10">
                {filteredVenues.map((v, index) => {
                  // Distribute pins visually around center
                  const angle = (index / Math.max(filteredVenues.length, 1)) * 2 * Math.PI;
                  const radius = 25 + (index % 3) * 15; // percentage
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  const isSelected = selectedMapPin?.id === v.id;

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedMapPin(v)}
                      style={{ top: `${Math.min(Math.max(y, 10), 85)}%`, left: `${Math.min(Math.max(x, 10), 85)}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                        isSelected ? 'scale-125 z-30' : 'z-10 hover:scale-110'
                      }`}
                      title={`${v.name} (${v.distanceKm} km)`}
                    >
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-xl text-[10px] font-black border transition-all ${
                        isSelected 
                          ? 'bg-amber-400 text-night-950 border-white shadow-[0_0_15px_#f59e0b]'
                          : 'bg-night-900/90 text-amber-300 border-amber-500/40 hover:bg-amber-500/20'
                      }`}>
                        <MapPin className="w-3 h-3 fill-current" />
                        <span className="max-w-[80px] truncate">{v.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 z-10 bg-night-950/70 p-2 rounded-xl border border-white/5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Your Verified Device Location
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Verified Licensee Premises
                </span>
              </div>
            </div>

            {/* Selected Pin Detail Card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {selectedMapPin ? (
                <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {selectedMapPin.type}
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-1.5">{selectedMapPin.name}</h4>
                      <p className="text-xs text-slate-400">{selectedMapPin.address}</p>
                    </div>
                    <span className="text-xs font-black text-amber-400 bg-black/40 px-2 py-1 rounded-lg">
                      {selectedMapPin.distanceKm} km
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-night-950/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-400 block">License No</span>
                      <span className="font-mono font-bold text-amber-300 text-[11px]">{selectedMapPin.licenseNumber}</span>
                    </div>
                    <div className="bg-night-950/60 p-2.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-slate-400 block">VIP Perks</span>
                      <span className="font-bold text-white text-[11px]">{selectedMapPin.discountText}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Verified Amenities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMapPin.amenities.map((a, i) => (
                        <span key={i} className="text-[10px] bg-night-950 px-2 py-0.5 rounded-md text-slate-300 border border-white/5">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetails(selectedMapPin)}
                      className="flex-1 py-2 rounded-xl bg-night-900 border border-white/10 hover:border-amber-400/40 text-xs font-bold text-white transition-all text-center"
                    >
                      View Venue Details
                    </button>
                    {(selectedMapPin.type.includes('Aahata') || selectedMapPin.type.includes('BYOB')) && (
                      <button
                        onClick={() => onOpenBooking(selectedMapPin)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 font-bold text-xs hover:brightness-110 shadow-md shadow-amber-500/20 transition-all text-center"
                      >
                        Book VIP Table
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center h-full space-y-3">
                  <MapPin className="w-10 h-10 text-amber-400/50 animate-bounce" />
                  <h4 className="text-sm font-bold text-white">Select a Venue Pin on the Radar</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Tap any licensed vend or Aahata on the left radar map to inspect live corkage guidelines, seating, and instant directions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
