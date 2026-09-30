import {
  PartnerStore,
  Product,
  EarlyAccessSale,
  BulkOrder,
  Order,
  Vendor,
  Licence,
  Offer,
  AuditLog,
  DistrictCode,
  BulkQuantityTier,
  PlatformOrder,
  CustomerMembership,
  SupportTicket,
  AvailabilityStatus,
} from '../types';
import {
  INITIAL_PARTNER_STORES,
  INITIAL_PRODUCTS,
  INITIAL_EARLY_ACCESS_SALES,
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_VENDORS,
  INITIAL_LICENCES,
  INITIAL_OFFERS,
} from '../utils/seedData';

const STORAGE_KEYS = {
  STORES: 'lsr_partner_stores',
  PRODUCTS: 'lsr_products',
  EARLY_ACCESS: 'lsr_early_access',
  BULK_ORDERS: 'lsr_bulk_orders',
  ORDERS: 'lsr_customer_orders',
  AUDIT_LOGS: 'lsr_audit_logs',
  TICKETS: 'lsr_tickets',
};

class MockBackendStore {
  private partnerStores: PartnerStore[] = [];
  private products: Product[] = [];
  private earlyAccessSales: EarlyAccessSale[] = [];
  private bulkOrders: BulkOrder[] = [];
  private orders: Order[] = [];
  private auditLogs: AuditLog[] = [];
  private tickets: SupportTicket[] = [];
  private licences: Licence[] = INITIAL_LICENCES;

  constructor() {
    this.initStore();
  }

