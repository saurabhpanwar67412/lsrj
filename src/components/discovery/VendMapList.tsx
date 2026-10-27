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
  Sparkles,
  Flame
} from 'lucide-react';
import { VendAahata } from '../../types';
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 sm:p-7 rounded-3xl border border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-1.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Haryana Verified Discovery Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white flex flex-wrap items-center gap-3">
            <span>Verified Vends & Partner Aahatas</span>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {filteredVenues.length} in {currentDistrict}
            </span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Browse licensed L-2 foreign liquor retail vends, L-14A establishments, and authorized BYOB dining gardens with guaranteed seating and discounts.
          </p>
        </div>

        {/* View Switcher: Grid vs Interactive Map */}
        <div className="flex items-center gap-2 bg-night-900 p-1.5 rounded-2xl border border-white/15 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveView('grid')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeView === 'grid'
                ? 'bg-amber-500 text-night-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Venue Cards</span>
          </button>
          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeView === 'map'
                ? 'bg-amber-500 text-night-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Live Radar</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search by venue name, Golf Course Rd, Sector 29, Cyber Hub...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-night-900 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all shadow-inner"
            />
          </div>

          {/* Sector Selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              aria-label="Filter by Sector"
              className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-100 focus:outline-none focus:border-amber-400"
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
              className="w-full bg-night-900 border border-white/15 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-100 focus:outline-none focus:border-amber-400"
            >
              <option value="distance">Sort: Nearest Distance</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="featured">Sort: Featured & Verified</option>
            </select>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <span className="text-xs font-black text-slate-400 uppercase tracking-wider mr-1">
            Category:
          </span>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedType === 'all'
                ? 'bg-amber-500 text-night-950 font-black shadow-md'
                : 'bg-night-850 text-slate-200 border border-white/15 hover:border-amber-400/50'
            }`}
          >
            All Venues ({filteredVenues.length})
          </button>
          <button
            onClick={() => setSelectedType('aahata')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedType === 'aahata'
                ? 'bg-amber-500 text-night-950 font-black shadow-md'
                : 'bg-night-850 text-slate-200 border border-white/15 hover:border-amber-400/50'
            }`}
          >
            <GlassWater className="w-4 h-4" />
            <span>Partner Aahatas (Dine-in)</span>
          </button>
          <button
            onClick={() => setSelectedType('byob')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedType === 'byob'
                ? 'bg-amber-500 text-night-950 font-black shadow-md'
                : 'bg-night-850 text-slate-200 border border-white/15 hover:border-amber-400/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Luxury BYOB Gardens</span>
          </button>
          <button
            onClick={() => setSelectedType('l2')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedType === 'l2'
                ? 'bg-amber-500 text-night-950 font-black shadow-md'
                : 'bg-night-850 text-slate-200 border border-white/15 hover:border-amber-400/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>L-2 Retail Vends (Bottleshop)</span>
          </button>
        </div>
      </div>

      {/* Main Content: Grid vs Map */}
      {activeView === 'grid' ? (
        <div>
          {filteredVenues.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">No venues found matching your criteria</h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                Try loosening your search terms or clearing the sector filter to explore all verified venues in {currentDistrict}.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedSector('all');
                }}
                className="btn-gold px-6 py-2.5 text-sm font-black rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="glass-panel rounded-3xl p-5 sm:p-7 space-y-5 border border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>Live GPS Radar Grid — {currentDistrict} Zone</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Click any coordinate pin to view licensing credentials, live BYOB table capacity, and opening hours.
              </p>
            </div>
            <span className="text-xs font-mono font-extrabold text-amber-300 bg-amber-500/15 px-3.5 py-1.5 rounded-full border border-amber-500/30">
              GPS Pin: {userCoords.lat.toFixed(4)}° N, {userCoords.lng.toFixed(4)}° E
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Radar Canvas */}
            <div className="lg:col-span-7 bg-night-950 rounded-3xl p-6 relative min-h-[420px] border border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-80 h-80 rounded-full border border-amber-400 animate-ping" />
                <div className="w-56 h-56 rounded-full border border-amber-400/50 absolute" />
                <div className="w-28 h-28 rounded-full border border-amber-400/70 absolute" />
              </div>

              {/* User Center Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_20px_#22d3ee] animate-pulse" />
                <span className="text-[11px] font-black uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-md border border-cyan-400/40 mt-1 shadow">
                  You (GPS)
                </span>
              </div>

              {/* Venue Marker Pins */}
              <div className="relative w-full h-88 z-10">
                {filteredVenues.map((v, index) => {
                  const angle = (index / Math.max(filteredVenues.length, 1)) * 2 * Math.PI;
                  const radius = 25 + (index % 3) * 15;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  const isSelected = selectedMapPin?.id === v.id;

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedMapPin(v)}
                      style={{ top: `${Math.min(Math.max(y, 10), 85)}%`, left: `${Math.min(Math.max(x, 10), 85)}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                        isSelected ? 'scale-125 z-30' : 'z-10 hover:scale-115'
                      }`}
                      title={`${v.name} (${v.distanceKm} km)`}
                    >
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                        isSelected 
                          ? 'bg-amber-400 text-night-950 border-white shadow-[0_0_20px_#f59e0b]'
                          : 'bg-night-900/95 text-amber-300 border-amber-500/50 hover:bg-amber-500/20 shadow'
                      }`}>
                        <MapPin className="w-3.5 h-3.5 fill-current" />
                        <span className="max-w-[100px] truncate">{v.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300 z-10 bg-night-900/90 p-3 rounded-2xl border border-white/10 font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Your Device Coordinates
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Licensed Verified Premises
                </span>
              </div>
            </div>

            {/* Selected Pin Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {selectedMapPin ? (
                <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 space-y-4 shadow-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {selectedMapPin.type}
                      </span>
                      <h4 className="text-xl font-black text-white mt-2">{selectedMapPin.name}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{selectedMapPin.address}</p>
                    </div>
                    <span className="text-sm font-black text-amber-400 bg-black/60 px-3 py-1 rounded-xl">
                      {selectedMapPin.distanceKm} km
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-night-900 p-3 rounded-2xl border border-white/10">
                      <span className="text-xs text-slate-400 font-bold block">License Number</span>
                      <span className="font-mono font-extrabold text-amber-300 text-xs sm:text-sm">{selectedMapPin.licenseNumber}</span>
                    </div>
                    <div className="bg-night-900 p-3 rounded-2xl border border-white/10">
                      <span className="text-xs text-slate-400 font-bold block">VIP Dining Perks</span>
                      <span className="font-extrabold text-white text-xs sm:text-sm">{selectedMapPin.discountText}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-black text-slate-300 uppercase tracking-wider block mb-2">
                      Verified Amenities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMapPin.amenities.map((a, i) => (
                        <span key={i} className="text-xs bg-night-900 px-2.5 py-1 rounded-lg text-slate-200 border border-white/10 font-medium">
                          ✓ {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onOpenDetails(selectedMapPin)}
                      className="btn-secondary flex-1 py-3 rounded-2xl text-xs sm:text-sm font-bold text-center"
                    >
                      View Details
                    </button>
                    {(selectedMapPin.type.includes('Aahata') || selectedMapPin.type.includes('BYOB')) && (
                      <button
                        onClick={() => onOpenBooking(selectedMapPin)}
                        className="btn-gold flex-1 py-3 rounded-2xl font-black text-xs sm:text-sm text-center shadow-lg"
                      >
                        Book Table
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center h-full space-y-3">
                  <MapPin className="w-12 h-12 text-amber-400 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Select a Venue Pin on the Radar</h4>
                  <p className="text-sm text-slate-300 max-w-xs">
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
