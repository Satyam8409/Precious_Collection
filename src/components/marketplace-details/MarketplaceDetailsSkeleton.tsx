export const MarketplaceDetailsSkeleton = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="skeleton h-10 w-40 rounded-btn" />
        <div className="skeleton h-4 w-28" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="skeleton aspect-4/3 w-full rounded-3xl" />

        <div className="rounded-3xl bg-base-100 p-6 shadow-sm ring-1 ring-base-200 sm:p-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="skeleton h-6 w-24 rounded-full" />
              <div className="skeleton h-6 w-32 rounded-full" />
            </div>
            <div className="skeleton h-10 w-3/4" />
            <div className="skeleton h-10 w-1/2" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-200/60 p-4">
              <div className="skeleton h-4 w-12" />
              <div className="skeleton mt-2 h-6 w-32" />
            </div>
            <div className="rounded-2xl bg-base-200/60 p-4">
              <div className="skeleton h-4 w-14" />
              <div className="skeleton mt-2 h-6 w-28" />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-base-200 bg-base-50 p-4">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton mt-2 h-4 w-5/6" />
          </div>
        </div>
      </div>
    </section>
  );
};
