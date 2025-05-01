"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// Tipe data untuk item pembelian
interface PurchaseItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    sellerId: string;
    sellerName: string;
    purchaseDate: string;
    status: "completed" | "processing" | "cancelled";
}

export default function PurchasesPage() {
    const [purchases, setPurchases] = useState<PurchaseItem[]>([]);
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

    // Mengambil data pembelian dari localStorage
    useEffect(() => {
        // Cek apakah user sudah login
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        // Get purchases from localStorage
        const fetchPurchases = () => {
            setLoading(true);
            try {
                // Check if we're in the browser environment
                if (typeof window !== 'undefined') {
                    const storedPurchases = localStorage.getItem('purchases');
                    
                    if (storedPurchases) {
                        // Parse the stored purchases
                        const parsedPurchases = JSON.parse(storedPurchases);
                        
                        // Transform the data to match PurchaseItem interface
                        const formattedPurchases: PurchaseItem[] = parsedPurchases.map((order: any) => {
                            // For orders with multiple items, we'll show each item as a separate purchase
                            return order.items.map((item: any) => ({
                                id: order.id,
                                productId: item.productId,
                                name: item.name,
                                price: item.price,
                                quantity: item.quantity,
                                imageUrl: item.imageUrl,
                                sellerId: item.sellerId,
                                sellerName: item.sellerName,
                                purchaseDate: order.purchaseDate,
                                status: order.status
                            }));
                        }).flat(); // Flatten the array of arrays
                        
                        setPurchases(formattedPurchases);
                    } else {
                        setPurchases([]);
                    }
                }
            } catch (error) {
                console.error('Error fetching purchases:', error);
                setPurchases([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();

        // Add event listener for storage changes
        window.addEventListener('storage', fetchPurchases);
        
        return () => {
            window.removeEventListener('storage', fetchPurchases);
        };
    }, [isLoggedIn, router]);

    // Fungsi untuk mendapatkan warna badge berdasarkan status
    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "completed":
                return "badge-success";
            case "processing":
                return "badge-warning";
            case "cancelled":
                return "badge-error";
            default:
                return "badge-ghost";
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Purchase History</h1>
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
            <h1 className="text-2xl font-bold mb-6">Purchase History</h1>

            {purchases.length === 0 ? (
                <div className="text-center py-10">
                    <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-lg mb-4">You haven't made any purchases yet</p>
                    <Link href="/products" className="btn btn-primary">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="bg-base-100 rounded-lg shadow-sm divide-y">
                    {purchases.map((purchase) => (
                        <div key={purchase.id} className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-sm text-base-content/70">
                                        Order ID: {purchase.id}
                                    </p>
                                    <p className="text-sm text-base-content/70">
                                        Purchased on {formatDate(purchase.purchaseDate)}
                                    </p>
                                </div>
                                <span className={`badge ${getStatusBadgeColor(purchase.status)}`}>
                                    {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="relative w-full sm:w-24 h-24 bg-base-200 rounded-lg overflow-hidden">
                                    {purchase.imageUrl ? (
                                        <Image
                                            src={purchase.imageUrl}
                                            alt={purchase.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 96px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <Link href={`/products/${purchase.productId}`} className="text-lg font-medium hover:text-primary">
                                        {purchase.name}
                                    </Link>
                                    <p className="text-sm text-base-content/70">Seller: {purchase.sellerName}</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span>
                                            {purchase.quantity} {purchase.quantity === 1 ? "item" : "items"}
                                        </span>
                                        <span className="font-medium">
                                            {formatPrice(purchase.price * purchase.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <Link href={`/products/${purchase.productId}`} className="btn btn-ghost btn-sm">
                                    View Product
                                </Link>
                                {purchase.status === "completed" && (
                                    <button className="btn btn-outline btn-sm">
                                        Write Review
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}