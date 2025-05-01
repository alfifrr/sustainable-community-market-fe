"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeadlineSection() {
  const router = useRouter();

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Every Choice Matters:{" "}
            <span className="text-error">1/3 of All Food is Wasted</span>, Yet{" "}
            <span className="text-warning">Millions Go Hungry</span>
          </h2>
          <p className="text-xl md:text-2xl text-base-content/80 font-medium">
            Together, We Can Cut Waste by{" "}
            <span className="text-success font-bold">50%</span> — and Build a
            Future Worth Living
          </p>
        </div>

        {/* Image Contrast Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Abundance Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden group">
            <Image
              src="/images/abundant-farm.jpg"
              alt="Abundant local farm with fresh produce"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <p className="text-white text-xl font-medium">
                Local farms produce enough food to feed everyone in our
                community
              </p>
            </div>
          </div>

          {/* Waste Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden group">
            <Image
              src="/images/food-waste.jpg"
              alt="Food waste in landfill"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <p className="text-white text-xl font-medium">
                Yet, one-third of this precious food ends up in landfills
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="text-4xl font-bold text-error mb-2">1/3</div>
              <p className="text-base-content/80">
                of global food production is wasted every year{" "}
                <span className="text-xs">(FAO)</span>
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="text-4xl font-bold text-warning mb-2">10%</div>
              <p className="text-base-content/80">
                of global greenhouse gas emissions come from wasted food
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all">
            <div className="card-body">
              <div className="text-4xl font-bold text-success mb-2">50%</div>
              <p className="text-base-content/80">
                waste reduction achievable through local, community-driven
                markets
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-medium mb-8">
            Sustainability isn&apos;t just a dream — it&apos;s a decision.{" "}
            <span className="text-primary">
              Shop local, save resources, and shape a future our children will
              thank us for.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/products")}
              className="btn btn-primary btn-lg"
            >
              Start Making a Difference
            </button>
            <button
              onClick={() => router.push("/about/impact")}
              className="btn btn-outline btn-lg"
            >
              Learn About Our Impact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
