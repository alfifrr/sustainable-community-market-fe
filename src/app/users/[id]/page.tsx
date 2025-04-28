import UserLayout from "@/components/UserLayout";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getUser(id: string) {
  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(
    `${protocol}://${host}${API_ENDPOINTS.USER_BY_ID(id)}`,
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }
  const user = await res.json();
  return user.data;
}

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await getUser(id);
  return <UserLayout user={user} />;
}
