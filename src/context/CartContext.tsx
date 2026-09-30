import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, PartnerStore } from '../types';
import { mockBackend } from '../services/mockBackend';

interface CartContextType {
  items: CartItem[];
  selectedStore: PartnerStore | null;
  setSelectedStore: (store: PartnerStore) => void;
  addToCart: (product: Product, store?: PartnerStore, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalRegular: number;
  subtotalMember: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lsr_cart_items');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedStore, setSelectedStoreState] = useState<PartnerStore | null>(() => {
    const stores = mockBackend.getPartnerStores();
    const saved = localStorage.getItem('lsr_cart_store');
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = stores.find((s) => s.id === parsed.id);
      if (found) return found;
    }
    return stores[0] || null;
  });

  useEffect(() => {
    localStorage.setItem('lsr_cart_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (selectedStore) {
      localStorage.setItem('lsr_cart_store', JSON.stringify(selectedStore));
    }
  }, [selectedStore]);

  const setSelectedStore = (store: PartnerStore) => {
    setSelectedStoreState(store);
  };

  const addToCart = (product: Product, store?: PartnerStore, quantity: number = 1) => {
    const activeStore = store || selectedStore || mockBackend.getPartnerStores()[0];
    if (!selectedStore) setSelectedStoreState(activeStore);

    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const storeInv = activeStore.inventory[product.id];
      const memberPrice = storeInv ? storeInv.storeMemberPrice : product.memberPrice;

      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity,
          selectedStoreId: activeStore.id,
          selectedStoreName: activeStore.name,
          storeMemberPrice: memberPrice,
          regularPrice: product.regularPrice,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalRegular = items.reduce((acc, item) => acc + item.regularPrice * item.quantity, 0);
  const subtotalMember = items.reduce((acc, item) => acc + item.storeMemberPrice * item.quantity, 0);
  const totalSavings = subtotalRegular - subtotalMember;

  return (
    <CartContext.Provider
      value={{
        items,
        selectedStore,
        setSelectedStore,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalRegular,
        subtotalMember,
        totalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
