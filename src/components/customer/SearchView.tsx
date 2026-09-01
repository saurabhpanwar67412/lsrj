import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useLocation } from '../../context/LocationContext';
import { formatINR } from '../../utils/formatters';
import { Product, ProductCategory, Outlet } from '../../types';

interface SearchViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onNavigate }) => {
  const { district } = useLocation();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('ALL');
  const [stockOnly, setStockOnly] = useState(false);

  const products = mockBackend.getProducts();
  const outlets = mockBackend.getOutlets(district);
  const allOutletProducts = mockBackend.getOutletProducts();

  const filteredProducts = products.filter((p) => {
    const matchesQuery = p.productName.toLowerCase().includes(query.toLowerCase()) ||
      p.brandName.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    
    const matchesCategory = category === 'ALL' || p.category === category;

    if (stockOnly) {
      const isStocked = allOutletProducts.some(
        (op) => op.productId === p.id && op.availabilityStatus === 'IN_STOCK'
      );
      return matchesQuery && matchesCategory && isStocked;
    }

    return matchesQuery && matchesCategory;
  });

  const filteredOutlets = outlets.filter((o) =>
    o.name.toLowerCase().includes(query.toLowerCase()) ||
    o.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      {/* Search Header */}
      <div className="space-y-3">
        <h1 className="text-xl font-bold text-white">Brand & Outlet Discovery Search</h1>

        {/* Input bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-amber-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand, single malt, beer, vodka, or outlet name..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass-input text-sm font-semibold tracking-wide"
            autoFocus
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {['ALL', 'Single Malt', 'Whisky', 'Gin', 'Vodka', 'Beer', 'Wine'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                category === cat
                  ? 'bg-amber-500 text-black font-bold'
                  : 'glass-card text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setStockOnly(!stockOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              stockOnly
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'glass-card text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>In Stock Signals Only</span>
          </button>
        </div>
      </div>

      {/* Results grid */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Found {filteredProducts.length} Brands / Products
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => {
            const availability = allOutletProducts.filter((op) => op.productId === product.id);
            const inStockCount = availability.filter((op) => op.availabilityStatus === 'IN_STOCK').length;

            return (
              <div
                key={product.id}
                onClick={() => onNavigate('product-detail', product.id)}
                className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-amber-500/50 cursor-pointer space-y-3 flex flex-col justify-between group transition-all"
              >
                <div className="space-y-2">
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center p-3">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">
                    {product.category} • {product.abv}% ABV
                  </span>

                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {product.productName}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-bold">
                      {formatINR(product.mrpGuide['750ml'] || Object.values(product.mrpGuide)[0])}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      inStockCount > 0
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {inStockCount > 0 ? `${inStockCount} Outlets In Stock` : 'Check Nearby Outlets'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
