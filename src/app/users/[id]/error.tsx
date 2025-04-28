"use client";

export default function Error() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-red-800 text-lg font-semibold">Error</h2>
        <p className="text-red-600">Failed to load user data</p>
      </div>
    </div>
  );
}
