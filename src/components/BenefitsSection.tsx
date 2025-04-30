"use client";
import { useState } from "react";
import {
  Package2,
  Clock,
  ShoppingCart,
  TrendingDown,
  Leaf,
  Tag,
} from "lucide-react";
import Image from "next/image";

const PriceExample = ({
  days,
  discount,
  originalPrice,
}: {
  days: number;
  discount: number;
  originalPrice: number;
}) => {
  // Calculate final price with rounding to avoid floating point precision issues
  const finalPrice = Math.round(originalPrice * (1 - discount));

  // Using a consistent number format with comma separators
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="relative flex gap-4 p-4 rounded-lg bg-base-100 hover:shadow-lg transition-all">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src="/images/categories/vegetables-fruits.jpg"
          alt="Fresh produce"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm text-base-content/70">
            Expires in {days} {days === 1 ? "day" : "days"}
          </span>
        </div>
        <h4 className="font-medium mb-2">Fresh Local Produce</h4>
        <div className="flex items-baseline gap-2">
          <span className="text-base-content/70 line-through text-sm">
            Rp {formatPrice(originalPrice)}
          </span>
          <span className="text-lg font-bold text-primary">
            Rp {formatPrice(finalPrice)}
          </span>
        </div>
        {days <= 2 && (
          <div className="absolute top-2 right-2">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              Save {discount * 100}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function BenefitsSection() {
  // Using useId for stable IDs across server/client renders
  const defaultTab = "pricing";
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-base-200 to-base-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Smart Savings
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Save Money, Reduce Waste
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Get amazing deals on quality local products while helping reduce
            food waste. Our dynamic pricing means bigger savings as expiration
            dates approach.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="card bg-base-100 hover:shadow-xl transition-all">
            <div className="card-body items-center text-center">
              <Tag className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title">Daily Discounts</h3>
              <p className="text-base-content/80">
                Prices drop automatically each day, up to 90% off
              </p>
            </div>
          </div>

          <div className="card bg-base-100 hover:shadow-xl transition-all">
            <div className="card-body items-center text-center">
              <ShoppingCart className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title">Bulk Benefits</h3>
              <p className="text-base-content/80">
                Extra 5% off when you buy 5+ items
              </p>
            </div>
          </div>

          <div className="card bg-base-100 hover:shadow-xl transition-all">
            <div className="card-body items-center text-center">
              <Package2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title">Quality Products</h3>
              <p className="text-base-content/80">
                Fresh local goods at the best prices
              </p>
            </div>
          </div>

          <div className="card bg-base-100 hover:shadow-xl transition-all">
            <div className="card-body items-center text-center">
              <Leaf className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title">Impact Points</h3>
              <p className="text-base-content/80">
                Earn rewards for sustainable shopping
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Examples */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Dynamic Pricing Section */}
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold mb-6">Dynamic Pricing</h3>
              <div className="space-y-4">
                <PriceExample days={4} discount={0.2} originalPrice={100000} />
                <PriceExample days={2} discount={0.6} originalPrice={100000} />
                <PriceExample days={1} discount={0.8} originalPrice={100000} />
              </div>
            </div>

            {/* Bulk Discounts Section */}
            <div className="flex-1 w-full">
              <h3 className="text-2xl font-bold mb-6">Bulk Savings</h3>
              <div className="bg-base-100 rounded-lg p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Buy More, Save More</h4>
                    <p className="text-base-content/80">
                      5% extra discount on 5+ items
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <span>Regular Purchase</span>
                    <span className="font-medium">Base discount only</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="font-medium">
                      Bulk Purchase (5+ items)
                    </span>
                    <span className="text-primary font-bold">
                      +5% extra savings
                    </span>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-4">
                  <p className="text-sm">
                    Example: Buy 5 items with 3 days until expiration
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>• Base discount: 40% off</li>
                    <li>• Bulk discount: +5% off</li>
                    <li className="font-bold text-primary">
                      • Total savings: 45% off!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
