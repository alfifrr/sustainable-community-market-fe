import { useState, useEffect } from "react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface Product {
  id: number;
  name: string;
  pickup_address: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    address: string;
  };
  price: number;
  user: {
    name: string;
  };
}

interface UseNearbyProductsResult {
  nearbyProducts: Product[];
  userLocation: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

// Default location (Jakarta)
const DEFAULT_LOCATION = {
  latitude: -6.2088,
  longitude: 106.8456,
};

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useNearbyProducts(
  radiusInKm: number = 1
): UseNearbyProductsResult {
  const [nearbyProducts, setNearbyProducts] = useState<Product[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      let location = DEFAULT_LOCATION;

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            });
          }
        );
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch (locationError) {
        console.log("Using default location (Jakarta)");
      }

      setUserLocation(location);

      // Fetch products from API
      const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS);
      const allProducts = response.data.data;

      // Filter products within radius
      const nearby = allProducts.filter((product: Product) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          product.pickup_address.coordinates.latitude,
          product.pickup_address.coordinates.longitude
        );
        return distance <= radiusInKm;
      });

      setNearbyProducts(nearby);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get products");
      setUserLocation(null);
      setNearbyProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, [radiusInKm]);

  return {
    nearbyProducts,
    userLocation,
    isLoading,
    error,
    refreshLocation: getLocation,
  };
}
