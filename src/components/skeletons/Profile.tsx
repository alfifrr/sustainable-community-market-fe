export const ProfileSkeleton = () => (
  <div className="w-full max-w-md animate-pulse">
    <div className="h-8 bg-base-300 rounded w-1/3 mb-6"></div>
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 bg-base-300 rounded w-1/4"></div>
            <div className="h-4 bg-base-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
