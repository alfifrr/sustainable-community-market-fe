"use client";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Package,
  Package2,
  User2,
  ShoppingCart,
  CreditCard,
  X,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
  Recycle,
  Leaf,
  Award,
  Scale,
  Warehouse,
  Wind,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { calculateFinalPrice } from "@/utils/discountUtils";
import { getCertificationIcon } from "@/lib/formats";
import type {
  ProductReviewResponse,
  Category,
  ProductUser,
  PickupAddress,
} from "@/lib/types";

const iconMap = {
  Leaf,
  Scale,
  Recycle,
  Warehouse,
  Package,
  Wind,
  Award,
} as const;

interface ProductLayoutProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image_url: string;
    category: Category;
    user: ProductUser;
    product_posted: string;
    expiration_date: string;
    pickup_address: PickupAddress;
    reviews: ProductReviewResponse["data"];
    certifications?: string[];
  };
}

interface ProductCertification {
  id: number;
  product_id: number;
  certification_id: number;
  status: string;
  verification_date: string | null;
  verified_by: number | null;
  certification?: Certification;
}

interface Certification {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

const ProductLayout = ({ product }: ProductLayoutProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { user, isSellerOrExpedition } = useAuthStore((state) => state);
  const isBuyer = user?.role === "buyer";

  const [productCertifications, setProductCertifications] = useState<
    ProductCertification[]
  >([]);
  const [isCertificationsLoading, setIsCertificationsLoading] = useState(false);
  const [certificationsError, setCertificationsError] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchProductCertifications = async () => {
      setIsCertificationsLoading(true);
      setCertificationsError(null);
      try {
        const res = await fetch(
          `/api/sustainability/product-certifications/${product.id}`
        );
        const data = await res.json();
        if (data.status === "success") {
          setProductCertifications(data.data);
        } else {
          setCertificationsError(
            "Failed to load certifications. Please try again."
          );
        }
      } catch {
        setCertificationsError(
          "Failed to load certifications. Please try again."
        );
      } finally {
        setIsCertificationsLoading(false);
      }
    };
    fetchProductCertifications();
  }, [product.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (date: string) => {
    // Create a date object in UTC
    const utcDate = new Date(date);

    // Convert to user's local timezone for display
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Using Asia/Jakarta timezone for Indonesian time
    }).format(utcDate);
  };

  const getDaysUntilExpiration = () => {
    const today = new Date();
    const expDate = new Date(product.expiration_date);
    // Normalize both dates to UTC midnight for accurate day calculation
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

  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Add to cart using cartStore without login check
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price, // Original price
      quantity: quantity,
      imageUrl: product.image_url || "",
      sellerId: String(product.user.id),
      sellerName: product.user.name,
      expirationDate: product.expiration_date,
    });

    // Show toast notification
    document.getElementById("cart-toast")?.classList.remove("hidden");

    // Hide toast after 3 seconds
    setTimeout(() => {
      document.getElementById("cart-toast")?.classList.add("hidden");
    }, 3000);
  };

  const handleBuyNow = () => {
    // Add to cart using cartStore
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price, // Original price
      quantity: quantity,
      imageUrl: product.image_url || "",
      sellerId: String(product.user.id),
      sellerName: product.user.name,
      expirationDate: product.expiration_date,
    });
    if (!isLoggedIn) {
      // Store the intended destination
      localStorage.setItem("redirectAfterLogin", "/checkout");
      router.push("/login");
      return;
    }

    // Redirect to checkout
    router.push("/checkout");
  };

  const getCertificationIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Award;
  };

  const daysUntilExpiration = getDaysUntilExpiration();
  const finalPrice = calculateFinalPrice(
    product.price,
    quantity,
    daysUntilExpiration
  );
  const hasDiscount = finalPrice < product.price;

  return (
    <main
      className="container mx-auto px-4 py-6 md:py-8 max-w-4xl relative"
      aria-label="Product Details"
    >
      {/* Toast notification */}
      <div id="cart-toast" className="toast toast-top toast-end z-50 hidden">
        <div className="alert alert-success">
          <span>Product added to cart!</span>
        </div>
      </div>
      <button
        onClick={() => router.back()}
        className="btn btn-circle btn-sm absolute right-6 top-6 z-10 bg-base-100 shadow-md hover:bg-base-200"
        aria-label="Back"
      >
        <X size={18} />
      </button>
      <div className="bg-base-300 rounded-xl shadow-lg overflow-hidden">
        {/* Product Header with Image */}
        <div className="relative h-64 md:h-96 w-full bg-base-200">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-base-300">
              <Package2 className="w-16 h-16 text-base-content/50" />
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          {/* Product Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge badge-primary" role="note">
                  {product.category.name}
                </span>
                {daysUntilExpiration <= 7 && (
                  <span
                    className={`badge ${
                      daysUntilExpiration <= 3 ? "badge-error" : "badge-warning"
                    }`}
                    role="alert"
                  >
                    Expires in {daysUntilExpiration}{" "}
                    {daysUntilExpiration === 1 ? "day" : "days"}
                    {daysUntilExpiration <= 4 && " - Special Discount!"}
                  </span>
                )}
                {quantity >= 5 && (
                  <span className="badge badge-secondary">
                    Bulk Discount Applied!
                  </span>
                )}
                {/* Display Certifications */}
                {isCertificationsLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : certificationsError ? (
                  <span className="text-error text-xs">
                    {certificationsError}
                  </span>
                ) : (
                  productCertifications.length > 0 &&
                  productCertifications.map(
                    (pc) =>
                      pc.certification && (
                        <div
                          key={pc.id}
                          className="tooltip"
                          data-tip={`${
                            pc.status === "approved"
                              ? "Verified"
                              : pc.status === "rejected"
                              ? "Rejected"
                              : "Pending"
                          }`}
                        >
                          <div
                            className={`badge gap-2 ${
                              pc.status === "approved"
                                ? "badge-success"
                                : pc.status === "rejected"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            {pc.certification.name}
                            {pc.status === "approved" ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : pc.status === "rejected" ? (
                              <XCircle className="w-3 h-3" />
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      )
                  )
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <div className="space-y-1">
                {hasDiscount && (
                  <p className="text-lg line-through text-base-content/70">
                    {formatPrice(product.price)}
                  </p>
                )}
                <p
                  className={`text-xl md:text-2xl font-bold ${
                    hasDiscount ? "text-success" : "text-primary"
                  }`}
                >
                  {formatPrice(finalPrice)}
                </p>
                {hasDiscount && (
                  <p className="text-sm text-success">
                    Save {formatPrice(product.price - finalPrice)}!
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-lg"
                role="status"
              >
                <Package2 className="w-5 h-5" />
                <span className="font-medium">
                  {product.stock} {product.stock === 1 ? "unit" : "units"}{" "}
                  available
                </span>
              </div>

              {/* Quantity Selector - Hide for sellers */}
              {!isSellerOrExpedition() && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="join">
                    <button
                      className="join-item btn btn-sm btn-outline"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="join-item px-4 py-1 flex items-center justify-center bg-base-200">
                      {quantity}
                    </span>
                    <button
                      className="join-item btn btn-sm btn-outline"
                      onClick={() =>
                        setQuantity((prev) => Math.min(product.stock, prev + 1))
                      }
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Hide for sellers */}
          {!isSellerOrExpedition() && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="btn btn-outline btn-primary flex-1 gap-2"
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn btn-primary flex-1 gap-2"
                disabled={product.stock <= 0}
              >
                <CreditCard size={18} />
                Buy Now
              </button>
            </div>
          )}

          {/* Product Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-base-content/90 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Dates Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
              <CalendarDays className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-base-content/70">
                  Posted Date
                </p>
                <p className="font-medium">
                  {formatDate(product.product_posted)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
              <CalendarDays className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm font-medium text-base-content/70">
                  Expiration Date
                </p>
                <p className="font-medium">
                  {formatDate(product.expiration_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Pickup Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Pickup Information</h2>
            <div className="bg-base-200 rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{product.pickup_address.label}</p>
                  <p className="text-base-content/90 mt-1">
                    {product.pickup_address.address}
                  </p>
                  {product.pickup_address.details && (
                    <p className="text-base-content/80 mt-2 text-sm">
                      Note: {product.pickup_address.details}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User2 className="w-5 h-5 text-primary" />
                <p className="font-medium">
                  {product.pickup_address.contact_person}
                </p>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="mt-8 pt-6 border-t border-base-content/10">
            <Link
              href={`/users/${product.user.id}`}
              className="group flex items-center gap-4 hover:bg-base-200 p-3 rounded-lg transition-all duration-200"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    product.user.name
                  )}&size=128`}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-semibold group-hover:text-primary transition-colors">
                  {product.user.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium
                      ${
                        product.user.is_verified
                          ? "bg-info/10 text-info"
                          : "bg-warning/10 text-warning"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full
                      ${product.user.is_verified ? "bg-info" : "bg-warning"}`}
                    />
                    {product.user.is_verified
                      ? "Verified Seller"
                      : "Unverified Seller"}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 pt-6 border-t border-base-content/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-warning" />
                  <span className="font-medium">
                    {(product.reviews.average_rating || 0).toFixed(1)}
                  </span>
                  <span className="text-base-content/70">
                    ({product.reviews.total_reviews || 0})
                  </span>
                </div>
                <div className="text-sm text-base-content/70">
                  {product.reviews.total_items_sold} sold
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {product.reviews.reviews.length === 0 ? (
                <div className="text-center py-8 text-base-content/70">
                  No reviews yet
                </div>
              ) : (
                product.reviews.reviews.map((review, index) => (
                  <div key={index} className="bg-base-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                          <div className="w-8 h-8 rounded-full bg-neutral-focus text-neutral-content">
                            <span className="text-xs">
                              {review.reviewer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <span className="font-medium">
                          {review.reviewer.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    {review.testimonial && (
                      <p className="text-base-content/90">
                        {review.testimonial}
                      </p>
                    )}
                    <p className="text-xs text-base-content/70 mt-2">
                      {new Date(review.review_date).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductLayout;
