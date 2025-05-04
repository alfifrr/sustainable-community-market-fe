import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";
import TransactionDetail from "@/components/transactions/TransactionDetail";
import type { Metadata } from "next";
import type { Transaction } from "@/lib/types";

interface ApiResponse {
  status: string;
  message: string;
  data: Transaction;
}

// Server-side data fetching
async function getTransactionData(id: string): Promise<Transaction | null> {
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
      `${protocol}://${host}${API_ENDPOINTS.PRODUCT_HISTORY}/${id}`,
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
  const transaction = await getTransactionData(transactionId);

  return {
    title: transaction
      ? `Transaction ${transaction.id} - ${transaction.product.name}`
      : "Transaction Not Found",
    description: transaction
      ? `Transaction details for ${transaction.product.name}`
      : "Transaction not found",
  };
}

export default async function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const transactionId = (await params).id;
  const transaction = await getTransactionData(transactionId);
  const cookieStore = await cookies();
  const userRole = cookieStore.get("userRole")?.value;

  if (!transaction) {
    notFound();
  }

  return (
    <TransactionDetail
      transaction={transaction}
      isBuyer={userRole === "buyer"}
      isSeller={userRole === "seller"}
    />
  );
}
