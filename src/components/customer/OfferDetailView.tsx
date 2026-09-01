import React from 'react';
import { Flame, ShieldCheck, MapPin, ExternalLink, ArrowLeft, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';

interface OfferDetailViewProps {
  offerId: string;
  onNavigate: (view: string, id?: string) => void;
}

export const OfferDetailView: React.FC<OfferDetailViewProps> = ({ offerId, onNavigate }) => {
  const offer = mockBackend.getOffers().find((o) => o.id === offerId);
  const outlets = mockBackend.getOutlets();
  const outlet = outlets.find((o) => o.id === offer?.outletId);

  if (!offer) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Offer details not found.</p>
        <button onClick={() => onNavigate('home')} className="mt-4 text-amber-400 font-bold">
          Back to Discovery Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-4xl mx-auto">
      
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Discovery Home
      </button>

      <div className="glass-panel rounded-3xl p-6 border border-amber-500/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> APPROVED EXCISE OFFER
          </span>

          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> Valid: {offer.validFrom} to {offer.validTo}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-white">{offer.title}</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{offer.description}</p>

        {/* Participating Outlet */}
        {outlet && (
          <div className="glass-card rounded-2xl p-4 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">PARTICIPATING OUTLET</span>
              <h3 className="text-sm font-bold text-white mt-0.5">{outlet.name}</h3>
              <p className="text-xs text-slate-400">{outlet.address}</p>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${outlet.geoPoint.lat},${outlet.geoPoint.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Directions to Store</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Terms */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-amber-400" /> Offer Terms & Compliance Rationale
          </h4>
          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
            {offer.terms.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
