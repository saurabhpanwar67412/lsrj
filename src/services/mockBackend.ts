import {
  Outlet,
  Product,
  OutletProduct,
  Offer,
  Vendor,
  Licence,
  CustomerMembership,
  VendorSubscription,
  PlatformOrder,
  PaymentTransaction,
  NotificationItem,
  SupportTicket,
  AuditLog,
  CustomerPlanId,
  VendorPlanId,
  AvailabilityStatus,
  OfferStatus,
  DistrictCode,
  UserProfile,
} from '../types';
import {
  INITIAL_VENDORS,
  INITIAL_LICENCES,
  INITIAL_OUTLETS,
  INITIAL_PRODUCTS,
  INITIAL_OUTLET_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_TICKETS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ANALYTICS,
} from '../utils/seedData';

const STORAGE_KEYS = {
  OUTLETS: 'lsr_outlets',
  VENDORS: 'lsr_vendors',
  LICENCES: 'lsr_licences',
  PRODUCTS: 'lsr_products',
  OUTLET_PRODUCTS: 'lsr_outlet_products',
  OFFERS: 'lsr_offers',
  MEMBERSHIPS: 'lsr_memberships',
  SUBSCRIPTIONS: 'lsr_subscriptions',
  ORDERS: 'lsr_orders',
  NOTIFICATIONS: 'lsr_notifications',
  TICKETS: 'lsr_tickets',
  AUDIT_LOGS: 'lsr_audit_logs',
};

