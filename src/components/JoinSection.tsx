"use client";
import { useRouter } from "next/navigation";

export default function JoinSection() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Get Involved
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* For Shoppers */}
          <div className="card bg-primary text-primary-content">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl mb-4">For Shoppers</h3>
              <div className="space-y-4 mb-8">
                <p>
                  Discover fresh, local produce and sustainable products while
                  making a positive impact on your community.
                </p>
                <ul className="list-disc text-left pl-6 space-y-2">
                  <li>Access to fresh, local produce</li>
                  <li>Support local farmers directly</li>
                  <li>Reduce food waste through smart buying</li>
                  <li>Track your sustainable impact</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/signup/buyer")}
                className="btn btn-secondary btn-lg"
              >
                Start Shopping
              </button>
            </div>
          </div>

          {/* For Sellers */}
          <div className="card bg-secondary text-secondary-content">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl mb-4">For Sellers</h3>
              <div className="space-y-4 mb-8">
                <p>
                  Join our network of sustainable producers and reach customers
                  who value your commitment to quality and sustainability.
                </p>
                <ul className="list-disc text-left pl-6 space-y-2">
                  <li>Connect with conscious consumers</li>
                  <li>Reduce waste and increase profits</li>
                  <li>Access marketing and logistics support</li>
                  <li>Manage your business online</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/signup/seller")}
                className="btn btn-primary btn-lg"
              >
                Become a Seller
              </button>
            </div>
          </div>

          {/* For Expeditions */}
          <div className="card bg-accent text-accent-content">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl mb-4">For Expeditions</h3>
              <div className="space-y-4 mb-8">
                <p>
                  Join our delivery network and help connect sustainable
                  products with customers while promoting eco-friendly delivery
                  practices.
                </p>
                <ul className="list-disc text-left pl-6 space-y-2">
                  <li>Flexible delivery schedules</li>
                  <li>Competitive compensation</li>
                  <li>Support eco-friendly delivery</li>
                  <li>Be part of sustainable change</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/signup/expedition")}
                className="btn btn-primary btn-lg"
              >
                Join as Expedition
              </button>
            </div>
          </div>
        </div>

        {/* Additional Involvement */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Other Ways to Help</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/volunteer")}
              className="btn btn-outline"
            >
              Volunteer
            </button>
            <button
              onClick={() => router.push("/partner")}
              className="btn btn-outline"
            >
              Partner With Us
            </button>
            <button
              onClick={() => router.push("/donate")}
              className="btn btn-outline"
            >
              Support Our Mission
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
