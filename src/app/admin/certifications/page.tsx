"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/interceptor";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface Certification {
  id: number;
  certification: {
    id: number;
    name: string;
  };
  product: {
    id: number;
    name: string;
  };
  status: string;
  created_at: string;
  updated_at: string | null;
  verification_date: string | null;
  verifier: {
    id: number;
    name: string;
  } | null;
}

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") {
      router.push("/login");
      return;
    }

    fetchCertifications();
  }, [isLoggedIn, user, router]);

  const fetchCertifications = async () => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.PRODUCT_CERTIFICATIONS
      );
      if (response.data.status === "success") {
        setCertifications(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch certifications");
      console.error("Error fetching certifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (
    certificationId: number,
    status: "approved" | "rejected"
  ) => {
    setProcessingId(certificationId);
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.VERIFY_CERTIFICATION(certificationId),
        { status }
      );
      if (response.data.status === "success") {
        // Update the certification in the list
        setCertifications((prevCerts) =>
          prevCerts.map((cert) =>
            cert.id === certificationId ? response.data.data : cert
          )
        );
      }
    } catch (err) {
      setError(`Failed to ${status} certification`);
      console.error(`Error ${status} certification:`, err);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Product Certifications</h1>

      {error && (
        <div className="alert alert-error mb-4">
          <XCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-4 md:gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="card-body p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <Link
                    href={`/products/${cert.product.id}`}
                    className="hover:underline"
                  >
                    <h3 className="font-semibold text-lg">
                      {cert.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-base-content/70 mb-2">
                    Certification: {cert.certification.name}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center text-sm">
                    <span
                      className={`badge ${
                        cert.status === "approved"
                          ? "badge-success"
                          : cert.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {cert.status}
                    </span>
                    <span className="text-base-content/70">
                      Requested: {formatDate(cert.created_at)}
                    </span>
                  </div>
                </div>

                {cert.status === "pending" && (
                  <div className="flex gap-2 md:flex-col lg:flex-row justify-end">
                    <button
                      onClick={() => handleVerify(cert.id, "approved")}
                      className="btn btn-success btn-sm flex-1"
                      disabled={processingId === cert.id}
                    >
                      {processingId === cert.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleVerify(cert.id, "rejected")}
                      className="btn btn-error btn-sm flex-1"
                      disabled={processingId === cert.id}
                    >
                      {processingId === cert.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Reject
                        </>
                      )}
                    </button>
                  </div>
                )}

                {cert.verifier && (
                  <div className="text-sm text-base-content/70">
                    <p>Verified by: {cert.verifier.name}</p>
                    <p>Date: {formatDate(cert.verification_date!)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-base-content/70">No certifications to review</p>
          </div>
        )}
      </div>
    </div>
  );
}
