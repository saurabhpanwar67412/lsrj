import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, UserPreferences, DistrictCode } from '../types';
import { mockBackend } from '../services/mockBackend';

interface AuthContextType {
  user: UserProfile | null;
  isGuest: boolean;
  preferences: UserPreferences;
  role: UserRole;
  setRole: (role: UserRole) => void;
  sendOTP: (mobile: string) => Promise<boolean>;
  verifyOTP: (mobile: string, otp: string) => Promise<boolean>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleFavouriteOutlet: (outletId: string) => void;
  toggleFavouriteProduct: (productId: string) => void;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
}

const DEFAULT_GUEST_PREFERENCES: UserPreferences = {
  uid: 'guest_user',
  favourites: { outlets: ['out_1'], products: ['p1'], brands: ['b_glenfiddich'] },
  savedSearches: ['Single Malt Gurgaon', 'Corona Beer'],
  notificationSettings: {
    availabilityAlerts: true,
    offerAlerts: true,
    marketingOptIn: false,
    pushEnabled: true,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('lsr_active_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [role, setRoleState] = useState<UserRole>(user ? user.role : 'customer');
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('lsr_user_preferences');
    return saved ? JSON.parse(saved) : DEFAULT_GUEST_PREFERENCES;
  });

  const isGuest = !user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('lsr_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('lsr_active_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lsr_user_preferences', JSON.stringify(preferences));
  }, [preferences]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
    } else {
      // Create temporary profile for role evaluation
      const tempUser: UserProfile = {
        uid: `user_${newRole}_demo`,
        mobile: '+91 98765 43210',
        role: newRole,
        displayName: getRoleDisplayName(newRole),
        eligibilityStatus: 'CONFIRMED_21_PLUS',
        status: 'active',
        jurisdiction: 'HR',
        district: 'Gurugram',
        consentVersion: 'v2.0_2026',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setUser(tempUser);
    }
  };

  const sendOTP = async (mobile: string): Promise<boolean> => {
    // Simulate Firebase Phone Auth OTP trigger
    await new Promise((res) => setTimeout(res, 600));
    return true;
  };

  const verifyOTP = async (mobile: string, otp: string): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 800));
    if (otp !== '123456' && otp !== '000000') {
      // Mock bypass key '123456'
      if (otp.length !== 6) return false;
    }

    const authenticatedUser: UserProfile = {
      uid: `user_${Date.now()}`,
      mobile,
      role: 'customer',
      displayName: `Member ${mobile.slice(-4)}`,
      eligibilityStatus: 'CONFIRMED_21_PLUS',
      status: 'active',
      jurisdiction: 'HR',
      district: 'Gurugram',
      consentVersion: 'v2.0_2026',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setUser(authenticatedUser);
    setRoleState('customer');
    return true;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
      setUser(updated);
    }
  };

  const toggleFavouriteOutlet = (outletId: string) => {
    setPreferences((prev) => {
      const exists = prev.favourites.outlets.includes(outletId);
      const outlets = exists
        ? prev.favourites.outlets.filter((id) => id !== outletId)
        : [...prev.favourites.outlets, outletId];
      return { ...prev, favourites: { ...prev.favourites, outlets } };
    });
  };

  const toggleFavouriteProduct = (productId: string) => {
    setPreferences((prev) => {
      const exists = prev.favourites.products.includes(productId);
      const products = exists
        ? prev.favourites.products.filter((id) => id !== productId)
        : [...prev.favourites.products, productId];
      return { ...prev, favourites: { ...prev.favourites, products } };
    });
  };

  const logout = () => {
    setUser(null);
    setRoleState('customer');
  };

  const deleteAccount = async (): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 500));
    setUser(null);
    localStorage.clear();
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest,
        preferences,
        role,
        setRole,
        sendOTP,
        verifyOTP,
        updateProfile,
        toggleFavouriteOutlet,
        toggleFavouriteProduct,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'customer': return 'Customer User';
    case 'vendor_owner': return 'Cyber Hub Outlet Owner';
    case 'vendor_staff': return 'Outlet Staff Member';
    case 'compliance_officer': return 'Excise Compliance Officer';
    case 'support_agent': return 'Support Agent';
    case 'finance_admin': return 'Finance Administrator';
    case 'super_admin': return 'Platform Super Admin';
    default: return 'User';
  }
}
