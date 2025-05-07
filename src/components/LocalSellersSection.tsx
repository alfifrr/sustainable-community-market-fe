"use client";
import { MapPin } from "lucide-react";
import { useNearbySellers } from "@/hooks/useNearbySellers";
import Link from "next/link";
import SellersMap from "./SellersMap";
import { useRouter } from "next/navigation";
import { Seller } from "@/lib/mockData";

export default function LocalSellersSection() {
  const { nearbySellers, userLocation, isLoading, error, refreshLocation } = useNearbySellers(1);
  const router = useRouter();

  // Check if we're using the default location (Jakarta)
  const isUsingDefaultLocation = userLocation?.latitude === -6.2088 && userLocation?.longitude === 106.8456;

  const handleSellerClick = (seller: Seller) => {
    // Add a hash to the URL to trigger automatic scrolling
    router.push(`/sellers?seller=${seller.id}#sellers-list`);
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Local Sellers Near You
          </h2>
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
              Finding sellers near you...
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
            <div className={`alert ${isUsingDefaultLocation ? 'alert-warning' : 'alert-success'}`}>
              <MapPin className="w-5 h-5" />
              <span>
                {isUsingDefaultLocation ? (
                  <>
                    Showing sellers in Jakarta (default location).
                    <button
                      className="btn btn-sm btn-ghost ml-2"
                      onClick={refreshLocation}
                    >
                      Allow Location Access
                    </button>
                  </>
                ) : (
                  `Found ${nearbySellers.length} sellers within 1km of your location`
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
              center={{
                lat: userLocation.latitude,
                lng: userLocation.longitude
              }}
              onSellerClick={handleSellerClick}
            />
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/sellers"
            className="btn btn-primary btn-lg"
          >
            View All Local Sellers
          </Link>
        </div>
      </div>
    </section>
  );
} 