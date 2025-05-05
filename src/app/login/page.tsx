"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginLanding = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-base-content/80">
              Choose how you want to access your account
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-10 pt-10">
                <div className="w-48 h-48 relative">
                  <Image
                    src="/images/customer-illustration.svg"
                    alt="Customer Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">Customer Login</h2>
                <p className="text-base-content/80">
                  Access your customer account to shop and manage your orders
                </p>
                <div className="card-actions">
                  <button 
                    onClick={() => router.push('/login/buyer')}
                    className="btn btn-primary btn-block"
                  >
                    Login as Customer
                  </button>
                </div>
              </div>
            </div>

            {/* Vendor Card */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="px-10 pt-10">
                <div className="w-48 h-48 relative">
                  <Image
                    src="/images/vendor-illustration.svg"
                    alt="Vendor Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">Vendor Login</h2>
                <p className="text-base-content/80">
                  Access your vendor account to manage your business and products
                </p>
                <div className="card-actions">
                  <button 
                    onClick={() => router.push('/login/seller')}
                    className="btn btn-primary btn-block"
                  >
                    Login as Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-12">
            <p className="text-base-content/80">
              Don't have an account?{" "}
              <a href="/signup" className="link link-primary">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
