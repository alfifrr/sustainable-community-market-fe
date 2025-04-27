import ProductLayout from "@/components/ProductLayout";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProduct(id: string) {
  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(
    `${protocol}://${host}${API_ENDPOINTS.PRODUCT_BY_ID(id)}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }
  const product = await res.json();
  return product.data;
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProduct(id);
  return <ProductLayout product={product} />;
}
