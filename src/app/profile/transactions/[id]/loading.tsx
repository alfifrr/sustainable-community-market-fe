export default function TransactionDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="w-32 h-8 bg-base-300 rounded animate-pulse"></div>
      </div>

      <div className="bg-base-100 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <div className="w-48 h-8 bg-base-300 rounded animate-pulse"></div>
              <div className="w-36 h-6 bg-base-300 rounded animate-pulse"></div>
            </div>
            <div className="w-24 h-6 bg-base-300 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="w-36 h-6 bg-base-300 rounded animate-pulse mb-4"></div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-base-300 rounded animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="w-full h-6 bg-base-300 rounded animate-pulse"></div>
                      <div className="w-3/4 h-4 bg-base-300 rounded animate-pulse"></div>
                      <div className="w-1/2 h-4 bg-base-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-36 h-6 bg-base-300 rounded animate-pulse mb-4"></div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="w-24 h-4 bg-base-300 rounded animate-pulse"></div>
                        <div className="w-full h-6 bg-base-300 rounded animate-pulse"></div>
                        {i === 3 && (
                          <>
                            <div className="w-full h-4 bg-base-300 rounded animate-pulse"></div>
                            <div className="w-3/4 h-4 bg-base-300 rounded animate-pulse"></div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
