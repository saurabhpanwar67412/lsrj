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
import { LiquorBrand } from '../../types';
import { BottleCard } from './BottleCard';
import { useLocationContext } from '../../context/LocationContext';
import { HARYANA_EXCISE_RULES } from '../../services/complianceService';

interface InventoryLocatorProps {
  bottles: LiquorBrand[];
  onSelectVend?: (vendId: string) => void;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Labels', value: 'all' },
  { label: 'Single Malt Whisky', value: 'Single Malt' },
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
      if (inStockOnly && (bottle.overallStatus === 'Out of Stock' || bottle.overallStockStatus === 'OUT_OF_STOCK')) {
        return false;
      }

      return true;
    });
  }, [bottles, searchTerm, selectedCategory, inStockOnly]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-9 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-1.5">
              <Wine className="w-4 h-4 text-amber-400" />
              <span>Real-Time Foreign Liquor Locator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Imported Spirits & Rare Bottlings
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Track live inventory at Haryana L-2 licensed retail vends across {currentDistrict}. Inspect indicative MRP prices, tasting notes, and verify in-store bottles before driving.
            </p>
          </div>

          {/* Quick Stat Badge */}
          <div className="flex items-center gap-4 bg-night-900 p-4 rounded-2xl border border-white/15 self-start md:self-auto shrink-0 shadow-lg">
            <div className="text-right">
              <span className="text-xs uppercase font-extrabold text-slate-400 block">Catalog Tracked</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">{bottles.length} Foreign Labels</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Haryana Excise Warning */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-amber-200">
          <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white font-extrabold">Excise Compliance Warning: </strong>
            NightLife Pass does not retail or deliver alcohol online. All products must be bought in person at authorized L-2 retail vends. Legal possession limit in Haryana: max {HARYANA_EXCISE_RULES.maxBottlesPerPerson} bottles per adult individual.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Macallan, Yamazaki, Clase Azul, Monkey 47, Belvedere..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-night-900 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-semibold text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all shadow-inner"
            />
          </div>

          {/* In Stock Only Checkbox Button */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-5 py-3.5 rounded-2xl text-sm font-black transition-all flex items-center justify-center gap-2.5 shrink-0 ${
              inStockOnly
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 shadow-md'
                : 'bg-night-900 text-slate-300 border border-white/15 hover:border-white/30'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${inStockOnly ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>In-Stock Only</span>
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-amber-500 text-night-950 font-black shadow-md'
                  : 'bg-night-900 text-slate-200 border border-white/15 hover:border-amber-400/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottles Grid */}
      {filteredBottles.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <Wine className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">No liquor labels matched your query</h3>
          <p className="text-sm text-slate-300 max-w-sm mx-auto">
            Try adjusting your search terms or selecting "All Labels" to explore the full imported spirits directory.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setInStockOnly(false);
            }}
            className="btn-gold px-6 py-2.5 text-sm font-black rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
