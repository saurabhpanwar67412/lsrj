import { VendAahata, LiquorBrand, AahataDeal, MembershipPlan } from '../types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'BASIC_VIP',
    name: 'Basic VIP',
    price: 499,
    duration: 'year',
    tagline: 'Essential NightLife Discovery',
    badge: 'Discovery Tier',
    highlightColor: 'from-slate-400 to-slate-200',
    popular: false,
    perks: [
      'Interactive Map of all Licensed L-2 / L-14A Vends in Gurugram & Faridabad',
      'Real-time bottle stock status locator at nearby retail vends',
      'Verified Aahata timings, amenities, and corkage policy guide',
      'Save favourite vends & receive stock arrival alerts',
      'Community reviews & verified security ratings'
    ],
    features: [
      'Interactive Map of all Licensed L-2 / L-14A Vends in Gurugram & Faridabad',
      'Real-time bottle stock status locator at nearby retail vends',
      'Verified Aahata timings, amenities, and corkage policy guide',
      'Save favourite vends & receive stock arrival alerts',
      'Community reviews & verified security ratings'
    ]
  },
  {
    id: 'PRIME_ACCESS',
    name: 'Prime Access',
    price: 1499,
    duration: 'year',
    tagline: 'Best for Regular NightLife & BYOB Groups',
    badge: 'Most Popular',
    highlightColor: 'from-amber-400 via-yellow-500 to-amber-600',
    popular: true,
    perks: [
      'All Basic VIP features included',
      'Flat 10% to 15% OFF on Food, Mixers, & Chakhna at 40+ Partner Aahatas',
      'Priority Table Reservations with Zero Wait Times during peak weekends',
      'Pre-Sale Food & Experience Vouchers (Pay ₹500 get ₹750 value)',
      'Complimentary Ice Bucket & Mixers upgrade on table bookings',
      'Direct L-2 Bulk Order Quotation Desk access for parties'
    ],
    features: [
      'All Basic VIP features included',
      'Flat 10% to 15% OFF on Food, Mixers, & Chakhna at 40+ Partner Aahatas',
      'Priority Table Reservations with Zero Wait Times during peak weekends',
      'Pre-Sale Food & Experience Vouchers (Pay ₹500 get ₹750 value)',
      'Complimentary Ice Bucket & Mixers upgrade on table bookings',
      'Direct L-2 Bulk Order Quotation Desk access for parties'
    ]
  },
  {
    id: 'CORPORATE_PASS',
    name: 'Corporate Pass',
    price: 4999,
    duration: 'year',
    tagline: 'Enterprise & Multi-Seat Nightlife Privilege',
    badge: 'Executive',
    highlightColor: 'from-purple-400 via-pink-500 to-amber-400',
    popular: false,
    perks: [
      'All Prime Access features for up to 6 team members/seats',
      'Flat 15% to 20% OFF on all Aahata billings across NCR partner network',
      'Dedicated Event & Wedding Bulk Concierge Desk for L-2 license bulk quotes',
      'Reserved VIP Seating & Private Cabana booking privileges',
      'Complimentary Live Match Screening front-row table guarantee',
      'Priority WhatsApp Concierge support 24x7'
    ],
    features: [
      'All Prime Access features for up to 6 team members/seats',
      'Flat 15% to 20% OFF on all Aahata billings across NCR partner network',
      'Dedicated Event & Wedding Bulk Concierge Desk for L-2 license bulk quotes',
      'Reserved VIP Seating & Private Cabana booking privileges',
      'Complimentary Live Match Screening front-row table guarantee',
      'Priority WhatsApp Concierge support 24x7'
    ]
  }
];

