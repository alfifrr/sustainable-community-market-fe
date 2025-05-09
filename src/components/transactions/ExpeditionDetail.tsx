"use client";
import { useState } from "react";
import Link from "next/link";
import ConfirmDeliveryButton from "./ConfirmDeliveryButton";
import type { ProcessedTransaction } from "@/lib/types";

interface ExpeditionDetailProps {
  transaction: ProcessedTransaction;
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

export default function ExpeditionDetail({
  transaction: initialTransaction,
}: ExpeditionDetailProps) {
  const [transaction, setTransaction] = useState(initialTransaction);
  const showConfirmButton = transaction.delivery_status === "processed";

  const handleDeliveryConfirmed = () => {
    setTransaction((prev: ProcessedTransaction) => ({
      ...prev,
      delivery_status: "delivered",
    }));
  };

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
              <div className="flex items-center gap-2">
                <span className="badge badge-info">
                  {transaction.delivery_status.charAt(0).toUpperCase() +
                    transaction.delivery_status.slice(1)}
                </span>
                {showConfirmButton && (
                  <ConfirmDeliveryButton
                    transactionId={transaction.id}
                    onSuccess={handleDeliveryConfirmed}
                  />
                )}
              </div>
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
                  {transaction.assignment_details.confirmation_date && (
                    <div>
                      <p className="text-sm font-medium">Confirmed</p>
                      <p className="text-sm">
                        {formatDate(
                          transaction.assignment_details.confirmation_date
                        )}
                      </p>
                      {transaction.assignment_details.assigned_expedition && (
                        <p className="text-sm text-base-content/70">
                          by{" "}
                          {
                            transaction.assignment_details.assigned_expedition
                              .name
                          }
                        </p>
                      )}
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
