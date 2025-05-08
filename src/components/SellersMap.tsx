"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Icon, LatLngExpression } from "leaflet";
import { Seller } from "@/lib/mockData";
import { MapPin } from "lucide-react";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Next.js
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Dynamically import the map components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false }
);

interface SellersMapProps {
  sellers: Seller[];
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  onSellerClick?: (seller: Seller) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

const defaultCenter = {
  lat: -6.2088,
  lng: 106.8456,
};

// Custom marker icons
const userIcon = new Icon({
  iconUrl: "/images/user-location.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const sellerIcon = new Icon({
  iconUrl: "/images/seller-location.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Legend component
function MapLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[1000] text-sm">
      <h3 className="font-semibold mb-2">Map Legend</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <img
            src="/images/user-location.svg"
            alt="User Location"
            className="w-6 h-6"
          />
          <span>Your Location</span>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/images/seller-location.svg"
            alt="Seller Location"
            className="w-6 h-6"
          />
          <span>Seller Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500/10 border-2 border-blue-500"></div>
          <span>1km Radius</span>
        </div>
      </div>
    </div>
  );
}

function MapClickHandler({
  onClick,
}: {
  onClick?: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log("Map clicked at:", { latitude: lat, longitude: lng });
      onClick?.(lat, lng);
    },
  });
  return null;
}

export default function SellersMap({
  sellers,
  center = defaultCenter,
  zoom = 14,
  onSellerClick,
  onMapClick,
}: SellersMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPosition, setSelectedPosition] =
    useState<LatLngExpression | null>(null);

  const centerLatLng: LatLngExpression = [center.lat, center.lng];

  const handleMapClick = (lat: number, lng: number) => {
    const newPosition: LatLngExpression = [lat, lng];
    setSelectedPosition(newPosition);
    onMapClick?.(lat, lng);
  };

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg relative z-0">
      <MapContainer
        center={centerLatLng}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map Click Handler */}
        <MapClickHandler onClick={handleMapClick} />

        {/* User Location Marker */}
        <Marker position={centerLatLng} icon={userIcon}>
          <Popup>
            <div className="p-2">
              <p className="font-medium">Your Location</p>
            </div>
          </Popup>
        </Marker>

        {/* Selected Location Marker */}
        {selectedPosition && (
          <Marker position={selectedPosition} icon={userIcon}>
            <Popup>
              <div className="p-2">
                <p className="font-medium">Selected Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 1km Radius Circle */}
        <Circle
          center={centerLatLng}
          radius={1000} // 1km in meters
          pathOptions={{
            color: "#3b82f6",
            fillColor: "#3b82f6",
            fillOpacity: 0.1,
          }}
        />

        {/* Seller Markers */}
        {sellers.map((seller) => (
          <Marker
            key={seller.id}
            position={
              [
                seller.location.latitude,
                seller.location.longitude,
              ] as LatLngExpression
            }
            icon={sellerIcon}
            eventHandlers={{
              click: () => onSellerClick?.(seller),
              mouseover: (e) => {
                e.target.bindPopup(seller.name).openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
            }}
          />
        ))}
      </MapContainer>

      {/* Map Legend */}
      <MapLegend />
    </div>
  );
}
