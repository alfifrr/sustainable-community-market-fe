"use client";
import Image from "next/image";

export default function WhyItMattersSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/abundant-farm.jpg"
          alt="Sustainable farming future"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative z-10 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            For the World & Our Children
          </h2>

          <p className="text-lg md:text-xl leading-relaxed">
            The choices we make today shape the world they inherit tomorrow.
            Every sustainable purchase, every farmer supported, and every item
            saved from waste brings us closer to the future we envision.
          </p>

          <p className="text-lg md:text-xl leading-relaxed">
            We&apos;re not just building a marketplace; we&apos;re nurturing a
            legacy of sustainable living, community support, and environmental
            stewardship for generations to come.
          </p>

          {/* Testimonial */}
          <blockquote className="mt-12 p-6 bg-black/30 backdrop-blur rounded-lg">
            <p className="italic text-lg">
              "Working with this community has given me hope for the future.
              It&apos;s amazing to see how small actions by many can create such
              meaningful change."
            </p>
            <footer className="mt-4">
              <cite className="not-italic">
                - Sarah Azkia, Local Organic Farmer
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
