import React, { useState } from 'react';
import { Flame, Plus, ShieldCheck, ArrowLeft, CheckCircle2, RefreshCw } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { Offer } from '../../types';

interface VendorOffersProps {
  onNavigate: (view: string) => void;
}

export const VendorOffers: React.FC<VendorOffersProps> = ({ onNavigate }) => {
  const outlets = mockBackend.getOutlets();
  const outlet = outlets[0];
  const offers = mockBackend.getOffers();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState('Permitted platform discovery gift accessory only.\nNo direct discount on liquor MRP per Haryana Excise Rules.');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!outlet || !title || !description) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    mockBackend.submitOffer(
      'v1',
      outlet.id,
      title,
      description,
      terms.split('\n').filter((t) => t.trim().length > 0)
    );

    setLoading(false);
    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      <button
        onClick={() => onNavigate('vendor-dashboard')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Vendor Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Permitted Offer Submissions
          </h1>
          <p className="text-xs text-slate-400">Moderated submissions for {outlet?.name}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Submit New Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                offer.status === 'LIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : offer.status === 'SUBMITTED'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {offer.status}
              </span>
              <span className="text-[10px] text-slate-400">Valid to: {offer.validTo}</span>
            </div>

            <h3 className="text-sm font-bold text-white">{offer.title}</h3>
            <p className="text-xs text-slate-300">{offer.description}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Submit Permitted Promo Offer</h3>

            <form onSubmit={handleCreateOffer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Offer Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Complimentary Crystal Glassware Set"
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details of gift accessory or permitted experience..."
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Terms & Conditions (1 per line)</label>
                <textarea
                  rows={3}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-mono"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin mx-auto" /> : 'Submit for Review'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-4 rounded-xl glass-card text-slate-400 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
