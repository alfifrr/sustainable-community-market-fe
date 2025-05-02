"use client";
import React, { useState } from "react";
import { ProfileSkeleton } from "@/components/skeletons/Profile";
import { useProfile } from "@/hooks/useProfile";
import { AlertCircle, RefreshCw, Pencil, Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/lib/interceptor";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { AxiosError } from "axios";

interface FormData {
  username: string;
  old_password: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface FormErrors {
  username: string;
  old_password: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  server?: string;
}

interface UpdateProfileData {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  old_password?: string;
  password?: string;
}

export default function Profile() {
  const { profile, isLoading, error, refreshProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    old_password: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    old_password: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const handleEditClick = () => {
    setFormData({
      username: profile?.username || "",
      old_password: "",
      password: "",
      first_name: profile?.contact_info.first_name || "",
      last_name: profile?.contact_info.last_name || "",
      phone_number: profile?.contact_info.phone_number || "",
    });
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: "",
      old_password: "",
      password: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    };
    let isValid = true;

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
      isValid = false;
    } else if (!/^[a-z0-9]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain lowercase letters and numbers";
      isValid = false;
    }

    // Old password is required if new password is provided
    if (formData.password && !formData.old_password) {
      newErrors.old_password =
        "Current password is required when setting new password";
      isValid = false;
    }

    // New password validation (only if provided)
    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        isValid = false;
      } else if (
        !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
      ) {
        newErrors.password =
          "Password must contain at least 1 uppercase letter, 1 number, and 1 symbol (!@#$%^&*)";
        isValid = false;
      }
    }

    // First name validation
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
      newErrors.first_name = "First name can only contain letters";
      isValid = false;
    }

    // Last name validation
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
      newErrors.last_name = "Last name can only contain letters";
      isValid = false;
    }

    // Phone number validation
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number can only contain digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, server: "" }));

    try {
      const updateData: UpdateProfileData = {
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      };

      if (formData.password) {
        updateData.old_password = formData.old_password;
        updateData.password = formData.password;
      }

      await axiosInstance.put(API_ENDPOINTS.USERS, updateData);

      // Refresh profile data after successful update
      await refreshProfile();
      setIsEditing(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        if (message) {
          if (typeof message === "object") {
            const newErrors = { ...errors };
            Object.entries(message).forEach(([field, messages]) => {
              if (Array.isArray(messages)) {
                newErrors[field as keyof FormErrors] = messages[0];
              }
            });
            setErrors(newErrors);
          } else {
            setErrors((prev) => ({
              ...prev,
              server: message,
            }));
          }
        } else {
          setErrors((prev) => ({
            ...prev,
            server:
              "An error occurred while updating your profile. Please try again.",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          server:
            "An error occurred while updating your profile. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Jakarta",
    });
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="alert alert-error">
            <AlertCircle className="h-5 w-5" />
            <div className="flex-1">
              <h3 className="font-bold">Error loading profile</h3>
              <div className="text-xs">{error}</div>
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={refreshProfile}
              aria-label="Retry loading profile"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="btn btn-primary btn-sm"
              aria-label="Edit profile"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={refreshProfile}
              className="btn btn-ghost btn-sm"
              aria-label="Refresh profile"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Profile Navigation */}
        <div className="tabs tabs-boxed mb-6">
          <button className="tab tab-active">Profile</button>
          <button className="tab" onClick={() => router.push('/profile/transactions')}>Transactions</button>
          <button className="tab" onClick={() => router.push('/profile/purchases')}>Purchases</button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      `${profile.contact_info.first_name} ${profile.contact_info.last_name}`
                    )}&background=random&size=128`}
                    alt=""
                    className="h-24 w-24"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{profile.username}</h2>
                <div className="badge badge-primary mt-1">{profile.role}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="divider">Contact Information</div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">First Name:</span>
                  <span>{profile.contact_info.first_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Last Name:</span>
                  <span>{profile.contact_info.last_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Email:</span>
                  <span>{profile.contact_info.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Phone:</span>
                  <span>{profile.contact_info.phone_number}</span>
                </div>
              </div>

              <div className="divider">Account Details</div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Balance:</span>
                  <span>Rp. {profile.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Verified:</span>
                  <span
                    className={
                      profile.is_verified ? "text-success" : "text-error"
                    }
                  >
                    {profile.is_verified ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Joined:</span>
                  <span title={profile.date_joined}>
                    {formatDateTime(profile.date_joined)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Last Activity:</span>
                  <span title={profile.last_activity || ""}>
                    {formatDateTime(profile.last_activity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => router.push('/profile/transactions')}
          >
            View Transactions
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => router.push('/profile/purchases')}
          >
            View Purchases
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <dialog className={`modal ${isEditing ? "modal-open" : ""}`}>
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
          {errors.server && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errors.server}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <div>
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  errors.username ? "input-error" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.username}
                  </span>
                </label>
              )}
            </div>

            {/* Current Password field */}
            <div>
              <label className="label" htmlFor="old_password">
                <span className="label-text">Current Password</span>
                <span className="label-text-alt text-xs">
                  Required for password change
                </span>
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="old_password"
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleChange}
                  className={`input input-bordered w-full pr-10 ${
                    errors.old_password ? "input-error" : ""
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showOldPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.old_password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.old_password}
                  </span>
                </label>
              )}
            </div>

            {/* New Password field */}
            <div>
              <label className="label" htmlFor="password">
                <span className="label-text">New Password</span>
                <span className="label-text-alt text-xs">
                  Retype to keep current
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input input-bordered w-full pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            {/* First Name field */}
            <div>
              <label className="label" htmlFor="first_name">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  errors.first_name ? "input-error" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.first_name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.first_name}
                  </span>
                </label>
              )}
            </div>

            {/* Last Name field */}
            <div>
              <label className="label" htmlFor="last_name">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  errors.last_name ? "input-error" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.last_name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.last_name}
                  </span>
                </label>
              )}
            </div>

            {/* Phone Number field */}
            <div>
              <label className="label" htmlFor="phone_number">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`input input-bordered w-full ${
                  errors.phone_number ? "input-error" : ""
                }`}
                disabled={isSubmitting}
              />
              {errors.phone_number && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.phone_number}
                  </span>
                </label>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
        <div
          className="modal-backdrop bg-base-200 bg-opacity-50"
          onClick={() => !isSubmitting && setIsEditing(false)}
        ></div>
      </dialog>
    </div>
  );
}
