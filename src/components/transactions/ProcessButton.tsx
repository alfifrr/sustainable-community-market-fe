"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface ExpeditionUser {
  id: number;
  name: string;
  is_verified: boolean;
  role: string;
  date_joined: string;
  date_updated: string | null;
  last_activity: string | null;
}

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
  const [expeditions, setExpeditions] = useState<ExpeditionUser[]>([]);
  const [selectedExpeditionId, setSelectedExpeditionId] = useState<
    number | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.EXPEDITIONS);
        if (response.data.status === "success") {
          setExpeditions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching expeditions:", error);
      }
    };

    fetchExpeditions();
  }, []);

  const handleProcess = async () => {
    if (isLoading || !selectedExpeditionId) return;

    try {
      setIsLoading(true);
      setError("");

      const response = await axiosInstance.post(API_ENDPOINTS.PROCESS, {
        transaction_id: transactionId,
        expedition_id: selectedExpeditionId,
      });

      if (response.data.status === "success") {
        onSuccess?.();
        setShowModal(false);
        setSelectedExpeditionId(null);
      } else {
        setError("Failed to process the order. Please try again.");
      }
    } catch {
      setError("Failed to process the order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openProcessModal = () => {
    setError("");
    setShowModal(true);
  };

  return (
    <>
      <button
        className="btn btn-info btn-sm transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={openProcessModal}
      >
        Process Order
      </button>

      {/* Process Order Modal */}
      <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Process Order</h3>

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

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">
                Select Expedition Partner
              </span>
            </label>
            {expeditions.length > 0 ? (
              <select
                className="select select-bordered w-full"
                value={selectedExpeditionId || ""}
                onChange={(e) =>
                  setSelectedExpeditionId(Number(e.target.value))
                }
              >
                <option value="" disabled>
                  Select an expedition partner
                </option>
                {expeditions.map((expedition) => (
                  <option key={expedition.id} value={expedition.id}>
                    {expedition.name}
                    {!expedition.is_verified && " (Unverified)"}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-base-content/70">
                No expedition partners available
              </div>
            )}
          </div>

          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => {
                setShowModal(false);
                setSelectedExpeditionId(null);
                setError("");
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleProcess}
              disabled={
                isLoading || !selectedExpeditionId || expeditions.length === 0
              }
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : (
                "Confirm Process"
              )}
            </button>
          </div>
        </div>
        <div
          className="modal-backdrop"
          onClick={() => !isLoading && setShowModal(false)}
        />
      </dialog>
    </>
  );
}
