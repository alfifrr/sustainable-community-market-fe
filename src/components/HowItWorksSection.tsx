"use client";

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="card bg-base-200 hover:shadow-lg transition-all text-center">
            <div className="card-body items-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="card-title">Browse Local Goods</h3>
              <p className="text-base-content/80">
                Discover fresh, sustainable products from local farmers and
                artisans in your community
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card bg-base-200 hover:shadow-lg transition-all text-center">
            <div className="card-body items-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="card-title">Buy Smarter, Save More</h3>
              <p className="text-base-content/80">
                Get great deals on quality products while reducing waste and
                supporting local businesses
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card bg-base-200 hover:shadow-lg transition-all text-center">
            <div className="card-body items-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="card-title">Create Impact Effortlessly</h3>
              <p className="text-base-content/80">
                Every purchase helps reduce food waste and supports sustainable
                local agriculture
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
