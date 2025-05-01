"use client";

import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Package2, User2, ShoppingCart, CreditCard, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";

interface ProductLayoutProps {
  product: Product;
}

const ProductLayout = ({ product }: ProductLayoutProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntilExpiration = () => {
    const today = new Date();
    const expDate = new Date(product.expiration_date);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Add to cart using cartStore
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.image_url || '',
      sellerId: String(product.user.id),
      sellerName: product.user.name
    });

    // Show toast notification
    document.getElementById('cart-toast')?.classList.remove('hidden');

    // Hide toast after 3 seconds
    setTimeout(() => {
      document.getElementById('cart-toast')?.classList.add('hidden');
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Add to cart using cartStore
    addToCart({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.image_url || '',
      sellerId: String(product.user.id),
      sellerName: product.user.name
    });

    // Redirect to checkout
    router.push('/checkout');
  };

  const daysUntilExpiration = getDaysUntilExpiration();

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
                    className={`badge ${daysUntilExpiration <= 3 ? "badge-error" : "badge-warning"
                      }`}
                    role="alert"
                  >
                    Expires in {daysUntilExpiration} days
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-bold">
                {formatPrice(product.price)}
              </p>
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

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="join">
                  <button
                    className="join-item btn btn-sm btn-outline"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="join-item px-4 py-1 flex items-center justify-center bg-base-200">
                    {quantity}
                  </span>
                  <button
                    className="join-item btn btn-sm btn-outline"
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
                      ${product.user.is_verified
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
        </div>
      </div>
    </main>
  );
};

export default ProductLayout;
