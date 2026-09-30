import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, AlertCircle, ExternalLink } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import { Licence } from '../../types';

interface LicenceQueueProps {
  onNavigate: (view: string) => void;
}

export const LicenceQueue: React.FC<LicenceQueueProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [licences, setLicences] = useState<Licence[]>(mockBackend.getLicences());
  const [selectedLicence, setSelectedLicence] = useState<Licence | null>(null);
  const [reviewerNotes, setReviewerNotes] = useState('');

  const handleModerate = (id: string, approve: boolean) => {
    const status = approve ? 'APPROVED' : 'REJECTED';
    const updated = mockBackend.moderateLicence(
      id,
      status,
      reviewerNotes || (approve ? 'Verified licensee document' : 'Incomplete documentation'),
      user?.uid || 'compliance_officer_1'
    );
    setLicences([...mockBackend.getLicences()]);
    setSelectedLicence(null);
    setReviewerNotes('');
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Excise Licence Audit Queue</h1>
          <p className="text-xs text-slate-400">Review L-2 and L-14A excise licence upload credentials</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          {licences.map((lic) => (
            <div
              key={lic.id}
              onClick={() => setSelectedLicence(lic)}
              className={`luxury-card rounded-2xl p-4 border cursor-pointer transition-colors ${
                selectedLicence?.id === lic.id ? 'border-amber-400 bg-amber-500/10' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase">{lic.type} Licence</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${
                  lic.verificationStatus === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {lic.verificationStatus}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">{lic.number}</h3>
              <p className="text-xs text-slate-400">{lic.authority}</p>
            </div>
          ))}
        </div>

        {selectedLicence && (
          <div className="lg:col-span-5 luxury-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-2">Audit Action Panel</h2>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300">Licence No: <strong className="text-white">{selectedLicence.number}</strong></p>
              <p className="text-slate-300">Authority: <strong className="text-white">{selectedLicence.authority}</strong></p>
              <p className="text-slate-300">Expiry Date: <strong className="text-white">{selectedLicence.expiryDate}</strong></p>
            </div>

            <textarea
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              placeholder="Compliance reviewer notes..."
              className="w-full h-20 p-3 rounded-xl glass-input text-xs"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleModerate(selectedLicence.id, true)}
                className="flex-1 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
              >
                Approve Licence
              </button>
              <button
                onClick={() => handleModerate(selectedLicence.id, false)}
                className="flex-1 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs"
              >
                Reject Licence
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
