"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { API_ENDPOINTS } from "@/lib/endpoints";
import ProductCard from "@/components/search/ProductCard";
import { Product } from "@/lib/types";
import Link from "next/link";

export default function UserProductsPage() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProducts() {
      if (!user) return;

      try {
        const response = await fetch(API_ENDPOINTS.PRODUCTS);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const userProducts = data.data.filter(
          (product: Product) => product.user.id.toString() === user.id
        );

        setProducts(userProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUserProducts();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products found for the current user.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Products</h1>
        <Link href="/products/create" className="btn btn-primary">
          New Product
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-md">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
