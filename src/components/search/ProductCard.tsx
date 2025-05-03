"use client";
import { Product } from "@/lib/types";
import { getCategoryImage } from "@/lib/formats";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { calculateFinalPrice } from "@/utils/discountUtils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Ensure category ID is a number
  const categoryId =
    typeof product.category.id === "string"
      ? parseInt(product.category.id, 10)
      : product.category.id;

  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const user = useAuthStore((state) => state.user);
  const isSeller = user?.role === "seller";

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
  const daysUntilExpiration = getDaysUntilExpiration();
  const finalPrice = calculateFinalPrice(product.price, 1, daysUntilExpiration);
  const hasDiscount = finalPrice < product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail

    // Add to cart using cartStore without login check
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price, // Original price
      quantity: 1,
      imageUrl: product.image_url || getCategoryImage(categoryId),
      sellerId: product.user.id.toString(),
      sellerName: product.user.name,
      expirationDate: product.expiration_date,
    });

    // Show toast notification
    const toast = document.createElement("div");
    toast.className = "toast toast-top toast-end z-50";
    toast.innerHTML = `
      <div class="alert alert-success">
        <span>Product added to cart!</span>
      </div>
    `;
    document.body.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail

    // Add to cart using cartStore
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price, // Original price
      quantity: 1,
      imageUrl: product.image_url || getCategoryImage(categoryId),
      sellerId: product.user.id.toString(),
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

  return (
    <article className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
      <Link
        href={`/products/${product.id}`}
        className="block transition-transform hover:scale-102 focus:scale-102 focus:outline-none"
      >
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Product Image */}
            <div className="relative w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden bg-base-200">
              <Image
                src={product.image_url || getCategoryImage(categoryId)}
                alt={`${product.name} - ${product.category.name}`}
                fill
                sizes="(max-width: 640px) 100vw, 96px"
                className="object-cover"
                priority={false}
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-2">
              <div>
                <h3 className="card-title text-base line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-base-content/70 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="badge badge-outline" aria-label="Category">
                  {product.category.name}
                </span>
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span
                      className="text-base-content/70 line-through"
                      aria-label="Original Price"
                    >
                      Rp. {product.price.toLocaleString()}
                    </span>
                  )}
                  <span
                    className={`font-medium ${
                      hasDiscount ? "text-success" : "text-primary"
                    }`}
                    aria-label="Final Price"
                  >
                    Rp. {Math.round(finalPrice).toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-success">
                      Save{" "}
                      {Math.round(
                        ((product.price - finalPrice) / product.price) * 100
                      )}
                      %
                    </span>
                  )}
                </div>
                {daysUntilExpiration <= 4 && (
                  <span
                    className={`badge ${
                      daysUntilExpiration <= 2 ? "badge-error" : "badge-warning"
                    } badge-sm`}
                  >
                    {daysUntilExpiration} day
                    {daysUntilExpiration !== 1 ? "s" : ""} left
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <span aria-label="Seller">by {product.user.name}</span>
                {product.user.is_verified && (
                  <span
                    className="badge badge-success badge-sm"
                    aria-label="Verified seller"
                  >
                    ✓
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons - Hide for sellers */}
      {!isSeller && (
        <div className="card-actions justify-end p-4 pt-0 gap-2">
          <button
            onClick={handleAddToCart}
            className="btn btn-sm btn-outline btn-primary flex-1"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="btn btn-sm btn-primary flex-1"
            aria-label="Buy now"
          >
            <CreditCard size={16} />
            Buy
          </button>
        </div>
      )}
    </article>
  );
}
