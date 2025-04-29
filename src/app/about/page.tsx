"use client";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-base-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
            Our Story
          </h1>
          <p className="text-xl text-base-content/80 text-center max-w-3xl mx-auto">
            Building bridges between local farmers and conscious consumers,
            creating a sustainable future for our community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">Our Mission</h2>
                <p className="text-lg text-base-content/80">
                  We started with a simple yet powerful realization: while local
                  farmers struggle to find markets for their produce, urban
                  communities face increasing food waste and limited access to
                  fresh, sustainable food options.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why We Exist</h3>
                <p className="text-lg text-base-content/80">
                  In 2023, we witnessed the disconnect between abundant local
                  production and urban food waste. This inspired us to create a
                  platform that brings together farmers and conscious consumers,
                  transforming how our community thinks about food
                  sustainability.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title text-success">500+</h4>
                      <p>Local Farmers Supported</p>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title text-primary">15k+</h4>
                      <p>Active Community Members</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-lg text-base-content/80">
                  We envision a future where every community has direct access
                  to fresh, local produce, where farmers receive fair
                  compensation for their work, and where food waste becomes a
                  thing of the past.
                </p>
                <div className="pt-4">
                  <Link href="/products" className="btn btn-primary btn-lg">
                    Join Our Movement
                  </Link>
                </div>
              </div>
            </div>

            {/* Visual Content */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/farmers-market.jpg"
                  alt="Vibrant local farmers market"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/community-farming.jpg"
                  alt="Community members working together"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/sustainable-packaging.jpg"
                  alt="Eco-friendly packaging solutions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100">
              <div className="card-body">
                <h3 className="card-title text-primary">Community First</h3>
                <p>
                  Building strong relationships between farmers and consumers,
                  fostering a sense of shared responsibility.
                </p>
              </div>
            </div>
            <div className="card bg-base-100">
              <div className="card-body">
                <h3 className="card-title text-primary">Sustainability</h3>
                <p>
                  Promoting practices that protect our environment and ensure
                  long-term food security for future generations.
                </p>
              </div>
            </div>
            <div className="card bg-base-100">
              <div className="card-body">
                <h3 className="card-title text-primary">Transparency</h3>
                <p>
                  Maintaining open communication and honest relationships with
                  all members of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
