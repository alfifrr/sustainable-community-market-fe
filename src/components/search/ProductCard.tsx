"use client";
import { Product } from "@/lib/types";
import { getCategoryImage } from "@/lib/formats";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Ensure category ID is a number
  const categoryId =
    typeof product.category.id === "string"
      ? parseInt(product.category.id, 10)
      : product.category.id;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block transition-transform hover:scale-102 focus:scale-102 focus:outline-none"
    >
      <article className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
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
                <span className="font-medium text-primary" aria-label="Price">
                  Rp. {product.price.toLocaleString()}
                </span>
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
      </article>
    </Link>
  );
}
