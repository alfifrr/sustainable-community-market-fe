"use client";
import { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import { useNearbySellers } from "@/hooks/useNearbySellers";
import Link from "next/link";
import SellersMap from "@/components/SellersMap";
import { Seller } from "@/lib/mockData";
import { useSearchParams, useRouter } from "next/navigation";

export default function SellersPage() {
  const { nearbySellers, userLocation, isLoading, error, refreshLocation } = useNearbySellers(1);
  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Check if we're using the default location (Jakarta)
  const isUsingDefaultLocation = userLocation?.latitude === -6.2088 && userLocation?.longitude === 106.8456;

  // Handle seller selection from URL parameter and hash
  useEffect(() => {
    const sellerId = searchParams.get('seller');
    if (sellerId) {
      setSelectedSellerId(sellerId);
      // Scroll to the sellers list section
      const sellersList = document.getElementById('sellers-list');
      if (sellersList) {
        sellersList.scrollIntoView({ behavior: 'smooth' });
        // After scrolling to the list, scroll to the specific seller card
        setTimeout(() => {
          const element = document.getElementById(`seller-${sellerId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      }
    }
  }, [searchParams]);

  const handleSellerClick = (seller: Seller) => {
    setSelectedSellerId(seller.id);
    // Update URL without page reload
    window.history.pushState({}, '', `/sellers?seller=${seller.id}#sellers-list`);
    // Scroll to the seller card
    const element = document.getElementById(`seller-${seller.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="min-h-screen py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Local Sellers Near You
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
          <div className="mb-12">
            <div className="max-w-6xl mx-auto">
              <SellersMap
                sellers={nearbySellers}
                center={{
                  lat: userLocation.latitude,
                  lng: userLocation.longitude
                }}
                onSellerClick={handleSellerClick}
              />
            </div>
          </div>
        )}

        {/* Sellers List */}
        <div id="sellers-list" className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Available Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {nearbySellers.map((seller) => (
              <div
                key={seller.id}
                id={`seller-${seller.id}`}
                className={`card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 ${
                  selectedSellerId === seller.id ? 'ring-2 ring-primary scale-[1.02]' : ''
                }`}
              >
                <div className="card-body">
                  <h3 className="card-title">{seller.name}</h3>
                  <p className="text-base-content/80">{seller.description}</p>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <MapPin className="w-4 h-4" />
                    <span>{seller.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70">
                    <Navigation className="w-4 h-4" />
                    <span>{seller.products.length} products available</span>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      href={`/products?seller=${seller.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Products
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