import { type MarketplaceItem } from "../marketplace/MarketplaceCard";

type MarketplaceProductDetailsProps = {
  item: MarketplaceItem;
  imageSource: string;
  onImageError: () => void;
  formatPrice: (price?: number) => string;
};

export const MarketplaceProductDetails = ({
  item,
  imageSource,
  onImageError,
  formatPrice,
}: MarketplaceProductDetailsProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <figure className="overflow-hidden rounded-3xl bg-base-200 shadow-sm ring-1 ring-base-200">
        <img
          src={imageSource}
          alt={item.title ?? "Marketplace item"}
          className="h-full w-full object-cover"
          onError={onImageError}
        />
      </figure>

      <div className="rounded-3xl bg-base-100 p-6 shadow-sm ring-1 ring-base-200 sm:p-8">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="badge badge-primary badge-outline">
              {item.category ?? "Uncategorized"}
            </span>
            <span className="badge badge-ghost">
              {item.condition ?? "Condition unavailable"}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-base-content">
            {item.title ?? "Untitled listing"}
          </h1>

          <p className="text-3xl font-bold text-primary">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-base-200/60 p-4">
            <p className="text-sm text-base-content/60">Seller</p>
            <p className="mt-1 text-lg font-semibold text-base-content">
              {item.sellerName ?? "Seller unavailable"}
            </p>
          </div>

          <div className="rounded-2xl bg-base-200/60 p-4">
            <p className="text-sm text-base-content/60">Location</p>
            <p className="mt-1 text-lg font-semibold text-base-content">
              {item.location ?? "Location unavailable"}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-base-200 bg-base-50 p-4 text-sm text-base-content/70">
          This page shows the selected marketplace product using the existing
          JSON Server data source.
        </div>
      </div>
    </div>
  );
};
