"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/interceptor";
import { CheckCircle2, XCircle, Loader2, Filter } from "lucide-react";
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
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
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

  const filteredCertifications = certifications.filter((cert) =>
    filter === "all" ? true : cert.status === filter
  );

  const renderStatus = (status: string) => {
    const statusClasses = {
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Certifications</h1>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <select
            className="select select-bordered select-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <XCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Certification</th>
              <th>Status</th>
              <th>Request Date</th>
              <th>Verifier</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertifications.map((cert) => (
              <tr key={cert.id} className="hover">
                <td>
                  <Link
                    href={`/products/${cert.product.id}`}
                    className="hover:underline font-medium"
                  >
                    {cert.product.name}
                  </Link>
                </td>
                <td>{cert.certification.name}</td>
                <td>{renderStatus(cert.status)}</td>
                <td>
                  <span className="whitespace-nowrap">
                    {formatDate(cert.created_at)}
                  </span>
                </td>
                <td>
                  {cert.verifier ? (
                    <div className="text-sm">
                      <p>{cert.verifier.name}</p>
                      <p className="text-xs text-base-content/70">
                        {cert.verification_date &&
                          formatDate(cert.verification_date)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-base-content/50">-</span>
                  )}
                </td>
                <td className="text-right">
                  {cert.status === "pending" && (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleVerify(cert.id, "approved")}
                        className="btn btn-success btn-sm"
                        disabled={processingId === cert.id}
                      >
                        {processingId === cert.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">
                              Approve
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleVerify(cert.id, "rejected")}
                        className="btn btn-error btn-sm"
                        disabled={processingId === cert.id}
                      >
                        {processingId === cert.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">
                              Reject
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCertifications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-base-content/70">
              {filter === "all"
                ? "No certifications to review"
                : `No ${filter} certifications found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
