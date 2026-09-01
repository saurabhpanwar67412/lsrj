import React from 'react';
import {
  ArrowLeft,
  Heart,
  Bell,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Tag,
  Star,
  Percent,
} from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { formatINR, calculateDistanceKm, formatDistance, formatRelativeTime } from '../../utils/formatters';
import { DutyFreeProduct } from '../../utils/seedData';

interface ProductDetailViewProps {
  productId: string;
  onNavigate: (view: string, id?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId, onNavigate }) => {
  const { preferences, toggleFavouriteProduct } = useAuth();
  const { district, userCoords } = useLocation();

  const product = (mockBackend.getProducts().find((p) => p.id === productId) as DutyFreeProduct) || mockBackend.getProducts()[0];
  const outlets = mockBackend.getOutlets(district);
  const outletProducts = mockBackend.getOutletProducts().filter((op) => op.productId === productId);

  if (!product) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Product not found.</p>
        <button onClick={() => onNavigate('search')} className="mt-4 text-amber-400 font-bold">
          Back to Search
        </button>
      </div>
    );
  }

  const isFav = preferences.favourites.products.includes(product.id);

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-6xl mx-auto">
      
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Reserve Marketplace
      </button>

      {/* Product Hero Sheet */}
      <div className="luxury-card rounded-3xl p-6 md:p-8 border border-amber-500/30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Bottle Image */}
        <div className="md:col-span-5 flex justify-center">
          <div className="w-60 h-72 rounded-2xl bg-slate-950 p-4 flex items-center justify-center relative shadow-2xl border border-slate-800">
            <img src={product.imageUrl} alt={product.productName} className="max-h-full max-w-full object-contain drop-shadow-xl" />
            {product.discountPercentage && (
              <span className="absolute top-3 left-3 bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Specs */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-extrabold uppercase">
              {product.brandName} • {product.category} • {product.abv}% ABV
            </span>

            <button
              onClick={() => toggleFavouriteProduct(product.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl luxury-card text-xs font-semibold text-white hover:text-rose-400"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFav ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{product.productName}</h1>
          
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{product.rating || 4.9} ({product.reviewCount || 140} verified reviews)</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{product.description}</p>

          {/* Pricing & Duty Free Specs */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Exclusive Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-amber-400">
                  {formatINR(product.dutyFreePrice || Object.values(product.mrpGuide)[0])}
                </span>
                {product.dutyFreePrice && (
                  <span className="text-xs text-slate-500 line-through">
                    MRP: {formatINR(product.mrpGuide['750ml'] || Object.values(product.mrpGuide)[0])}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">ORIGIN</span>
              <span className="text-xs font-bold text-white">{product.countryOfOrigin}</span>
            </div>
          </div>

          {/* Tasting Notes */}
          {product.tastingNotes && (
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tasting Notes Profile</span>
              <div className="flex flex-wrap gap-1.5">
                {product.tastingNotes.map((note: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg glass-card text-[11px] font-semibold text-slate-200">
                    🍷 {note}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stocking Outlets nearby */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-400" />
          Verified Nearby Outlets Stocking This Item ({district})
        </h2>

        <div className="space-y-3">
          {outletProducts.length > 0 ? (
            outletProducts.map((op) => {
              const outlet = outlets.find((o) => o.id === op.outletId);
              if (!outlet) return null;
              const distance = calculateDistanceKm(userCoords, outlet.geoPoint);

              return (
                <div
                  key={op.id}
                  className="luxury-card rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/40"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => onNavigate('outlet-detail', outlet.id)}
                        className="text-sm font-bold text-white hover:text-amber-300 cursor-pointer"
                      >
                        {outlet.name}
                      </h3>
                      {outlet.isVerified && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-extrabold">
                          VERIFIED L-2
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{outlet.address}</p>
                    <span className="text-[11px] text-slate-300 font-semibold block">
                      📍 {formatDistance(distance)} away
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    <div className="text-right space-y-0.5">
                      <span className="text-sm font-extrabold text-amber-400 block">
                        {formatINR(op.priceIfApproved)}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        {op.availabilityStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate('outlet-detail', outlet.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                    >
                      View Store
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 luxury-card rounded-2xl text-center text-slate-400 text-xs">
              No stock signals currently recorded in {district}. Save product to receive availability alerts!
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
