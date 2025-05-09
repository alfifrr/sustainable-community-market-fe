"use client";
import { MapPin } from "lucide-react";
import { useNearbyProducts } from "@/hooks/useNearbyProducts";
import Link from "next/link";
import SellersMap from "@/components/SellersMap";
import { useRouter } from "next/navigation";

export default function SellersPage() {
  const { nearbyProducts, userLocation, isLoading, error, refreshLocation } =
    useNearbyProducts(1);
  const router = useRouter();

  // Check if we're using the default location (Jakarta)
  const isUsingDefaultLocation =
    userLocation?.latitude === -6.2088 && userLocation?.longitude === 106.8456;

  const handleProductClick = (product: any) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <main className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Local Products & Sellers Near You
          </h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Discover sustainable products from sellers in your neighborhood.
            Support local businesses and reduce your carbon footprint.
          </p>
        </div>

        {/* Location Status */}
        <div className="max-w-2xl mx-auto mb-8">
          {isLoading ? (
            <div className="alert">
              <span className="loading loading-spinner"></span>
              Finding products near you...
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>{error}</span>
              <button
                className="btn btn-sm btn-ghost"
                onClick={refreshLocation}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div
              className={`alert ${
                isUsingDefaultLocation ? "alert-warning" : "alert-success"
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>
                {isUsingDefaultLocation ? (
                  <>
                    Showing products in Jakarta (default location).
                    <button
                      className="btn btn-sm btn-ghost ml-2"
                      onClick={refreshLocation}
                    >
                      Allow Location Access
                    </button>
                  </>
                ) : (
                  `Found ${nearbyProducts.length} products within 1km of your location`
                )}
              </span>
            </div>
          )}
        </div>

        {/* Map View */}
        {userLocation && (
          <div className="mb-12">
            <div className="max-w-6xl mx-auto">
              <SellersMap
                products={nearbyProducts}
                center={{
                  lat: userLocation.latitude,
                  lng: userLocation.longitude,
                }}
                onProductClick={handleProductClick}
              />
            </div>
          </div>
        )}

        {/* Products List */}
        <div id="products-list" className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Products Nearby</h2>
            <Link href="/products" className="btn btn-primary btn-sm">
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <MapPin className="w-4 h-4" />
                    <span>{product.pickup_address.address}</span>
                  </div>
                  <p className="text-lg font-semibold mt-2">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      href={`/products/${product.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
