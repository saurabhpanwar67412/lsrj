import React, { createContext, useContext, useState, useEffect } from 'react';
import { JurisdictionPolicy, DistrictCode } from '../types';
import { policyEngine } from '../services/policyEngine';

interface PolicyContextType {
  policy: JurisdictionPolicy;
  activeDistrict: DistrictCode;
  setDistrict: (district: DistrictCode) => void;
  isAllowed: (capability: keyof JurisdictionPolicy) => boolean;
  updatePolicyRules: (district: DistrictCode, updates: Partial<JurisdictionPolicy>) => void;
}

const PolicyContext = createContext<PolicyContextType | undefined>(undefined);

export const PolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDistrict, setActiveDistrictState] = useState<DistrictCode>('Gurugram');
  const [policy, setPolicy] = useState<JurisdictionPolicy>(policyEngine.getPolicy('Gurugram'));

  const setDistrict = (district: DistrictCode) => {
    policyEngine.setDistrict(district);
    setActiveDistrictState(district);
    setPolicy(policyEngine.getPolicy(district));
  };

  const isAllowed = (capability: keyof JurisdictionPolicy): boolean => {
    return policyEngine.isCapabilityAllowed(capability, activeDistrict);
  };

  const updatePolicyRules = (district: DistrictCode, updates: Partial<JurisdictionPolicy>) => {
    const newPolicy = policyEngine.updatePolicy(district, updates);
    if (district === activeDistrict) {
      setPolicy(newPolicy);
    }
  };

  return (
    <PolicyContext.Provider
      value={{
        policy,
        activeDistrict,
        setDistrict,
        isAllowed,
        updatePolicyRules,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error('usePolicy must be used within a PolicyProvider');
  }
  return context;
};
