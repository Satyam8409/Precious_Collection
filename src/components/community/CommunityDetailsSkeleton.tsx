export const CommunityDetailsSkeleton = () => {
  return (
    <section className="space-y-6">
      <div className="skeleton h-6 w-36 rounded-full" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="skeleton aspect-[4/3] rounded-3xl" />
        <div className="space-y-4 rounded-3xl bg-base-100 p-6 shadow-sm ring-1 ring-base-200 sm:p-8">
          <div className="skeleton h-12 w-12 rounded-full" />
          <div className="skeleton h-6 w-1/2" />
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-24 w-full" />
          <div className="flex gap-3">
            <div className="skeleton h-8 w-24 rounded-full" />
            <div className="skeleton h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};