import { Product } from "@/lib/types";
import Link from "next/link";

interface ProductLayoutProps {
  product: Product;
}

const ProductLayout = ({ product }: ProductLayoutProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-base-300 rounded-lg shadow-lg p-6">
        {/* Product Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-lg text-primary font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>
          <div className="text-right">
            <span className="badge badge-primary">{product.category.name}</span>
            <p className="mt-2">Stock: {product.stock} units</p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-base-content">{product.description}</p>
        </div>

        {/* Dates Information */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-base-200 rounded">
            <p className="text-sm text-primary">Posted Date</p>
            <p className="font-medium">
              {new Date(product.product_posted).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-base-200 rounded">
            <p className="text-sm text-primary">Expiration Date</p>
            <p className="font-medium">
              {new Date(product.expiration_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Pickup Information */}
        <div className="mt-6 p-4 bg-base-200 rounded">
          <h2 className="text-xl font-semibold mb-2">Pickup Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {product.pickup_address.label}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {product.pickup_address.address}
            </p>
            <p>
              <span className="font-semibold">Details:</span>{" "}
              {product.pickup_address.details}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {product.pickup_address.contact_person}
            </p>
          </div>
        </div>

        {/* Seller Information */}
        <div className="mt-6 border-t pt-4">
          <Link
            href={`/users/${product.user.id}`}
            className="flex items-center space-x-2 hover:bg-base-200 p-2 rounded-lg transition-colors"
          >
            <div className="relative w-12 h-12">
              <img
                src={`https://ui-avatars.com/api/?name=${product.user.name}`}
                alt={product.user.name}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold">{product.user.name}</p>
              <p
                className={`text-sm ${
                  product.user.is_verified ? "text-info" : "text-warning"
                }`}
              >
                {product.user.is_verified
                  ? "Verified Seller"
                  : "Unverified Seller"}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
