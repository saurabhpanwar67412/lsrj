import { JurisdictionPolicy, DistrictCode, JurisdictionCode } from '../types';

export const DEFAULT_HARYANA_POLICIES: Record<DistrictCode, JurisdictionPolicy> = {
  Gurugram: {
    jurisdiction: 'HR',
    district: 'Gurugram',
    ageGateRequired: true,
    minAge: 21,
    offerDisplayAllowed: true,
    productDisplayAllowed: true,
    liquorCheckoutAllowed: false, // HARD GUARDRAIL
    liquorPaymentAllowed: false,  // HARD GUARDRAIL
    reservationAllowed: false,    // HARD GUARDRAIL
    pickupAllowed: false,         // HARD GUARDRAIL
    deliveryAllowed: false,       // HARD GUARDRAIL
    advertisingMode: 'REVIEW_REQUIRED',
  },
  Faridabad: {
    jurisdiction: 'HR',
    district: 'Faridabad',
    ageGateRequired: true,
    minAge: 21,
    offerDisplayAllowed: true,
    productDisplayAllowed: true,
    liquorCheckoutAllowed: false, // HARD GUARDRAIL
    liquorPaymentAllowed: false,  // HARD GUARDRAIL
    reservationAllowed: false,    // HARD GUARDRAIL
    pickupAllowed: false,         // HARD GUARDRAIL
    deliveryAllowed: false,       // HARD GUARDRAIL
    advertisingMode: 'REVIEW_REQUIRED',
  },
};

class PolicyEngineService {
  private activeDistrict: DistrictCode = 'Gurugram';
  private customPolicies: Map<string, JurisdictionPolicy> = new Map();

  constructor() {
    this.customPolicies.set('Gurugram', DEFAULT_HARYANA_POLICIES.Gurugram);
    this.customPolicies.set('Faridabad', DEFAULT_HARYANA_POLICIES.Faridabad);
  }

  public setDistrict(district: DistrictCode) {
    this.activeDistrict = district;
  }

  public getPolicy(district?: DistrictCode): JurisdictionPolicy {
    const target = district || this.activeDistrict;
    return this.customPolicies.get(target) || DEFAULT_HARYANA_POLICIES.Gurugram;
  }

  public updatePolicy(district: DistrictCode, updates: Partial<JurisdictionPolicy>): JurisdictionPolicy {
    const current = this.getPolicy(district);
    const updated = { ...current, ...updates };
    this.customPolicies.set(district, updated);
    return updated;
  }

  public isCapabilityAllowed(
    capability: keyof JurisdictionPolicy,
    district?: DistrictCode
  ): boolean {
    const policy = this.getPolicy(district);
    const value = policy[capability];
    return typeof value === 'boolean' ? value : false;
  }
}

export const policyEngine = new PolicyEngineService();
