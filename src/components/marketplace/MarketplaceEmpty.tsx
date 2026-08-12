type MarketplaceEmptyProps = {
  title?: string;
  description?: string;
};

export const MarketplaceEmpty = ({
  title = "No listings found",
  description = "The marketplace is currently empty.",
}: MarketplaceEmptyProps) => {
  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-base-content">{title}</h2>
      <p className="mt-2 text-sm text-base-content/70">{description}</p>
    </div>
  );
};
