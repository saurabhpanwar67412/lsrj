import React from 'react';
import { Scale, ShieldAlert, Lock, CheckCircle2, XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { usePolicy } from '../../context/PolicyContext';
import { DistrictCode, JurisdictionPolicy } from '../../types';

interface PolicyEngineViewProps {
  onNavigate: (view: string) => void;
}

export const PolicyEngineView: React.FC<PolicyEngineViewProps> = ({ onNavigate }) => {
  const { policy, activeDistrict, setDistrict, updatePolicyRules } = usePolicy();

  const toggleRule = (ruleKey: keyof JurisdictionPolicy) => {
    if (typeof policy[ruleKey] === 'boolean') {
      updatePolicyRules(activeDistrict, { [ruleKey]: !policy[ruleKey] });
    }
  };

  const rulesList: { key: keyof JurisdictionPolicy; label: string; desc: string; isGuardrail?: boolean }[] = [
    {
      key: 'ageGateRequired',
      label: 'Age & Eligibility Gate (21+)',
      desc: 'Enforce legal age verification modal on landing for Haryana jurisdiction.',
    },
    {
      key: 'productDisplayAllowed',
      label: 'Brand & Product Catalogue Display',
      desc: 'Allow display of verified product images, pack sizes, and MRP guides.',
    },
    {
      key: 'offerDisplayAllowed',
      label: 'Permitted Offer Display',
      desc: 'Allow display of excise-approved gift accessory & tasting pass offers.',
    },
    {
      key: 'liquorCheckoutAllowed',
      label: 'Direct Liquor Checkout Capability',
      desc: 'HARD GUARDRAIL: Default OFF. Collect liquor cart/checkout on platform.',
      isGuardrail: true,
    },
    {
      key: 'liquorPaymentAllowed',
      label: 'Liquor Payment Intermediary Collection',
      desc: 'HARD GUARDRAIL: Default OFF. Platform collects liquor consideration.',
      isGuardrail: true,
    },
    {
      key: 'deliveryAllowed',
      label: 'Home Delivery Capability',
      desc: 'HARD GUARDRAIL: Default OFF. Requires explicit separate Haryana delivery licence.',
      isGuardrail: true,
    },
  ];

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-5xl mx-auto">
      
      <button
        onClick={() => onNavigate('admin-dashboard')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Compliance Console
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            Backend Policy Engine Rule Matrix
          </h1>
          <p className="text-xs text-slate-400">
            Jurisdiction Policy & Feature Flags for <strong className="text-amber-400">Haryana ({activeDistrict})</strong>
          </p>
        </div>

        {/* District Switcher */}
        <div className="flex gap-2">
          {(['Gurugram', 'Faridabad'] as DistrictCode[]).map((d) => (
            <button
              key={d}
              onClick={() => setDistrict(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeDistrict === d ? 'bg-amber-500 text-black shadow-md' : 'glass-card text-slate-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="text-xs text-amber-300 bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20 leading-relaxed">
          🛡️ <strong>Policy Engine Rule:</strong> React components must query the backend policy engine before showing sensitive capabilities. Never hardcode Haryana rules into client code.
        </div>

        <div className="divide-y divide-slate-800">
          {rulesList.map((item) => {
            const isEnabled = Boolean(policy[item.key]);

            return (
              <div key={item.key} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{item.label}</h3>
                    {item.isGuardrail && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-extrabold">
                        HARD GUARDRAIL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>

                <button
                  onClick={() => toggleRule(item.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                    isEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isEnabled ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>ENABLED</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-slate-400" />
                      <span>OFF (DISABLED)</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
