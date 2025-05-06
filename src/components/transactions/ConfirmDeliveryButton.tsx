"use client";
import { useState } from "react";
import axiosInstance from "@/lib/interceptor";

interface ConfirmDeliveryButtonProps {
  transactionId: number;
  onSuccess: () => void;
}

export default function ConfirmDeliveryButton({
  transactionId,
  onSuccess,
}: ConfirmDeliveryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleConfirmDelivery = async () => {
    try {
      setIsLoading(true);
      setError("");
      setShowError(false);

      const response = await axiosInstance.post("/api/confirm-delivery", {
        transaction_id: transactionId,
      });

      if (response.status === 200 || response.status === 201) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error confirming delivery:", error);
      if (error.response?.status === 403 && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to confirm delivery. Please try again.");
      }
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {showError && (
        <div className="alert alert-error py-2 px-4 text-sm rounded-lg max-w-xs animate-fadeIn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <button
        onClick={handleConfirmDelivery}
        className="btn btn-primary btn-sm"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          "Confirm Delivery"
        )}
      </button>
    </div>
  );
}
