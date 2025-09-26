// src/store/cartStore.ts
import { create } from "zustand";

export interface CartItem {
  upc: string;
  name: string;
  quantity?: number;
}

interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (upc: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.cartItems.find((ci) => ci.upc === item.upc);

      if (existing) {
        console.log(
          `Incrementing quantity of item: ${item.name} (UPC: ${item.upc})`
        );
        return {
          cartItems: state.cartItems.map((ci) =>
            ci.upc === item.upc
              ? { ...ci, quantity: (ci.quantity || 1) + 1 }
              : ci
          ),
        };
      }

      console.log(`Adding new item: ${item.name} (UPC: ${item.upc})`);
      return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),

  removeItem: (upc) =>
    set((state) => ({
      cartItems: state.cartItems.filter((ci) => ci.upc !== upc),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
