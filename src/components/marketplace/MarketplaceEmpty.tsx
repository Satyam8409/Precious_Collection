export const MarketplaceEmpty = () => {
  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-base-content">No listings found</h2>
      <p className="mt-2 text-sm text-base-content/70">
        The marketplace is currently empty.
      </p>
    </div>
  );
};
