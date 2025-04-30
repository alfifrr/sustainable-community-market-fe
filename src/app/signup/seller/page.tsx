"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessName: "",
    businessAddress: "",
    businessType: "",
    businessDescription: "",
    businessLicense: "",
    taxId: "",
    bankAccount: {
      accountNumber: "",
      routingNumber: "",
      accountHolderName: "",
    },
    products: {
      categories: [] as string[],
      certifications: [] as string[],
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

    if (!formData.businessName) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.businessAddress) {
      newErrors.businessAddress = "Business address is required";
    }

    if (!formData.businessType) {
      newErrors.businessType = "Business type is required";
    }

    if (!formData.businessLicense) {
      newErrors.businessLicense = "Business license is required";
    }

    if (!formData.taxId) {
      newErrors.taxId = "Tax ID is required";
    }

    if (!formData.bankAccount.accountHolderName) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!formData.bankAccount.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    }

    if (!formData.bankAccount.routingNumber) {
      newErrors.routingNumber = "Routing number is required";
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
        role: "SELLER",
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
        <div className="max-w-2xl mx-auto bg-base-100 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Join as a Vendor</h1>
          
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
              <label className="label">Business Name</label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              />
              {errors.businessName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.businessName}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Business Type</label>
              <select
                className="select select-bordered"
                required
                value={formData.businessType}
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              >
                <option value="">Select Business Type</option>
                <option value="farm">Farm</option>
                <option value="artisan">Artisan</option>
                <option value="producer">Producer</option>
                <option value="other">Other</option>
              </select>
              {errors.businessType && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.businessType}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Business Description</label>
              <textarea
                className="textarea textarea-bordered"
                required
                value={formData.businessDescription}
                onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
              />
            </div>

            <div className="form-control">
              <label className="label">Business Address</label>
              <textarea
                className="textarea textarea-bordered"
                required
                value={formData.businessAddress}
                onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
              />
              {errors.businessAddress && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.businessAddress}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Business License Number</label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.businessLicense}
                onChange={(e) => setFormData({...formData, businessLicense: e.target.value})}
              />
              {errors.businessLicense && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.businessLicense}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Tax ID</label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.taxId}
                onChange={(e) => setFormData({...formData, taxId: e.target.value})}
              />
              {errors.taxId && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.taxId}</span>
                </label>
              )}
            </div>

            <div className="divider">Banking Information</div>

            <div className="form-control">
              <label className="label">Account Holder Name</label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.bankAccount.accountHolderName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankAccount: {...formData.bankAccount, accountHolderName: e.target.value}
                })}
              />
              {errors.accountHolderName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.accountHolderName}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Account Number</label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.bankAccount.accountNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  bankAccount: {...formData.bankAccount, accountNumber: e.target.value}
                })}
              />
              {errors.accountNumber && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.accountNumber}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">Routing Number</label>
              <input
                type="text"
                className="input input-bordered"
                required
                value={formData.bankAccount.routingNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  bankAccount: {...formData.bankAccount, routingNumber: e.target.value}
                })}
              />
              {errors.routingNumber && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.routingNumber}</span>
                </label>
              )}
            </div>

            <div className="divider">Product Information</div>

            <div className="form-control">
              <label className="label">Product Categories</label>
              <div className="flex flex-wrap gap-2">
                {["Vegetables", "Fruits", "Dairy", "Meat", "Bakery", "Crafts"].map((category) => (
                  <label key={category} className="label cursor-pointer">
                    <span>{category}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={formData.products.categories.includes(category)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...formData.products.categories, category]
                          : formData.products.categories.filter(c => c !== category);
                        setFormData({
                          ...formData,
                          products: {...formData.products, categories: newCategories}
                        });
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">Certifications</label>
              <div className="flex flex-wrap gap-2">
                {["Organic", "Fair Trade", "Local", "Sustainable"].map((cert) => (
                  <label key={cert} className="label cursor-pointer">
                    <span>{cert}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={formData.products.certifications.includes(cert)}
                      onChange={(e) => {
                        const newCerts = e.target.checked
                          ? [...formData.products.certifications, cert]
                          : formData.products.certifications.filter(c => c !== cert);
                        setFormData({
                          ...formData,
                          products: {...formData.products, certifications: newCerts}
                        });
                      }}
                    />
                  </label>
                ))}
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
                "Create Vendor Account"
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

export default SellerSignup; 