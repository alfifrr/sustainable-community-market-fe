"use client";
import { useState } from "react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface CancelButtonProps {
  transactionId: number;
  onSuccess?: () => void;
}

export default function CancelButton({
  transactionId,
  onSuccess,
}: CancelButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError("");

      const response = await axiosInstance.post(API_ENDPOINTS.CANCEL, {
        transaction_id: transactionId,
      });

      if (response.data.status === "success") {
        onSuccess?.();
      } else {
        setError("Failed to cancel the order. Please try again.");
      }
    } catch (err) {
      setError("Failed to cancel the order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
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
        className={`btn btn-error btn-sm ml-2 ${isLoading ? "loading" : ""}`}
        onClick={handleCancel}
        disabled={isLoading}
      >
        {isLoading ? "Cancelling..." : "Cancel Order"}
      </button>
    </>
  );
}
