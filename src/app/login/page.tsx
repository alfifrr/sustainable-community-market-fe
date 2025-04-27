"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/endpoints";

interface FormErrors {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Check for saved username on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  // both validations in FE to reduce api call
  const validateUsername = (username: string) => {
    if (!username) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
      return false;
    }
    if (username.length < 6) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 6 characters",
      }));
      return false;
    }
    // check for lowercases and numbers only
    const usernameRegex = /^[a-z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username: "Username can only contain lowercase letters and numbers",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, username: "" }));
    return true;
  };
  const validatePassword = (password: string) => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };
  const validateForm = () => {
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    return isUsernameValid && isPasswordValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // call the login api
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        const data = await response.json();
        if (response.ok && data.status === "success") {
          // store tokens
          localStorage.setItem("authToken", data.data.access_token);
          localStorage.setItem("refreshToken", data.data.refresh_token);
          if (rememberMe) {
            localStorage.setItem("rememberedUsername", username);
          } else {
            localStorage.removeItem("rememberedUsername");
          }
          router.push("/");
        } else {
          setServerError(data.message || "Invalid username or password");
        }
      } catch (error) {
        setServerError("An error occurred, Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {/* Server error message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              className="input input-bordered w-full"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="input input-bordered w-full"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                onTouchCancel={() => setShowPassword(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 select-none"
                aria-label="Show password"
                disabled={isSubmitting}
              >
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
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-6 flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox checkbox-sm"
              disabled={isSubmitting}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn ${
                isSubmitting ? "btn-disabled" : "btn-primary"
              } w-full`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
