"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const BuyerSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    preferences: {
      organic: false,
      local: false,
      vegan: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        ...formData,
        role: "BUYER",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors(prev => ({
        ...prev,
        server: "Registration failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-base-100 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Join as a Customer</h1>
          
          {errors.server && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.server}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
                {errors.firstName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.firstName}</span>
                  </label>
                )}
              </div>
              <div className="form-control">
                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input input-bordered"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
                {errors.lastName && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.lastName}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                className="input input-bordered"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Password</label>
              <input
                type="password"
                className="input input-bordered"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                className="input input-bordered"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              {errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Phone Number</label>
              <input
                type="tel"
                className="input input-bordered"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
              {errors.phoneNumber && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phoneNumber}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Delivery Address</label>
              <textarea
                className="textarea textarea-bordered"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
              {errors.address && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.address}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label font-semibold">Shopping Preferences</label>
              <div className="space-y-2">
                <label className="label cursor-pointer">
                  <span>Organic Products</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={formData.preferences.organic}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {...formData.preferences, organic: e.target.checked}
                    })}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span>Local Products</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={formData.preferences.local}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {...formData.preferences, local: e.target.checked}
                    })}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span>Vegan Products</span>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={formData.preferences.vegan}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferences: {...formData.preferences, vegan: e.target.checked}
                    })}
                  />
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="link link-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerSignup; 