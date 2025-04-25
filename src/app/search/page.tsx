"use client";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Product } from "@/lib/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      {isLoading && (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {!isLoading && !error && users.length === 0 && products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-lg">No results found for "{query}"</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Users Section */}
        {users.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Users ({users.length})
            </h2>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">
                      {user.name}
                      {user.is_verified && (
                        <span className="badge badge-success">Verified</span>
                      )}
                    </h3>
                    <p className="text-sm">
                      Member since{" "}
                      {new Date(user.date_joined).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {products.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Products ({products.length})
            </h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="font-semibold">
                      Rp. {product.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="badge badge-outline">
                        {product.category.name}
                      </span>
                      <span className="text-sm">
                        seller: {product.user.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
