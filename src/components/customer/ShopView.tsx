import React, { useState } from 'react';
import { Search, Filter, Globe, Crown, Tag, Heart, ChevronRight, Check } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { Product, OriginType } from '../../types';

interface ShopViewProps {
  onNavigate: (view: string, id?: string) => void;
  initialOrigin?: OriginType;
}

export const ShopView: React.FC<ShopViewProps> = ({ onNavigate, initialOrigin }) => {
  const { preferences, toggleFavouriteProduct } = useAuth();
  const { addToCart } = useCart();

  const [originFilter, setOriginFilter] = useState<'ALL' | OriginType>(initialOrigin || 'ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const products = mockBackend.getProducts();

  const countries = Array.from(new Set(products.map((p) => p.originCountry)));

  const filteredProducts = products.filter((p) => {
    if (originFilter !== 'ALL' && p.originType !== originFilter) return false;
    if (selectedCategory !== 'ALL' && p.category !== selectedCategory) return false;
    if (selectedCountry !== 'ALL' && p.originCountry !== selectedCountry) return false;
    if (
      searchQuery &&
      !p.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Member Reserve <span className="gold-gradient-text">Liquor Catalogue</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse imported & local fine reserves with exclusive partner store member pricing.
          </p>
        </div>

        {/* Origin Pill Switcher */}
        <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-900 p-1 rounded-2xl shrink-0">
          {[
            { id: 'ALL', label: 'All Liquors' },
            { id: 'IMPORTED', label: '✈️ Imported' },
            { id: 'LOCAL', label: '🇮🇳 Local / Country Made' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setOriginFilter(item.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                originFilter === item.id
                  ? 'bg-amber-500 text-black shadow-md font-extrabold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Country Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search whisky, vodka, gin, brand..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs font-semibold"
          />
        </div>

        {/* Country Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Country:</span>
          <button
            onClick={() => setSelectedCountry('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCountry === 'ALL'
                ? 'bg-amber-500 text-black font-extrabold'
                : 'luxury-card text-slate-700 dark:text-slate-300'
            }`}
          >
            All Countries
          </button>
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCountry === c
                  ? 'bg-amber-500 text-black font-extrabold'
                  : 'luxury-card text-slate-700 dark:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const isFav = preferences.favourites.products.includes(product.id);
          const savings = product.regularPrice - product.memberPrice;

          return (
            <div
              key={product.id}
              onClick={() => onNavigate('product-detail', product.id)}
              className="luxury-card rounded-2xl p-4 cursor-pointer group flex flex-col justify-between relative space-y-3 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all"
            >
              {/* Badges */}
              <div className="flex items-center justify-between gap-1 absolute top-3 left-3 right-3 z-10 pointer-events-none">
                <span className={`font-extrabold text-[9px] uppercase px-2 py-0.5 rounded shadow ${
                  product.originType === 'IMPORTED' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {product.originType === 'IMPORTED' ? 'IMPORTED' : 'LOCAL'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavouriteProduct(product.id);
                  }}
                  className="p-1.5 rounded-full luxury-card text-slate-700 dark:text-white hover:text-rose-500 pointer-events-auto"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Image Box */}
              <div className="h-44 rounded-xl bg-slate-100 dark:bg-slate-950 p-3 flex items-center justify-center relative overflow-hidden mt-6">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Origin */}
              <div className="space-y-1">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider block">
                  {product.brandName} • {product.originCountry}
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                  {product.productName}
                </h3>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block font-semibold">MEMBER PRICE</span>
                    <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                      {formatINR(product.memberPrice)}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 line-through">{formatINR(product.regularPrice)}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-amber-500 group-hover:text-black text-slate-800 dark:text-slate-200 text-xs font-extrabold transition-colors flex items-center justify-center gap-1"
                >
                  <span>Select & Add to Cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
