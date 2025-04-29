"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="min-h-[90vh] relative bg-gradient-to-b from-base-100 to-base-200 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat bg-[length:20px_20px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #888 1px, transparent 1px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-primary">Sustainable</span> Community Market
            </h1>
            <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto lg:mx-0">
              Connect with local farmers, reduce food waste, and build a greener
              future together. Every small action counts towards a sustainable
              tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => router.push("/products")}
                className="btn btn-primary btn-lg"
              >
                Browse Products
              </button>
              <button
                onClick={() => router.push("/about")}
                className="btn btn-outline btn-lg"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 text-left">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-base-content/70">Local Farmers</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-primary">2,000kg</p>
                <p className="text-sm text-base-content/70">Waste Reduced</p>
              </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
                <p className="text-3xl font-bold text-primary">15k+</p>
                <p className="text-sm text-base-content/70">
                  Community Members
                </p>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/hero-image.jpg"
              alt="Sustainable farming"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
