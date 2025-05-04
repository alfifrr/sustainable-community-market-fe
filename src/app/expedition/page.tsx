"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";

interface ConfirmationDetails {
  confirmation_date: string | null;
  confirmed_by: string | null;
}

interface Address {
  id: number;
  label: string;
  address: string;
  contact_person: string;
  details: string;
  date_created: string;
  date_updated: string | null;
  user_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  expiration_date: string;
  product_posted: string;
  product_updated: string | null;
  category: Category;
  applied_discounts: Record<string, any>;
  user: User & { is_verified: boolean };
  pickup_address: Omit<Address, "user_id" | "date_created" | "date_updated">;
}

interface ProcessedTransaction {
  id: number;
  buyer: User;
  seller: User;
  product: {
    id: number;
    name: string;
  };
  product_details: ProductDetails;
  quantity: number;
  total_price: number;
  delivery_status: string;
  delivery_address_details: Address;
  pickup_address_details: Address;
  created_at: string;
  updated_at: string;
  confirmation_details: ConfirmationDetails;
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

interface ApiResponse {
  data: ProcessedTransaction[];
  message: string;
  status: string;
}

export default function ExpeditionPage() {
  const [transactions, setTransactions] = useState<ProcessedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const isExpedition = user?.role === "expedition";

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!isExpedition) {
      router.push("/");
      return;
    }

    const fetchProcessedProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse>(
          "/api/processed-products"
        );
        if (response.data.status === "success") {
          setTransactions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching processed transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessedProducts();
  }, [isLoggedIn, isExpedition, router]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Processed Transactions</h1>

      {transactions.length === 0 ? (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="text-xl font-medium mb-2">
            No processed transactions yet
          </p>
          <p className="text-base-content/70">
            Processed transactions will appear here
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction) => (
            <Link
              key={transaction.id}
              href={`/expedition/${transaction.id}`}
              className="block card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title text-lg">
                      {transaction.product.name}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      Transaction ID: {transaction.id}
                    </p>
                    <p className="text-sm text-base-content/70">
                      Processed on: {formatDate(transaction.updated_at)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-info mb-2">
                      {transaction.delivery_status.charAt(0).toUpperCase() +
                        transaction.delivery_status.slice(1)}
                    </span>
                    <p className="font-medium">
                      {formatPrice(transaction.total_price)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Pickup Details</h4>
                    <p className="text-sm">
                      {transaction.pickup_address_details.label}
                    </p>
                    <p className="text-sm">
                      {transaction.pickup_address_details.contact_person}
                    </p>
                    <p className="text-sm">
                      {transaction.pickup_address_details.address}
                    </p>
                    <p className="text-sm text-base-content/70">
                      {transaction.pickup_address_details.details}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Delivery Details</h4>
                    <p className="text-sm">
                      {transaction.delivery_address_details.label}
                    </p>
                    <p className="text-sm">
                      {transaction.delivery_address_details.contact_person}
                    </p>
                    <p className="text-sm">
                      {transaction.delivery_address_details.address}
                    </p>
                    <p className="text-sm text-base-content/70">
                      {transaction.delivery_address_details.details}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
