import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";
import ExpeditionDetail from "@/components/transactions/ExpeditionDetail";
import type { Metadata } from "next";
import type { ProcessedTransaction } from "@/lib/types";

interface ApiResponse {
  status: string;
  message: string;
  data: ProcessedTransaction;
}

// Server-side data fetching
async function getProcessedTransactionDetails(
  id: string
): Promise<ProcessedTransaction | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return null;
  }

  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const response = await fetch(
      `${protocol}://${host}/api/processed-products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 }, // Disable cache for fresh data
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

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const transactionId = (await params).id;
  const transaction = await getProcessedTransactionDetails(transactionId);

  return {
    title: transaction
      ? `Expedition ${transaction.id} - ${transaction.product.name}`
      : "Expedition Not Found",
    description: transaction
      ? `Expedition details for ${transaction.product.name}`
      : "Expedition not found",
  };
}

export default async function ExpeditionTransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const transactionId = (await params).id;
  const transaction = await getProcessedTransactionDetails(transactionId);
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value;

  if (!transaction || userRole !== "expedition") {
    notFound();
  }

  return <ExpeditionDetail transaction={transaction} />;
}
