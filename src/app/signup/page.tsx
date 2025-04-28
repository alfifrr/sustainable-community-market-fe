"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupRequest } from "@/lib/types";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

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

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  // const [name, setName] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  // const [phone, setPhone] = useState<string>('');
  // const [address, setAddress] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  // const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [serverError, setServerError] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    server: "",
  });

  // Password strength checker
  // const checkPasswordStrength = (password: string): PasswordStrength => {
  //   if (!password) {
  //     return { score: 0, message: '', color: 'bg-gray-200' };
  //   }

  //   let score = 0;

  //   // Length check
  //   if (password.length >= 8) score += 1;
  //   if (password.length >= 12) score += 1;

  //   // Complexity checks
  //   if (/[A-Z]/.test(password)) score += 1;
  //   if (/[0-9]/.test(password)) score += 1;
  //   if (/[^A-Za-z0-9]/.test(password)) score += 1;

  //   // Adjust the final score (max 4)
  //   score = Math.min(4, score);

  //   const messages = [
  //     'Very weak',
  //     'Weak',
  //     'Fair',
  //     'Good',
  //     'Strong'
  //   ];

  //   const colors = [
  //     'bg-red-500',
  //     'bg-orange-500',
  //     'bg-yellow-500',
  //     'bg-blue-500',
  //     'bg-green-500'
  //   ];

  //   return {
  //     score,
  //     message: messages[score],
  //     color: colors[score]
  //   };
  // };

  // const passwordStrength = checkPasswordStrength(password);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      email: "",
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

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least 1 uppercase letter, 1 number, and 1 symbol (!@#$%^&*)";
      isValid = false;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // First name validation
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      isValid = false;
    } else if (formData.first_name.length < 3) {
      newErrors.first_name = "First name must be at least 3 characters";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
      newErrors.first_name = "First name can only contain letters";
      isValid = false;
    }

    // Last name validation
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    } else if (formData.last_name.length < 3) {
      newErrors.last_name = "Last name must be at least 3 characters";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
      newErrors.last_name = "Last name can only contain letters";
      isValid = false;
    }

    // Phone number validation
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (formData.phone_number.length < 10) {
      newErrors.phone_number = "Phone number must be at least 10 digits";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number can only contain digits";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, server: "" }));

      try {
        // prepare the sign up payload
        const signupData: SignupRequest = {
          username: formData.username,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
        };
        // send to BE
        await axios.post(API_ENDPOINTS.USERS, signupData);

        router.push("/login");
      } catch (error) {
        // display error(s) based on the response
        if (axios.isAxiosError(error) && error.response?.data) {
          const responseData = error.response.data;

          if (
            responseData.message &&
            typeof responseData.message === "object"
          ) {
            const newErrors = { ...errors };
            Object.entries(responseData.message).forEach(
              ([field, messages]) => {
                if (Array.isArray(messages)) {
                  newErrors[field as keyof FormErrors] = messages[0];
                }
              }
            );
            setErrors(newErrors);
          } else if (typeof responseData.message === "string") {
            setErrors((prev) => ({
              ...prev,
              server: responseData.message,
            }));
          }
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to render password criteria
  // const renderPasswordCriteria = () => {
  //   const criteria = [
  //     { label: 'At least 8 characters', met: password.length >= 8 },
  //     { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
  //     { label: 'At least one number', met: /[0-9]/.test(password) },
  //     { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) }
  //   ];

  //   return (
  //     <div className="mt-2 text-xs space-y-1">
  //       {criteria.map((item, index) => (
  //         <div key={index} className="flex items-center">
  //           <span className={`mr-2 ${item.met ? 'text-green-500' : 'text-gray-500'}`}>
  //             {item.met ? '✓' : '○'}
  //           </span>
  //           <span className={item.met ? 'text-green-600' : 'text-gray-600'}>
  //             {item.label}
  //           </span>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

        {/* Add server error display at the top of the form */}
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
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter username"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* First Name field */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="first_name"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter first name"
              disabled={isSubmitting}
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
            )}
          </div>

          {/* Last Name field */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="last_name"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter last name"
              disabled={isSubmitting}
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number field */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="phone_number"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter phone number"
              disabled={isSubmitting}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full pr-10"
                placeholder="Enter password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password field */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full pr-10"
                placeholder="Confirm your password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <div className="pt-4">
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
                "Sign Up"
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
