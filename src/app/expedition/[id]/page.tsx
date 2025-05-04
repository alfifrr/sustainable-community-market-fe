import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";
import ExpeditionDetail from "@/components/transactions/ExpeditionDetail";
import type { ProcessedTransaction } from "@/lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ApiResponse {
  status: string;
  message: string;
  data: ProcessedTransaction;
}

async function getProcessedTransactionDetails(id: string) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return null;
  }

  try {
    const headersList = headers();
    const host = (await headersList).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const response = await fetch(
      `${protocol}://${host}${API_ENDPOINTS.PROCESSED_PRODUCT_BY_ID(id)}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      return null;
    }

    const result: ApiResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  const transaction = await getProcessedTransactionDetails(id);

  return {
    title: transaction
      ? `Expedition #${transaction.id} - ${transaction.product.name}`
      : "Expedition Not Found",
    description: transaction
      ? `Expedition details for order ${transaction.product.name}`
      : "Expedition details not found",
  };
}

export default async function ExpeditionTransactionDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const transaction = await getProcessedTransactionDetails(id);
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value;

  if (!transaction || userRole !== "expedition") {
    notFound();
  }

  return <ExpeditionDetail transaction={transaction} />;
}
