"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/endpoints";
import axiosInstance from "@/lib/interceptor";

export default function TopUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const returnTo = searchParams.get("returnTo") || "/profile/transactions";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!amount || parseInt(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    try {
      await axiosInstance.post(API_ENDPOINTS.DEPOSIT, {
        amount: parseInt(amount),
      });

      // Return to the previous page (checkout or transactions)
      router.push(returnTo);
    } catch (err) {
      setError("Failed to process top-up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Top Up Balance</h1>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount (IDR)</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter amount in IDR"
                  min="1000"
                  step="1000"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    "Top Up"
                  )}
                </button>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-ghost btn-sm w-full"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
