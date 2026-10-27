import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Wine, 
  Sparkles, 
  ShieldCheck, 
  Filter, 
  CheckCircle, 
  HelpCircle,
  TrendingUp,
  AlertOctagon
} from 'lucide-react';
import { LiquorBrand, LiquorCategory } from '../../types';
import { BottleCard } from './BottleCard';
import { useLocationContext } from '../../context/LocationContext';
import { HARYANA_EXCISE_RULES } from '../../services/complianceService';

interface InventoryLocatorProps {
  bottles: LiquorBrand[];
  onSelectVend?: (vendId: string) => void;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Labels', value: 'all' },
  { label: 'Single Malt', value: 'Single Malt' },
  { label: 'Scotch & Whisky', value: 'Scotch Whisky' },
  { label: 'Japanese Whisky', value: 'Japanese Whisky' },
  { label: 'Tequila & Mezcal', value: 'Tequila' },
  { label: 'Craft Gin', value: 'Gin' },
  { label: 'Ultra Vodka', value: 'Vodka' },
  { label: 'Champagne', value: 'Champagne' },
  { label: 'Imported Beer', value: 'Beer' },
];

export const InventoryLocator: React.FC<InventoryLocatorProps> = ({ bottles, onSelectVend }) => {
  const { currentDistrict } = useLocationContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredBottles = useMemo(() => {
    return bottles.filter((bottle) => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = bottle.name.toLowerCase().includes(query);
        const matchCategory = bottle.category.toLowerCase().includes(query);
        const matchOrigin = bottle.origin.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchOrigin) return false;
      }

      // Category
      if (selectedCategory !== 'all' && bottle.category !== selectedCategory) {
        return false;
      }

      // In Stock Only
      if (inStockOnly && bottle.overallStatus === 'Out of Stock') {
        return false;
      }

      return true;
    });
  }, [bottles, searchTerm, selectedCategory, inStockOnly]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5">
              <Wine className="w-4 h-4" />
              <span>Real-Time Foreign Liquor Locator</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              Imported Spirits & Rare Bottlings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl">
              Track real-time inventory at Haryana L-2 licensed retail vends across {currentDistrict}. Check indicative MRP prices, tasting profiles, and verify in-store stock before you drive.
            </p>
          </div>

          {/* Quick Stat Badge */}
          <div className="flex items-center gap-3 bg-night-950/80 p-3 rounded-2xl border border-white/10 self-start md:self-auto shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Catalog Tracked</span>
              <span className="text-base font-extrabold text-amber-400">{bottles.length} Foreign Labels</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Haryana Excise Guardrail Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-300">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white font-bold">Excise Compliance Warning: </strong>
            NightLife Pass does not retail or deliver alcohol online. All products must be bought in person at authorized L-2 retail vends. Legal possession limit in Haryana: max {HARYANA_EXCISE_RULES.maxBottlesPerPerson} bottles per adult individual.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Macallan, Yamazaki, Clase Azul, Monkey 47..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-night-900/90 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-all"
            />
          </div>

          {/* In Stock Only Checkbox Button */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
              inStockOnly
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-night-900/80 text-slate-300 border border-white/10 hover:border-white/20'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${inStockOnly ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>In-Stock Only</span>
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-night-950 font-bold shadow'
                  : 'bg-night-900/80 text-slate-300 border border-white/10 hover:border-amber-400/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottles Grid */}
      {filteredBottles.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3">
          <Wine className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No liquor labels matched your query</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting "All Labels" to explore the full imported spirits directory.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setInStockOnly(false);
            }}
            className="mt-2 px-4 py-2 bg-amber-500 text-night-950 text-xs font-bold rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBottles.map((bottle) => (
            <BottleCard
              key={bottle.id}
              bottle={bottle}
              onSelectVend={onSelectVend}
            />
          ))}
        </div>
      )}

    </div>
  );
};
