"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Address {
  id: number;
  label: string;
  address: string;
}

// Temporary mock data - will be replaced with API calls
const mockCategories: Category[] = [
  { id: 1, name: "Vegetables & Fruits" },
  { id: 2, name: "Grains & Staples" },
  { id: 3, name: "Protein & Dairy" },
  { id: 4, name: "Meals & Snacks" },
];

const mockAddresses: Address[] = [
  { id: 1, label: "Main Store", address: "123 Market St" },
  { id: 2, label: "Warehouse", address: "456 Storage Ave" },
];

export default function CreateProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    address_id: "",
    expiration_date: "",
  });

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
    // Will implement API call later
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-8">
            <h1 className="text-2xl font-bold mb-6">List a New Product</h1>

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
                    step="1000"
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
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a category</option>
                    {mockCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="address_id"
                    className="block text-sm font-medium mb-2"
                  >
                    Pickup Location <span className="text-error">*</span>
                  </label>
                  <select
                    id="address_id"
                    name="address_id"
                    value={formData.address_id}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a pickup location</option>
                    {mockAddresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.label} - {address.address}
                      </option>
                    ))}
                  </select>
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
