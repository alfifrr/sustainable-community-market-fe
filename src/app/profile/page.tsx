"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/lib/types";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { ProfileSkeleton } from "@/components/skeletons/Profile";

export default function Profile() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { profile, isLoading, error } = useProfile();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error">
          <span>{error}</span>
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
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* Profile Navigation */}
        <div className="tabs tabs-boxed mb-6">
          <button className="tab tab-active">Profile</button>
          <button className="tab" onClick={() => router.push('/profile/transactions')}>Transactions</button>
          <button className="tab" onClick={() => router.push('/profile/purchases')}>Purchases</button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Username:</span>
                <span>{profile.username}</span>
              </div>

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
                  <span>Rp. {profile.balance.toFixed(2)}</span>
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
                  <span>
                    {new Date(profile.date_joined).toLocaleDateString()}
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
    </div>
  );
}
