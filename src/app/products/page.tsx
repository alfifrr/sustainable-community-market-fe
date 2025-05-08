"use client";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { Product } from "@/lib/types";
import ProductCard from "@/components/search/ProductCard";
import { Filter, X, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 1000000 });
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(5);

  // Define handler functions inside the component
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Remove leading zeros and parse to integer
    const cleanedValue = value.replace(/^0+/, '');
    let parsedValue = parseInt(cleanedValue || '0');

    // Ensure valid number and within bounds
    if (isNaN(parsedValue)) parsedValue = 0;

    // Apply constraints based on min/max
    if (name === 'min') {
      if (parsedValue > priceRange.max) {
        parsedValue = priceRange.max;
      }
    } else if (name === 'max') {
      if (parsedValue < priceRange.min) {
        parsedValue = priceRange.min;
      }
    }

    // Update price range
    setPriceRange(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingFilter(Number(e.target.value));
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSortBy("newest");
    setPriceRange({ min: 0, max: maxPrice });
    setRatingFilter(0);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = API_ENDPOINTS.PRODUCTS;
        // Fetch products and their reviews in parallel
        const productsRes = await fetch(url);
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

        // Find max price for range filter
        if (productsWithReviews.length > 0) {
          const highestPrice = Math.max(...productsWithReviews.map(p => p.price));
          setMaxPrice(Math.ceil(highestPrice / 10000) * 10000); // Round up to nearest 10,000
          setPriceRange({ min: 0, max: Math.ceil(highestPrice / 10000) * 10000 });
        }

        setProducts(productsWithReviews);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            productsWithReviews
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
  }, []);

  // Apply all filters and sorting
  useEffect(() => {
    if (products.length === 0) return;

    let result = [...products];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => {
        // Ensure consistent comparison by converting both to string
        return product.category.id.toString() === selectedCategory.toString();
      });
    }

    // Apply price range filter
    result = result.filter(product => {
      // Ensure price is treated as a number
      const productPrice = Number(product.price);
      return productPrice >= priceRange.min && productPrice <= priceRange.max;
    });

    // Apply rating filter
    if (ratingFilter > 0) {
      result = result.filter(product => {
        const rating = product.average_rating || 0;
        return rating >= ratingFilter;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "expiry":
        result.sort(
          (a, b) =>
            new Date(a.expiration_date).getTime() -
            new Date(b.expiration_date).getTime()
        );
        break;
      case "rating":
        result.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortBy, priceRange, ratingFilter]);

  // Calculate pagination values
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, ratingFilter, sortBy]);

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
        <div className="bg-base-200 p-6 rounded-lg mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Filter size={18} />
              Filter & Sort
            </h2>
            <button
              onClick={resetFilters}
              className="btn btn-sm btn-ghost"
            >
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category</span>
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

            {/* Price Range Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Price Range (IDR)</span>
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">{priceRange.min.toLocaleString()}</span>
                  <span className="text-xs">{priceRange.max.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  name="min"
                  className="range range-xs range-primary"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  min="0"
                  max={maxPrice}
                  step={Math.max(1, Math.floor(maxPrice / 100))}
                />
                <input
                  type="range"
                  name="max"
                  className="range range-xs range-primary"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  min="0"
                  max={maxPrice}
                  step={Math.max(1, Math.floor(maxPrice / 100))}
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="min"
                    placeholder="Min"
                    className="input input-bordered input-sm w-full"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    min="0"
                    max={priceRange.max}
                    step="1000"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="max"
                    placeholder="Max"
                    className="input input-bordered input-sm w-full"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    min={priceRange.min}
                    max={maxPrice}
                    step="1000"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Minimum Rating</span>
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">0</span>
                  <span className="text-xs">5</span>
                </div>
                <input
                  type="range"
                  className="range range-xs range-primary"
                  value={ratingFilter}
                  onChange={handleRatingChange}
                  min="0"
                  max="5"
                  step="0.5"
                />
                <div className="text-center mt-1">
                  <span className="badge badge-primary">{ratingFilter} {ratingFilter === 1 ? 'Star' : 'Stars'}</span>
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Sort By</span>
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
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCategory && categories.find(c => c.id === selectedCategory) && (
              <div className="badge badge-primary gap-1">
                Category: {categories.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => setSelectedCategory("")}>
                  <X size={14} />
                </button>
              </div>
            )}

            {(priceRange.min > 0 || priceRange.max < maxPrice) && (
              <div className="badge badge-primary gap-1">
                Price: {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()} IDR
                <button onClick={() => setPriceRange({ min: 0, max: maxPrice })}>
                  <X size={14} />
                </button>
              </div>
            )}

            {ratingFilter > 0 && (
              <div className="badge badge-primary gap-1">
                Rating: ≥ {ratingFilter} {ratingFilter === 1 ? 'Star' : 'Stars'}
                <button onClick={() => setRatingFilter(0)}>
                  <X size={14} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Products Count and Results */}
      {!loading && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-base-content/70">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            {filteredProducts.length > 0 && (
              <span> (Page {currentPage} of {totalPages})</span>
            )}
          </p>
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
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10 bg-base-200 rounded-lg">
          <p className="text-lg mb-2">No products found</p>
          <p className="text-base-content/70 mb-4">Try adjusting your filters</p>
          <button onClick={resetFilters} className="btn btn-primary">
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                <button
                  className="join-item btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show current page, first, last, and pages around current
                  const showPageNumber =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                  if (showPageNumber) {
                    return (
                      <button
                        key={pageNumber}
                        className={`join-item btn ${currentPage === pageNumber ? 'btn-active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return <button key={pageNumber} className="join-item btn btn-disabled">...</button>;
                  }
                  return null;
                })}

                <button
                  className="join-item btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
                <button
                  className="join-item btn"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
