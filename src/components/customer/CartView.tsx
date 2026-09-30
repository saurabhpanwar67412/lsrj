import React from 'react';
import { ShoppingBag, Trash2, ArrowRight, Store, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { mockBackend } from '../../services/mockBackend';
import { formatINR } from '../../utils/formatters';

interface CartViewProps {
  onNavigate: (view: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const {
    items,
    selectedStore,
    setSelectedStore,
    updateQuantity,
    removeFromCart,
    subtotalRegular,
    subtotalMember,
    totalSavings,
    totalItems,
  } = useCart();

  const stores = mockBackend.getPartnerStores();

  if (items.length === 0) {
    return (
      <div className="space-y-6 pb-24 pt-8 px-4 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full luxury-card flex items-center justify-center mx-auto text-amber-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Your Cart is Empty</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Browse our imported & local fine reserves or explore early access member deals!
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 rounded-2xl bg-amber-500 text-black font-extrabold text-xs shadow-md"
        >
          Explore Member Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 pt-4 px-4 max-w-5xl mx-auto">
      
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Shopping Cart</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{totalItems} reserve item(s) selected</p>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
        >
          + Add More Products
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Item List */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="luxury-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center gap-4 justify-between"
            >
              <div className="w-16 h-20 rounded-xl bg-slate-100 dark:bg-slate-950 p-1 flex items-center justify-center shrink-0">
                <img src={item.product.imageUrl} alt={item.product.productName} className="max-h-full max-w-full object-contain" />
              </div>

              <div className="flex-1 space-y-1">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase">
                  {item.product.brandName} • {item.product.originCountry}
                </span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.product.productName}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    {formatINR(item.storeMemberPrice)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">{formatINR(item.regularPrice)}</span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 luxury-card rounded-xl px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.productId, -1)}
                    className="p-1 text-slate-500 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, 1)}
                    className="p-1 text-slate-500 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Partner Store Selector Card */}
          <div className="luxury-card rounded-2xl p-4 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-4 h-4 text-amber-500" />
                Selected Pickup Partner Store
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-extrabold">
                STORE PICKUP READY
              </span>
            </div>

            <select
              value={selectedStore?.id}
              onChange={(e) => {
                const found = stores.find((s) => s.id === e.target.value);
                if (found) setSelectedStore(found);
              }}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold bg-transparent"
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.district}) — {s.address}
                </option>
              ))}
            </select>

            {selectedStore && (
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5 pt-1">
                <p>📍 Address: {selectedStore.address}</p>
                <p>🕒 Hours: {selectedStore.hours.open} – {selectedStore.hours.close} | Verified Licenced Partner</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="luxury-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
              Order Savings Summary
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Standard MRP Subtotal:</span>
                <span className="line-through">{formatINR(subtotalRegular)}</span>
              </div>

              <div className="flex justify-between text-rose-500 font-bold">
                <span>Member Discount Savings:</span>
                <span>-{formatINR(totalSavings)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">Total Payable Amount:</span>
                <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{formatINR(subtotalMember)}</span>
              </div>
            </div>

            {/* Savings Banner */}
            {totalSavings > 0 && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center text-xs font-extrabold text-amber-600 dark:text-amber-300">
                🎉 YOU SAVE {formatINR(totalSavings)} WITH YOUR PLATFORM MEMBERSHIP!
              </div>
            )}

            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs shadow-xl gold-glow transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Store Pickup Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
