"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/interceptor";

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface Purchase {
  id: number;
  buyer: User;
  seller: User;
  product: Product;
  product_details: {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
  total_price: number;
  delivery_status: "pending" | "processing" | "completed" | "cancelled";
  created_at: string;
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

// interface ApiResponse {
//   status: string;
//   message: string;
//   data: Purchase[];
// }

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Format functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const fetchPurchases = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/product-history");

        if (response.data.status === "success") {
          setPurchases(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching purchases:", error);
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [isLoggedIn, router]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "badge-success";
      case "processing":
        return "badge-warning";
      case "cancelled":
        return "badge-error";
      case "pending":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Purchase History</h1>
        <div className="animate-pulse">
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-24 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Purchase History</h1>

      {purchases.length === 0 ? (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-lg mb-4">
            You haven&apos;t made any purchases yet
          </p>
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="bg-base-100 rounded-lg shadow-sm divide-y">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-base-content/70">
                    Order ID: {purchase.id}
                  </p>
                  <p className="text-sm text-base-content/70">
                    Purchased on {formatDate(purchase.created_at)}
                  </p>
                </div>
                <span
                  className={`badge ${getStatusBadgeColor(
                    purchase.delivery_status
                  )}`}
                >
                  {purchase.delivery_status.charAt(0).toUpperCase() +
                    purchase.delivery_status.slice(1)}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative w-full sm:w-24 h-24 bg-base-200 rounded-lg overflow-hidden">
                  {purchase.product_details.imageUrl ? (
                    <Image
                      src={purchase.product_details.imageUrl}
                      alt={purchase.product_details.name}
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

                <div className="flex-1">
                  <Link
                    href={`/products/${purchase.product.id}`}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {purchase.product.name}
                  </Link>
                  <p className="text-sm text-base-content/70">
                    Seller: {purchase.seller.name}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span>
                      {purchase.quantity}{" "}
                      {purchase.quantity === 1 ? "item" : "items"}
                    </span>
                    <span className="font-medium">
                      {formatPrice(purchase.total_price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Link
                  href={`/products/${purchase.product.id}`}
                  className="btn btn-ghost btn-sm"
                >
                  View Product
                </Link>
                {purchase.delivery_status === "completed" &&
                  !purchase.rating && (
                    <button className="btn btn-outline btn-sm">
                      Write Review
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
