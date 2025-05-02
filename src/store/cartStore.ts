import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
}

interface CartState {
  carts: {
    [key: string]: CartItem[]; // Key is userId for logged-in users, or 'guest' for guests
  };
  currentCartId: string;
  setCurrentCartId: (id: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  migrateGuestCart: (userId: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carts: {},
      currentCartId: "guest",

      setCurrentCartId: (id: string) => set({ currentCartId: id }),

      addItem: (newItem) =>
        set((state) => {
          const currentCart = state.carts[state.currentCartId] || [];
          const existingItemIndex = currentCart.findIndex(
            (item) => item.productId === newItem.productId
          );

          let updatedCart;
          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            updatedCart = [...currentCart];
            updatedCart[existingItemIndex].quantity += newItem.quantity;
          } else {
            // Add new item if it doesn't exist
            updatedCart = [...currentCart, newItem];
          }

          return {
            carts: {
              ...state.carts,
              [state.currentCartId]: updatedCart,
            },
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const currentCart = state.carts[state.currentCartId] || [];
          return {
            carts: {
              ...state.carts,
              [state.currentCartId]: currentCart.filter(
                (item) => item.id !== id
              ),
            },
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const currentCart = state.carts[state.currentCartId] || [];
          return {
            carts: {
              ...state.carts,
              [state.currentCartId]: currentCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ),
            },
          };
        }),

      clearCart: () =>
        set((state) => ({
          carts: {
            ...state.carts,
            [state.currentCartId]: [],
          },
        })),

      getTotalItems: () => {
        const state = get();
        const currentCart = state.carts[state.currentCartId] || [];
        return currentCart.reduce((total, item) => total + item.quantity, 0);
      },

      migrateGuestCart: (userId) =>
        set((state) => {
          const guestCart = state.carts["guest"] || [];
          const userCart = state.carts[userId] || [];

          // Merge guest cart items into user cart
          const mergedCart = [...userCart];
          guestCart.forEach((guestItem) => {
            const existingItemIndex = mergedCart.findIndex(
              (item) => item.productId === guestItem.productId
            );
            if (existingItemIndex >= 0) {
              mergedCart[existingItemIndex].quantity += guestItem.quantity;
            } else {
              mergedCart.push(guestItem);
            }
          });

          // Clear guest cart and update user cart
          return {
            carts: {
              ...state.carts,
              guest: [],
              [userId]: mergedCart,
            },
            currentCartId: userId,
          };
        }),
    }),
    {
      name: "cart-storage",
      skipHydration: true,
    }
  )
);
