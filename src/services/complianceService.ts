import { BulkInquiry, TableBooking, VoucherOrder } from '../types';

export const COMPLIANCE_RULES = {
  jurisdiction: 'Haryana (Excise & Taxation Department, Govt. of Haryana)',
  minLegalDrinkingAge: 21,
  onlineAlcoholSaleAllowed: false, // HARD GUARDRAIL: Never sell liquor directly online
  homeDeliveryAllowed: false,       // HARD GUARDRAIL: No home delivery
  corkagePolicy: 'BYOB strictly permitted only in authorized licensed Aahata premises attached to L-2/L-14A vends',
  maxPersonalPossessionLitres: 9,   // Approx 12 bottles of IMFL/Beer per individual in Haryana
  maxBottlesPerPerson: 12,
  disclaimer: 'NightLife Pass is an information, discovery, and Aahata food reservation portal. We do NOT deliver or sell alcohol online. Liquor purchases must be made in-person at licensed vends by individuals aged 21 and above.'
};

export const HARYANA_EXCISE_RULES = COMPLIANCE_RULES;

const STORAGE_KEYS = {
  AGE_CONFIRMED: 'nlp_age_confirmed_21',
  AUTH_SESSION: 'nlp_user_session',
  BOOKINGS: 'nlp_table_bookings',
  BULK_INQUIRIES: 'nlp_bulk_inquiries',
  VOUCHERS: 'nlp_purchased_vouchers'
};

export class ComplianceService {
  public static isAgeVerified(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AGE_CONFIRMED) === 'true';
  }

  public static setAgeVerified(verified: boolean): void {
    if (verified) {
      localStorage.setItem(STORAGE_KEYS.AGE_CONFIRMED, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.AGE_CONFIRMED);
    }
  }

  public static getSavedBookings(): TableBooking[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveBooking(booking: TableBooking): TableBooking {
    const list = this.getSavedBookings();
    list.unshift(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
    return booking;
  }

  public static getBulkInquiries(): BulkInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BULK_INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static submitBulkInquiry(inquiry: BulkInquiry): BulkInquiry {
    const list = this.getBulkInquiries();
    list.unshift(inquiry);
    localStorage.setItem(STORAGE_KEYS.BULK_INQUIRIES, JSON.stringify(list));
    return inquiry;
  }

  public static getPurchasedVouchers(): VoucherOrder[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOUCHERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveVoucher(voucher: VoucherOrder): VoucherOrder {
    const list = this.getPurchasedVouchers();
    list.unshift(voucher);
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(list));
    return voucher;
  }
}

export const saveTableBooking = (booking: TableBooking) => ComplianceService.saveBooking(booking);
export const saveBulkInquiry = (inquiry: BulkInquiry) => ComplianceService.submitBulkInquiry(inquiry);
export const saveVoucherOrder = (voucher: VoucherOrder) => ComplianceService.saveVoucher(voucher);
