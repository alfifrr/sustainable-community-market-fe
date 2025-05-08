"use client";
import { MapPin } from "lucide-react";
import { useNearbySellers } from "@/hooks/useNearbySellers";
import { useNearbyProducts } from "@/hooks/useNearbyProducts";
import Link from "next/link";
import SellersMap from "./SellersMap";
import { useRouter } from "next/navigation";
import { Seller } from "@/lib/mockData";

export default function LocalSellersSection() {
  const {
    nearbySellers,
    userLocation,
    isLoading: isLoadingSellers,
    error: sellerError,
    refreshLocation,
  } = useNearbySellers(1);
  const {
    nearbyProducts,
    isLoading: isLoadingProducts,
    error: productError,
  } = useNearbyProducts(1);
  const router = useRouter();

  // Check if we're using the default location (Jakarta)
  const isUsingDefaultLocation =
    userLocation?.latitude === -6.2088 && userLocation?.longitude === 106.8456;

  const handleSellerClick = (seller: Seller) => {
    router.push(`/sellers?seller=${seller.id}#sellers-list`);
  };

  const handleProductClick = (product: any) => {
    router.push(`/products/${product.id}`);
  };

  const isLoading = isLoadingSellers || isLoadingProducts;
  const error = sellerError || productError;

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Local Products & Sellers Near You
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Discover sustainable products and sellers in your neighborhood.
            Support local businesses and reduce your carbon footprint.
          </p>
        </div>

        {/* Location Status */}
        <div className="max-w-2xl mx-auto mb-8">
          {isLoading ? (
            <div className="alert">
              <span className="loading loading-spinner"></span>
              Finding sellers and products near you...
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
                    Showing sellers and products in Jakarta (default location).
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
          <div className="mb-8">
            <SellersMap
              sellers={nearbySellers}
              products={nearbyProducts}
              center={{
                lat: userLocation.latitude,
                lng: userLocation.longitude,
              }}
              onSellerClick={handleSellerClick}
              onProductClick={handleProductClick}
            />
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link href="/sellers" className="btn btn-primary btn-lg">
            View All Local Sellers
          </Link>
        </div>
      </div>
    </section>
  );
}
