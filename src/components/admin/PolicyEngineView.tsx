import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { usePolicy } from '../../context/PolicyContext';
import { JurisdictionPolicy, DistrictCode } from '../../types';

interface PolicyEngineViewProps {
  onNavigate: (view: string) => void;
}

export const PolicyEngineView: React.FC<PolicyEngineViewProps> = ({ onNavigate }) => {
  const { policy, activeDistrict, setDistrict, updatePolicy } = usePolicy();

  const rulesList: { key: keyof JurisdictionPolicy; label: string; desc: string; isGuardrail?: boolean }[] = [
    {
      key: 'directLiquorCheckoutAllowed',
      label: 'Direct E-Commerce Liquor Checkout',
      desc: 'Controls whether customers can perform online liquor checkout directly on platform.',
      isGuardrail: true,
    },
    {
      key: 'onlineLiquorPaymentAllowed',
      label: 'Online Liquor Payment Collection',
      desc: 'Controls whether platform accepts digital payment for alcohol purchases.',
      isGuardrail: true,
    },
    {
      key: 'homeDeliveryAllowed',
      label: 'Home Delivery of Alcohol',
      desc: 'Controls whether home delivery of alcoholic beverages is permitted.',
      isGuardrail: true,
    },
    {
      key: 'storePickupAllowed',
      label: 'Verified Store Pickup Fulfillment',
      desc: 'Permits customers to discover inventory and generate store pickup codes.',
      isGuardrail: false,
    },
    {
      key: 'platformMembershipAllowed',
      label: 'Platform Customer Membership Entitlements',
      desc: 'Permits early sale access and member discount entitlement services.',
      isGuardrail: false,
    },
  ];

  return (
    <div className="space-y-6 pb-20 pt-2 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Haryana Excise Policy Engine Matrix</h1>
          <p className="text-xs text-slate-400">Manage District Policy Guardrails for {activeDistrict}</p>
        </div>

        <div className="flex gap-2">
          {(['Gurugram', 'Faridabad'] as DistrictCode[]).map((d) => (
            <button
              key={d}
              onClick={() => setDistrict(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                activeDistrict === d ? 'bg-amber-500 text-black' : 'luxury-card text-slate-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="luxury-card rounded-2xl p-6 border border-slate-800 space-y-4">
        {rulesList.map((rule) => {
          const isValue = Boolean(policy[rule.key]);
          return (
            <div key={String(rule.key)} className="py-4 flex items-center justify-between border-b border-slate-800 last:border-b-0">
              <div className="space-y-1 max-w-md">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{rule.label}</h3>
                  {rule.isGuardrail && (
                    <span className="text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded font-extrabold">
                      HARD GUARDRAIL
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{rule.desc}</p>
              </div>

              <button
                onClick={() => updatePolicy({ [rule.key]: !isValue })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isValue ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isValue ? 'ALLOWED' : 'DISABLED'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
