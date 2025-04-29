import HeroSection from "@/components/HeroSection";
import HeadlineSection from "@/components/HeadlineSection";
import SustainabilitySection from "@/components/SustainabilitySection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Headline Section */}
      <HeadlineSection />

      {/* Sustainability Impact Section */}
      <SustainabilitySection />

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8 bg-base-200">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-primary mb-4">🌱</div>
                <h3 className="card-title">Sustainable Living</h3>
                <p className="text-base-content/80">
                  Promoting eco-friendly practices and reducing waste in our
                  community.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-primary mb-4">🤝</div>
                <h3 className="card-title">Community First</h3>
                <p className="text-base-content/80">
                  Building strong local connections and supporting each other.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="text-4xl text-primary mb-4">♻️</div>
                <h3 className="card-title">Zero Waste</h3>
                <p className="text-base-content/80">
                  Working towards a future with minimal environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-primary text-primary-content">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Green Movement
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Start making a difference today. Connect with local farmers, reduce
            waste, and build a sustainable future for our community.
          </p>
          <button className="btn btn-secondary btn-lg">Get Started</button>
        </div>
      </section>
    </main>
  );
}
