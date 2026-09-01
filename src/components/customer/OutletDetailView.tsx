import React, { useState } from 'react';
import {
  Store,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Phone,
  ExternalLink,
  Search,
  Sparkles,
  ArrowLeft,
  Flame,
  AlertCircle,
  Heart,
} from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { formatINR, isOutletOpen, formatRelativeTime } from '../../utils/formatters';
import { OutletProduct, Product, Offer } from '../../types';

interface OutletDetailViewProps {
  outletId: string;
  onNavigate: (view: string, id?: string) => void;
}

export const OutletDetailView: React.FC<OutletDetailViewProps> = ({ outletId, onNavigate }) => {
  const { preferences, toggleFavouriteOutlet } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const outlet = mockBackend.getOutletById(outletId);
  const licences = mockBackend.getLicences().filter((l) => l.outletId === outletId);
  const outletProducts = mockBackend.getOutletProducts(outletId);
  const products = mockBackend.getProducts();
  const offers = mockBackend.getOffers('LIVE').filter((o) => o.outletId === outletId);

  if (!outlet) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Outlet not found.</p>
        <button onClick={() => onNavigate('home')} className="mt-4 text-amber-400 font-bold">
          Back to Discovery Home
        </button>
      </div>
    );
  }

  const primaryLicence = licences[0];
  const isOpen = isOutletOpen(outlet.hours.open, outlet.hours.close);
  const isFav = preferences.favourites.outlets.includes(outlet.id);

  // Filter catalogue
  const catalogueList = outletProducts.map((op) => ({
    op,
    product: products.find((p) => p.id === op.productId),
  })).filter(({ product }) => {
    if (!product) return false;
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || product.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      {/* Navigation Header */}
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Outlets
      </button>

      {/* Outlet Banner & Header */}
      <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED HARYANA EXCISE OUTLET
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isOpen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {isOpen ? 'OPEN NOW' : 'CLOSED'}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-white">{outlet.name}</h1>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" /> {outlet.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavouriteOutlet(outlet.id)}
              className="p-2.5 rounded-xl glass-card text-white hover:text-rose-400"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${outlet.geoPoint.lat},${outlet.geoPoint.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Licence Details Card */}
        {primaryLicence && (
          <div className="glass-card rounded-2xl p-4 border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">LICENCE TYPE & NO.</span>
              <span className="font-extrabold text-amber-300">{primaryLicence.type} — {primaryLicence.number}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">VALIDITY PERIOD</span>
              <span className="font-bold text-slate-200">{primaryLicence.issueDate} to {primaryLicence.expiryDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">ISSUING AUTHORITY</span>
              <span className="font-bold text-slate-200">{primaryLicence.authority}</span>
            </div>
          </div>
        )}
      </div>

      {/* Active Permitted Offers at this Store */}
      {offers.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Active Permitted Offers at this Outlet
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div key={offer.id} className="glass-card rounded-2xl p-4 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold">Approved Offer</span>
                  <span className="text-[10px] text-slate-400">Valid till {offer.validTo}</span>
                </div>
                <h3 className="text-sm font-bold text-white">{offer.title}</h3>
                <p className="text-xs text-slate-300">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Inventory Catalogue */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-400" />
              Live Product Catalogue & Availability Signals
            </h2>
            <p className="text-xs text-slate-400">Timestamped availability recorded directly by outlet</p>
          </div>

          {/* Catalogue Filters */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter stock..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="glass-card text-xs text-slate-200 px-3 py-1.5 rounded-xl bg-slate-900 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Single Malt">Single Malt</option>
              <option value="Whisky">Whisky</option>
              <option value="Gin">Gin</option>
              <option value="Vodka">Vodka</option>
              <option value="Beer">Beer</option>
              <option value="Wine">Wine</option>
            </select>
          </div>
        </div>

        {/* Inventory List Table */}
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="divide-y divide-slate-800">
            {catalogueList.length > 0 ? (
              catalogueList.map(({ op, product }) => {
                if (!product) return null;
                return (
                  <div
                    key={op.id}
                    onClick={() => onNavigate('product-detail', product.id)}
                    className="p-4 hover:bg-slate-800/50 cursor-pointer flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 p-1 flex items-center justify-center shrink-0">
                        <img src={product.imageUrl} alt={product.productName} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] text-amber-400 font-extrabold uppercase">{product.category}</span>
                        <h4 className="text-sm font-bold text-white hover:text-amber-300">{product.productName}</h4>
                        <span className="text-xs text-slate-400">Pack: {op.packSize}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-sm font-extrabold text-slate-100">
                        {formatINR(op.priceIfApproved)}
                      </div>
                      <div className="flex items-center justify-end gap-1.5">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          op.availabilityStatus === 'IN_STOCK'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : op.availabilityStatus === 'LOW_STOCK'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {op.availabilityStatus.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          • {formatRelativeTime(op.observedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No products match the selected filter.
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
