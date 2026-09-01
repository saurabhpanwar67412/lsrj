import React, { useState } from 'react';
import { ShieldCheck, Upload, FileText, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { DistrictCode, LicenceType } from '../../types';

interface VendorOnboardingProps {
  onNavigate: (view: string) => void;
}

export const VendorOnboarding: React.FC<VendorOnboardingProps> = ({ onNavigate }) => {
  const [tradeName, setTradeName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState<DistrictCode>('Gurugram');
  const [licenceType, setLicenceType] = useState<LicenceType>('L-2');
  const [licenceNumber, setLicenceNumber] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    const result = mockBackend.submitVendorApplication({
      tradeName,
      legalName,
      address,
      district,
      licenceType,
      licenceNumber: licenceNumber || `HR-${district.substring(0, 3).toUpperCase()}-L2-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ownerUid: 'user_vendor_demo',
      documentName: documentName || 'Haryana_Excise_Licence.pdf',
    });

    setLoading(false);
    setSubmittedResult(result);
  };

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-3xl mx-auto">
      
      <button
        onClick={() => onNavigate('vendor-dashboard')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Vendor Dashboard
      </button>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Vendor Onboarding & Verification</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">List My Licensed Outlet</h1>
        <p className="text-xs text-slate-300">
          Only verified L-2 and L-14A Haryana excise licensees are published on the platform.
        </p>
      </div>

      {submittedResult ? (
        <div className="glass-panel rounded-3xl p-6 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-extrabold text-white">Application Submitted for Compliance Review!</h2>
          
          <div className="glass-card rounded-2xl p-4 text-left text-xs space-y-2 border border-slate-700/80">
            <div className="flex justify-between">
              <span className="text-slate-400">Vendor State:</span>
              <span className="font-bold text-amber-400">SUBMITTED (UNDER REVIEW)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Trade Name:</span>
              <span className="font-bold text-white">{submittedResult.vendor.tradeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Licence Number:</span>
              <span className="font-mono text-amber-300">{submittedResult.licence.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Document Uploaded:</span>
              <span className="text-slate-200">{submittedResult.licence.documentName}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300">
            An Excise Compliance Officer will review your uploaded licence certificate against official Haryana licensee records.
          </p>

          <button
            onClick={() => onNavigate('vendor-dashboard')}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20"
          >
            Go to Vendor Dashboard
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Trade Name / Store Name</label>
              <input
                type="text"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                placeholder="e.g. L1 Discovery Outlet — Cyber Hub"
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Legal Entity / Company Name</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="e.g. Gurgaon Prime Spirits Pvt Ltd"
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Exact Premises Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Building 10-A, DLF Cyber City, Phase 2, Gurugram"
              className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Haryana District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as DistrictCode)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs bg-slate-900"
              >
                <option value="Gurugram">Gurugram</option>
                <option value="Faridabad">Faridabad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Licence Type</label>
              <select
                value={licenceType}
                onChange={(e) => setLicenceType(e.target.value as LicenceType)}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs bg-slate-900"
              >
                <option value="L-2">L-2 (Retail Offline Outlet)</option>
                <option value="L-14A">L-14A (Country & Imported Retail)</option>
                <option value="L-1">L-1 (Wholesale Supplier)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Licence Number</label>
              <input
                type="text"
                value={licenceNumber}
                onChange={(e) => setLicenceNumber(e.target.value)}
                placeholder="HR-GUR-L2-2025-0042"
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs font-mono"
              />
            </div>
          </div>

          {/* Document Upload Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Upload Official Excise Licence Document (PDF / Image)
            </label>
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-2xl glass-card cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-xs font-semibold text-slate-200">
                {documentName ? `Selected: ${documentName}` : 'Click to upload licence certificate (PDF / PNG)'}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">Stored securely in private cloud storage</span>
              <input type="file" onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg" className="hidden" />
            </label>
          </div>

          {/* Agreement Acceptance */}
          <div className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              id="vendor-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 text-amber-500 focus:ring-amber-500"
              required
            />
            <label htmlFor="vendor-terms" className="text-xs text-slate-300 leading-normal">
              I certify that our outlet holds a valid Haryana Excise License for 2025–2027 and agree to the <strong className="text-amber-400">Vendor Platform Agreement</strong> and compliance guardrails.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !acceptedTerms}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Application for Excise Compliance Review</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
};
