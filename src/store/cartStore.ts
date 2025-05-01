import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => set((state) => {
                // Check if item already exists in cart
                const existingItemIndex = state.items.findIndex(
                    (item) => item.productId === newItem.productId
                );

                if (existingItemIndex >= 0) {
                    // Update quantity if item exists
                    const updatedItems = [...state.items];
                    updatedItems[existingItemIndex].quantity += newItem.quantity;
                    return { items: updatedItems };
                } else {
                    // Add new item if it doesn't exist
                    return { items: [...state.items, newItem] };
                }
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),

            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            })),

            clearCart: () => set({ items: [] }),

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: "cart-storage", // name of the item in the storage (must be unique)
            skipHydration: true, // Skip hydration to avoid hydration mismatch errors in Next.js
        }
    )
);