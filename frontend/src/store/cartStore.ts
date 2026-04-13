import { create } from 'zustand';
import { Cart } from '@/types';
import { cartAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, variantId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isOpen: false,
  isLoading: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const { data } = await cartAPI.get();
      set({ cart: data.data, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addItem: async (productId, variantId, quantity) => {
    try {
      await cartAPI.addItem({ productId, variantId, quantity });
      await get().fetchCart();
      toast.success('Added to cart!');
      set({ isOpen: true });
    } catch {
      toast.error('Failed to add item');
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      await cartAPI.updateItem(itemId, quantity);
      await get().fetchCart();
    } catch {
      toast.error('Failed to update item');
    }
  },

  removeItem: async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      await get().fetchCart();
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  },

  clearCart: async () => {
    try {
      await cartAPI.clear();
      set({ cart: null });
    } catch {
      toast.error('Failed to clear cart');
    }
  },
}));
