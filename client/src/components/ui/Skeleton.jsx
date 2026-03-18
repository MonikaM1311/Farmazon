export const ProductSkeleton = () => (
  <div className="card overflow-hidden border border-green-100">
    <div className="skeleton h-48 w-full rounded-none" />
    <div className="p-4 space-y-2">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
      <div className="skeleton h-6 w-1/3 mt-3" />
    </div>
  </div>
);

export const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-green-200 border-t-green-800 rounded-full animate-spin" />
  </div>
);
