import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/endpoints";
import type { Metadata } from "next";

interface ProcessedTransactionResponse {
  data: ProcessedTransaction;
  message: string;
  status: string;
}

interface ProcessedTransaction {
  id: number;
  buyer: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  product_details: {
    id: number;
    name: string;
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
    applied_discounts: Record<string, any>;
    user: {
      id: number;
      name: string;
      is_verified: boolean;
    };
    pickup_address: {
      id: number;
      label: string;
      address: string;
      contact_person: string;
      details: string;
    };
  };
  delivery_status: string;
  delivery_address_details: {
    id: number;
    label: string;
    address: string;
    contact_person: string;
    details: string;
    date_created: string;
    date_updated: string | null;
    user_id: number;
  };
  pickup_address_details: {
    id: number;
    label: string;
    address: string;
    contact_person: string;
    details: string;
    date_created: string;
    date_updated: string | null;
    user_id: number;
  };
  quantity: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  confirmation_details: {
    confirmation_date: string | null;
    confirmed_by: string | null;
  };
  rating: number | null;
  review_date: string | null;
  testimonial: string | null;
}

// Server-side data fetching
async function getProcessedTransactionDetails(
  id: string
): Promise<ProcessedTransaction | null> {
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
      `${protocol}://${host}/api/processed-products/${id}`,
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

    const result: ProcessedTransactionResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const transactionId = (await params).id;
  const transaction = await getProcessedTransactionDetails(transactionId);

  return {
    title: transaction
      ? `Expedition ${transaction.id} - ${transaction.product.name}`
      : "Expedition Not Found",
    description: transaction
      ? `Expedition details for ${transaction.product.name}`
      : "Expedition not found",
  };
}

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

export default async function ExpeditionTransactionDetail({
  params,
}: {
  params: { id: string };
}) {
  const transactionId = (await params).id;
  const transaction = await getProcessedTransactionDetails(transactionId);
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value;

  if (!transaction || userRole !== "expedition") {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/expedition" className="btn btn-ghost btn-sm gap-2">
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                Transaction {transaction.id}
              </h1>
              <p className="text-base-content/70 text-sm">
                {formatDate(transaction.created_at)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="badge badge-info">
                {transaction.delivery_status.charAt(0).toUpperCase() +
                  transaction.delivery_status.slice(1)}
              </span>
              <p className="text-lg font-semibold">
                {formatPrice(transaction.total_price)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="font-medium">{transaction.product.name}</h3>
                  <p className="text-sm text-base-content/70">
                    {transaction.product_details.description}
                  </p>
                  <p className="text-sm">
                    Category: {transaction.product_details.category.name}
                  </p>
                  <p className="text-sm">Quantity: {transaction.quantity}</p>
                  <p className="text-sm">
                    Unit Price: {formatPrice(transaction.product_details.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Seller Details</h2>
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <p className="font-medium">{transaction.seller.name}</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Pickup Address</p>
                    <p className="text-sm">
                      {transaction.pickup_address_details.label}
                    </p>
                    <p className="text-sm">
                      {transaction.pickup_address_details.contact_person}
                    </p>
                    <p className="text-sm">
                      {transaction.pickup_address_details.address}
                    </p>
                    {transaction.pickup_address_details.details && (
                      <p className="text-sm text-base-content/70">
                        {transaction.pickup_address_details.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Buyer Details</h2>
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <p className="font-medium">{transaction.buyer.name}</p>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Delivery Address</p>
                    <p className="text-sm">
                      {transaction.delivery_address_details.label}
                    </p>
                    <p className="text-sm">
                      {transaction.delivery_address_details.contact_person}
                    </p>
                    <p className="text-sm">
                      {transaction.delivery_address_details.address}
                    </p>
                    {transaction.delivery_address_details.details && (
                      <p className="text-sm text-base-content/70">
                        {transaction.delivery_address_details.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Timeline</h2>
              <div className="card bg-base-200">
                <div className="card-body p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm">
                      {formatDate(transaction.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm">
                      {formatDate(transaction.updated_at)}
                    </p>
                  </div>
                  {transaction.confirmation_details.confirmation_date && (
                    <div>
                      <p className="text-sm font-medium">Confirmed</p>
                      <p className="text-sm">
                        {formatDate(
                          transaction.confirmation_details.confirmation_date
                        )}
                      </p>
                      <p className="text-sm text-base-content/70">
                        by {transaction.confirmation_details.confirmed_by}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