export const VENDS_AAHATAS_DATA: VendAahata[] = [
  {
    id: 'vend_1',
    name: 'Lakeforest L-2 Premium Reserve Vend',
    type: 'L-2 Vend',
    licenseNumber: 'HR-GUR-L2-2025-0084',
    district: 'Gurugram',
    sector: 'Cyber Hub / DLF Phase 2',
    address: 'Near DLF Cyber Hub, Ground Floor Commercial Complex, Gurugram, Haryana 122002',
    landmark: 'Opposite DLF Cyber City Tower B',
    rating: 4.8,
    reviewsCount: 640,
    timing: { open: '09:00 AM', close: '11:59 PM' },
    phone: '+91 98110 44211',
    images: [
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Walk-in Chilled Cellar', 'Credit/UPI Accepted', 'Valet Parking', 'Wheelchair Access'],
    foodDiscountPercent: 0,
    discountText: 'Special in-store tasting invites for VIP members',
    hasScreening: false,
    corkagePolicy: 'Retail Vend Only. Adjacent partner Aahata 50m walk.',
    distanceKm: 0.8,
    latitude: 28.4952,
    longitude: 77.0886,
    coordinates: { lat: 28.4952, lng: 77.0886 },
    description: 'Premier L-2 foreign liquor boutique stocking 450+ imported labels, rare single malts, and temperature-controlled wine room.',
    featured: true
  },
  {
    id: 'aahata_1',
    name: 'The Foundry BYOB & Live Aahata Garden',
    type: 'Partner Aahata',
    licenseNumber: 'HR-GUR-AH-2025-0112',
    district: 'Gurugram',
    sector: 'Sector 29 Hub',
    address: 'SCO 28-30, Leisure Valley Road, Sector 29, Gurugram, Haryana 122001',
    landmark: 'Behind IFFCO Chowk Metro Station',
    rating: 4.9,
    reviewsCount: 1120,
    timing: { open: '01:00 PM', close: '02:00 AM' },
    phone: '+91 98188 77610',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Live Sports Projector', 'Tandoor Grill', 'Misting Coolers', 'Live Acoustic Band', 'Cabana Seating'],
    foodDiscountPercent: 15,
    discountText: 'Flat 15% OFF Food, Chakhna & Ice Buckets',
    hasScreening: true,
    corkagePolicy: 'Zero Corkage for legal sealed bottles purchased from adjoining L-2/L-14A vends.',
    distanceKm: 1.4,
    latitude: 28.4682,
    longitude: 77.0632,
    coordinates: { lat: 28.4682, lng: 77.0632 },
    description: 'Flagship open-air dining aahata featuring 200-inch 4K sports projector, live woodfired tandoor, and priority VIP cabanas.',
    featured: true
  },
  {
    id: 'aahata_2',
    name: 'Verandah Backyard Aahata & Grill',
    type: 'BYOB Garden',
    licenseNumber: 'HR-GUR-AH-2025-0045',
    district: 'Gurugram',
    sector: 'Golf Course Extension Road',
    address: 'Urban Estate, Sector 65, Golf Course Ext Road, Gurugram, Haryana 122018',
    landmark: 'Next to Worldmark Gurgaon',
    rating: 4.7,
    reviewsCount: 890,
    timing: { open: '12:00 PM', close: '01:30 AM' },
    phone: '+91 98100 23450',
    images: [
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Lush Green Lawn', 'Brick Oven Pizza', 'DJ On Weekends', 'Valet', 'Pet Friendly'],
    foodDiscountPercent: 12,
    discountText: 'Flat 12% OFF Food & Mixers',
    hasScreening: true,
    corkagePolicy: 'BYOB permitted under Haryana Excise premises norms.',
    distanceKm: 2.9,
    latitude: 28.4012,
    longitude: 77.0754,
    coordinates: { lat: 28.4012, lng: 77.0754 },
    description: 'Sprawling 1-acre landscaped lawn with live grills, artisanal pizzas, and pet-friendly cabana tables under fairy lights.',
    featured: true
  },
  {
    id: 'vend_2',
    name: 'Discovery World L-2 Vend — Golf Course Road',
    type: 'L-2 Vend',
    licenseNumber: 'HR-GUR-L2-2025-0099',
    district: 'Gurugram',
    sector: 'Sector 54 / Golf Course Rd',
    address: 'Plaza 54, Sector 54 Metro Pillar 182, Gurugram, Haryana 122011',
    landmark: 'Opposite DLF The Crest',
    rating: 4.8,
    reviewsCount: 520,
    timing: { open: '09:00 AM', close: '11:59 PM' },
    phone: '+91 99102 33411',
    images: [
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Imported Rare Malts Desk', 'Cigar Room', 'Card / UPI Only', 'Chilled Vault'],
    foodDiscountPercent: 0,
    discountText: 'Exclusive priority stock reservation desk for VIP members',
    hasScreening: false,
    corkagePolicy: 'Official Retail Vend only.',
    distanceKm: 3.1,
    latitude: 28.4358,
    longitude: 77.1022,
    coordinates: { lat: 28.4358, lng: 77.1022 },
    description: 'Specializes in vintage single malts, Japanese whiskies, and rare tequila expressions with verified excise holograms.',
    featured: false
  },
  {
    id: 'aahata_3',
    name: 'Machan Village Theme Aahata',
    type: 'Partner Aahata',
    licenseNumber: 'HR-GUR-AH-2025-0210',
    district: 'Gurugram',
    sector: 'Sohna Road',
    address: 'Near Subhash Chowk, Sohna Road, Gurugram, Haryana 122001',
    landmark: 'Beside Omaxe Celebration Mall',
    rating: 4.6,
    reviewsCount: 780,
    timing: { open: '02:00 PM', close: '01:00 AM' },
    phone: '+91 98119 55667',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rooftop Bamboo Machan', 'Live Barbeque', 'Screening Area', 'AC Dining Section'],
    foodDiscountPercent: 15,
    discountText: 'Flat 15% OFF Food + Free Chakhna Refills',
    hasScreening: true,
    corkagePolicy: 'Haryana Aahata authorized dining facility with BYOB.',
    distanceKm: 4.2,
    latitude: 28.4215,
    longitude: 77.0392,
    coordinates: { lat: 28.4215, lng: 77.0392 },
    description: 'Rustic multi-level machan dining with authentic clay oven kebabs, soothing mist coolers, and cricket match screenings.',
    featured: false
  },
  {
    id: 'vend_3',
    name: 'Grand Reserve L-2 Vend — Sector 15 Faridabad',
    type: 'L-2 Vend',
    licenseNumber: 'HR-FAR-L2-2025-0041',
    district: 'Faridabad',
    sector: 'Sector 15 Market',
    address: 'SCF 14-16, Main Commercial Market, Sector 15, Faridabad, Haryana 121007',
    landmark: 'Near Sector 15 Community Centre',
    rating: 4.7,
    reviewsCount: 450,
    timing: { open: '09:00 AM', close: '11:30 PM' },
    phone: '+91 98180 88221',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Walk-in Spirits Chamber', 'Digital Invoice', 'Curbside Car Delivery to Trunk'],
    foodDiscountPercent: 0,
    discountText: 'VIP Fast-track counter for members',
    hasScreening: false,
    corkagePolicy: 'Licensed retail vend.',
    distanceKm: 5.6,
    latitude: 28.3962,
    longitude: 77.3178,
    coordinates: { lat: 28.3962, lng: 77.3178 },
    description: 'Faridabads largest licensed L-2 outlet with dedicated champagne chiller and bulk party consultation counter.',
    featured: true
  },
  {
    id: 'aahata_4',
    name: 'The Royal Cellar Courtyard & Aahata',
    type: 'Partner Aahata',
    licenseNumber: 'HR-FAR-AH-2025-0089',
    district: 'Faridabad',
    sector: 'NIT 1 / Mathura Road',
    address: 'Near Neelam Flyover, NIT 1, Faridabad, Haryana 121001',
    landmark: 'Next to Bata Chowk Metro',
    rating: 4.7,
    reviewsCount: 610,
    timing: { open: '12:30 PM', close: '01:00 AM' },
    phone: '+91 98101 99201',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Lounge Lighting', 'Tandoor & Chinese Chakhna', 'Valet', 'Live DJ Nights'],
    foodDiscountPercent: 10,
    discountText: 'Flat 10% OFF Dining Bills',
    hasScreening: true,
    corkagePolicy: 'Bring your beverage from adjacent licensed vend; zero corkage.',
    distanceKm: 6.8,
    latitude: 28.3812,
    longitude: 77.3091,
    coordinates: { lat: 28.3812, lng: 77.3091 },
    description: 'Faridabads premier evening BYOB courtyard with high-energy lounge acoustics, tandoori treats, and private VIP booths.',
    featured: false
  }
];

export const LIQUOR_INVENTORY_DATA: LiquorBrand[] = [
  {
    id: 'liq_1',
    name: 'The Macallan 12 Years Old Double Cask',
    brand: 'The Macallan',
    category: 'Single Malt',
    origin: 'Speyside, Scotland',
    volume: '750 ml',
    abv: '40',
    officialMrp: 6850,
    indicativePrice: 6850,
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Candied Citrus', 'Creamy Butterscotch', 'Warm Oak Spice', 'Honeyed Wood'],
    description: '100% sherry seasoned American and European oak casks create a rich, silky honey and warm spice profile.',
    overallStockStatus: 'IN_STOCK',
    overallStatus: 'In Stock',
    availableVendCount: 8,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'IN_STOCK', updatedMinsAgo: 12 },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', sector: 'Sector 54', distanceKm: 3.1, stockStatus: 'IN_STOCK', updatedMinsAgo: 25 },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', sector: 'Sector 15', distanceKm: 5.6, stockStatus: 'LOW_STOCK', updatedMinsAgo: 45 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'In Stock' },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', distanceKm: 3.1, status: 'In Stock' },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', distanceKm: 5.6, status: 'Low Stock' }
    ]
  },
  {
    id: 'liq_2',
    name: 'Suntory Hibiki Japanese Harmony',
    brand: 'Suntory Hibiki',
    category: 'Japanese Whisky',
    origin: 'Japan',
    volume: '700 ml',
    abv: '43',
    officialMrp: 12500,
    indicativePrice: 12500,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Rose', 'Lychee', 'Rosemary', 'Mizunara Oak', 'White Chocolate'],
    description: 'A harmonious blend of malt and grain whiskies from Yamazaki, Hakushu, and Chita. Extremely sought-after allocation.',
    overallStockStatus: 'LOW_STOCK',
    overallStatus: 'Low Stock',
    availableVendCount: 3,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'LOW_STOCK', updatedMinsAgo: 8 },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', sector: 'Sector 54', distanceKm: 3.1, stockStatus: 'LOW_STOCK', updatedMinsAgo: 18 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'Low Stock' },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', distanceKm: 3.1, status: 'Low Stock' }
    ]
  },
  {
    id: 'liq_3',
    name: 'Clase Azul Tequila Reposado',
    brand: 'Clase Azul',
    category: 'Tequila',
    origin: 'Jalisco, Mexico',
    volume: '750 ml',
    abv: '40',
    officialMrp: 28500,
    indicativePrice: 28500,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Hazelnut', 'Vanilla', 'Cloves', 'Agave Syrup', 'Toasted Oak'],
    description: 'Iconic hand-painted ceramic decanter containing organic blue agave tequila aged 8 months in bourbon casks.',
    overallStockStatus: 'LOW_STOCK',
    overallStatus: 'Low Stock',
    availableVendCount: 2,
    nearbyVends: [
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', sector: 'Sector 54', distanceKm: 3.1, stockStatus: 'LOW_STOCK', updatedMinsAgo: 30 }
    ],
    availableVends: [
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', distanceKm: 3.1, status: 'Low Stock' }
    ]
  },
  {
    id: 'liq_4',
    name: 'Monkey 47 Schwarzwald Dry Gin',
    brand: 'Monkey 47',
    category: 'Gin',
    origin: 'Black Forest, Germany',
    volume: '500 ml',
    abv: '47',
    officialMrp: 5200,
    indicativePrice: 5200,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Cranberries', 'Juniper', 'Citrus Peel', 'Floral Lavender', 'Pepper'],
    description: 'Crafted with 47 botanical ingredients from the Black Forest. Incomparably complex and aromatic craft gin.',
    overallStockStatus: 'IN_STOCK',
    overallStatus: 'In Stock',
    availableVendCount: 14,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'IN_STOCK', updatedMinsAgo: 10 },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', sector: 'Sector 54', distanceKm: 3.1, stockStatus: 'IN_STOCK', updatedMinsAgo: 15 },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', sector: 'Sector 15', distanceKm: 5.6, stockStatus: 'IN_STOCK', updatedMinsAgo: 20 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'In Stock' },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', distanceKm: 3.1, status: 'In Stock' },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', distanceKm: 5.6, status: 'In Stock' }
    ]
  },
  {
    id: 'liq_5',
    name: 'Belvedere Pure Vodka',
    brand: 'Belvedere',
    category: 'Vodka',
    origin: 'Zyrardow, Poland',
    volume: '700 ml',
    abv: '40',
    officialMrp: 3800,
    indicativePrice: 3800,
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Faint Vanilla', 'Soft Cream', 'Black Pepper', 'Clean Almond'],
    description: 'Quadruple-distilled Polish rye vodka blended with purified artesian water. Zero sugar, additives, or gluten.',
    overallStockStatus: 'IN_STOCK',
    overallStatus: 'In Stock',
    availableVendCount: 18,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'IN_STOCK', updatedMinsAgo: 5 },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', sector: 'Sector 15', distanceKm: 5.6, stockStatus: 'IN_STOCK', updatedMinsAgo: 35 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'In Stock' },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', distanceKm: 5.6, status: 'In Stock' }
    ]
  },
  {
    id: 'liq_6',
    name: 'Dom Pérignon Vintage Champagne',
    brand: 'Dom Pérignon',
    category: 'Champagne',
    origin: 'Épernay, France',
    volume: '750 ml',
    abv: '12.5',
    officialMrp: 26000,
    indicativePrice: 26000,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Brioche', 'White Peach', 'Roasted Hazelnut', 'Mineral Chalk', 'Fine Bubbles'],
    description: 'The pinnacle of French luxury. Produced solely in exceptional harvest years from Pinot Noir and Chardonnay grand crus.',
    overallStockStatus: 'LOW_STOCK',
    overallStatus: 'Low Stock',
    availableVendCount: 2,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'LOW_STOCK', updatedMinsAgo: 14 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'Low Stock' }
    ]
  },
  {
    id: 'liq_7',
    name: 'Paul John Nirvana Indian Single Malt',
    brand: 'Paul John',
    category: 'Single Malt',
    origin: 'Goa, India',
    volume: '750 ml',
    abv: '40',
    officialMrp: 2450,
    indicativePrice: 2450,
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Bourbon Oak', 'Fruitcake', 'Caramel Pudding', 'Light Honey'],
    description: 'Award-winning unpeated Indian single malt whisky crafted from 6-row Himalayan barley and aged in char oak.',
    overallStockStatus: 'IN_STOCK',
    overallStatus: 'In Stock',
    availableVendCount: 24,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'IN_STOCK', updatedMinsAgo: 7 },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', sector: 'Sector 54', distanceKm: 3.1, stockStatus: 'IN_STOCK', updatedMinsAgo: 22 },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', sector: 'Sector 15', distanceKm: 5.6, stockStatus: 'IN_STOCK', updatedMinsAgo: 18 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'In Stock' },
      { vendId: 'vend_2', vendName: 'Discovery World L-2 Golf Course Rd', distanceKm: 3.1, status: 'In Stock' },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', distanceKm: 5.6, status: 'In Stock' }
    ]
  },
  {
    id: 'liq_8',
    name: 'Corona Extra Premium Mexican Beer',
    brand: 'Corona',
    category: 'Beer',
    origin: 'Mexico',
    volume: '330 ml (Case of 24)',
    abv: '4.5',
    officialMrp: 4800,
    indicativePrice: 4800,
    image: 'https://images.unsplash.com/photo-1608270192770-341e3d93bf24?auto=format&fit=crop&w=800&q=80',
    tastingNotes: ['Crisp Malt', 'Citrus Lime', 'Refreshing Clean Finish'],
    description: 'Chilled cases available across all partner L-2 vends, perfect for BYOB dining sessions with lime wedges.',
    overallStockStatus: 'IN_STOCK',
    overallStatus: 'In Stock',
    availableVendCount: 35,
    nearbyVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', sector: 'Cyber City', distanceKm: 0.8, stockStatus: 'IN_STOCK', updatedMinsAgo: 3 },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', sector: 'Sector 15', distanceKm: 5.6, stockStatus: 'IN_STOCK', updatedMinsAgo: 11 }
    ],
    availableVends: [
      { vendId: 'vend_1', vendName: 'Lakeforest L-2 Cyber Hub', distanceKm: 0.8, status: 'In Stock' },
      { vendId: 'vend_3', vendName: 'Grand Reserve L-2 Faridabad', distanceKm: 5.6, status: 'In Stock' }
    ]
  }
];