  private initStore() {
    this.partnerStores = this.load(STORAGE_KEYS.STORES, INITIAL_PARTNER_STORES);
    this.products = this.load(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.earlyAccessSales = this.load(STORAGE_KEYS.EARLY_ACCESS, INITIAL_EARLY_ACCESS_SALES);
    this.bulkOrders = this.load(STORAGE_KEYS.BULK_ORDERS, []);
    this.orders = this.load(STORAGE_KEYS.ORDERS, []);
    this.tickets = this.load(STORAGE_KEYS.TICKETS, []);
  }

  private load<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private save<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  // --- PRODUCTS ---
  public getProducts(origin?: 'IMPORTED' | 'LOCAL'): Product[] {
    const list = this.products.map((p) => ({
      ...p,
      mrpGuide: p.mrpGuide || { '750ml': p.regularPrice },
    }));
    if (!origin) return list;
    return list.filter((p) => p.originType === origin);
  }

  public getProductById(id: string): Product | undefined {
    const p = this.products.find((item) => item.id === id);
    if (!p) return undefined;
    return {
      ...p,
      mrpGuide: p.mrpGuide || { '750ml': p.regularPrice },
    };
  }

  // --- PARTNER STORES ---
  public getPartnerStores(district?: DistrictCode): PartnerStore[] {
    if (!district) return this.partnerStores;
    return this.partnerStores.filter((s) => s.district === district);
  }

  public getPartnerStoreById(id: string): PartnerStore | undefined {
    return this.partnerStores.find((s) => s.id === id);
  }

  public getOutlets(district?: DistrictCode): any[] {
    return this.getPartnerStores(district);
  }

  public getOutletById(id: string): any {
    return this.getPartnerStoreById(id);
  }

  public getOutletProducts(outletId?: string): any[] {
    const store = this.getPartnerStoreById(outletId || 'out_1');
    if (!store) return [];
    return Object.entries(store.inventory).map(([productId, inv]) => ({
      id: `op_${productId}`,
      outletId: store.id,
      productId,
      packSize: '750ml',
      availabilityStatus: inv.availabilityStatus,
      priceIfApproved: inv.storePrice,
      source: 'VERIFIED_SIGNAL',
      observedAt: inv.observedAt,
    }));
  }

  public updateStockAvailability(outletId: string, productId: string, packSize: string, status: AvailabilityStatus, price: number) {
    const store = this.getPartnerStoreById(outletId);
    if (store) {
      store.inventory[productId] = {
        stock: status === 'OUT_OF_STOCK' ? 0 : 10,
        storePrice: price,
        storeMemberPrice: Math.round(price * 0.85),
        availabilityStatus: status,
        observedAt: new Date().toISOString(),
      };
      this.save(STORAGE_KEYS.STORES, this.partnerStores);
    }
  }

  // --- EARLY ACCESS SALES ---
  public getEarlyAccessSales(): EarlyAccessSale[] {
    return this.earlyAccessSales;
  }

  // --- BULK ORDERS ---
  public submitBulkOrder(data: {
    customerUid: string;
    customerName: string;
    customerMobile: string;
    eventType: any;
    eventDate: string;
    preferredStoreId: string;
    quantityTier: BulkQuantityTier;
    estimatedBottles: number;
    items: Array<{ productId: string; productName: string; quantity: number }>;
  }): BulkOrder {
    const bulkOrder: BulkOrder = {
      id: `bulk_${Date.now()}`,
      ...data,
      status: 'PENDING_QUOTE',
      createdAt: new Date().toISOString(),
    };
    this.bulkOrders.unshift(bulkOrder);
    this.save(STORAGE_KEYS.BULK_ORDERS, this.bulkOrders);
    return bulkOrder;
  }

  public getBulkOrders(): BulkOrder[] {
    return this.bulkOrders;
  }

  // --- ORDERS & PICKUP CONFIRMATION ---
  public createPickupOrder(data: {
    customerUid: string;
    customerMobile: string;
    storeId: string;
    storeName: string;
    storeAddress: string;
    items: Array<{ productId: string; productName: string; quantity: number; pricePaid: number; regularPrice: number }>;
    subtotalRegular: number;
    memberSavings: number;
    totalPayable: number;
  }): Order {
    const pickupCode = `PKP-${Math.floor(100000 + Math.random() * 900000)}`;
    const order: Order = {
      id: `ord_${Date.now()}`,
      ...data,
      status: 'CONFIRMED_FOR_PICKUP',
      pickupCode,
      ageVerified: true,
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(order);
    this.save(STORAGE_KEYS.ORDERS, this.orders);
    return order;
  }

  public getCustomerOrders(customerUid?: string): Order[] {
    if (!customerUid) return this.orders;
    return this.orders.filter((o) => o.customerUid === customerUid);
  }

  // --- SUPPORT TICKETS ---
  public getTickets(): SupportTicket[] {
    return this.tickets.map((t) => ({
      ...t,
      messages: t.messages || [{ message: t.description, timestamp: t.createdAt }],
      updatedAt: t.updatedAt || t.createdAt,
    }));
  }

  public createTicket(createdBy: string, subjectOrCat: string, categoryOrDesc: string, descriptionOrNotes?: string, extraArg?: any): SupportTicket {
    const ticket: SupportTicket = {
      id: `tck_${Date.now()}`,
      createdBy,
      subject: subjectOrCat,
      category: categoryOrDesc,
      description: descriptionOrNotes || categoryOrDesc,
      status: 'OPEN',
      messages: [{ message: descriptionOrNotes || categoryOrDesc, timestamp: new Date().toISOString() }],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.tickets.unshift(ticket);
    this.save(STORAGE_KEYS.TICKETS, this.tickets);
    return ticket;
  }

  // --- VENDORS, LICENCES & OFFERS ---
  public getVendors(): Vendor[] {
    return INITIAL_VENDORS;
  }

  public submitVendorApplication(data: any) {
    return {
      vendor: INITIAL_VENDORS[0],
      outlet: INITIAL_PARTNER_STORES[0],
      licence: INITIAL_LICENCES[0],
    };
  }

  public getLicences(): Licence[] {
    return this.licences;
  }

  public moderateLicence(id: string, status: 'APPROVED' | 'REJECTED', notes: string, actorUid: string): Licence {
    const lic = this.licences.find((l) => l.id === id);
    if (lic) {
      lic.verificationStatus = status;
      lic.reviewerNotes = notes;
      lic.reviewedBy = actorUid;
      lic.reviewedAt = new Date().toISOString();
    }
    return lic || INITIAL_LICENCES[0];
  }

  public getOffers(status?: string): Offer[] {
    if (!status) return INITIAL_OFFERS;
    return INITIAL_OFFERS.filter((o) => o.status === status);
  }

  public submitOffer(outletIdOrData: any, title?: string, description?: string, terms?: any, extra?: any): Offer {
    const offer: Offer = {
      id: `off_${Date.now()}`,
      outletId: typeof outletIdOrData === 'string' ? outletIdOrData : outletIdOrData.outletId || 'out_1',
      vendorId: 'v1',
      title: title || outletIdOrData.title || 'Special Member Offer',
      description: description || outletIdOrData.description || 'Exclusive partner store promotion',
      validFrom: new Date().toISOString().split('T')[0],
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'LIVE',
      complianceStatus: 'APPROVED',
      terms: Array.isArray(terms) ? terms : [terms || 'Permitted platform offer only.'],
      productCategory: 'Single Malt',
      createdAt: new Date().toISOString(),
    };
    INITIAL_OFFERS.unshift(offer);
    return offer;
  }

  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public createPlatformOrder(uidOrVendorId: string, type: 'CUSTOMER_MEMBERSHIP' | 'VENDOR_SAAS', planId: string, amount: number): PlatformOrder {
    return {
      id: `ord_mem_${Date.now()}`,
      uidOrVendorId,
      orderType: type,
      amount,
      currency: 'INR',
      status: 'CREATED',
      planId,
      gatewayOrderId: `rzp_order_${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
    };
  }

  public simulatePaymentWebhook(orderId: string): { order: PlatformOrder; membership?: CustomerMembership } {
    const order: PlatformOrder = {
      id: orderId,
      uidOrVendorId: 'user_cust_1',
      orderType: 'CUSTOMER_MEMBERSHIP',
      amount: 499,
      currency: 'INR',
      status: 'PAID',
      planId: 'PREMIUM',
      gatewayOrderId: 'rzp_order_mock',
      createdAt: new Date().toISOString(),
    };
    const membership: CustomerMembership = {
      id: `mem_${Date.now()}`,
      uid: 'user_cust_1',
      planId: 'PREMIUM',
      status: 'ACTIVE',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      orderId: order.id,
    };
    return { order, membership };
  }
}

export const mockBackend = new MockBackendStore();
