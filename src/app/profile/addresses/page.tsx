"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, User, Home, Info, Plus, Calendar } from "lucide-react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";
import SellersMap from "@/components/SellersMap";
import { useNearbySellers } from "@/hooks/useNearbySellers";

interface Address {
  id: number;
  label: string;
  address: string;
  contact_person: string;
  details: string;
  date_created: string;
  date_updated: string | null;
  user_id: number;
}

export default function AddressesPage() {
  const router = useRouter();
  const { userLocation, isLoading: locationLoading } = useNearbySellers(1);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    address: "",
    details: "",
    contact_person: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADDRESSES);
      if (response.data.status === "success") {
        setAddresses(response.data.data);
      }
    } catch (error) {
      setError("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.ADDRESSES,
        formData
      );

      if (response.data.status === "success") {
        setAddresses((prev) => [...prev, response.data.data]);
        setFormData({
          label: "",
          address: "",
          details: "",
          contact_person: "",
        });
      }
    } catch (error) {
      setError("Failed to create address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50">
      <div className="container mx-auto px-4 py-8">
        {/* Map Section */}
        <div className="mb-8 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Your Location</h2>
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              {!locationLoading && userLocation && (
                <SellersMap
                  sellers={[]}
                  center={{
                    lat: userLocation.latitude,
                    lng: userLocation.longitude,
                  }}
                  zoom={14}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Add New Address */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="sticky top-24">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title flex items-center gap-2 text-xl mb-6">
                    <Plus size={20} className="text-primary" />
                    Add New Address
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <Home size={16} className="text-primary" />
                          Label
                          <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary transition-colors"
                        placeholder="E.g., Home, Office, Store"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <User size={16} className="text-primary" />
                          Contact Person
                          <span className="text-error">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="contact_person"
                        value={formData.contact_person}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary transition-colors"
                        placeholder="Name of contact person"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <MapPin size={16} className="text-primary" />
                          Complete Address
                          <span className="text-error">*</span>
                        </span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="textarea textarea-bordered min-h-[120px] focus:textarea-primary transition-colors"
                        placeholder="Street name, building number, district, city, province"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <Info size={16} className="text-primary" />
                          Additional Details
                        </span>
                        <span className="label-text-alt opacity-70">
                          Optional
                        </span>
                      </label>
                      <input
                        type="text"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:input-primary transition-colors"
                        placeholder="Landmarks, building color, specific instructions"
                      />
                    </div>

                    {error && (
                      <div className="alert alert-error shadow-lg">
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
                      type="submit"
                      className="btn btn-primary w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus size={18} />
                          Add Address
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Address List */}
          <div className="w-full md:w-3/5 lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Your Addresses</h1>
              <div className="badge badge-primary">
                {addresses.length} Address{addresses.length !== 1 ? "es" : ""}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="card bg-base-100 shadow animate-pulse"
                  >
                    <div className="card-body">
                      <div className="h-4 bg-base-300 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-base-300 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-base-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-base-300 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : addresses.length === 0 ? (
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body items-center text-center py-12">
                  <MapPin size={48} className="text-base-content/30" />
                  <h3 className="font-semibold text-lg mt-4">
                    No addresses yet
                  </h3>
                  <p className="text-base-content/70 mt-2">
                    Add your first address using the form on the left
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="card-body">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Home size={18} className="text-primary" />
                            <h3 className="text-lg font-semibold">
                              {address.label}
                            </h3>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-base-content/70 mb-4">
                            <User size={16} />
                            <p>Contact: {address.contact_person}</p>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin size={16} className="mt-1 shrink-0" />
                            <p className="text-base-content/90">
                              {address.address}
                            </p>
                          </div>

                          {address.details && (
                            <div className="flex items-start gap-2 mt-2">
                              <Info
                                size={16}
                                className="mt-1 shrink-0 text-base-content/70"
                              />
                              <p className="text-sm text-base-content/70">
                                {address.details}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-base-200">
                        <Calendar size={14} className="text-base-content/50" />
                        <p className="text-xs text-base-content/50">
                          Added on{" "}
                          {new Date(address.date_created).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
