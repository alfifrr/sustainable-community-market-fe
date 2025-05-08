import { useState, useEffect } from 'react';
import { Seller } from '@/lib/mockData';
import { sellerService } from '@/lib/services/sellerService';

interface UseNearbySellersResult {
  nearbySellers: Seller[];
  userLocation: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

// Default location (Jakarta)
const DEFAULT_LOCATION = {
  latitude: -6.2088,
  longitude: 106.8456
};

export function useNearbySellers(radiusInKm: number = 1): UseNearbySellersResult {
  const [nearbySellers, setNearbySellers] = useState<Seller[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocation = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      let location = DEFAULT_LOCATION;

      try {
        // Try to get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } catch (locationError) {
        // If location access is denied or fails, use default location
        console.log('Using default location (Jakarta)');
      }

      setUserLocation(location);

      // Get nearby sellers using either user location or default location
      const sellers = await sellerService.getNearbySellers(
        location.latitude,
        location.longitude,
        radiusInKm
      );
      setNearbySellers(sellers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get sellers');
      setUserLocation(null);
      setNearbySellers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial location fetch
  useEffect(() => {
    getLocation();
  }, [radiusInKm]);

  return {
    nearbySellers,
    userLocation,
    isLoading,
    error,
    refreshLocation: getLocation
  };
} 