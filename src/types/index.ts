export type District = 'Gurugram' | 'Faridabad';

export type PlaceType = 'L-2 Vend' | 'L-14A Vend' | 'Partner Aahata' | 'BYOB Garden' | 'Premium Lounge';

export interface VendAahata {
  id: string;
  name: string;
  type: PlaceType;
  licenseNumber: string;
  district: District;
  sector: string;
  address: string;
  landmark: string;
  rating: number;
  reviewsCount: number;
  timing: {
    open: string;
    close: string;
  };
  phone: string;
  images: string[];
  amenities: string[];
  foodDiscountPercent: number; // For members (10-15%)
  discountText: string;
  hasScreening: boolean;
  corkagePolicy: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  featured?: boolean;
}

export type LiquorCategory = 
  | 'Single Malt'
  | 'Scotch Whisky'
  | 'Blended Scotch'
  | 'Japanese Whisky'
  | 'Tequila'
  | 'Gin'
  | 'Vodka'
  | 'Champagne'
  | 'Beer'
  | 'Craft Beer';

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface LiquorBrand {
  id: string;
  name: string;
  brand: string;
  category: string;
  origin: string;
  volume: string;
  abv: string;
  officialMrp: number;
  indicativePrice: number;
  image: string;
  tastingNotes: string[];
  description: string;
  overallStockStatus: StockStatus;
  overallStatus: string;
  availableVendCount: number;
  nearbyVends: {
    vendId: string;
    vendName: string;
    sector: string;
    distanceKm: number;
    stockStatus: StockStatus;
    updatedMinsAgo: number;
  }[];
  availableVends: {
    vendId: string;
    vendName: string;
    distanceKm: number;
    status: string;
  }[];
}

export interface AahataDeal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  aahataId: string;
  aahataName: string;
  venueName: string;
  sector: string;
  district: District;
  voucherPrice: number;
  price: number;
  coverValue: number;
  worthValue: number;
  discountTag: string;
  validity: string;
  validTill: string;
  tags: string[];
  perks: string[];
  image: string;
  terms: string[];
  isLiveScreening?: boolean;
  memberOnly?: boolean;
}

export type MembershipTierId = 'GUEST' | 'BASIC_VIP' | 'PRIME_ACCESS' | 'CORPORATE_PASS' | 'basic' | 'prime' | 'corporate';

export interface MembershipPlan {
  id: MembershipTierId;
  name: string;
  price: number;
  duration: string;
  tagline: string;
  badge: string;
  highlightColor: string;
  popular?: boolean;
  perks: string[];
  features: string[];
}

export interface UserSession {
  mobile: string;
  isAgeVerified: boolean;
  membershipTier: MembershipTierId;
  membershipExpiry?: string;
  name?: string;
}

export interface BulkInquiry {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  contactName?: string;
  contactPhone?: string;
  eventType: string;
  eventDate: string;
  district?: District;
  venueLocation?: string;
  guestCount?: number;
  approxGuests?: number;
  estimatedBottles?: number;
  preferredCategories?: string[];
  selectedCategories?: string[];
  preferredVendId?: string;
  l50PermitRequired?: boolean;
  specialNotes?: string;
  additionalNotes?: string;
  createdAt?: string;
  submittedAt?: string;
  status: string;
}

export interface TableBooking {
  id: string;
  venueId?: string;
  venueName?: string;
  aahataId?: string;
  aahataName?: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  customerName?: string;
  customerPhone?: string;
  userName?: string;
  userMobile?: string;
  bookingRef?: string;
  specialRequests?: string;
  isConfirmed?: boolean;
  status?: string;
  createdAt?: string;
}

export interface VoucherOrder {
  id: string;
  dealId: string;
  dealTitle: string;
  venueName: string;
  pricePaid: number;
  foodCreditValue: number;
  purchasedAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'REDEEMED' | 'EXPIRED';
  userMobile: string;
}
