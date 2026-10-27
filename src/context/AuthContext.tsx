import React, { createContext, useContext, useState, useEffect } from 'react';
import { MembershipTierId, UserSession } from '../types';
import { ComplianceService } from '../services/complianceService';

interface AuthContextType {
  user: UserSession | null;
  isAgeVerified: boolean;
  verifyAge: () => void;
  sendOtp: (mobile: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  upgradeMembership: (tier: MembershipTierId) => void;
  isMember: boolean;
  tier: MembershipTierId;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isMembershipModalOpen: boolean;
  openMembershipModal: () => void;
  closeMembershipModal: () => void;
  pendingActionName: string | null;
  triggerProtectedAction: (actionName: string, callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'nlp_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(() => ComplianceService.isAgeVerified());
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [pendingActionName, setPendingActionName] = useState<string | null>(null);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const verifyAge = () => {
    ComplianceService.setAgeVerified(true);
    setIsAgeVerified(true);
  };

  const sendOtp = async (mobile: string): Promise<boolean> => {
    // Simulated instant OTP dispatch
    return new Promise((resolve) => {
      setTimeout(() => {
        // Save mobile temporarily for verification
        sessionStorage.setItem('nlp_pending_mobile', mobile);
        resolve(true);
      }, 600);
    });
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Any 4 digit code or 1234 works in simulation
        if (otp.length === 4) {
          const mobile = sessionStorage.getItem('nlp_pending_mobile') || '+91 98110 00000';
          const newUser: UserSession = {
            mobile,
            isAgeVerified: true,
            membershipTier: 'GUEST',
            name: `Guest (${mobile.slice(-4)})`
          };
          setUser(newUser);
          setIsAuthModalOpen(false);
          
          if (pendingCallback) {
            pendingCallback();
            setPendingCallback(null);
            setPendingActionName(null);
          }
          resolve(true);
        } else {
          resolve(false);
        }
      }, 600);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const upgradeMembership = (tier: MembershipTierId) => {
    if (!user) {
      // Create authenticated user with new tier
      const newUser: UserSession = {
        mobile: '+91 98110 00000',
        isAgeVerified: true,
        membershipTier: tier,
        membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        name: `VIP Member`
      };
      setUser(newUser);
    } else {
      setUser({
        ...user,
        membershipTier: tier,
        membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    setIsMembershipModalOpen(false);
  };

  const isMember = Boolean(user && user.membershipTier !== 'GUEST');
  const tier: MembershipTierId = user?.membershipTier || 'GUEST';

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openMembershipModal = () => setIsMembershipModalOpen(true);
  const closeMembershipModal = () => setIsMembershipModalOpen(false);

  const triggerProtectedAction = (actionName: string, callback: () => void) => {
    if (!user) {
      setPendingActionName(actionName);
      setPendingCallback(() => callback);
      setIsAuthModalOpen(true);
      return;
    }

    if (user.membershipTier === 'GUEST') {
      setPendingActionName(actionName);
      setIsMembershipModalOpen(true);
      return;
    }

    // Fully authorized member
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAgeVerified,
        verifyAge,
        sendOtp,
        verifyOtp,
        logout,
        upgradeMembership,
        isMember,
        tier,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isMembershipModalOpen,
        openMembershipModal,
        closeMembershipModal,
        pendingActionName,
        triggerProtectedAction
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
