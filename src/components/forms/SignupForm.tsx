import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/endpoints";
import SignupFormInput from "./SignupFormInput";
import { SignupRequest } from "@/lib/types";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

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

interface SignupFormProps {
  role: "buyer" | "seller" | "expedition";
  title: string;
  subtitle?: string;
}

const roleIdMap = {
  seller: 2,
  buyer: 3,
  expedition: 4,
} as const;

export default function SignupForm({ role, title, subtitle }: SignupFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.first_name)) {
      newErrors.first_name = "First name can only contain letters";
      isValid = false;
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.last_name)) {
      newErrors.last_name = "Last name can only contain letters";
      isValid = false;
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number can only contain digits";
      isValid = false;
    }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, server: "" }));

      try {
        const signupData: SignupRequest = {
          username: formData.username,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number,
          role_id: roleIdMap[role],
        };

        await axios.post(API_ENDPOINTS.USERS, signupData);
        router.push("/login");
      } catch (error) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-base-content/70 mb-6">{subtitle}</p>}

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
          <SignupFormInput
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            label="Username"
            placeholder="Enter username"
            error={errors.username}
            disabled={isSubmitting}
          />

          <SignupFormInput
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            label="First Name"
            placeholder="Enter first name"
            error={errors.first_name}
            disabled={isSubmitting}
          />

          <SignupFormInput
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            label="Last Name"
            placeholder="Enter last name"
            error={errors.last_name}
            disabled={isSubmitting}
          />

          <SignupFormInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            placeholder="Enter email address"
            error={errors.email}
            disabled={isSubmitting}
          />

          <SignupFormInput
            id="phone_number"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            label="Phone Number"
            placeholder="Enter phone number"
            error={errors.phone_number}
            disabled={isSubmitting}
          />

          <SignupFormInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            label="Password"
            placeholder="Enter password"
            error={errors.password}
            disabled={isSubmitting}
            showPasswordToggle
            onTogglePassword={() => setShowPassword(!showPassword)}
            isPasswordVisible={showPassword}
          />

          <SignupFormInput
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            disabled={isSubmitting}
            showPasswordToggle
            onTogglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            isPasswordVisible={showConfirmPassword}
          />

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
