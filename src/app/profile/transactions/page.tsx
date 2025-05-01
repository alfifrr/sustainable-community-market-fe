"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// Tipe data untuk transaksi
interface Transaction {
    id: string;
    type: "purchase" | "sale" | "deposit" | "withdrawal";
    amount: number;
    description: string;
    date: string;
    status: "completed" | "pending" | "failed";
    reference?: string;
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    // Fungsi untuk memformat harga
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    };

    // Fungsi untuk memformat tanggal
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Mengambil data transaksi dari localStorage
    useEffect(() => {
        // Cek apakah user sudah login
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        // Get transactions from localStorage
        const fetchTransactions = () => {
            setLoading(true);
            try {
                // Check if we're in the browser environment
                if (typeof window !== 'undefined') {
                    const storedPurchases = localStorage.getItem('purchases');
                    let transactionsList: Transaction[] = [];

                    // Add default transactions that are not from purchases
                    const defaultTransactions: Transaction[] = [
                        {
                            id: "trx1",
                            type: "deposit",
                            amount: 500000,
                            description: "Top up balance",
                            date: "2023-06-20T08:30:00Z",
                            status: "completed",
                        },
                        {
                            id: "trx4",
                            type: "sale",
                            amount: 150000,
                            description: "Sale: Homemade Cookies",
                            date: "2023-06-08T11:20:00Z",
                            status: "completed",
                            reference: "sale1",
                        },
                        {
                            id: "trx5",
                            type: "withdrawal",
                            amount: -100000,
                            description: "Withdrawal to bank account",
                            date: "2023-06-05T09:15:00Z",
                            status: "completed"
                        }
                    ];

                    transactionsList = [...defaultTransactions];

                    if (storedPurchases) {
                        // Parse the stored purchases
                        const parsedPurchases = JSON.parse(storedPurchases);

                        // Transform purchase data to transaction format
                        const purchaseTransactions: Transaction[] = parsedPurchases.map((order: any, index: number) => {
                            // Calculate total amount for the order
                            const totalAmount = order.items.reduce((sum: number, item: any) => {
                                return sum + (item.price * item.quantity);
                            }, 0);

                            return {
                                id: `trx-purchase-${index}-${order.id}`,
                                type: "purchase",
                                amount: -totalAmount, // Negative amount for purchases
                                description: `Purchase: ${order.items.map((item: any) => item.name).join(", ")}`,
                                date: order.purchaseDate,
                                status: order.status,
                                reference: order.id
                            };
                        });

                        // Add purchase transactions to the list
                        transactionsList = [...transactionsList, ...purchaseTransactions];
                    }

                    // Sort transactions by date (newest first)
                    transactionsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    setTransactions(transactionsList);
                } else {
                    setTransactions([]);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();

        // Add event listener for storage changes
        window.addEventListener('storage', fetchTransactions);

        return () => {
            window.removeEventListener('storage', fetchTransactions);
        };
    }, [isLoggedIn, router]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="hover">
                                    <td>{formatDate(transaction.date)}</td>
                                    <td>{transaction.description}</td>
                                    <td className={`font-medium ${transaction.amount > 0 ? 'text-success' : 'text-error'}`}>
                                        {formatPrice(transaction.amount)}
                                    </td>
                                    <td>
                                        <span className={`badge ${transaction.status === 'completed' ? 'badge-success' : transaction.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}