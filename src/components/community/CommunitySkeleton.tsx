export const CommunitySkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl bg-base-100 shadow-sm ring-1 ring-base-200"
        >
          <div className="skeleton aspect-[4/3] w-full rounded-b-none" />
          <div className="space-y-3 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="skeleton h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-3 w-1/3" />
              </div>
            </div>
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="flex gap-3">
              <div className="skeleton h-7 w-20 rounded-full" />
              <div className="skeleton h-7 w-24 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};