class MockBackendStore {
  private outlets: Outlet[] = [];
  private vendors: Vendor[] = [];
  private licences: Licence[] = [];
  private products: Product[] = [];
  private outletProducts: OutletProduct[] = [];
  private offers: Offer[] = [];
  private memberships: CustomerMembership[] = [];
  private subscriptions: VendorSubscription[] = [];
  private orders: PlatformOrder[] = [];
  private notifications: NotificationItem[] = [];
  private tickets: SupportTicket[] = [];
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.initStore();
  }

  private initStore() {
    this.outlets = this.load(STORAGE_KEYS.OUTLETS, INITIAL_OUTLETS);
    this.vendors = this.load(STORAGE_KEYS.VENDORS, INITIAL_VENDORS);
    this.licences = this.load(STORAGE_KEYS.LICENCES, INITIAL_LICENCES);
    this.products = this.load(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.outletProducts = this.load(STORAGE_KEYS.OUTLET_PRODUCTS, INITIAL_OUTLET_PRODUCTS);
    this.offers = this.load(STORAGE_KEYS.OFFERS, INITIAL_OFFERS);
    this.memberships = this.load(STORAGE_KEYS.MEMBERSHIPS, []);
    this.subscriptions = this.load(STORAGE_KEYS.SUBSCRIPTIONS, []);
    this.orders = this.load(STORAGE_KEYS.ORDERS, []);
    this.notifications = this.load(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'n1',
        uid: 'user_cust_1',
        type: 'AVAILABILITY',
        title: 'Glenfiddich 12Y Stock Alert',
        body: 'L1 Discovery Outlet Cyber Hub updated availability to In Stock 15 mins ago.',
        sentAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
    ]);
    this.tickets = this.load(STORAGE_KEYS.TICKETS, INITIAL_TICKETS);
    this.auditLogs = this.load(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
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

  // --- OUTLETS & SEARCH ---
  public getOutlets(district?: DistrictCode): Outlet[] {
    if (!district) return this.outlets;
    return this.outlets.filter((o) => o.district === district);
  }

  public getOutletById(id: string): Outlet | undefined {
    return this.outlets.find((o) => o.id === id);
  }

  // --- PRODUCTS & INVENTORY ---
  public getProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public getOutletProducts(outletId?: string): OutletProduct[] {
    if (!outletId) return this.outletProducts;
    return this.outletProducts.filter((op) => op.outletId === outletId);
  }

  public updateStockAvailability(
    outletId: string,
    productId: string,
    packSize: any,
    status: AvailabilityStatus,
    price: number
  ) {
    let existing = this.outletProducts.find(
      (op) => op.outletId === outletId && op.productId === productId && op.packSize === packSize
    );
    if (existing) {
      existing.availabilityStatus = status;
      existing.priceIfApproved = price;
      existing.observedAt = new Date().toISOString();
    } else {
      const newOp: OutletProduct = {
        id: `op_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
        outletId,
        productId,
        packSize,
        availabilityStatus: status,
        priceIfApproved: price,
        source: 'VENDOR_PORTAL',
        observedAt: new Date().toISOString(),
      };
      this.outletProducts.push(newOp);
    }
    this.save(STORAGE_KEYS.OUTLET_PRODUCTS, this.outletProducts);
  }

  // --- OFFERS & MODERATION ---
  public getOffers(status?: OfferStatus): Offer[] {
    if (!status) return this.offers;
    return this.offers.filter((o) => o.status === status);
  }

  public submitOffer(vendorId: string, outletId: string, title: string, description: string, terms: string[], category?: any): Offer {
    const newOffer: Offer = {
      id: `off_${Date.now()}`,
      outletId,
      vendorId,
      title,
      description,
      validFrom: new Date().toISOString().split('T')[0],
      validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'SUBMITTED',
      complianceStatus: 'PENDING',
      terms,
      productCategory: category,
      createdAt: new Date().toISOString(),
    };
    this.offers.unshift(newOffer);
    this.save(STORAGE_KEYS.OFFERS, this.offers);
    return newOffer;
  }

  public moderateOffer(offerId: string, approve: boolean, actorUid: string) {
    const offer = this.offers.find((o) => o.id === offerId);
    if (offer) {
      offer.status = approve ? 'LIVE' : 'REJECTED';
      offer.complianceStatus = approve ? 'APPROVED' : 'REJECTED';
      this.save(STORAGE_KEYS.OFFERS, this.offers);

      this.addAuditLog(actorUid, 'compliance_officer', approve ? 'APPROVE_OFFER' : 'REJECT_OFFER', 'OFFER', offerId);
    }
  }

  // --- VENDORS & LICENCES ---
  public getVendors(): Vendor[] {
    return this.vendors;
  }

  public getLicences(): Licence[] {
    return this.licences;
  }

  public submitVendorApplication(data: {
    tradeName: string;
    legalName: string;
    address: string;
    district: DistrictCode;
    licenceType: any;
    licenceNumber: string;
    ownerUid: string;
    documentName?: string;
  }): { vendor: Vendor; outlet: Outlet; licence: Licence } {
    const vId = `v_${Date.now()}`;
    const oId = `out_${Date.now()}`;
    const lId = `lic_${Date.now()}`;

    const vendor: Vendor = {
      id: vId,
      legalName: data.legalName,
      tradeName: data.tradeName,
      ownerUid: data.ownerUid,
      status: 'SUBMITTED',
      jurisdictionId: 'HR',
      complianceStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const outlet: Outlet = {
      id: oId,
      vendorId: vId,
      name: data.tradeName,
      address: data.address,
      geoPoint: data.district === 'Gurugram' ? { lat: 28.4595, lng: 77.0266 } : { lat: 28.4089, lng: 77.3178 },
      district: data.district,
      zone: `${data.district} Central`,
      licenceIds: [lId],
      status: 'INACTIVE',
      isVerified: false,
      hours: { open: '10:00', close: '23:00', daysOpen: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      phone: '+91 98000 00000',
      images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80'],
      createdAt: new Date().toISOString(),
    };

    const licence: Licence = {
      id: lId,
      outletId: oId,
      vendorId: vId,
      type: data.licenceType,
      number: data.licenceNumber,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: '2027-03-31',
      authority: 'Excise & Taxation Department, Govt of Haryana',
      documentPath: `licences/${vId}_doc.pdf`,
      documentName: data.documentName || 'Licence_Upload.pdf',
      verificationStatus: 'PENDING',
    };

    this.vendors.unshift(vendor);
    this.outlets.unshift(outlet);
    this.licences.unshift(licence);

    this.save(STORAGE_KEYS.VENDORS, this.vendors);
    this.save(STORAGE_KEYS.OUTLETS, this.outlets);
    this.save(STORAGE_KEYS.LICENCES, this.licences);

    return { vendor, outlet, licence };
  }

  public moderateLicence(licenceId: string, approve: boolean, reviewerNotes: string, reviewerUid: string) {
    const licence = this.licences.find((l) => l.id === licenceId);
    if (licence) {
      licence.verificationStatus = approve ? 'APPROVED' : 'REJECTED';
      licence.reviewerNotes = reviewerNotes;
      licence.reviewedBy = reviewerUid;
      licence.reviewedAt = new Date().toISOString();

      const outlet = this.outlets.find((o) => o.id === licence.outletId);
      if (outlet && approve) {
        outlet.isVerified = true;
        outlet.status = 'ACTIVE';
      }

      const vendor = this.vendors.find((v) => v.id === licence.vendorId);
      if (vendor && approve) {
        vendor.status = 'ACTIVE';
        vendor.complianceStatus = 'APPROVED';
      }

      this.save(STORAGE_KEYS.LICENCES, this.licences);
      this.save(STORAGE_KEYS.OUTLETS, this.outlets);
      this.save(STORAGE_KEYS.VENDORS, this.vendors);

      this.addAuditLog(reviewerUid, 'compliance_officer', approve ? 'APPROVE_LICENCE' : 'REJECT_LICENCE', 'LICENCE', licenceId);
    }
  }

  // --- MEMBERSHIP & PAYMENT GATEWAY SIMULATOR ---
  public createPlatformOrder(uidOrVendorId: string, type: 'CUSTOMER_MEMBERSHIP' | 'VENDOR_SAAS', planId: string, amount: number): PlatformOrder {
    const order: PlatformOrder = {
      id: `ord_${Date.now()}`,
      uidOrVendorId,
      orderType: type,
      amount,
      currency: 'INR',
      status: 'CREATED',
      planId,
      gatewayOrderId: `rzp_order_${Math.random().toString(36).substring(2, 10)}`,
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(order);
    this.save(STORAGE_KEYS.ORDERS, this.orders);
    return order;
  }

  public simulatePaymentWebhook(orderId: string): { order: PlatformOrder; membership?: CustomerMembership } {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');

    order.status = 'PAID';
    this.save(STORAGE_KEYS.ORDERS, this.orders);

    if (order.orderType === 'CUSTOMER_MEMBERSHIP') {
      const membership: CustomerMembership = {
        id: `mem_${Date.now()}`,
        uid: order.uidOrVendorId,
        planId: order.planId as CustomerPlanId,
        status: 'ACTIVE',
        startedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        orderId: order.id,
      };
      this.memberships.unshift(membership);
      this.save(STORAGE_KEYS.MEMBERSHIPS, this.memberships);
      return { order, membership };
    }

    return { order };
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  public addAuditLog(actorUid: string, role: any, action: string, entityType: string, entityId: string) {
    const log: AuditLog = {
      id: `log_${Date.now()}`,
      actorUid,
      actorRole: role,
      action,
      entityType,
      entityId,
      timestamp: new Date().toISOString(),
    };
    this.auditLogs.unshift(log);
    this.save(STORAGE_KEYS.AUDIT_LOGS, this.auditLogs);
  }

  // --- SUPPORT TICKETS ---
  public getTickets(): SupportTicket[] {
    return this.tickets;
  }

  public createTicket(createdBy: string, name: string, subject: string, message: string, type: any): SupportTicket {
    const ticket: SupportTicket = {
      id: `t_${Date.now()}`,
      createdBy,
      creatorName: name,
      creatorRole: 'customer',
      subject,
      type,
      status: 'OPEN',
      priority: 'MEDIUM',
      messages: [
        {
          senderId: createdBy,
          senderName: name,
          message,
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tickets.unshift(ticket);
    this.save(STORAGE_KEYS.TICKETS, this.tickets);
    return ticket;
  }

  // --- EMERGENCY CONTROLS ---
  public toggleOutletSuspension(outletId: string, suspend: boolean, actorUid: string) {
    const outlet = this.outlets.find((o) => o.id === outletId);
    if (outlet) {
      outlet.status = suspend ? 'SUSPENDED' : 'ACTIVE';
      this.save(STORAGE_KEYS.OUTLETS, this.outlets);
      this.addAuditLog(actorUid, 'super_admin', suspend ? 'SUSPEND_OUTLET' : 'UNSUSPEND_OUTLET', 'OUTLET', outletId);
    }
  }
}

export const mockBackend = new MockBackendStore();
