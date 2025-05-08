export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerId: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Seller {
  id: string;
  name: string;
  description: string;
  location: Location;
  products: Product[];
}

// Helper function to generate random coordinates within a radius
function generateRandomLocation(centerLat: number, centerLng: number, radiusInKm: number): { lat: number; lng: number } {
  const radiusInDegrees = radiusInKm / 111.32; // Convert km to degrees (approximate)
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radiusInDegrees;
  
  return {
    lat: centerLat + (randomRadius * Math.cos(randomAngle)),
    lng: centerLng + (randomRadius * Math.sin(randomAngle))
  };
}

// Jakarta center coordinates (Thamrin area)
const jakartaCenter = {
  lat: -6.2088,
  lng: 106.8456
};

// Generate 10 sellers within 1km radius of the center
export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'Green Market Thamrin',
    description: 'Fresh organic vegetables and fruits from local farmers',
    location: {
      latitude: -6.2088,
      longitude: 106.8456,
      address: 'Jl. Thamrin No. 123, Jakarta Pusat'
    },
    products: [
      {
        id: '1',
        name: 'Organic Tomatoes',
        description: 'Fresh organic tomatoes from local farmers',
        price: 25000,
        image: '/images/products/tomatoes.jpg',
        category: 'vegetables',
        sellerId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Eco Fresh Sudirman',
    description: 'Sustainable grocery store with local produce',
    location: {
      latitude: -6.2135,
      longitude: 106.8412,
      address: 'Jl. Sudirman No. 45, Jakarta Pusat'
    },
    products: [
      {
        id: '2',
        name: 'Organic Spinach',
        description: 'Fresh organic spinach from local farmers',
        price: 15000,
        image: '/images/products/spinach.jpg',
        category: 'vegetables',
        sellerId: '2'
      }
    ]
  },
  {
    id: '3',
    name: 'Sustainable Market Menteng',
    description: 'Local market with sustainable products',
    location: {
      latitude: -6.2042,
      longitude: 106.8498,
      address: 'Jl. Menteng Raya No. 78, Jakarta Pusat'
    },
    products: [
      {
        id: '3',
        name: 'Organic Carrots',
        description: 'Fresh organic carrots from local farmers',
        price: 20000,
        image: '/images/products/carrots.jpg',
        category: 'vegetables',
        sellerId: '3'
      }
    ]
  },
  {
    id: '4',
    name: 'Green Grocer Gondangdia',
    description: 'Organic grocery store with wide selection',
    location: {
      latitude: -6.2115,
      longitude: 106.8389,
      address: 'Jl. Gondangdia No. 12, Jakarta Pusat'
    },
    products: [
      {
        id: '4',
        name: 'Organic Potatoes',
        description: 'Fresh organic potatoes from local farmers',
        price: 30000,
        image: '/images/products/potatoes.jpg',
        category: 'vegetables',
        sellerId: '4'
      }
    ]
  },
  {
    id: '5',
    name: 'Eco Market Cikini',
    description: 'Sustainable market with local products',
    location: {
      latitude: -6.2067,
      longitude: 106.8523,
      address: 'Jl. Cikini Raya No. 34, Jakarta Pusat'
    },
    products: [
      {
        id: '5',
        name: 'Organic Broccoli',
        description: 'Fresh organic broccoli from local farmers',
        price: 25000,
        image: '/images/products/broccoli.jpg',
        category: 'vegetables',
        sellerId: '5'
      }
    ]
  },
  {
    id: '6',
    name: 'Local Fresh Market Kwitang',
    description: 'Fresh local produce and sustainable products',
    location: {
      latitude: -6.2156,
      longitude: 106.8434,
      address: 'Jl. Kwitang No. 56, Jakarta Pusat'
    },
    products: [
      {
        id: '6',
        name: 'Organic Cauliflower',
        description: 'Fresh organic cauliflower from local farmers',
        price: 28000,
        image: '/images/products/cauliflower.jpg',
        category: 'vegetables',
        sellerId: '6'
      }
    ]
  },
  {
    id: '7',
    name: 'Sustainable Grocer Tanah Abang',
    description: 'Organic and sustainable grocery store',
    location: {
      latitude: -6.2023,
      longitude: 106.8478,
      address: 'Jl. Tanah Abang No. 89, Jakarta Pusat'
    },
    products: [
      {
        id: '7',
        name: 'Organic Bell Peppers',
        description: 'Fresh organic bell peppers from local farmers',
        price: 35000,
        image: '/images/products/bell-peppers.jpg',
        category: 'vegetables',
        sellerId: '7'
      }
    ]
  },
  {
    id: '8',
    name: 'Green Market Karet',
    description: 'Local market with fresh produce',
    location: {
      latitude: -6.2098,
      longitude: 106.8401,
      address: 'Jl. Karet No. 23, Jakarta Pusat'
    },
    products: [
      {
        id: '8',
        name: 'Organic Cucumbers',
        description: 'Fresh organic cucumbers from local farmers',
        price: 18000,
        image: '/images/products/cucumbers.jpg',
        category: 'vegetables',
        sellerId: '8'
      }
    ]
  },
  {
    id: '9',
    name: 'Eco Fresh Market Bendungan Hilir',
    description: 'Sustainable market with local products',
    location: {
      latitude: -6.2076,
      longitude: 106.8512,
      address: 'Jl. Bendungan Hilir No. 67, Jakarta Pusat'
    },
    products: [
      {
        id: '9',
        name: 'Organic Eggplant',
        description: 'Fresh organic eggplant from local farmers',
        price: 22000,
        image: '/images/products/eggplant.jpg',
        category: 'vegetables',
        sellerId: '9'
      }
    ]
  },
  {
    id: '10',
    name: 'Local Market Petojo',
    description: 'Fresh local produce market',
    location: {
      latitude: -6.2145,
      longitude: 106.8445,
      address: 'Jl. Petojo No. 45, Jakarta Pusat'
    },
    products: [
      {
        id: '10',
        name: 'Organic Green Beans',
        description: 'Fresh organic green beans from local farmers',
        price: 20000,
        image: '/images/products/green-beans.jpg',
        category: 'vegetables',
        sellerId: '10'
      }
    ]
  }
];

// Generate random sellers within 1km radius
export const generateRandomSellers = (centerLat: number, centerLng: number, count: number = 5): Seller[] => {
  return Array.from({ length: count }, (_, index) => {
    const location = generateRandomLocation(centerLat, centerLng, 1);
    return {
      id: `random-${index + 1}`,
      name: `Local Seller ${index + 1}`,
      description: 'Local seller with fresh produce',
      location: {
        latitude: location.lat,
        longitude: location.lng,
        address: `Random Location ${index + 1}`
      },
      products: [
        {
          id: `product-${index + 1}`,
          name: 'Sample Product',
          description: 'Fresh local produce',
          price: 20000,
          image: '/images/products/sample.jpg',
          category: 'vegetables',
          sellerId: `random-${index + 1}`
        }
      ]
    };
  });
}; 