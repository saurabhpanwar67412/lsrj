import React, { useState } from 'react';
import { Store, MapPin, CheckCircle2, Clock, Navigation, ExternalLink, Filter, Search, Star, Phone, ShieldCheck } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useLocation } from '../../context/LocationContext';
import { calculateDistanceKm, formatDistance, isOutletOpen } from '../../utils/formatters';
import { PartnerStore } from '../../types';

interface PartnerStoresViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const PartnerStoresView: React.FC<PartnerStoresViewProps> = ({ onNavigate }) => {
  const { district, userCoords } = useLocation();
  const stores = mockBackend.getPartnerStores(district);
  const [filter, setFilter] = useState<'ALL' | 'NEAREST' | 'HIGHEST_DISCOUNT' | 'OPEN_NOW'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());

    const isOpen = isOutletOpen(s.hours.open, s.hours.close);

    if (filter === 'OPEN_NOW' && !isOpen) return false;
    return matchesQuery;
  }).sort((a, b) => {
    if (filter === 'NEAREST') {
      const distA = calculateDistanceKm(userCoords, a.geoPoint);
      const distB = calculateDistanceKm(userCoords, b.geoPoint);
      return distA - distB;
    }
    if (filter === 'HIGHEST_DISCOUNT') {
      return b.maxMemberDiscountPercent - a.maxMemberDiscountPercent;
    }
    return 0;
  });

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Haryana Excise Verified Partners</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Partner Liquor Store Marketplace ({district})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Discover nearby partnered liquor shops, distance, member discounts & store pickup options.
          </p>
        </div>

        <button
          onClick={() => onNavigate('map')}
          className="px-4 py-2.5 rounded-2xl bg-amber-500 text-black font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          <span>Interactive Map View</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search store name or address..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          {[
            { id: 'ALL', label: 'All Partners' },
            { id: 'NEAREST', label: 'Nearest First' },
            { id: 'HIGHEST_DISCOUNT', label: 'Highest Member Discount' },
            { id: 'OPEN_NOW', label: 'Open Now' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === item.id
                  ? 'bg-amber-500 text-black shadow-sm font-extrabold'
                  : 'luxury-card text-slate-700 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Store Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => {
          const distance = calculateDistanceKm(userCoords, store.geoPoint);
          const isOpen = isOutletOpen(store.hours.open, store.hours.close);
          const productCount = Object.keys(store.inventory).length;

          return (
            <div
              key={store.id}
              className="luxury-card rounded-3xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="relative h-40 rounded-2xl overflow-hidden">
                  <img
                    src={store.images[0]}
                    alt={store.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                    isOpen ? 'bg-emerald-500 text-black shadow-md' : 'bg-rose-500 text-white'
                  }`}>
                    {isOpen ? `OPEN TILL ${store.hours.close}` : 'CLOSED'}
                  </span>

                  <span className="absolute top-3 right-3 bg-amber-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow">
                    ★ {store.rating} ({store.reviewCount || 100})
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-white">
                    <span className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-xl font-bold">
                      📍 {formatDistance(distance)} (~{store.estimatedDriveTimeMins || 8} min drive)
                    </span>
                    <span className="bg-amber-500/90 text-black px-2 py-0.5 rounded font-extrabold text-[10px]">
                      Up to {store.maxMemberDiscountPercent}% Member Disc.
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>VERIFIED LICENCED RETAILER • {store.licenceIds[0] || 'L-2'}</span>
                  </div>

                  <h3
                    onClick={() => onNavigate('outlet-detail', store.id)}
                    className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors cursor-pointer"
                  >
                    {store.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{store.address}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onNavigate('outlet-detail', store.id)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-sm flex items-center justify-center gap-1"
                >
                  <span>View Store Inventory ({productCount})</span>
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${store.geoPoint.lat},${store.geoPoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl luxury-card text-slate-700 dark:text-slate-200 hover:text-amber-500"
                  title="Open Google Maps Directions"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
