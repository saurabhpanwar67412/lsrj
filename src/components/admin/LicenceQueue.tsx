import React, { useState } from 'react';
import { ShieldCheck, FileText, Check, X, AlertCircle, ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { Licence } from '../../types';

interface LicenceQueueProps {
  onNavigate: (view: string) => void;
}

export const LicenceQueue: React.FC<LicenceQueueProps> = ({ onNavigate }) => {
  const [licences, setLicences] = useState(mockBackend.getLicences());
  const [selectedLicence, setSelectedLicence] = useState<Licence | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDecision = async (approve: boolean) => {
    if (!selectedLicence) return;
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));

    mockBackend.moderateLicence(
      selectedLicence.id,
      approve,
      reviewerNotes || (approve ? 'Verified against official Haryana licensee database search.' : 'Rejection: Document illegible.'),
      'compliance_officer_1'
    );

    setLicences(mockBackend.getLicences());
    setLoading(false);
    setSelectedLicence(null);
    setReviewerNotes('');
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-7xl mx-auto">
      
      <button
        onClick={() => onNavigate('admin-dashboard')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Compliance Console
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            Haryana Licence Verification Queue
          </h1>
          <p className="text-xs text-slate-400">Review submitted L-2 / L-14A excise licences against licensee database</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* List of Licences */}
        <div className="lg:col-span-1 space-y-3">
          {licences.map((lic) => (
            <div
              key={lic.id}
              onClick={() => setSelectedLicence(lic)}
              className={`glass-card rounded-2xl p-4 border cursor-pointer space-y-2 transition-all ${
                selectedLicence?.id === lic.id
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-amber-300 font-bold">{lic.number}</span>
                <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                  lic.verificationStatus === 'APPROVED'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : lic.verificationStatus === 'PENDING'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {lic.verificationStatus}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white">Licence Type: {lic.type}</h4>
              <p className="text-[11px] text-slate-400 truncate">Doc: {lic.documentName}</p>
            </div>
          ))}
        </div>

        {/* Selected Licence Inspector */}
        <div className="lg:col-span-2">
          {selectedLicence ? (
            <div className="glass-panel rounded-3xl p-6 border border-amber-500/30 space-y-5 animate-in fade-in">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider">
                    Official Licence Audit
                  </span>
                  <h2 className="text-lg font-bold text-white mt-1">{selectedLicence.number}</h2>
                  <p className="text-xs text-slate-300">Type: {selectedLicence.type} • Expiry: {selectedLicence.expiryDate}</p>
                </div>

                <span className="text-xs font-bold text-slate-200 glass-card px-3 py-1 rounded-xl">
                  Authority: {selectedLicence.authority}
                </span>
              </div>

              {/* Uploaded Certificate Preview simulator */}
              <div className="glass-card rounded-2xl p-4 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-amber-400" />
                  <div>
                    <span className="font-bold text-white block">{selectedLicence.documentName}</span>
                    <span className="text-slate-400 text-[10px]">Haryana Excise Digital Certificate Copy</span>
                  </div>
                </div>

                <a
                  href={`#view-doc-${selectedLicence.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Simulated Document Preview for ${selectedLicence.documentName}`);
                  }}
                  className="px-3 py-1.5 rounded-xl glass-card text-amber-400 hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>Preview Document</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Reviewer Notes Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Compliance Reviewer Notes</label>
                <textarea
                  rows={3}
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Enter audit notes or verification reference..."
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              {/* Decision Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDecision(true)}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Approve Licence & Publish Outlet
                </button>

                <button
                  onClick={() => handleDecision(false)}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> Reject Application
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-12 text-center text-slate-400 text-xs">
              Select a licence from the queue to inspect official certificates and render moderation decision.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
