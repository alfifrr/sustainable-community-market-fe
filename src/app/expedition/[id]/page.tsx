import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";
import ExpeditionDetail from "@/components/transactions/ExpeditionDetail";
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
      `${protocol}://${host}${API_ENDPOINTS.PROCESSED_PRODUCT_BY_ID(id)}`,
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

export default async function ExpeditionTransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const transactionId = params.id;
  const transaction = await getProcessedTransactionDetails(transactionId);
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value;

  if (!transaction || userRole !== "expedition") {
    notFound();
  }

  return <ExpeditionDetail transaction={transaction} />;
}
