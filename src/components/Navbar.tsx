"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useAuthSync } from "@/hooks/useAuthSync";

const Navbar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const debouncedSearch = useDebounce(searchTerm, 500); // add wait time for 500ms after all typing activities
  const { isLoggedIn, logout } = useAuth(); // handle auth w/ hook
  useAuthSync(); // hook to sync the navbar with cookie tokens

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
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
              <Link href="/" className="btn btn-ghost">
                Home
              </Link>
              <Link href="/about" className="btn btn-ghost">
                About Us
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoggedIn ? (
            // Show user dropdown when logged in
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" href="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            // Show login/signup button when not logged in
            <div>
              <Link href="/login" className="btn btn-primary btn-sm">
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
