"use client";
import { User } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={`/users/${user.id}`}
      className="block transition-transform hover:scale-102 focus:scale-102 focus:outline-none"
    >
      <article className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="card-body p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=random`}
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="card-title text-base truncate">{user.name}</h3>
                {user.is_verified && (
                  <span
                    className="badge badge-success badge-sm"
                    aria-label="Verified user"
                  >
                    ✓
                  </span>
                )}
              </div>
              <p className="text-sm text-base-content/70">
                Member since{" "}
                <time dateTime={user.date_joined}>
                  {new Date(user.date_joined).toLocaleDateString()}
                </time>
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
