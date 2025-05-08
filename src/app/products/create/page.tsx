"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { getCertificationIcon } from "@/lib/formats";
import { AxiosError } from "axios";
import {
  ShoppingBag,
  BadgeCheck,
  ChevronLeft,
  Loader2,
  Leaf,
  Scale,
  Recycle,
  Warehouse,
  Package,
  Wind,
  Award,
} from "lucide-react";
import { useNearbySellers } from "@/hooks/useNearbySellers";
import SellersMap from "@/components/SellersMap";

const iconMap = {
  Leaf,
  Scale,
  Recycle,
  Warehouse,
  Package,
  Wind,
  Award,
} as const;

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Certification {
  id: number;
  name: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

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

interface ShippingAddress {
  label: string;
  address: string;
  details: string;
  contact_person: string;
  latitude: number | null;
  longitude: number | null;
}

export default function CreateProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<{
    error: string;
    message: string;
    status: string;
  } | null>(null);
  const [addressInputMode, setAddressInputMode] = useState<"saved" | "new">(
    "saved"
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [isAddressesLoading, setIsAddressesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [addressesError, setAddressesError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    address_id: "",
    expiration_date: "",
    certifications: [] as string[],
  });

  const { userLocation, isLoading: locationLoading } = useNearbySellers(1);

  const [newAddress, setNewAddress] = useState<ShippingAddress>({
    label: "",
    address: "",
    details: "",
    contact_person: "",
    latitude: null,
    longitude: null,
  });

  const [addressFormErrors, setAddressFormErrors] = useState({
    label: "",
    address: "",
    details: "",
    contact_person: "",
  });

  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isCertificationsLoading, setIsCertificationsLoading] = useState(false);
  const [certificationsError, setCertificationsError] = useState<string | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAddressFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateAddressForm = () => {
    const errors = {
      label: "",
      address: "",
      details: "",
      contact_person: "",
    };
    let isValid = true;

    if (!newAddress.label.trim()) {
      errors.label = "Label is required";
      isValid = false;
    } else if (newAddress.label.trim().length < 3) {
      errors.label = "Label must be at least 3 characters";
      isValid = false;
    } else if (newAddress.label.trim().length > 50) {
      errors.label = "Label must not exceed 50 characters";
      isValid = false;
    }

    if (!newAddress.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    } else if (newAddress.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters";
      isValid = false;
    } else if (newAddress.address.trim().length > 255) {
      errors.address = "Address must not exceed 255 characters";
      isValid = false;
    }

    if (newAddress.details.trim().length > 255) {
      errors.details = "Details must not exceed 255 characters";
      isValid = false;
    }

    if (!newAddress.contact_person.trim()) {
      errors.contact_person = "Contact person is required";
      isValid = false;
    } else if (newAddress.contact_person.trim().length < 3) {
      errors.contact_person = "Contact person must be at least 3 characters";
      isValid = false;
    } else if (newAddress.contact_person.trim().length > 255) {
      errors.contact_person = "Contact person must not exceed 255 characters";
      isValid = false;
    }

    setAddressFormErrors(errors);
    return isValid;
  };

  const handleMapClick = (lat: number, lng: number) => {
    setNewAddress((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const createNewAddress = async (): Promise<string | null> => {
    if (!validateAddressForm()) {
      return null;
    }

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.ADDRESSES, {
        label: newAddress.label,
        address: newAddress.address,
        details: newAddress.details || "",
        contact_person: newAddress.contact_person,
        latitude: newAddress.latitude,
        longitude: newAddress.longitude,
      });

      if (data.status === "success") {
        setAddresses((prev) => [...prev, data.data]);
        return data.data.id;
      }
      return null;
    } catch (error) {
      console.error("Error creating address:", error);
      setServerError({
        error: "Address Creation Error",
        message: "Failed to create new address. Please try again.",
        status: "error",
      });
      return null;
    }
  };

  const handleCertificationChange = (certificationId: string) => {
    setFormData((prev) => {
      const currentCertifications = prev.certifications;
      const newCertifications = currentCertifications.includes(certificationId)
        ? currentCertifications.filter((id) => id !== certificationId)
        : [...currentCertifications, certificationId];

      return {
        ...prev,
        certifications: newCertifications,
      };
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors: Record<string, string> = {};

    // Product Name validation (3-255 characters)
    if (!formData.name.trim()) {
      errors.name = "Product name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      errors.name = "Product name must be at least 3 characters";
      isValid = false;
    } else if (formData.name.trim().length > 255) {
      errors.name = "Product name must not exceed 255 characters";
      isValid = false;
    }

    // Description validation (10-255 characters)
    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    } else if (formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
      isValid = false;
    } else if (formData.description.trim().length > 255) {
      errors.description = "Description must not exceed 255 characters";
      isValid = false;
    }

    // Price validation (minimum 1)
    if (!formData.price) {
      errors.price = "Price is required";
      isValid = false;
    } else if (parseInt(formData.price) < 1) {
      errors.price = "Price must be at least 1";
      isValid = false;
    }

    // Stock validation (minimum 1)
    if (!formData.stock) {
      errors.stock = "Stock is required";
      isValid = false;
    } else if (parseInt(formData.stock) < 1) {
      errors.stock = "Stock must be at least 1";
      isValid = false;
    }

    // Category validation
    if (!formData.category_id) {
      errors.category = "Category is required";
      isValid = false;
    }

    // Address validation
    if (addressInputMode === "saved" && !formData.address_id) {
      errors.address = "Please select a pickup address";
      isValid = false;
    }

    // Expiration date validation
    if (!formData.expiration_date) {
      errors.expiration_date = "Expiration date is required";
      isValid = false;
    }

    if (!isValid) {
      setServerError({
        error: "Validation Error",
        message: "Please check the form for errors",
        status: "error",
      });
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      let finalAddressId = formData.address_id;
      if (addressInputMode === "new") {
        const newAddressId = await createNewAddress();
        if (!newAddressId) {
          setIsSubmitting(false);
          return;
        }
        finalAddressId = newAddressId;
      }

      const expirationDate = new Date(formData.expiration_date);
      expirationDate.setUTCHours(23, 59, 59, 999);

      // Convert certification IDs to numbers
      const sustainabilityCertifications = formData.certifications.map((id) =>
        parseInt(id)
      );

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        address_id: parseInt(finalAddressId),
        expiration_date: expirationDate.toISOString(),
        sustainability_certifications: sustainabilityCertifications,
      };

      const { data } = await axiosInstance.post(
        API_ENDPOINTS.PRODUCTS,
        productData
      );

      if (data.status === "success") {
        router.push("/products/" + data.data.id);
      } else {
        setServerError({
          error: "Create product error",
          message: data.message || "Failed to create product",
          status: "error",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setServerError({
          error: error.response?.data?.error || "Create product error",
          message: error.response?.data?.message || "Failed to create product",
          status: "error",
        });
      } else {
        setServerError({
          error: "Create product error",
          message: "An unexpected error occurred",
          status: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCategories = useCallback(async () => {
    if (categories.length > 0) return;
    setIsCategoriesLoading(true);
    setCategoriesError(null);

    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.CATEGORY);
      if (data.status === "success") {
        setCategories(data.data);
      } else {
        setCategoriesError("Failed to load categories. Please try again.");
      }
    } catch {
      setCategoriesError("Failed to load categories. Please try again.");
    } finally {
      setIsCategoriesLoading(false);
    }
  }, [categories.length]);

  const fetchAddresses = useCallback(async () => {
    if (addresses.length > 0) return;
    setIsAddressesLoading(true);
    setAddressesError(null);

    try {
      const { data } = await axiosInstance.get(API_ENDPOINTS.ADDRESSES);
      if (data.status === "success") {
        setAddresses(data.data);
        if (data.data.length === 0) {
          setAddressesError(
            "No pickup addresses found. Please add an address in your profile first."
          );
        }
      } else {
        setAddressesError("Failed to load addresses. Please try again.");
      }
    } catch {
      setAddressesError("Failed to load addresses. Please try again.");
    } finally {
      setIsAddressesLoading(false);
    }
  }, [addresses.length]);

  useEffect(() => {
    const fetchCertifications = async () => {
      setIsCertificationsLoading(true);
      setCertificationsError(null);
      try {
        const { data } = await axiosInstance.get(
          API_ENDPOINTS.AVAILABLE_CERTIFICATIONS
        );
        if (data.status === "success") {
          setCertifications(data.data);
        } else {
          setCertificationsError(
            "Failed to load certifications. Please try again."
          );
        }
      } catch {
        setCertificationsError(
          "Failed to load certifications. Please try again."
        );
      } finally {
        setIsCertificationsLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return (
    <div className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              List a New Product
            </h1>

            {serverError && (
              <div className="alert alert-error mb-6">
                <div>
                  <h3 className="font-bold">{serverError.error}</h3>
                  <p className="text-sm">{serverError.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Product Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Describe your product"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium mb-2"
                  >
                    Price (Rp) <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    onFocus={(e) => {
                      const handleWheel = (e: WheelEvent) => {
                        e.preventDefault();
                      };
                      e.target.addEventListener("wheel", handleWheel, {
                        passive: false,
                      });
                      e.target.onblur = () => {
                        e.target.removeEventListener("wheel", handleWheel);
                      };
                    }}
                    className="input input-bordered w-full"
                    placeholder="0"
                    min="0"
                    step="100"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium mb-2"
                  >
                    Stock <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    onFocus={(e) => {
                      const handleWheel = (e: WheelEvent) => {
                        e.preventDefault();
                      };
                      e.target.addEventListener("wheel", handleWheel, {
                        passive: false,
                      });
                      e.target.onblur = () => {
                        e.target.removeEventListener("wheel", handleWheel);
                      };
                    }}
                    className="input input-bordered w-full"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category_id"
                    className="block text-sm font-medium mb-2"
                  >
                    Category <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      onClick={fetchCategories}
                      className="select select-bordered w-full"
                      required
                      disabled={isCategoriesLoading}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {isCategoriesLoading && (
                      <div className="absolute right-10 top-1/2 -translate-y-1/2">
                        <span className="loading loading-spinner loading-sm"></span>
                      </div>
                    )}
                  </div>
                  {categoriesError && (
                    <p className="text-error text-sm mt-1">{categoriesError}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Pickup Location <span className="text-error">*</span>
                  </label>
                  <div className="tabs tabs-boxed mb-4">
                    <button
                      type="button"
                      className={`tab ${
                        addressInputMode === "saved" ? "tab-active" : ""
                      }`}
                      onClick={() => setAddressInputMode("saved")}
                    >
                      Use Saved Address
                    </button>
                    <button
                      type="button"
                      className={`tab ${
                        addressInputMode === "new" ? "tab-active" : ""
                      }`}
                      onClick={() => setAddressInputMode("new")}
                    >
                      Add New Address
                    </button>
                  </div>

                  {addressInputMode === "saved" && (
                    <div className="form-control">
                      <div className="relative">
                        <select
                          id="address_id"
                          name="address_id"
                          value={formData.address_id}
                          onChange={handleChange}
                          onClick={fetchAddresses}
                          className="select select-bordered w-full"
                          required
                          disabled={isAddressesLoading}
                        >
                          <option value="">Select a pickup location</option>
                          {addresses.map((address) => (
                            <option key={address.id} value={address.id}>
                              {address.label} - {address.address}
                              {address.details && ` (${address.details})`}
                            </option>
                          ))}
                        </select>
                        {isAddressesLoading && (
                          <div className="absolute right-10 top-1/2 -translate-y-1/2">
                            <span className="loading loading-spinner loading-sm"></span>
                          </div>
                        )}
                      </div>
                      {addressesError && (
                        <p className="text-error text-sm mt-1">
                          {addressesError}
                        </p>
                      )}
                    </div>
                  )}

                  {addressInputMode === "new" && (
                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Label <span className="text-error">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="label"
                          value={newAddress.label}
                          onChange={handleAddressChange}
                          className={`input input-bordered w-full ${
                            addressFormErrors.label ? "input-error" : ""
                          }`}
                          placeholder="E.g., Store, Warehouse, etc."
                        />
                        {addressFormErrors.label && (
                          <span className="text-error text-sm mt-1">
                            {addressFormErrors.label}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Contact Person <span className="text-error">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          name="contact_person"
                          value={newAddress.contact_person}
                          onChange={handleAddressChange}
                          className={`input input-bordered w-full ${
                            addressFormErrors.contact_person
                              ? "input-error"
                              : ""
                          }`}
                          placeholder="Name of contact person at this location"
                        />
                        {addressFormErrors.contact_person && (
                          <span className="text-error text-sm mt-1">
                            {addressFormErrors.contact_person}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">
                            Complete Address{" "}
                            <span className="text-error">*</span>
                          </span>
                        </label>
                        <textarea
                          name="address"
                          value={newAddress.address}
                          onChange={handleAddressChange}
                          className={`textarea textarea-bordered w-full ${
                            addressFormErrors.address ? "textarea-error" : ""
                          }`}
                          placeholder="Street name, building number, RT/RW, district, city, region/province, postal code"
                          rows={3}
                        />
                        {addressFormErrors.address && (
                          <span className="text-error text-sm mt-1">
                            {addressFormErrors.address}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Additional Details</span>
                          <span className="label-text-alt text-base-content/50">
                            Optional
                          </span>
                        </label>
                        <input
                          type="text"
                          name="details"
                          value={newAddress.details}
                          onChange={handleAddressChange}
                          className={`input input-bordered w-full ${
                            addressFormErrors.details ? "input-error" : ""
                          }`}
                          placeholder="Building color, landmarks, gate number, specific instructions"
                        />
                        {addressFormErrors.details && (
                          <span className="text-error text-sm mt-1">
                            {addressFormErrors.details}
                          </span>
                        )}
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Location on Map</span>
                        </label>
                        <div className="h-[300px] w-full rounded-lg overflow-hidden border border-base-300">
                          {!locationLoading && userLocation && (
                            <SellersMap
                              sellers={[]}
                              center={{
                                lat: userLocation.latitude,
                                lng: userLocation.longitude,
                              }}
                              zoom={14}
                              onMapClick={handleMapClick}
                            />
                          )}
                        </div>
                        {newAddress.latitude && newAddress.longitude && (
                          <div className="mt-2 text-sm text-base-content/70">
                            Selected coordinates:{" "}
                            {newAddress.latitude.toFixed(6)},{" "}
                            {newAddress.longitude.toFixed(6)}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="expiration_date"
                  className="block text-sm font-medium mb-2"
                >
                  Expiration Date <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  id="expiration_date"
                  name="expiration_date"
                  value={formData.expiration_date}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Certifications Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Sustainable Certifications</span>
                  <span className="label-text-alt">Select all that apply</span>
                </label>
                {isCertificationsLoading ? (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Loading certifications...</span>
                  </div>
                ) : certificationsError ? (
                  <div className="text-error mt-2">{certificationsError}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {certifications.map((cert) => {
                      const IconComponent =
                        iconMap[
                          getCertificationIcon(
                            cert.icon
                          ) as keyof typeof iconMap
                        ];
                      return (
                        <div
                          key={cert.id}
                          className={`card bg-base-100 cursor-pointer transition-all hover:shadow-lg ${
                            formData.certifications.includes(cert.id.toString())
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                          onClick={() =>
                            handleCertificationChange(cert.id.toString())
                          }
                        >
                          <div className="card-body p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{cert.name}</h3>
                                <p className="text-sm text-base-content/70">
                                  {cert.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-ghost gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="w-4 h-4" />
                      Create Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
