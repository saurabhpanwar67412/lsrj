import { JurisdictionPolicy, DistrictCode, JurisdictionCode } from '../types';

export class PolicyEngineService {
  private policies: Record<DistrictCode, JurisdictionPolicy> = {
    Gurugram: {
      jurisdictionId: 'HR',
      jurisdiction: 'HR',
      district: 'Gurugram',
      minDrinkingAge: 21,
      minAge: 21,
      directLiquorCheckoutAllowed: false,
      liquorCheckoutAllowed: false,
      onlineLiquorPaymentAllowed: false,
      liquorPaymentAllowed: false,
      homeDeliveryAllowed: false,
      deliveryAllowed: false,
      storePickupAllowed: true,
      platformMembershipAllowed: true,
      outletDiscoveryAllowed: true,
      offerDisplayAllowed: true,
      maxBottlesPerTransaction: 6,
    },
    Faridabad: {
      jurisdictionId: 'HR',
      jurisdiction: 'HR',
      district: 'Faridabad',
      minDrinkingAge: 21,
      minAge: 21,
      directLiquorCheckoutAllowed: false,
      liquorCheckoutAllowed: false,
      onlineLiquorPaymentAllowed: false,
      liquorPaymentAllowed: false,
      homeDeliveryAllowed: false,
      deliveryAllowed: false,
      storePickupAllowed: true,
      platformMembershipAllowed: true,
      outletDiscoveryAllowed: true,
      offerDisplayAllowed: true,
      maxBottlesPerTransaction: 6,
    },
  };

  public getPolicy(district: DistrictCode): JurisdictionPolicy {
    return this.policies[district] || this.policies.Gurugram;
  }

  public isCapabilityAllowed(district: DistrictCode, capability: keyof JurisdictionPolicy): boolean {
    const policy = this.getPolicy(district);
    const value = policy[capability];
    return typeof value === 'boolean' ? value : true;
  }

  public updatePolicy(district: DistrictCode, updates: Partial<JurisdictionPolicy>): JurisdictionPolicy {
    this.policies[district] = { ...this.getPolicy(district), ...updates };
    return this.policies[district];
  }
}

export const policyEngine = new PolicyEngineService();
