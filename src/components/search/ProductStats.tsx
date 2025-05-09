"use client";
import { Star } from "lucide-react";

interface ProductStatsProps {
  averageRating?: number;
  totalItemsSold?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProductStats({
  averageRating = 0,
  totalItemsSold = 0,
  className = "",
  size = "sm",
}: ProductStatsProps) {
  const sizeClasses = {
    sm: "text-xs gap-1",
    md: "text-sm gap-2",
    lg: "text-base gap-3",
  };

  const starSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  return (
    <div
      className={`flex items-center gap-3 text-base-content/70 ${sizeClasses[size]} ${className}`}
    >
      {averageRating > 0 && (
        <div className="flex items-center gap-1">
          <Star className="text-warning" size={starSizes[size]} />
          <span>{averageRating.toFixed(1)}</span>
        </div>
      )}
      {totalItemsSold > 0 && (
        <div className="flex items-center gap-1">
          <span>•</span>
          <span>{totalItemsSold} sold</span>
        </div>
      )}
    </div>
  );
}
