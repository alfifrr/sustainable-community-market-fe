import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { createHash } from "crypto";

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
  imageUrl?: string;
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
  data: Transaction;
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

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "completed":
      return "badge-success";
    case "pending":
      return "badge-warning";
    case "processing":
      return "badge-info";
    case "cancelled":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const transactionId = (await params).id;
  const transaction = await getTransactionData(transactionId);
  const displayNumber = transaction
    ? generateTransactionNumber(transaction)
    : "Not Found";

  return {
    title: `Transaction ${displayNumber} - ${
      transaction?.product.name || "Not Found"
    }`,
    description: `Transaction details for ${displayNumber}`,
  };
}

// Server-side data fetching
async function getTransactionData(id: string): Promise<Transaction | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return null;
  }

  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const response = await fetch(
      `${protocol}://${host}${API_ENDPOINTS.PRODUCT_HISTORY}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 }, // Disable cache for fresh data
      }
    );

    if (!response.ok) {
      return null;
    }

    const result: ApiResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}

export default async function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const transactionId = (await params).id;
  const transaction = await getTransactionData(transactionId);

  if (!transaction) {
    notFound();
  }

  const displayTransactionNumber = generateTransactionNumber(transaction);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/profile/transactions"
          className="btn btn-ghost btn-sm gap-2"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Transactions
        </Link>
      </div>

      <div className="bg-base-100 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Transaction {displayTransactionNumber}
              </h1>
              <p className="text-base-content/70">
                {formatDate(transaction.created_at)}
              </p>
            </div>
            <span
              className={`badge ${getStatusBadgeColor(
                transaction.delivery_status
              )}`}
            >
              {transaction.delivery_status.charAt(0).toUpperCase() +
                transaction.delivery_status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 bg-base-300 rounded-lg overflow-hidden flex-shrink-0">
                      {transaction.product_details.imageUrl ? (
                        <Image
                          src={transaction.product_details.imageUrl}
                          alt={transaction.product.name}
                          fill
                          className="object-cover"
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
                    <div>
                      <h3 className="font-medium">
                        {transaction.product.name}
                      </h3>
                      <p className="text-sm text-base-content/70">
                        Category: {transaction.product_details.category.name}
                      </p>
                      <p className="text-sm mt-2">
                        {transaction.quantity} ×{" "}
                        {formatPrice(transaction.product_details.price)}
                      </p>
                      <p className="font-medium mt-1">
                        Total: {formatPrice(transaction.total_price)}
                      </p>
                    </div>
                  </div>

                  {/* Discounts */}
                  {transaction.product_details.applied_discounts && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">
                        Applied Discounts:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {transaction.product_details.applied_discounts.bulk && (
                          <span className="badge badge-primary">
                            Bulk (-
                            {
                              transaction.product_details.applied_discounts.bulk
                                .percentage
                            }
                            %)
                          </span>
                        )}
                        {transaction.product_details.applied_discounts
                          .expiration && (
                          <span className="badge badge-secondary">
                            Expiration (-
                            {
                              transaction.product_details.applied_discounts
                                .expiration.percentage
                            }
                            %)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Transaction Details
              </h2>
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Seller</p>
                      <p>{transaction.seller.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Buyer</p>
                      <p>{transaction.buyer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Delivery Address</p>
                      <p className="font-medium">
                        {transaction.delivery_address_details.label}
                      </p>
                      <p>
                        {transaction.delivery_address_details.contact_person}
                      </p>
                      <p>{transaction.delivery_address_details.address}</p>
                      {transaction.delivery_address_details.details && (
                        <p className="text-sm text-base-content/70 mt-1">
                          {transaction.delivery_address_details.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          {transaction.delivery_status === "completed" && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Review</h2>
              {transaction.rating ? (
                <div className="card bg-base-200">
                  <div className="card-body">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name="rating"
                            className="mask mask-star-2 bg-warning"
                            checked={star === transaction.rating}
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm text-base-content/70">
                        {formatDate(transaction.review_date!)}
                      </span>
                    </div>
                    {transaction.testimonial && (
                      <p className="text-base-content/80">
                        {transaction.testimonial}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="card bg-base-200">
                  <div className="card-body text-center">
                    <p className="mb-4">No review yet</p>
                    <button className="btn btn-primary">Write a Review</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
