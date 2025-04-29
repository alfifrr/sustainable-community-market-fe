"use client";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { User, Product } from "@/lib/types";
import UserCard from "@/components/search/UserCard";
import ProductCard from "@/components/search/ProductCard";
import SearchSkeleton from "@/components/search/SearchSkeleton";

function NoResults({ query }: { query: string }) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-semibold">No results found</h2>
        <p className="text-base-content/70">
          We couldn't find any matches for "{query}". Try adjusting your search
          terms.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Suggestions:</p>
          <ul className="text-sm text-base-content/70 list-disc list-inside">
            <li>Check for typos</li>
            <li>Use more general terms</li>
            <li>Try different keywords</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "products" | "users">(
    "all"
  );

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setUsers([]);
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const [usersRes, productsRes] = await Promise.all([
          fetch(`${API_ENDPOINTS.USERS}?q=${query}`),
          fetch(`${API_ENDPOINTS.PRODUCTS}?q=${query}`),
        ]);

        if (!usersRes.ok || !productsRes.ok) {
          throw new Error("One or more API requests failed");
        }

        const [usersData, productsData] = await Promise.all([
          usersRes.json(),
          productsRes.json(),
        ]);

        setUsers(usersData.data || []);
        setProducts(productsData.data || []);
      } catch (error) {
        console.error("Search error:", error);
        setError("Failed to fetch results.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const filteredResults = () => {
    switch (activeTab) {
      case "products":
        return products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null;
      case "users":
        return users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : null;
      default:
        return (
          <>
            {products.length > 0 && (
              <section aria-labelledby="products-heading">
                <h2
                  id="products-heading"
                  className="text-xl font-semibold mb-4"
                >
                  Products ({products.length})
                </h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}
            {users.length > 0 && (
              <section aria-labelledby="users-heading" className="mt-8">
                <h2 id="users-heading" className="text-xl font-semibold mb-4">
                  Users ({users.length})
                </h2>
                <div className="space-y-4">
                  {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              </section>
            )}
          </>
        );
    }
  };

  if (error) {
    return (
      <div className="alert alert-error shadow-lg" role="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for "{query}"
        </h1>

        {/* Tabs for filtering results */}
        <div className="tabs tabs-boxed bg-base-200 p-1 inline-flex">
          <button
            className={`tab ${activeTab === "all" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("all")}
            aria-selected={activeTab === "all"}
          >
            All ({products.length + users.length})
          </button>
          <button
            className={`tab ${activeTab === "products" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("products")}
            aria-selected={activeTab === "products"}
          >
            Products ({products.length})
          </button>
          <button
            className={`tab ${activeTab === "users" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("users")}
            aria-selected={activeTab === "users"}
          >
            Users ({users.length})
          </button>
        </div>
      </header>

      {isLoading ? (
        <SearchSkeleton count={3} />
      ) : users.length === 0 && products.length === 0 ? (
        <NoResults query={query} />
      ) : (
        <div className="space-y-8">{filteredResults()}</div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <SearchSkeleton count={6} />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
