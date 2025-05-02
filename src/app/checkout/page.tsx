"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/endpoints";
import axiosInstance from "@/lib/interceptor";

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
}

interface PaymentMethod {
  type: "bank_transfer" | "e_wallet";
  details: string;
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
  const user = useAuthStore((state) => state.user);
  const currentCartId = useCartStore((state) => state.currentCartId);
  const carts = useCartStore((state) => state.carts);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartItems = carts[currentCartId] || [];
  const [loading, setLoading] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Add address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressesLoading, setIsAddressesLoading] = useState(false);
  const [addressesError, setAddressesError] = useState<string | null>(null);

  // Form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "bank_transfer",
    details: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    payment: "",
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
  const fetchAddresses = async () => {
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
  };

  // Add effect to fetch addresses on mount
  useEffect(() => {
    if (cartItems.length > 0) {
      fetchAddresses();
    }
  }, [cartItems]);

  // Function to calculate total price
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Shipping cost (simulation)
  const shippingCost = 15000; // IDR 15,000

  // Grand total
  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
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

  // Handler for payment method changes
  const handlePaymentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "type") {
      setPaymentMethod((prev) => ({
        ...prev,
        type: value as "bank_transfer" | "e_wallet",
      }));
    } else {
      setPaymentMethod((prev) => ({
        ...prev,
        details: value,
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      payment: "",
    };
    let isValid = true;

    if (!shippingAddress.fullName.trim()) {
      errors.fullName = "Full name is required";
      isValid = false;
    }

    if (!shippingAddress.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    if (!shippingAddress.city.trim()) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!shippingAddress.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
      isValid = false;
    } else if (!/^\d{5}$/.test(shippingAddress.postalCode)) {
      errors.postalCode = "Postal code must be 5 digits";
      isValid = false;
    }

    if (!shippingAddress.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10,13}$/.test(shippingAddress.phone)) {
      errors.phone = "Phone number must be 10-13 digits";
      isValid = false;
    }

    if (paymentMethod.type === "bank_transfer" && !paymentMethod.details) {
      errors.payment = "Please select a bank for transfer";
      isValid = false;
    } else if (paymentMethod.type === "e_wallet" && !paymentMethod.details) {
      errors.payment = "Please select an e-wallet";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handler for order submission
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setProcessingOrder(true);

    // Simulate order processing
    try {
      // Here would be an API call to create the order
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate random order ID
      const randomOrderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
      setOrderId(randomOrderId);

      // Save order to localStorage for purchase history
      const purchaseDate = new Date().toISOString();
      const newOrder = {
        id: randomOrderId,
        userId: user?.id || "guest",
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
          sellerId: item.sellerId,
          sellerName: item.sellerName,
        })),
        shippingAddress,
        paymentMethod,
        totalAmount: calculateTotal(),
        purchaseDate,
        status: "completed",
      };

      // Get existing purchases from localStorage or initialize empty array
      const existingPurchases = JSON.parse(
        localStorage.getItem("purchases") || "[]"
      );

      // Add new order to purchases
      existingPurchases.push(newOrder);

      // Save updated purchases back to localStorage
      localStorage.setItem("purchases", JSON.stringify(existingPurchases));

      // Clear cart after successful order
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while processing your order. Please try again.");
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
        {/* Shipping and Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            <div className="space-y-4">
              {/* Saved Addresses Dropdown */}
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
                          fullName: selectedAddress.contact_person,
                          address: selectedAddress.address,
                          city: "", // You might want to parse this from the address
                          postalCode: "", // You might want to parse this from the address
                          phone: "", // You might need to add phone to your Address interface
                        });
                      }
                    }}
                    className="select select-bordered w-full"
                    disabled={isAddressesLoading}
                  >
                    <option value="">Choose an address or enter new one</option>
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

              <div className="divider text-xs text-base-content/50">
                OR ENTER NEW ADDRESS
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleAddressChange}
                  className={`input input-bordered w-full ${
                    formErrors.fullName ? "input-error" : ""
                  }`}
                  placeholder="Recipient's full name"
                />
                {formErrors.fullName && (
                  <span className="text-error text-sm mt-1">
                    {formErrors.fullName}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <textarea
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className={`textarea textarea-bordered w-full ${
                    formErrors.address ? "textarea-error" : ""
                  }`}
                  placeholder="Complete shipping address"
                  rows={3}
                ></textarea>
                {formErrors.address && (
                  <span className="text-error text-sm mt-1">
                    {formErrors.address}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className={`input input-bordered w-full ${
                      formErrors.city ? "input-error" : ""
                    }`}
                    placeholder="City"
                  />
                  {formErrors.city && (
                    <span className="text-error text-sm mt-1">
                      {formErrors.city}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Postal Code</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleAddressChange}
                    className={`input input-bordered w-full ${
                      formErrors.postalCode ? "input-error" : ""
                    }`}
                    placeholder="Postal code"
                  />
                  {formErrors.postalCode && (
                    <span className="text-error text-sm mt-1">
                      {formErrors.postalCode}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  className={`input input-bordered w-full ${
                    formErrors.phone ? "input-error" : ""
                  }`}
                  placeholder="Active phone number"
                />
                {formErrors.phone && (
                  <span className="text-error text-sm mt-1">
                    {formErrors.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="space-y-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="radio"
                    name="type"
                    value="bank_transfer"
                    checked={paymentMethod.type === "bank_transfer"}
                    onChange={handlePaymentChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text">Bank Transfer</span>
                </label>

                {paymentMethod.type === "bank_transfer" && (
                  <div className="mt-2 pl-7">
                    <select
                      name="details"
                      value={paymentMethod.details}
                      onChange={handlePaymentChange}
                      className={`select select-bordered w-full ${
                        formErrors.payment ? "select-error" : ""
                      }`}
                    >
                      <option value="">Select bank</option>
                      <option value="bca">BCA</option>
                      <option value="mandiri">Mandiri</option>
                      <option value="bni">BNI</option>
                      <option value="bri">BRI</option>
                    </select>
                    {formErrors.payment && (
                      <span className="text-error text-sm mt-1">
                        {formErrors.payment}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="radio"
                    name="type"
                    value="e_wallet"
                    checked={paymentMethod.type === "e_wallet"}
                    onChange={handlePaymentChange}
                    className="radio radio-primary"
                  />
                  <span className="label-text">E-Wallet</span>
                </label>

                {paymentMethod.type === "e_wallet" && (
                  <div className="mt-2 pl-7">
                    <select
                      name="details"
                      value={paymentMethod.details}
                      onChange={handlePaymentChange}
                      className={`select select-bordered w-full ${
                        formErrors.payment ? "select-error" : ""
                      }`}
                    >
                      <option value="">Select e-wallet</option>
                      <option value="gopay">GoPay</option>
                      <option value="ovo">OVO</option>
                      <option value="dana">DANA</option>
                      <option value="shopeepay">ShopeePay</option>
                    </select>
                    {formErrors.payment && (
                      <span className="text-error text-sm mt-1">
                        {formErrors.payment}
                      </span>
                    )}
                  </div>
                )}
              </div>
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
                      <div className="text-xs text-base-content/70">
                        {item.quantity} x {formatPrice(item.price)}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)}
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
                <span>{formatPrice(shippingCost)}</span>
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
