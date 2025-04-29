"use client";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
  startFrom?: number;
  shouldStart: boolean;
}

const Counter = ({ end, duration, suffix = "", prefix = "", startFrom, shouldStart }: CounterProps) => {
  const [count, setCount] = useState(startFrom ?? 0);
  const countRef = useRef(startFrom ?? 0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Reset the counter when it becomes invisible
    if (!shouldStart) {
      setCount(startFrom ?? 0);
      countRef.current = startFrom ?? 0;
      startTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      if (startFrom !== undefined) {
        // Counting down
        const range = startFrom - end;
        countRef.current = Math.floor(startFrom - (range * percentage));
      } else {
        // Counting up
        countRef.current = Math.floor(end * percentage);
      }
      
      setCount(countRef.current);

      if (percentage < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration, startFrom, shouldStart]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function ImpactStatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '50px', // Start slightly before the section comes into view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Food Saved */}
          <div className="card bg-base-100 hover:shadow-xl transition-all text-center">
            <div className="card-body">
              <div className="text-4xl font-bold text-primary mb-4">
                <Counter 
                  end={120} 
                  duration={2000} 
                  suffix=" tons" 
                  shouldStart={isVisible}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Food Saved</h3>
              <p className="text-base-content/80">
                Of fresh produce rescued from going to waste through our platform
              </p>
            </div>
          </div>

          {/* Farmers Supported */}
          <div className="card bg-base-100 hover:shadow-xl transition-all text-center">
            <div className="card-body">
              <div className="text-4xl font-bold text-primary mb-4">
                <Counter 
                  end={500} 
                  duration={2000} 
                  prefix="+" 
                  shouldStart={isVisible}
                />
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
                <Counter 
                  end={45} 
                  duration={2000} 
                  suffix="%" 
                  startFrom={100} 
                  shouldStart={isVisible}
                />
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
