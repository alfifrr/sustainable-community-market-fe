"use client";
import Link from "next/link";
import { formatDate } from "@/lib/formats";
import { Product, User } from "@/lib/types";

interface SearchResultsProps {
  users: User[];
  products: Product[];
}

const SearchResults = ({ users, products }: SearchResultsProps) => {
  if (users.length === 0 && products.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-16 left-0 right-0 bg-base-100 shadow-lg rounded-lg mx-4 p-4 z-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Users Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Users</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <Link href={`/users/${user.id}`} key={user.id}>
                <div className="card card-compact bg-base-200 hover:bg-base-300 cursor-pointer">
                  <div className="card-body">
                    <h3 className="card-title text-sm">
                      {user.name}
                      {user.is_verified && (
                        <span className="badge badge-success badge-sm">
                          Verified
                        </span>
                      )}
                    </h3>
                    <p className="text-xs">
                      Joined {formatDate(user.date_joined)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Products</h2>
          <div className="space-y-2">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="card card-compact bg-base-200 hover:bg-base-300 cursor-pointer">
                  <div className="card-body">
                    <h3 className="card-title text-sm">{product.name}</h3>
                    <p className="text-xs">{product.description}</p>
                    <p className="text-sm font-semibold">
                      ${product.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="badge badge-outline">
                        {product.category.name}
                      </span>
                      <span className="text-xs">by {product.user.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
