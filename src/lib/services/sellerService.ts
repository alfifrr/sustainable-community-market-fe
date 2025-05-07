import { Seller } from '../mockData';
import { mockSellers } from '../mockData';

export interface SellerService {
  getNearbySellers(latitude: number, longitude: number, radiusInKm: number): Promise<Seller[]>;
  getSellerById(id: string): Promise<Seller | null>;
}

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

export class MockSellerService implements SellerService {
  async getNearbySellers(
    latitude: number,
    longitude: number,
    radiusInKm: number
  ): Promise<Seller[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter sellers within the specified radius
    return mockSellers.filter(seller => {
      const distance = calculateDistance(
        latitude,
        longitude,
        seller.location.latitude,
        seller.location.longitude
      );
      console.log(`Distance to ${seller.name}: ${distance.toFixed(2)}km`); // Debug log
      return distance <= radiusInKm;
    });
  }

  async getSellerById(id: string): Promise<Seller | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const seller = mockSellers.find(s => s.id === id);
    return seller || null;
  }
}

// This will be implemented later with real API calls
export class RealSellerService implements SellerService {
  async getNearbySellers(
    latitude: number,
    longitude: number,
    radiusInKm: number
  ): Promise<Seller[]> {
    // TODO: Implement real API call
    throw new Error('Not implemented');
  }

  async getSellerById(id: string): Promise<Seller | null> {
    // TODO: Implement real API call
    throw new Error('Not implemented');
  }
}

// Export a singleton instance of the mock service
export const sellerService = new MockSellerService(); 