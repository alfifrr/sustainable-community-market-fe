"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useAuthSync } from "@/hooks/useAuthSync";
import { useTheme } from "@/context/ThemeContext";
import { useCartStore } from "@/store/cartStore";
import Cookies from "js-cookie";
import { refreshAccessToken } from "@/lib/interceptor";
import { useAuthStore } from "@/store/authStore";
import { ShoppingCart, Sun, Moon } from "lucide-react";

const Navbar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { isLoggedIn, logout } = useAuth();
  const { user, role, isSellerOrExpedition } = useAuthStore((state) => state);
  const { theme, toggleTheme } = useTheme();
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  useAuthSync();

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLoginClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const authToken = Cookies.get("authToken");
    const refreshToken = Cookies.get("refreshToken");

    if (!authToken && refreshToken) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Token refresh successful, user is now logged in
        return;
      }
    }
    // Either no tokens exist or refresh failed
    router.push("/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-8 md:px-16">
        <div className="flex-1">
          <div className="dropdown md:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/Untitled design.svg"
                alt="Sustainable Market Logo"
                className="h-14"
              />
            </Link>
            <div className="hidden md:flex">
              <Link
                href="/"
                className="btn btn-ghost text-lg hover:text-green-800 hover:font-bold transition-all hover:bg-transparent"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="btn btn-ghost text-lg hover:text-green-800 hover:font-bold transition-all hover:bg-transparent"
              >
                About Us
              </Link>
              <Link href="/products" className="btn btn-ghost">
                Products
              </Link>
              <Link href="/sellers" className="btn btn-ghost">
                Local Sellers
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Cart Icon - Hide for sellers and expedition */}
          {!isSellerOrExpedition() && (
            <Link href="/cart" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <ShoppingCart className="w-6 h-6" />
                <span className="badge badge-sm indicator-item">
                  {cartItemsCount}
                </span>
              </div>
            </Link>
          )}

          {/* Theme Switcher */}
          {/* <label className="toggle text-base-content cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="theme-controller sr-only"
            />
            {theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </label> */}

          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.username || ""
                    )}`}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/profile/addresses">List Address</Link>
                </li>

                {role === "seller" && (
                  <li>
                    <Link href="/products/list">List Product</Link>
                  </li>
                )}
                {role === "expedition" && (
                  <li>
                    <Link href="/expedition">Processed Orders</Link>
                  </li>
                )}
                {role === "admin" && (
                  <li>
                    <Link href="/admin/certifications">
                      Product Certifications
                    </Link>
                  </li>
                )}
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <Link
                href="#"
                onClick={handleLoginClick}
                className="btn btn-primary hover:font-bold transition-all"
              >
                Login / Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
