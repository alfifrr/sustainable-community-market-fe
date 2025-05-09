"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBasket, Store, Truck, Check } from "lucide-react";

export default function SignupSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-lg text-base-content/80">
              Choose how you want to participate in our sustainable marketplace
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Customer Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-10 pt-10">
                <div className="w-48 h-48 flex items-center justify-center">
                  <ShoppingBasket className="w-32 h-32 text-primary" />
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">For Customers</h2>
                <p className="text-base-content/80">
                  Join as a customer to discover and purchase sustainable
                  products from local vendors
                </p>
                <ul className="text-left my-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Browse local sustainable products
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Support local businesses
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Track your sustainable impact
                  </li>
                </ul>
                <div className="card-actions">
                  <button
                    onClick={() => router.push("/signup/buyer")}
                    className="btn btn-primary btn-block"
                  >
                    Sign Up as Customer
                  </button>
                </div>
              </div>
            </div>

            {/* Vendor Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-10 pt-10">
                <div className="w-48 h-48 flex items-center justify-center">
                  <Store className="w-32 h-32 text-primary" />
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">For Vendors</h2>
                <p className="text-base-content/80">
                  Join as a vendor to sell your sustainable products to our
                  community
                </p>
                <ul className="text-left my-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Reach conscious consumers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Manage your business online
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Grow your sustainable business
                  </li>
                </ul>
                <div className="card-actions">
                  <button
                    onClick={() => router.push("/signup/seller")}
                    className="btn btn-primary btn-block"
                  >
                    Sign Up as Vendor
                  </button>
                </div>
              </div>
            </div>

            {/* Expedition Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-10 pt-10">
                <div className="w-48 h-48 flex items-center justify-center">
                  <Truck className="w-32 h-32 text-primary" />
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">For Expeditions</h2>
                <p className="text-base-content/80">
                  Join as an expedition partner to help deliver sustainable
                  products
                </p>
                <ul className="text-left my-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Flexible delivery schedules
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Competitive compensation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    Support eco-friendly delivery
                  </li>
                </ul>
                <div className="card-actions">
                  <button
                    onClick={() => router.push("/signup/expedition")}
                    className="btn btn-primary btn-block"
                  >
                    Sign Up as Expedition
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-12">
            <p className="text-base-content/80">
              Already have an account?{" "}
              <Link href="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
