// Complete TypeScript Definitions for Premium Liquor Membership & Partner Store Marketplace

export type UserRole = 
  | 'customer'
  | 'vendor_owner'
  | 'vendor_staff'
  | 'compliance_officer'
  | 'support_agent'
  | 'finance_admin'
  | 'marketing_admin'
  | 'super_admin';

export type UserStatus = 'active' | 'suspended' | 'pending_deletion';

export type JurisdictionCode = 'HR'; // Haryana / Delhi NCR
export type DistrictCode = 'Gurugram' | 'Faridabad';

export interface UserProfile {
  uid: string;
  mobile: string;
  phoneNumber?: string;
  role: UserRole;
  displayName: string;
  eligibilityStatus: 'CONFIRMED_21_PLUS' | 'NOT_VERIFIED';
  status: UserStatus;
  jurisdiction: JurisdictionCode;
  district: DistrictCode;
  consentVersion: string;
  currentMembership?: {
    planId: CustomerPlanId;
    status: 'ACTIVE' | 'EXPIRED';
    expiresAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type CustomerPlanId = 'FREE' | 'PREMIUM' | 'PRO';

export interface MembershipPlan {
  id: CustomerPlanId;
  name: string;
  priceYr: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface CustomerMembership {
  id: string;
  uid: string;
  planId: CustomerPlanId;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  startedAt: string;
  expiresAt: string;
  orderId: string;
}

export type OriginType = 'IMPORTED' | 'LOCAL';

export type ProductCategory = 
  | 'Single Malt'
  | 'Whisky'
  | 'Vodka'
  | 'Gin'
  | 'Beer'
  | 'Wine'
  | 'Tequila'
  | 'Rum'
  | 'Liqueur'
  | 'Champagne';

export type PackSize = '180ml' | '375ml' | '500ml' | '700ml' | '750ml' | '1000ml' | ' Pint 330ml' | ' Can 330ml' | ' Can 500ml';

export interface Product {
  id: string;
  brandId: string;
  brandName: string;
  productName: string;
  category: ProductCategory;
  originType: OriginType;
  originCountry: string;
  countryOfOrigin?: string;
  packSizes: PackSize[];
  abv: number;
  description: string;
  imageUrl: string;
  regularPrice: number; // MRP
  memberPrice: number;  // Exclusive Member Discounted Price
  dutyFreePrice?: number;
  discountPercentage?: number;
  isDutyFreeExclusive?: boolean;
  isEarlyAccess?: boolean;
  isLimitedEdition?: boolean;
  rating?: number;
  reviewCount?: number;
  tastingNotes?: string[];
  mrpGuide: Record<string, number>;
  status: 'ACTIVE' | 'DISCONTINUED';
}

export type DutyFreeProduct = Product;

export interface GeoPoint {
  lat: number;
  lng: number;
}

export type AvailabilityStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface StoreInventoryItem {
  stock: number;
  storePrice: number;
  storeMemberPrice: number;
  availabilityStatus: AvailabilityStatus;
  observedAt: string;
}

export interface PartnerStore {
  id: string;
  vendorId: string;
  name: string;
  address: string;
  geoPoint: GeoPoint;
  district: DistrictCode;
  zone: string;
  licenceIds: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  isVerified: boolean;
  hours: { open: string; close: string; daysOpen: string[] };
  phone: string;
  images: string[];
  rating: number;
  reviewCount?: number;
  maxMemberDiscountPercent: number;
  estimatedDriveTimeMins?: number;
  inventory: Record<string, StoreInventoryItem>;
  createdAt: string;
}

export type Outlet = PartnerStore;

export interface OutletProduct {
  id: string;
  outletId: string;
  productId: string;
  packSize: PackSize;
  availabilityStatus: AvailabilityStatus;
  priceIfApproved: number;
  source: 'VENDOR_PORTAL' | 'VERIFIED_SIGNAL' | 'CROWD_SOURCED';
  observedAt: string;
}

export interface EarlyAccessSale {
  id: string;
  title: string;
  productId: string;
  productName: string;
  brandName: string;
  imageUrl: string;
  regularPrice: number;
  memberPrice: number;
  startTime: string;
  endTime: string;
  availableQuantity: number;
  maxPerMember: number;
  partnerStoreId: string;
  partnerStoreName: string;
}

export type BulkQuantityTier = 'TIER_1_5' | 'TIER_6_20' | 'TIER_21_50' | 'TIER_50_PLUS';

export interface BulkOrder {
  id: string;
  customerUid: string;
  customerName: string;
  customerMobile: string;
  eventType: 'Wedding' | 'Corporate' | 'Party' | 'Hotel/Restaurant' | 'Private Event';
  eventDate: string;
  preferredStoreId: string;
  quantityTier: BulkQuantityTier;
  estimatedBottles: number;
  items: Array<{ productId: string; productName: string; quantity: number }>;
  status: 'PENDING_QUOTE' | 'QUOTE_PROVIDED' | 'CONFIRMED' | 'FULFILLED';
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedStoreId: string;
  selectedStoreName: string;
  storeMemberPrice: number;
  regularPrice: number;
}

export interface Order {
  id: string;
  customerUid: string;
  customerMobile: string;
  storeId: string;
  storeName: string;
  storeAddress: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    pricePaid: number;
    regularPrice: number;
  }>;
  subtotalRegular: number;
  memberSavings: number;
  totalPayable: number;
  status: 'CREATED' | 'CONFIRMED_FOR_PICKUP' | 'COMPLETED' | 'CANCELLED';
  pickupCode: string;
  ageVerified: boolean;
  createdAt: string;
}

export interface PlatformOrder {
  id: string;
  uidOrVendorId: string;
  orderType: 'CUSTOMER_MEMBERSHIP' | 'VENDOR_SAAS';
  amount: number;
  currency: string;
  status: 'CREATED' | 'PAID' | 'FAILED';
  planId: string;
  gatewayOrderId: string;
  createdAt: string;
}

export interface JurisdictionPolicy {
  jurisdictionId: JurisdictionCode;
  jurisdiction?: JurisdictionCode;
  district: DistrictCode;
  minDrinkingAge: number;
  minAge?: number;
  directLiquorCheckoutAllowed: boolean;
  liquorCheckoutAllowed?: boolean;
  onlineLiquorPaymentAllowed: boolean;
  liquorPaymentAllowed?: boolean;
  homeDeliveryAllowed: boolean;
  deliveryAllowed?: boolean;
  storePickupAllowed: boolean;
  platformMembershipAllowed: boolean;
  outletDiscoveryAllowed?: boolean;
  offerDisplayAllowed?: boolean;
  ageGateRequired?: boolean;
  productDisplayAllowed?: boolean;
  maxBottlesPerTransaction: number;
}

export interface UserPreferences {
  uid: string;
  location?: {
    lat: number;
    lng: number;
    addressName: string;
    district: DistrictCode;
  };
  favourites: {
    outlets: string[];
    products: string[];
    brands: string[];
  };
  savedSearches: string[];
  notificationSettings: {
    availabilityAlerts: boolean;
    offerAlerts: boolean;
    marketingOptIn: boolean;
    pushEnabled: boolean;
  };
}

export interface Vendor {
  id: string;
  legalName: string;
  tradeName: string;
  ownerUid: string;
  gstin?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED';
  jurisdictionId: JurisdictionCode;
  complianceStatus: 'PENDING' | 'APPROVED' | 'REQUIRES_ATTENTION' | 'REVOKED';
  createdAt: string;
  updatedAt: string;
}

export type LicenceType = 'L-2' | 'L-14A' | 'L-1';

export interface Licence {
  id: string;
  outletId: string;
  vendorId: string;
  type: LicenceType;
  number: string;
  issueDate: string;
  expiryDate: string;
  authority: string;
  documentPath: string;
  documentName?: string;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Offer {
  id: string;
  outletId: string;
  vendorId: string;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'LIVE' | 'EXPIRED';
  complianceStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  terms: string[];
  productCategory?: ProductCategory;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  createdBy: string;
  subject: string;
  category: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  messages?: Array<{ message: string; timestamp: string }>;
  updatedAt?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actorUid: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
}

export interface AnalyticsAggregate {
  date: string;
  district: DistrictCode;
  totalSearches: number;
  outletViews: number;
  directionClicks: number;
  activeUsers: number;
  activeVendors: number;
  mrrInr: number;
}
