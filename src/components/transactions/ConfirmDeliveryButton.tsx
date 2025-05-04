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

  const handleConfirmDelivery = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/api/confirm-delivery", {
        transaction_id: transactionId,
      });

      if (response.status === 200 || response.status === 201) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error confirming delivery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}
