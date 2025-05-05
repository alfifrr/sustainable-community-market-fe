"use client";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { Product } from "@/lib/types";
import ProductCard from "@/components/search/ProductCard";
import { Filter } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = API_ENDPOINTS.PRODUCTS;
        const params = new URLSearchParams();
        if (selectedCategory) {
          params.append("category", selectedCategory);
        }
        if (sortBy) {
          params.append("sort", sortBy);
        }
        const finalUrl = params.toString()
          ? `${url}?${params.toString()}`
          : url;

        // Fetch products and their reviews in parallel
        const productsRes = await fetch(finalUrl);
        if (!productsRes.ok) {
          throw new Error(
            `Failed to fetch products: ${productsRes.statusText}`
          );
        }
        const productsData = await productsRes.json();

        // Get review stats for each product
        const productsWithReviews = await Promise.all(
          (productsData.data || []).map(async (product: Product) => {
            const reviewsRes = await fetch(
              `/api/products/${product.id}/reviews`
            );
            const reviewsData = reviewsRes.ok
              ? await reviewsRes.json()
              : {
                  data: {
                    average_rating: 0,
                    total_items_sold: 0,
                  },
                };

            return {
              ...product,
              average_rating: reviewsData.data.average_rating || 0,
              total_items_sold: reviewsData.data.total_items_sold || 0,
            };
          })
        );

        let filteredProducts = productsWithReviews;

        if (selectedCategory && !params.has("category")) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category.id === selectedCategory
          );
        }

        if (!params.has("sort")) {
          filteredProducts = sortProducts(filteredProducts, sortBy);
        }

        setProducts(filteredProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            filteredProducts
              .map((product) => {
                if (
                  product.category &&
                  product.category.id &&
                  product.category.name
                ) {
                  return JSON.stringify({
                    id: product.category.id,
                    name: product.category.name,
                  });
                }
                return null;
              })
              .filter(Boolean)
          )
        )
          .map((str) => (typeof str === "string" ? JSON.parse(str) : null))
          .filter(Boolean);

        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, sortBy]);

  // Function to sort products based on selected option
  const sortProducts = (products: Product[], sortOption: string) => {
    const productsCopy = [...products];

    switch (sortOption) {
      case "price_low":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "price_high":
        return productsCopy.sort((a, b) => b.price - a.price);
      case "expiry":
        return productsCopy.sort(
          (a, b) =>
            new Date(a.expiration_date).getTime() -
            new Date(b.expiration_date).getTime()
        );
      case "newest":
      default:
        return productsCopy.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          className="btn btn-ghost gap-2 mt-4 md:mt-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filter & Sort
        </button>
      </div>

      {/* Filters and Sorting */}
      {showFilters && (
        <div className="bg-base-200 p-4 rounded-lg mb-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full md:w-1/2">
              <label className="label">
                <span className="label-text">Sort By</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="expiry">Closest Expiry Date</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-base-300 h-48 rounded-lg mb-2"></div>
              <div className="bg-base-300 h-4 rounded w-3/4 mb-2"></div>
              <div className="bg-base-300 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">No products available at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
