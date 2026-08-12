export type MarketplaceItem = {
  id: string;
  title?: string;
  category?: string;
  condition?: string;
  price?: number;
  sellerName?: string;
  location?: string;
  image?: string;
};

type MarketplaceCardProps = {
  item: MarketplaceItem;
  imageSource: string;
  onImageError: (itemId: string) => void;
  formatPrice: (price?: number) => string;
};

export const MarketplaceCard = ({
  item,
  imageSource,
  onImageError,
  formatPrice,
}: MarketplaceCardProps) => {
  return (
    <article className="card h-full overflow-hidden bg-base-100 shadow-sm ring-1 ring-base-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
      <figure className="relative aspect-4/3 bg-base-200">
        <img
          src={imageSource}
          alt={item.title ?? "Marketplace item"}
          className="h-full w-full object-cover"
          onError={() => onImageError(item.id)}
          loading="lazy"
        />
      </figure>

      <div className="card-body gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="badge badge-primary badge-outline">
              {item.category ?? "Uncategorized"}
            </span>
            <span className="badge badge-ghost">
              {item.condition ?? "Condition unavailable"}
            </span>
          </div>
          <h2 className="card-title text-xl leading-snug text-base-content">
            {item.title ?? "Untitled listing"}
          </h2>
        </div>

        <div className="grid gap-3 rounded-2xl bg-base-200/60 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-base-content/60">Seller</p>
            <p className="mt-1 font-medium text-base-content">
              {item.sellerName ?? "Seller unavailable"}
            </p>
          </div>
          <div>
            <p className="text-base-content/60">Location</p>
            <p className="mt-1 font-medium text-base-content">
              {item.location ?? "Location unavailable"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-base-content/60">Price</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
