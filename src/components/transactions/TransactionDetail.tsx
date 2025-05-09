"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CancelButton from "./CancelButton";
import ProcessButton from "./ProcessButton";
import { Transaction } from "@/lib/types";
import axiosInstance from "@/lib/interceptor";

interface TransactionDetailProps {
  transaction: Transaction;
  isBuyer: boolean;
  isSeller: boolean;
}

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

export default function TransactionDetail({
  transaction: initialTransaction,
  isBuyer,
  isSeller,
}: TransactionDetailProps) {
  const [transaction, setTransaction] = useState(initialTransaction);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [testimonial, setTestimonial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const displayTransactionNumber = generateTransactionNumber(transaction);
  const showCancelButton = isBuyer && transaction.delivery_status === "pending";
  const showProcessButton =
    isSeller && transaction.delivery_status === "pending";
  const showRating =
    isBuyer &&
    transaction.delivery_status === "delivered" &&
    !transaction.rating;

  const handleCancelSuccess = () => {
    setTransaction((prev) => ({
      ...prev,
      delivery_status: "cancelled",
    }));
  };

  const handleProcessSuccess = () => {
    setTransaction((prev) => ({
      ...prev,
      delivery_status: "processed",
    }));
  };

  const validateRating = () => {
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars");
      return false;
    }
    if (testimonial.length > 1000) {
      setError("Testimonial must not exceed 1000 characters");
      return false;
    }
    return true;
  };

  const handleSubmitRating = async () => {
    if (!validateRating()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axiosInstance.post("/api/rate", {
        transaction_id: transaction.id,
        rating,
        testimonial: testimonial.trim() || null,
      });

      if (response.data.status === "success") {
        setTransaction((prev) => ({
          ...prev,
          rating,
          testimonial,
          review_date: new Date().toISOString(),
          delivery_status: "rated",
        }));
        setShowRatingForm(false);
      } else {
        setError("Failed to submit rating. Please try again.");
      }
    } catch {
      setError("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold mb-2">
                Transaction {displayTransactionNumber}
              </h1>
              <p className="text-base-content/70 text-sm">
                {formatDate(transaction.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span
                className={`badge ${getStatusBadgeColor(
                  transaction.delivery_status
                )}`}
              >
                {transaction.delivery_status.charAt(0).toUpperCase() +
                  transaction.delivery_status.slice(1)}
              </span>
              {showProcessButton && (
                <ProcessButton
                  transactionId={transaction.id}
                  onSuccess={handleProcessSuccess}
                />
              )}
              {showCancelButton && (
                <CancelButton
                  transactionId={transaction.id}
                  onSuccess={handleCancelSuccess}
                />
              )}
            </div>
          </div>

          {/* Review Section - Moved to top */}
          {transaction.delivery_status === "delivered" && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Review</h2>
              {transaction.rating ? (
                <div className="card bg-base-200">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rating rating-sm sm:rating-md">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name="rating-view"
                            className="mask mask-star-2 bg-warning"
                            checked={star === transaction.rating}
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-base-content/70">
                        {formatDate(transaction.review_date!)}
                      </span>
                    </div>
                    {transaction.testimonial && (
                      <p className="text-sm sm:text-base text-base-content/80">
                        {transaction.testimonial}
                      </p>
                    )}
                  </div>
                </div>
              ) : showRating ? (
                <div className="card bg-base-200">
                  <div className="card-body p-4">
                    {!showRatingForm ? (
                      <div className="text-center">
                        <p className="mb-4 text-sm sm:text-base">
                          Share your experience with this purchase!
                        </p>
                        <button
                          className="btn btn-primary btn-sm sm:btn-md"
                          onClick={() => setShowRatingForm(true)}
                        >
                          Write a Review
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {error && (
                          <div className="alert alert-error text-sm">
                            {error}
                          </div>
                        )}
                        <div>
                          <label className="label">
                            <span className="label-text font-medium">
                              Rating <span className="text-error">*</span>
                            </span>
                          </label>
                          <div className="rating rating-lg">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <input
                                key={star}
                                type="radio"
                                name="rating-form"
                                className="mask mask-star-2 bg-warning"
                                checked={star === rating}
                                onChange={() => setRating(star)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="label">
                            <span className="label-text font-medium">
                              Testimonial
                            </span>
                            <span className="label-text-alt">
                              Optional · {testimonial.length}/1000
                            </span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered w-full h-24"
                            placeholder="Share your thoughts about the product and seller..."
                            value={testimonial}
                            onChange={(e) => setTestimonial(e.target.value)}
                            maxLength={1000}
                          ></textarea>
                        </div>

                        <div className="flex justify-end gap-2">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                              setShowRatingForm(false);
                              setRating(0);
                              setTestimonial("");
                              setError("");
                            }}
                            disabled={isSubmitting}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={handleSubmitRating}
                            disabled={isSubmitting || rating === 0}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Submitting...
                              </>
                            ) : (
                              "Submit Review"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Product Details */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Product Details</h2>
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-base-300 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">
                        {transaction.product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-base-content/70">
                        Category: {transaction.product_details.category.name}
                      </p>
                      <p className="text-xs sm:text-sm mt-2">
                        {transaction.quantity} ×{" "}
                        {formatPrice(transaction.product_details.price)}
                      </p>
                      <p className="font-medium text-sm sm:text-base mt-1">
                        Total: {formatPrice(transaction.total_price)}
                      </p>
                    </div>
                  </div>

                  {/* Discounts */}
                  {transaction.product_details.applied_discounts && (
                    <div className="mt-4">
                      <p className="text-xs sm:text-sm font-medium mb-2">
                        Applied Discounts:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {transaction.product_details.applied_discounts.bulk && (
                          <span className="badge badge-primary text-xs">
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
                          <span className="badge badge-secondary text-xs">
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
                <div className="card-body p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Seller</p>
                      <p className="text-sm sm:text-base">
                        {transaction.seller.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">Buyer</p>
                      <p className="text-sm sm:text-base">
                        {transaction.buyer.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">
                        Delivery Address
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        {transaction.delivery_address_details.label}
                      </p>
                      <p className="text-sm sm:text-base">
                        {transaction.delivery_address_details.contact_person}
                      </p>
                      <p className="text-sm sm:text-base">
                        {transaction.delivery_address_details.address}
                      </p>
                      {transaction.delivery_address_details.details && (
                        <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                          {transaction.delivery_address_details.details}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
