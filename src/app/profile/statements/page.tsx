"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/interceptor";

interface TransactionDetails {
  description: string;
  timestamp: string;
  confirmed_by?: string;
  product_name?: string;
  quantity?: number;
  seller_name?: string;
}

interface Transaction {
  id: number;
  amount: number;
  date: string;
  type: "deposit" | "buy" | "sell";
  details: TransactionDetails;
}

const generateStatementNumber = (transaction: Transaction) => {
  const date = new Date(transaction.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const idSuffix = String(transaction.id).slice(-2).padStart(2, "0");
  return `STMT-${year}${month}${day}${hour}${minute}${idSuffix}`;
};

export default function StatementsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Format functions
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/transactions");

        if (response.data.status === "success") {
          setTransactions(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isLoggedIn, router]);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case "deposit":
        return "text-success";
      case "buy":
        return "text-error";
      case "sell":
        return "text-primary font-bold"; // More vibrant color for sell transactions
      default:
        return "text-base-content";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Account Statements</h1>
        <div className="animate-pulse">
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-24 rounded-lg mb-4"></div>
          <div className="bg-base-300 h-24 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Statements</h1>

      {transactions.length === 0 ? (
        <div className="text-center py-10">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-base-content/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-lg mb-4">No transactions found</p>
          {/* <Link href="/topup" className="btn btn-primary">
            Top Up Balance
          </Link> */}
        </div>
      ) : (
        <div className="bg-base-100 rounded-lg shadow-sm divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-base-content/70">
                    Statement {generateStatementNumber(transaction)}
                  </p>
                  <p className="text-sm text-base-content/70">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <span className={`badge ${getTypeStyle(transaction.type)}`}>
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </span>
              </div>

              <div className="mt-2">
                <p className="font-medium">{transaction.details.description}</p>
                {transaction.type === "buy" &&
                  transaction.details.product_name && (
                    <div className="text-sm text-base-content/70">
                      <p>Product: {transaction.details.product_name}</p>
                      <p>Seller: {transaction.details.seller_name}</p>
                      <p>Quantity: {transaction.details.quantity}</p>
                      <p>Confirmed by: {transaction.details.confirmed_by}</p>
                    </div>
                  )}
                <p
                  className={`text-lg font-semibold mt-2 ${getTypeStyle(
                    transaction.type
                  )}`}
                >
                  {transaction.type === "deposit" || transaction.type === "sell"
                    ? "+"
                    : "-"}
                  {formatPrice(transaction.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
