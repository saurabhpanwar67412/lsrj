import React from 'react';
import { Heart, Store, Sparkles, ArrowRight, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBackend } from '../../services/mockBackend';
import { formatINR } from '../../utils/formatters';

interface FavouritesViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export const FavouritesView: React.FC<FavouritesViewProps> = ({ onNavigate }) => {
  const { preferences, toggleFavouriteOutlet, toggleFavouriteProduct } = useAuth();
  const outlets = mockBackend.getOutlets();
  const products = mockBackend.getProducts();

  const favOutlets = outlets.filter((o) => preferences.favourites.outlets.includes(o.id));
  const favProducts = products.filter((p) => preferences.favourites.products.includes(p.id));

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          Saved Outlets & Favourite Brands
        </h1>
        <p className="text-xs text-slate-400">Receive stock availability alerts for your saved items</p>
      </div>

      {/* Outlets section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Saved Outlets ({favOutlets.length})
        </h2>

        {favOutlets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favOutlets.map((outlet) => (
              <div key={outlet.id} className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h3 onClick={() => onNavigate('outlet-detail', outlet.id)} className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer">
                    {outlet.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{outlet.address}</p>
                </div>
                <button
                  onClick={() => toggleFavouriteOutlet(outlet.id)}
                  className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 glass-panel rounded-2xl text-center text-slate-400 text-xs">
            No saved outlets. Click the heart icon on any store to save it!
          </div>
        )}
      </div>

      {/* Brands section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Saved Brands ({favProducts.length})
        </h2>

        {favProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favProducts.map((p) => (
              <div key={p.id} className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 p-1 flex items-center justify-center shrink-0">
                    <img src={p.imageUrl} alt={p.productName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h3 onClick={() => onNavigate('product-detail', p.id)} className="text-xs font-bold text-white hover:text-amber-300 cursor-pointer">
                      {p.productName}
                    </h3>
                    <span className="text-[10px] text-amber-400 font-bold">{formatINR(p.mrpGuide['750ml'] || 3990)}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavouriteProduct(p.id)}
                  className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 glass-panel rounded-2xl text-center text-slate-400 text-xs">
            No saved products. Save your favorite whiskies or gins for instant availability alerts!
          </div>
        )}
      </div>

    </div>
  );
};
