"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/interceptor";
import Link from "next/link";

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

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface ProductDetails extends Product {
  description: string;
  price: number;
  stock: number;
  expiration_date: string;
  product_posted: string;
  product_updated: string | null;
  category: {
    id: number;
    name: string;
  };
  applied_discounts?: {
    bulk?: {
      amount: number;
      percentage: number;
    };
    expiration?: {
      amount: number;
      percentage: number;
    };
  };
  user: User & { is_verified: boolean };
  pickup_address: Omit<Address, "user_id" | "date_created" | "date_updated">;
}

interface Transaction {
  id: number;
  buyer: User;
  seller: User;
  product: Product;
  product_details: ProductDetails;
  quantity: number;
  total_price: number;
  delivery_status: "pending" | "processing" | "completed" | "cancelled";
  delivery_address_details: Address;
  pickup_address_details: Address;
  created_at: string;
  updated_at: string | null;
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Transaction[];
}

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
    hour: "2-digit",
    minute: "2-digit",
  });
};

const generateTransactionNumber = (transaction: Transaction) => {
  const date = new Date(transaction.created_at);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const idSuffix = String(transaction.id).slice(-2).padStart(2, "0");
  return `TRX-${year}${month}${day}${hour}${minute}${idSuffix}`;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const isSeller = user?.role === "seller";

  // Fetch transactions from API
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/product-history");

        if (response.data.status === "success") {
          setTransactions(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isLoggedIn, router]);

  // Get the badge color based on delivery status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "badge-success";
      case "processed":
        return "badge-info";
      case "pending":
        return "badge-warning";
      case "cancelled":
        return "badge-error";
      case "rated":
        return "badge-success";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : transactions.length === 0 ? (
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
          <p className="text-lg mb-4">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <Link
              key={transaction.id}
              href={`/profile/transactions/${transaction.id}`}
              className="block card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title">{transaction.product.name}</h3>
                    <p className="text-sm text-base-content/70">
                      Order {generateTransactionNumber(transaction)}
                    </p>
                    <p className="text-sm text-base-content/70">
                      {isSeller ? "Sold on" : "Purchased on"}{" "}
                      {formatDate(transaction.created_at)}
                    </p>
                    <p className="text-sm mt-1">
                      {isSeller
                        ? `Buyer: ${transaction.buyer.name}`
                        : `Seller: ${transaction.seller.name}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`badge ${getStatusBadgeColor(
                        transaction.delivery_status
                      )}`}
                    >
                      {transaction.delivery_status.charAt(0).toUpperCase() +
                        transaction.delivery_status.slice(1)}
                    </span>
                    <p className="mt-2 font-medium">
                      {formatPrice(transaction.total_price)}
                    </p>
                  </div>
                </div>

                {isSeller ? (
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
                ) : (
                  <div className="mt-4">
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
                )}

                {transaction.product_details.applied_discounts && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Applied Discounts</h4>
                    <div className="flex flex-wrap gap-2">
                      {transaction.product_details.applied_discounts.bulk && (
                        <span className="badge badge-primary">
                          Bulk Discount:{" "}
                          {
                            transaction.product_details.applied_discounts.bulk
                              .percentage
                          }
                          % (
                          {formatPrice(
                            transaction.product_details.applied_discounts.bulk
                              .amount
                          )}
                          )
                        </span>
                      )}
                      {transaction.product_details.applied_discounts
                        .expiration && (
                        <span className="badge badge-secondary">
                          Expiration Discount:{" "}
                          {
                            transaction.product_details.applied_discounts
                              .expiration.percentage
                          }
                          % (
                          {formatPrice(
                            transaction.product_details.applied_discounts
                              .expiration.amount
                          )}
                          )
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
