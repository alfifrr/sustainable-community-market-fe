"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupRequest } from "@/lib/types";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/endpoints";
import Image from "next/image";

interface FormErrors {
  username: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  server?: string;
}

const SignupLanding = () => {
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
                <h2 className="card-title text-2xl">For Customers</h2>
                <p className="text-base-content/80">
                  Join as a customer to discover and purchase sustainable products from local vendors
                </p>
                <ul className="text-left my-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Browse local sustainable products
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Support local businesses
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Track your sustainable impact
                  </li>
                </ul>
                <div className="card-actions">
                  <button 
                    onClick={() => router.push('/signup/buyer')}
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
                <h2 className="card-title text-2xl">For Vendors</h2>
                <p className="text-base-content/80">
                  Join as a vendor to sell your sustainable products to our community
                </p>
                <ul className="text-left my-4 space-y-2">
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Reach conscious consumers
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Manage your business online
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Grow your sustainable business
                  </li>
                </ul>
                <div className="card-actions">
                  <button 
                    onClick={() => router.push('/signup/seller')}
                    className="btn btn-primary btn-block"
                  >
                    Sign Up as Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-12">
            <p className="text-base-content/80">
              Already have an account?{" "}
              <a href="/login" className="link link-primary">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLanding;
