"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SustainabilitySection() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-base-200 to-base-300">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                <Image
                  src="/images/local-farmers.jpg"
                  alt="Local farmers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                <Image
                  src="/images/sustainable-packaging.jpg"
                  alt="Sustainable packaging"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                <Image
                  src="/images/community-market.jpg"
                  alt="Community market"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                <Image
                  src="/images/zero-waste.jpg"
                  alt="Zero waste practices"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Our Impact
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Making a Difference,
              <br />
              One Choice at a Time
            </h2>

            <p className="text-base-content/80 text-lg">
              Our community has already prevented over 2,000kg of food waste and
              reduced CO2 emissions by connecting local farmers directly with
              consumers.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-6 py-8">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-4xl font-bold text-primary">33%</h3>
                  <p className="text-sm text-base-content/70">
                    Less food waste compared to traditional markets
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-4xl font-bold text-primary">50%</h3>
                  <p className="text-sm text-base-content/70">
                    Reduction in packaging materials
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/impact")}
                className="btn btn-primary"
              >
                View Full Impact Report
              </button>
              <button
                onClick={() => router.push("/join")}
                className="btn btn-outline"
              >
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
