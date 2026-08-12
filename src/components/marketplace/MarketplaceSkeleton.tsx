export const MarketplaceSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="card h-full overflow-hidden bg-base-100 shadow-sm ring-1 ring-base-200"
        >
          <div className="skeleton aspect-4/3 w-full rounded-b-none" />
          <div className="card-body space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="grid grid-cols-2 gap-3">
              <div className="skeleton h-16 rounded-box" />
              <div className="skeleton h-16 rounded-box" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
