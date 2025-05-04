import Link from "next/link";

export default function TransactionNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Transaction Not Found</h1>
        <p className="mb-6 text-base-content/70">
          The transaction you&apos;re looking for doesn&apos;t exist or you
          don&apos;t have permission to view it.
        </p>
        <Link href="/profile/transactions" className="btn btn-primary">
          Back to Transactions
        </Link>
      </div>
    </div>
  );
}
