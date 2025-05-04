"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore, CartItem } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/endpoints";
import axiosInstance from "@/lib/interceptor";
import { useProfile } from "@/hooks/useProfile";
import { calculateFinalPrice } from "@/utils/discountUtils";

interface ShippingAddress {
  label: string;
  address: string;
  details: string;
  contact_person: string;
}

interface Address {
  id: string;
  label: string;
  address: string;
  details?: string;
  contact_person: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const currentCartId = useCartStore((state) => state.currentCartId);
  const carts = useCartStore((state) => state.carts);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartItems = useMemo(
    () => carts[currentCartId] || [],
    [carts, currentCartId]
  );
  const { profile } = useProfile();
  const [loading] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [addressInputMode, setAddressInputMode] = useState<"saved" | "new">(
    "saved"
  );

  // Add address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressesLoading, setIsAddressesLoading] = useState(false);
  const [addressesError, setAddressesError] = useState<string | null>(null);

  // Form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    label: "",
    address: "",
    details: "",
    contact_person: "",
  });

  const [formErrors, setFormErrors] = useState({
    label: "",
    address: "",
    details: "",
    contact_person: "",
    balance: "",
  });

  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  // Redirect to cart if cart is empty and order not complete
  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      router.push("/cart");
      return;
    }
  }, [cartItems.length, router, orderComplete]);

  // Add fetchAddresses function
  const fetchAddresses = useCallback(async () => {
    if (addresses.length > 0) return;
    setIsAddressesLoading(true);
    setAddressesError(null);

    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.ADDRESSES);
      if (data.status === "success") {
        setAddresses(data.data);
        if (data.data.length === 0) {
          setAddressesError(
            "No saved addresses found. Please add an address in your profile first."
          );
        }
      } else {
        setAddressesError("Failed to load addresses. Please try again.");
      }
    } catch {
      setAddressesError("Failed to load addresses. Please try again.");
    } finally {
      setIsAddressesLoading(false);
    }
  }, [addresses.length]);

  // Add effect to fetch addresses on mount
  useEffect(() => {
    if (cartItems.length > 0) {
      fetchAddresses();
    }
  }, [cartItems, fetchAddresses]);

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

  // Function to calculate subtotal with discounts
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  // Shipping cost per unique item (fixed)
  const shippingCostPerItem = 15000; // IDR 15,000 per unique item

  // Calculate shipping cost - charged per unique item, not per quantity
  const calculateShippingCost = () => {
    return cartItems.length * shippingCostPerItem; // Only multiply by number of unique items
  };

  // Grand total
  const calculateTotal = () => {
    return calculateSubtotal() + calculateShippingCost();
  };

  // Handler for address input changes
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add handler for address mode change
  const handleAddressModeChange = (mode: "saved" | "new") => {
    setAddressInputMode(mode);
    // Clear form when switching to new address mode
    if (mode === "new") {
      setShippingAddress({
        label: "",
        address: "",
        details: "",
        contact_person: "",
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {
      label: "",
      address: "",
      details: "",
      contact_person: "",
      balance: "",
    };
    let isValid = true;

    // Only validate address fields if we're entering a new address
    if (addressInputMode === "new") {
      // Label validation (3-50 characters and required)
      if (!shippingAddress.label.trim()) {
        errors.label = "Label is required";
        isValid = false;
      } else if (shippingAddress.label.trim().length < 3) {
        errors.label = "Label must be at least 3 characters";
        isValid = false;
      } else if (shippingAddress.label.trim().length > 50) {
        errors.label = "Label must not exceed 50 characters";
        isValid = false;
      }

      // Address validation (5-255 characters and required)
      if (!shippingAddress.address.trim()) {
        errors.address = "Address is required";
        isValid = false;
      } else if (shippingAddress.address.trim().length < 5) {
        errors.address = "Address must be at least 5 characters";
        isValid = false;
      } else if (shippingAddress.address.trim().length > 255) {
        errors.address = "Address must not exceed 255 characters";
        isValid = false;
      }

      // Details validation (optional, max 255 characters)
      if (shippingAddress.details.trim().length > 255) {
        errors.details = "Details must not exceed 255 characters";
        isValid = false;
      }

      // Contact person validation (3-255 characters and required)
      if (!shippingAddress.contact_person.trim()) {
        errors.contact_person = "Contact person is required";
        isValid = false;
      } else if (shippingAddress.contact_person.trim().length < 3) {
        errors.contact_person = "Contact person must be at least 3 characters";
        isValid = false;
      } else if (shippingAddress.contact_person.trim().length > 255) {
        errors.contact_person = "Contact person must not exceed 255 characters";
        isValid = false;
      }
    } else {
      // When using saved address, validate that an address is selected
      const selectElement = document.querySelector(
        "select"
      ) as HTMLSelectElement;
      if (!selectElement.value) {
        errors.address = "Please select an address";
        isValid = false;
      }
    }

    // Balance validation (always required regardless of address mode)
    const total = calculateTotal();
    if (!profile?.balance || profile.balance < total) {
      errors.balance = `Insufficient balance. You need ${formatPrice(
        total
      )} but only have ${formatPrice(profile?.balance || 0)}`;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Function to create a new address
  const createNewAddress = async (): Promise<string | null> => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.ADDRESSES, {
        label: shippingAddress.label,
        address: shippingAddress.address,
        details: shippingAddress.details || "",
        contact_person: shippingAddress.contact_person,
      });

      if (data.status === "success") {
        return data.data.id;
      }
      return null;
    } catch (error) {
      console.error("Error creating address:", error);
      throw new Error("Failed to create address");
    }
  };

  // Function to place a single order
  const placeSingleOrder = async (
    addressId: string,
    productId: string,
    quantity: number
  ) => {
    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.BUY, {
        address_id: addressId,
        product_id: productId,
        quantity: quantity,
      });
      return data;
    } catch (error) {
      console.error(`Error placing order for product ${productId}:`, error);
      throw error;
    }
  };

  // Handler for order submission
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setProcessingOrder(true);

    try {
      // Get or create address ID
      let addressId;
      if (addressInputMode === "new") {
        addressId = await createNewAddress();
        if (!addressId) {
          throw new Error("Failed to create new address");
        }
      } else {
        // Get selected address ID from the select element
        const selectElement = document.querySelector(
          "select"
        ) as HTMLSelectElement;
        addressId = selectElement.value;
        if (!addressId) {
          throw new Error("No address selected");
        }
      }

      // Place orders sequentially for each cart item
      let remainingBalance = profile?.balance || 0;
      const successfulOrders = [];

      for (const item of cartItems) {
        // Calculate cost for this order including shipping
        const orderCost = calculateItemTotal(item) + shippingCostPerItem;

        // Check if we have enough balance for this order
        if (remainingBalance < orderCost) {
          throw new Error(
            `Insufficient balance for ${
              item.name
            }. Remaining balance: ${formatPrice(
              remainingBalance
            )}, Required: ${formatPrice(orderCost)}`
          );
        }

        try {
          // Place the order
          const result = await placeSingleOrder(
            addressId,
            item.productId,
            item.quantity
          );
          // If successful, deduct from remaining balance
          remainingBalance -= orderCost;
          successfulOrders.push({
            ...item,
            result,
          });
        } catch (error) {
          // If any order fails, throw error with details about successful orders
          console.error(`Error placing order for ${item.name}:`, error);
          throw new Error(
            `Failed to place order for ${item.name}. ${successfulOrders.length} orders were successful before failure.`
          );
        }
      }

      // Generate order ID for display
      const randomOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      setOrderId(randomOrderId);

      // Clear cart and complete order
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while processing your order. Please try again."
      );
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="animate-pulse">
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-64 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-40 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-base-100 rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
          <p className="mb-6">
            Thank you for your order. Your order number is{" "}
            <span className="font-bold">{orderId}</span>.
          </p>

          <div className="mb-8 p-4 bg-base-200 rounded-lg">
            <p className="text-sm">
              Payment instructions have been sent to your email. Please complete
              the payment within 24 hours to process your order.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile/purchases" className="btn btn-primary">
              View My Orders
            </Link>
            <Link href="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Section */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Current Balance</span>
                  <span className="text-xl font-bold">
                    {formatPrice(profile?.balance || 0)}
                  </span>
                </div>
                <div className="text-sm text-base-content/70 mt-1">
                  Order total: {formatPrice(calculateTotal())}
                </div>
                {profile?.balance && profile.balance >= calculateTotal() ? (
                  <div className="text-sm text-success mt-1">
                    Balance after purchase:{" "}
                    {formatPrice(profile.balance - calculateTotal())}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-sm text-error">
                      Insufficient balance
                    </div>
                    <Link
                      href="/topup?returnTo=/checkout"
                      className="btn btn-error btn-xs"
                    >
                      Top Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            {/* Address Input Mode Toggle */}
            <div className="tabs tabs-boxed mb-6">
              <button
                className={`tab ${
                  addressInputMode === "saved" ? "tab-active" : ""
                }`}
                onClick={() => handleAddressModeChange("saved")}
              >
                Use Saved Address
              </button>
              <button
                className={`tab ${
                  addressInputMode === "new" ? "tab-active" : ""
                }`}
                onClick={() => handleAddressModeChange("new")}
              >
                Enter New Address
              </button>
            </div>

            <div className="space-y-4">
              {/* Saved Addresses Dropdown */}
              {addressInputMode === "saved" && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select a Saved Address</span>
                  </label>
                  <div className="relative">
                    <select
                      onClick={fetchAddresses}
                      onChange={(e) => {
                        const selectedAddress = addresses.find(
                          (addr) => addr.id === e.target.value
                        );
                        if (selectedAddress) {
                          setShippingAddress({
                            label: selectedAddress.label,
                            address: selectedAddress.address,
                            details: selectedAddress.details || "",
                            contact_person: selectedAddress.contact_person,
                          });
                        }
                      }}
                      className="select select-bordered w-full"
                      disabled={isAddressesLoading}
                    >
                      <option value="">
                        Choose an address or enter new one
                      </option>
                      {addresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.label} - {address.address}
                          {address.details && ` (${address.details})`}
                        </option>
                      ))}
                    </select>
                    {isAddressesLoading && (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <span className="loading loading-spinner loading-sm"></span>
                      </div>
                    )}
                  </div>
                  {addressesError && (
                    <p className="text-error text-sm mt-1">{addressesError}</p>
                  )}
                </div>
              )}

              {/* Enter New Address Form */}
              {addressInputMode === "new" && (
                <div className="space-y-4">
                  {/* Label Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Label <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="label"
                      value={shippingAddress.label}
                      onChange={handleAddressChange}
                      className={`input input-bordered w-full ${
                        formErrors.label ? "input-error" : ""
                      }`}
                      placeholder="E.g., Home, Office, etc."
                    />
                    {formErrors.label && (
                      <span className="text-error text-sm mt-1">
                        {formErrors.label}
                      </span>
                    )}
                  </div>

                  {/* Contact Person Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Contact Person <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="contact_person"
                      value={shippingAddress.contact_person}
                      onChange={handleAddressChange}
                      className={`input input-bordered w-full ${
                        formErrors.contact_person ? "input-error" : ""
                      }`}
                      placeholder="Full name of the recipient"
                    />
                    {formErrors.contact_person && (
                      <span className="text-error text-sm mt-1">
                        {formErrors.contact_person}
                      </span>
                    )}
                  </div>

                  {/* Address Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Complete Address <span className="text-error">*</span>
                      </span>
                    </label>
                    <textarea
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleAddressChange}
                      className={`textarea textarea-bordered w-full ${
                        formErrors.address ? "textarea-error" : ""
                      }`}
                      placeholder="Street name, building/house number, RT/RW, district, city, region/province, postal code"
                      rows={3}
                    ></textarea>
                    {formErrors.address && (
                      <span className="text-error text-sm mt-1">
                        {formErrors.address}
                      </span>
                    )}
                  </div>

                  {/* Details Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Additional Details</span>
                      <span className="label-text-alt text-base-content/50">
                        Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      name="details"
                      value={shippingAddress.details}
                      onChange={handleAddressChange}
                      className={`input input-bordered w-full ${
                        formErrors.details ? "input-error" : ""
                      }`}
                      placeholder="Delivery notes, landmarks, building color, gate number, specific instructions for courier"
                    />
                    {formErrors.details && (
                      <span className="text-error text-sm mt-1">
                        {formErrors.details}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Balance Error */}
              {formErrors.balance && (
                <div className="text-error text-sm mt-4">
                  {formErrors.balance}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="mb-4">
              <div className="text-sm text-base-content/70 mb-2">
                Item ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                ):
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 bg-base-200 rounded overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-base-content/30"
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
                    <div className="flex-1">
                      <div className="text-sm font-medium truncate">
                        {item.name}
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="text-base-content/70">
                          {item.quantity} x{" "}
                          {formatPrice(calculatePricePerUnit(item))}
                        </div>
                        {calculateItemTotal(item) !==
                          item.price * item.quantity && (
                          <div className="text-success">
                            Save{" "}
                            {formatPrice(
                              item.price * item.quantity -
                                calculateItemTotal(item)
                            )}
                            !
                          </div>
                        )}
                        {getDaysUntilExpiration(item.expirationDate) <= 4 && (
                          <div className="text-error">
                            Expires in{" "}
                            {getDaysUntilExpiration(item.expirationDate)} days
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(calculateItemTotal(item))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping Cost</span>
                <span>{formatPrice(calculateShippingCost())}</span>
              </div>
            </div>

            <div className="divider my-2"></div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={processingOrder}
              className="btn btn-primary w-full"
            >
              {processingOrder ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <div className="mt-4">
              <Link href="/cart" className="btn btn-ghost btn-sm w-full">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
