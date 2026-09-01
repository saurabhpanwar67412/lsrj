// Complete TypeScript Type Definitions for Licensed Liquor Discovery Platform (Blueprint v2.0)

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

export type JurisdictionCode = 'HR'; // Haryana
export type DistrictCode = 'Gurugram' | 'Faridabad';

export interface UserProfile {
  uid: string;
  mobile: string;
  role: UserRole;
  displayName: string;
  eligibilityStatus: 'CONFIRMED_21_PLUS' | 'NOT_VERIFIED' | 'REJECTED';
  status: UserStatus;
  jurisdiction: JurisdictionCode;
  district: DistrictCode;
  consentVersion: string;
  createdAt: string;
  updatedAt: string;
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

export type VendorStatus = 
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'NEEDS_INFO'
  | 'APPROVED'
  | 'ACTIVE'
  | 'EXPIRING'
  | 'EXPIRED'
  | 'SUSPENDED'
  | 'REJECTED';

export interface Vendor {
  id: string;
  legalName: string;
  tradeName: string;
  ownerUid: string;
  gstin?: string;
  status: VendorStatus;
  jurisdictionId: JurisdictionCode;
  complianceStatus: 'PENDING' | 'APPROVED' | 'REQUIRES_ATTENTION' | 'REVOKED';
  createdAt: string;
  updatedAt: string;
}

export interface OutletHours {
  open: string;  // e.g. "10:00"
  close: string; // e.g. "22:00"
  daysOpen: string[]; // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Outlet {
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
  hours: OutletHours;
  phone: string;
  images: string[];
  rating?: number;
  createdAt: string;
}

export type LicenceType = 'L-2' | 'L-14A' | 'L-1' | 'L-10E';

export interface Licence {
  id: string;
  outletId: string;
  vendorId: string;
  type: LicenceType;
  number: string;
  issueDate: string;
  expiryDate: string;
  authority: string;
  documentPath: string; // Storage URL or private ref
  documentName?: string;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_INFO';
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export type ProductCategory = 
  | 'Single Malt'
  | 'Whisky'
  | 'Vodka'
  | 'Gin'
  | 'Beer'
  | 'Wine'
  | 'Tequila'
  | 'Rum'
  | 'Liqueur';

export type PackSize = '180ml' | '375ml' | '750ml' | '1000ml' | ' Can 330ml' | ' Can 500ml' | ' Pint 330ml' | ' Bottle 650ml';

export interface Product {
  id: string;
  brandId: string;
  brandName: string;
  productName: string;
  category: ProductCategory;
  packSizes: PackSize[];
  abv: number; // e.g. 42.8
  countryOfOrigin: string;
  description: string;
  imageUrl: string;
  mrpGuide: Record<string, number>; // PackSize -> price in INR
  status: 'ACTIVE' | 'DISCONTINUED';
}

export type AvailabilityStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface OutletProduct {
  id: string;
  outletId: string;
  productId: string;
  packSize: PackSize;
  availabilityStatus: AvailabilityStatus;
  priceIfApproved: number;
  source: 'VENDOR_PORTAL' | 'VERIFIED_SIGNAL' | 'FEED';
  observedAt: string; // ISO Timestamp
}

export type OfferStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'SCHEDULED' | 'LIVE' | 'EXPIRED' | 'REJECTED' | 'NEEDS_INFO';

export interface Offer {
  id: string;
  outletId: string;
  vendorId: string;
  title: string;
  description: string;
  validFrom: string;
  validTo: string;
  status: OfferStatus;
  complianceStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  evidencePath?: string;
  terms: string[];
  productCategory?: ProductCategory;
  brandId?: string;
  createdAt: string;
}

export type CustomerPlanId = 'FREE' | 'PREMIUM' | 'PRO';

export interface MembershipPlan {
  id: CustomerPlanId;
  name: string;
  priceYr: number;
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

export type VendorPlanId = 'BASIC' | 'GROWTH' | 'PREMIUM';

export interface VendorSaaSPlan {
  id: VendorPlanId;
  name: string;
  priceMo: number;
  features: string[];
  maxOutlets: number;
}

export interface VendorSubscription {
  id: string;
  vendorId: string;
  planId: VendorPlanId;
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELLED';
  periodStart: string;
  periodEnd: string;
  orderId: string;
}

export type PlatformOrderType = 'CUSTOMER_MEMBERSHIP' | 'VENDOR_SAAS';
export type PlatformOrderStatus = 'CREATED' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface PlatformOrder {
  id: string;
  uidOrVendorId: string;
  orderType: PlatformOrderType;
  amount: number;
  currency: 'INR';
  status: PlatformOrderStatus;
  planId: string;
  gatewayOrderId: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  providerId: 'RAZORPAY' | 'STRIPE' | 'MOCK_GATEWAY';
  amount: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  webhookVerifiedAt?: string;
  refundStatus?: 'NONE' | 'INITIATED' | 'COMPLETED';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  uid: string;
  type: 'AVAILABILITY' | 'OFFER' | 'MEMBERSHIP' | 'SECURITY' | 'COMPLIANCE' | 'SUPPORT';
  title: string;
  body: string;
  deepLink?: string;
  readAt?: string;
  sentAt: string;
}

export interface SupportTicket {
  id: string;
  createdBy: string;
  creatorName: string;
  creatorRole: UserRole;
  subject: string;
  type: 'OUTLET_REPORT' | 'INCORRECT_STOCK' | 'BILLING' | 'LICENCE_HELP' | 'GENERAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  messages: {
    senderId: string;
    senderName: string;
    message: string;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ContentReport {
  id: string;
  reporterUid: string;
  targetType: 'OUTLET' | 'OFFER' | 'PRODUCT';
  targetId: string;
  reason: string;
  evidenceText?: string;
  status: 'PENDING' | 'REVIEWED' | 'DISMISSED' | 'ACTION_TAKEN';
  createdAt: string;
}

export interface JurisdictionPolicy {
  jurisdiction: JurisdictionCode;
  district: DistrictCode;
  ageGateRequired: boolean;
  minAge: number;
  offerDisplayAllowed: boolean;
  productDisplayAllowed: boolean;
  liquorCheckoutAllowed: boolean;
  liquorPaymentAllowed: boolean;
  reservationAllowed: boolean;
  pickupAllowed: boolean;
  deliveryAllowed: boolean;
  advertisingMode: 'REVIEW_REQUIRED' | 'STRICT_COMPLIANCE' | 'RESTRICTED';
}

export interface FeatureFlags {
  id: string;
  name: string;
  defaultValue: boolean;
  jurisdictionOverrides: Record<string, boolean>;
  licenceOverrides: Record<string, boolean>;
}

export interface AuditLog {
  id: string;
  actorUid: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  beforeState?: any;
  afterState?: any;
  timestamp: string;
  ipAddress?: string;
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
