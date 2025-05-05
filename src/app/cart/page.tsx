"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { calculateFinalPrice } from "@/utils/discountUtils";

// Tipe data untuk item keranjang
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number; // Original price
  quantity: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  expirationDate: string; // Added expiration date
}

export default function CartPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const currentCartId = useCartStore((state) => state.currentCartId);
  const carts = useCartStore((state) => state.carts);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const [loading] = useState(false);
  const { isLoggedIn } = useAuth();

  // Get current cart items
  const cartItems = carts[currentCartId] || [];

  // Fungsi untuk memformat harga
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Fixed shipping cost per unique item
  const shippingCostPerItem = 15000; // IDR 15,000 per unique item

  // Calculate shipping cost - charged per unique item, not per quantity
  const calculateShippingCost = () => {
    return cartItems.length * shippingCostPerItem; // Only multiply by number of unique items
  };

  const getDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const todayUTC = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );
    const expDateUTC = Date.UTC(
      expDate.getUTCFullYear(),
      expDate.getUTCMonth(),
      expDate.getUTCDate()
    );
    const diffTime = expDateUTC - todayUTC;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Calculate total for a single item including discounts
  const calculateItemTotal = (item: CartItem) => {
    const daysRemaining = getDaysUntilExpiration(item.expirationDate);
    const discountedPrice = calculateFinalPrice(
      item.price,
      item.quantity,
      daysRemaining
    );
    return discountedPrice * item.quantity;
  };

  // Calculate price per unit with discounts
  const calculatePricePerUnit = (item: CartItem) => {
    const daysRemaining = getDaysUntilExpiration(item.expirationDate);
    return calculateFinalPrice(item.price, item.quantity, daysRemaining);
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  // Calculate grand total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost();
  };

  // Handler untuk mengubah jumlah item
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  // Fungsi untuk checkout
  const handleCheckout = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      router.push("/login");
    }

    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          {user ? "Your Cart" : "Guest Cart"}
        </h1>
        <div className="animate-pulse">
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-40 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {user ? "Your Cart" : "Guest Cart"}
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-lg shadow-sm divide-y">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row gap-4"
                >
                  <div className="relative w-full sm:w-24 h-24 bg-base-200 rounded-lg overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-base-content/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-lg font-medium hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-ghost btn-sm btn-circle"
                        aria-label="Remove item"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="text-sm text-base-content/70">
                      Seller: {item.sellerName}
                    </p>

                    {getDaysUntilExpiration(item.expirationDate) <= 4 && (
                      <p className="text-sm text-error">
                        Expires in {getDaysUntilExpiration(item.expirationDate)}{" "}
                        days - Special Discount Applied!
                      </p>
                    )}

                    <div className="mt-auto pt-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="btn btn-sm btn-circle btn-ghost"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>

                        <span className="w-8 text-center">{item.quantity}</span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="btn btn-sm btn-circle btn-ghost"
                          aria-label="Increase quantity"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(calculateItemTotal(item))}
                        </p>
                        {(item.quantity > 1 ||
                          calculateItemTotal(item) !==
                            item.price * item.quantity) && (
                          <div className="text-xs space-y-1">
                            {item.quantity > 1 && (
                              <p className="text-base-content/70">
                                {formatPrice(calculatePricePerUnit(item))} each
                              </p>
                            )}
                            {calculateItemTotal(item) !==
                              item.price * item.quantity && (
                              <p className="text-success">
                                Save{" "}
                                {formatPrice(
                                  item.price * item.quantity -
                                    calculateItemTotal(item)
                                )}
                                !
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-lg shadow-sm p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    Shipping ({cartItems.length} unique items × Rp. 15,000)
                  </span>
                  <span>{formatPrice(calculateShippingCost())}</span>
                </div>
              </div>

              <div className="divider my-2"></div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4">
                <Link href="/products" className="btn btn-ghost btn-sm w-full">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
