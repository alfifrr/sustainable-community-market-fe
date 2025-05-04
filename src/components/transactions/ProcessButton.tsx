"use client";
import { useState } from "react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface ProcessButtonProps {
  transactionId: number;
  onSuccess?: () => void;
}

export default function ProcessButton({
  transactionId,
  onSuccess,
}: ProcessButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProcess = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError("");

      const response = await axiosInstance.post(API_ENDPOINTS.PROCESS, {
        transaction_id: transactionId,
      });

      if (response.data.status === "success") {
        onSuccess?.();
      } else {
        setError("Failed to process the order. Please try again.");
      }
    } catch (err) {
      setError("Failed to process the order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2">
      {error && (
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
        className={`btn btn-info btn-sm transition-all duration-300 ease-in-out transform
          ${isLoading ? "loading opacity-70" : "hover:scale-105"}`}
        onClick={handleProcess}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Process Order"}
      </button>
    </div>
  );
}
