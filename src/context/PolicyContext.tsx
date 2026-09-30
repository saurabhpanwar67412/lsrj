import React, { createContext, useContext, useState } from 'react';
import { JurisdictionPolicy, DistrictCode } from '../types';
import { policyEngine } from '../services/policyEngine';

interface PolicyContextType {
  activeDistrict: DistrictCode;
  setDistrict: (district: DistrictCode) => void;
  policy: JurisdictionPolicy;
  isAllowed: (capability: keyof JurisdictionPolicy) => boolean;
  updatePolicy: (updates: Partial<JurisdictionPolicy>) => void;
}

const PolicyContext = createContext<PolicyContextType | undefined>(undefined);

export const PolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDistrict, setActiveDistrictState] = useState<DistrictCode>('Gurugram');
  const [policy, setPolicyState] = useState<JurisdictionPolicy>(() =>
    policyEngine.getPolicy('Gurugram')
  );

  const setDistrict = (district: DistrictCode) => {
    setActiveDistrictState(district);
    setPolicyState(policyEngine.getPolicy(district));
  };

  const isAllowed = (capability: keyof JurisdictionPolicy): boolean => {
    return policyEngine.isCapabilityAllowed(activeDistrict, capability);
  };

  const updatePolicy = (updates: Partial<JurisdictionPolicy>) => {
    const updated = policyEngine.updatePolicy(activeDistrict, updates);
    setPolicyState({ ...updated });
  };

  return (
    <PolicyContext.Provider
      value={{
        activeDistrict,
        setDistrict,
        policy,
        isAllowed,
        updatePolicy,
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