export const AAHATA_DEALS_DATA: AahataDeal[] = [
  {
    id: 'deal_1',
    title: 'Food & Chakhna Cover Voucher',
    subtitle: 'Pay ₹500 & Get ₹750 Bill Credit on All Kitchen Food & Mixers',
    description: 'Pay ₹500 & Get ₹750 Bill Credit on All Kitchen Food & Mixers',
    aahataId: 'aahata_1',
    aahataName: 'The Foundry BYOB & Live Aahata Garden',
    venueName: 'The Foundry BYOB & Live Aahata Garden',
    sector: 'Sector 29, Gurugram',
    district: 'Gurugram',
    voucherPrice: 500,
    price: 500,
    coverValue: 750,
    worthValue: 750,
    discountTag: '33% EXTRA VALUE',
    validity: 'Valid 30 Days from issue • Mon to Sun',
    validTill: 'Valid 30 Days from issue',
    tags: ['Tandoori', 'Kebabs', 'Mixers & Ice', 'Prime Members Only'],
    perks: [
      'Applicable on Food, Ice, Soda, Soft Drinks, and Chakhna menu.',
      'Strictly not redeemable on alcohol (Haryana Excise compliant).',
      'One voucher per table per visit.'
    ],
    terms: [
      'Applicable on Food, Ice, Soda, Soft Drinks, and Chakhna menu.',
      'Strictly not redeemable on alcohol (Haryana Excise compliant).',
      'One voucher per table per visit.'
    ],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    memberOnly: false
  },
  {
    id: 'deal_2',
    title: 'Weekend Live Match Screening VIP Cabana Table',
    subtitle: 'Reserved Front-Row Screen Cabana for 6 Guests + Chakhna Platter',
    description: 'Reserved Front-Row Screen Cabana for 6 Guests + Chakhna Platter',
    aahataId: 'aahata_2',
    aahataName: 'Verandah Backyard Aahata & Grill',
    venueName: 'Verandah Backyard Aahata & Grill',
    sector: 'Golf Course Ext Rd, Gurugram',
    district: 'Gurugram',
    voucherPrice: 1200,
    price: 1200,
    coverValue: 1800,
    worthValue: 1800,
    discountTag: 'VIP RESERVATION',
    validity: 'Matchdays & Weekends 7 PM onwards',
    validTill: 'Matchdays & Weekends',
    tags: ['Live Match', 'Private Cabana', 'Woodfire Pizza', '6 Guests'],
    perks: [
      'Guarantees dedicated private table with direct view of 200-inch screen.',
      'Includes complimentary Chefs Veg/Non-Veg Snack Platter & 2 Soda pitchers.',
      'Advance 2-hour arrival confirmation required.'
    ],
    terms: [
      'Guarantees dedicated private table with direct view of 200-inch screen.',
      'Includes complimentary Chefs Veg/Non-Veg Snack Platter & 2 Soda pitchers.',
      'Advance 2-hour arrival confirmation required.'
    ],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    isLiveScreening: true,
    memberOnly: true
  },
  {
    id: 'deal_3',
    title: 'Tandoori Feast & Unlimited Chakhna Pass',
    subtitle: 'Pay ₹799 & Get ₹1,200 Food Cover with Unlimited Roasted Peanuts & Papad',
    description: 'Pay ₹799 & Get ₹1,200 Food Cover with Unlimited Roasted Peanuts & Papad',
    aahataId: 'aahata_3',
    aahataName: 'Machan Village Theme Aahata',
    venueName: 'Machan Village Theme Aahata',
    sector: 'Sohna Road, Gurugram',
    district: 'Gurugram',
    voucherPrice: 799,
    price: 799,
    coverValue: 1200,
    worthValue: 1200,
    discountTag: 'SAVE ₹401',
    validity: 'Valid all evenings 5 PM to 1 AM',
    validTill: 'Valid all evenings 5 PM to 1 AM',
    tags: ['Clay Oven Tandoor', 'Machan Seating', 'Mixers', 'Family Friendly'],
    perks: [
      'Covers complete kitchen menu items including Dal Makhani, Chicken Tikka.',
      'Unlimited refills of standard complimentary bar snacks.',
      'Valid for 45 days after purchase.'
    ],
    terms: [
      'Covers complete kitchen menu items including Dal Makhani, Chicken Tikka.',
      'Unlimited refills of standard complimentary bar snacks.',
      'Valid for 45 days after purchase.'
    ],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    memberOnly: false
  },
  {
    id: 'deal_4',
    title: 'Faridabad Courtyard Dinner & Mixers Pass',
    subtitle: 'Pay ₹600 & Enjoy ₹900 Cover at NIT-1 Premier Aahata',
    description: 'Pay ₹600 & Enjoy ₹900 Cover at NIT-1 Premier Aahata',
    aahataId: 'aahata_4',
    aahataName: 'The Royal Cellar Courtyard & Aahata',
    venueName: 'The Royal Cellar Courtyard & Aahata',
    sector: 'NIT 1, Faridabad',
    district: 'Faridabad',
    voucherPrice: 600,
    price: 600,
    coverValue: 900,
    worthValue: 900,
    discountTag: '33% MORE FOOD',
    validity: 'Valid 30 Days from issue',
    validTill: 'Valid 30 Days from issue',
    tags: ['Faridabad', 'Courtyard Garden', 'DJ Music', 'Mixers'],
    perks: [
      'Voucher code presented on phone will be adjusted against final food bill.',
      'Valid across all dining sections including AC family lounge.'
    ],
    terms: [
      'Voucher code presented on phone will be adjusted against final food bill.',
      'Valid across all dining sections including AC family lounge.'
    ],
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    memberOnly: false
  }
];

export const mockVendAahatas = VENDS_AAHATAS_DATA;
export const mockLiquorBrands = LIQUOR_INVENTORY_DATA;
export const mockAahataDeals = AAHATA_DEALS_DATA;
export const mockMembershipPlans = MEMBERSHIP_PLANS;
