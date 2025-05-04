import ProductLayout from "@/components/ProductLayout";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { headers } from "next/headers";
import type { ProductReviewResponse } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProduct(id: string) {
  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Fetch product data
  const productRes = await fetch(
    `${protocol}://${host}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!productRes.ok) {
    throw new Error(`Failed to fetch product: ${productRes.statusText}`);
  }
  const product = await productRes.json();

  // Fetch product reviews
  const reviewsRes = await fetch(
    `${protocol}://${host}/api/products/${id}/reviews`,
    {
      next: { revalidate: 0 },
    }
  );
  const reviews: ProductReviewResponse = reviewsRes.ok
    ? await reviewsRes.json()
    : {
        data: {
          average_rating: 0,
          product_id: parseInt(id),
          reviews: [],
          total_items_sold: 0,
          total_reviews: 0,
        },
        message: "",
        status: "success",
      };

  // Add default average_rating if missing
  if (reviews.data && !("average_rating" in reviews.data)) {
    reviews.data.average_rating = 0;
  }

  return {
    ...product.data,
    reviews: reviews.data,
  };
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const productWithReviews = await getProduct(id);
  return <ProductLayout product={productWithReviews} />;
}
