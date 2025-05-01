"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface Category {
  id: number;
  name: string;
  description: string;
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

export default function CreateProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<{
    error: string;
    message: string;
    status: string;
  } | null>(null);
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
  });

  const fetchCategories = async () => {
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
    } catch (error) {
      setCategoriesError("Failed to load categories. Please try again.");
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  const fetchAddresses = async () => {
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
    } catch (error) {
      setAddressesError("Failed to load addresses. Please try again.");
    } finally {
      setIsAddressesLoading(false);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerError(null);

    try {
      // Convert the expiration date to end of day (23:59:59.999)
      const expirationDate = new Date(formData.expiration_date);
      expirationDate.setUTCHours(23, 59, 59, 999);

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        category_id: parseInt(formData.category_id),
        address_id: parseInt(formData.address_id),
        expiration_date: expirationDate.toISOString(),
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
    } catch (error: any) {
      setServerError({
        error: error.response?.data?.error || "Create product error",
        message: error.response?.data?.message || "Failed to create product",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">List a New Product</h1>

            {serverError && (
              <div className="alert alert-error mb-6">
                <div>
                  <h3 className="font-bold">{serverError.error}</h3>
                  <p className="text-sm">{serverError.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
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

              {/* Description */}
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

              {/* Price and Stock Row */}
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
                    className="input input-bordered w-full"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Category and Address Row */}
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
                  <label
                    htmlFor="address_id"
                    className="block text-sm font-medium mb-2"
                  >
                    Pickup Location <span className="text-error">*</span>
                  </label>
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
                    <p className="text-error text-sm mt-1">{addressesError}</p>
                  )}
                </div>
              </div>

              {/* Expiration Date */}
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

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Product"
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
