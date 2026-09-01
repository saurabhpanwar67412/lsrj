import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { formatINR, formatRelativeTime } from '../../utils/formatters';
import { AvailabilityStatus } from '../../types';

interface VendorCatalogueProps {
  onNavigate: (view: string) => void;
}

export const VendorCatalogue: React.FC<VendorCatalogueProps> = ({ onNavigate }) => {
  const outlets = mockBackend.getOutlets();
  const outlet = outlets[0]; // Cyber Hub Outlet
  const products = mockBackend.getProducts();
  const [outletProducts, setOutletProducts] = useState(mockBackend.getOutletProducts(outlet?.id));

  const [savingId, setSavingId] = useState<string | null>(null);

  const handleUpdateAvailability = (productId: string, packSize: any, newStatus: AvailabilityStatus, price: number) => {
    if (!outlet) return;
    setSavingId(`${productId}_${packSize}`);
    mockBackend.updateStockAvailability(outlet.id, productId, packSize, newStatus, price);
    setTimeout(() => {
      setOutletProducts(mockBackend.getOutletProducts(outlet.id));
      setSavingId(null);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      <button
        onClick={() => onNavigate('vendor-dashboard')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Vendor Dashboard
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-white">Stock Availability & Price Signal Manager</h1>
          <p className="text-xs text-slate-400">
            Outlet: <strong className="text-amber-400">{outlet ? outlet.name : 'Cyber Hub Store'}</strong>
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-800">
          {products.map((product) => {
            const op = outletProducts.find((item) => item.productId === product.id) || {
              availabilityStatus: 'OUT_OF_STOCK' as AvailabilityStatus,
              priceIfApproved: product.mrpGuide['750ml'] || 3990,
              observedAt: new Date().toISOString(),
              packSize: '750ml',
            };

            const isSaving = savingId === `${product.id}_750ml`;

            return (
              <div key={product.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 p-1 flex items-center justify-center shrink-0">
                    <img src={product.imageUrl} alt={product.productName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 font-extrabold uppercase">{product.category}</span>
                    <h4 className="text-sm font-bold text-white">{product.productName}</h4>
                    <span className="text-xs text-slate-400">MRP Guide: {formatINR(product.mrpGuide['750ml'] || 3990)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={op.availabilityStatus}
                    onChange={(e) =>
                      handleUpdateAvailability(
                        product.id,
                        '750ml',
                        e.target.value as AvailabilityStatus,
                        op.priceIfApproved
                      )
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold bg-slate-900 border ${
                      op.availabilityStatus === 'IN_STOCK'
                        ? 'text-emerald-300 border-emerald-500/40'
                        : op.availabilityStatus === 'LOW_STOCK'
                        ? 'text-amber-300 border-amber-500/40'
                        : 'text-rose-300 border-rose-500/40'
                    }`}
                  >
                    <option value="IN_STOCK">IN STOCK</option>
                    <option value="LOW_STOCK">LOW STOCK</option>
                    <option value="OUT_OF_STOCK">OUT OF STOCK</option>
                  </select>

                  {isSaving && <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
