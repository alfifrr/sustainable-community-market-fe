"use client";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ end, duration, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      countRef.current = Math.floor(end * percentage);
      setCount(countRef.current);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTimeRef.current = null;
      countRef.current = 0;
    };
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function ImpactStatsSection() {
  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Food Saved */}
          <div className="card bg-base-100 hover:shadow-xl transition-all text-center">
            <div className="card-body">
              <div className="text-4xl font-bold text-primary mb-4">
                <Counter end={120} duration={2000} suffix=" tons" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Food Saved</h3>
              <p className="text-base-content/80">
                Of fresh produce rescued from going to waste through our
                platform
              </p>
            </div>
          </div>

          {/* Farmers Supported */}
          <div className="card bg-base-100 hover:shadow-xl transition-all text-center">
            <div className="card-body">
              <div className="text-4xl font-bold text-primary mb-4">
                <Counter end={500} duration={2000} prefix="+" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Farmers Empowered</h3>
              <p className="text-base-content/80">
                Local farmers and producers actively selling on our marketplace
              </p>
            </div>
          </div>

          {/* CO2 Reduction */}
          <div className="card bg-base-100 hover:shadow-xl transition-all text-center">
            <div className="card-body">
              <div className="text-4xl font-bold text-primary mb-4">
                <Counter end={45} duration={2000} suffix="%" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CO₂ Reduction</h3>
              <p className="text-base-content/80">
                Less carbon emissions compared to traditional supply chains
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
