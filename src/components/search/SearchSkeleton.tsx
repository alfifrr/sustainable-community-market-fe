"use client";

interface SearchSkeletonProps {
  count?: number;
}

export default function SearchSkeleton({ count = 3 }: SearchSkeletonProps) {
  return (
    <div className="space-y-4" role="status" aria-label="Loading results">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card bg-base-100 shadow-sm animate-pulse">
          <div className="card-body p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image skeleton */}
              <div className="relative w-full sm:w-24 h-32 sm:h-24 rounded-lg bg-base-300" />

              {/* Content skeleton */}
              <div className="flex-1 space-y-4">
                <div className="h-4 w-3/4 bg-base-300 rounded" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-base-300 rounded" />
                  <div className="h-3 w-5/6 bg-base-300 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-20 bg-base-300 rounded-full" />
                  <div className="h-5 w-24 bg-base-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading search results...</span>
    </div>
  );
}
