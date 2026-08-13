import { type MarketplaceItem } from "../marketplace/MarketplaceCard";
import {MARKETPLACE_FALLBACK_IMAGE,formatMarketplacePrice} from "../../constants/marketplace";

type CollectionItemCardProps = {
  item: MarketplaceItem;
  dateAdded: string;
};

export const CollectionItemCard = ({ item, dateAdded }: CollectionItemCardProps) => {
  const imageSource = item.image || MARKETPLACE_FALLBACK_IMAGE;

  return (
    <article className="overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm ring-1 ring-base-200 transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="grid gap-0 lg:grid-cols-[180px_1fr]">
        <figure className="aspect-16/10 bg-base-200 lg:aspect-auto lg:h-full">
          <img
            src={imageSource}
            alt={item.title ?? "Collection item"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="badge badge-primary badge-outline">
                  {item.category ?? "Uncategorized"}
                </span>
              </div>

              <h2 className="text-lg font-semibold leading-snug text-base-content sm:text-xl">
                {item.title ?? "Untitled item"}
              </h2>
            </div>

            <div className="rounded-2xl bg-base-200/60 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.18em] text-base-content/60">
                Estimated Value
              </p>
              <p className="mt-1 text-xl font-bold text-primary sm:text-2xl">
                {formatMarketplacePrice(item.price)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-base-200/50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-base-content/60">
                Category
              </p>
              <p className="mt-1 text-sm font-medium text-base-content">
                {item.category ?? "Uncategorized"}
              </p>
            </div>

            <div className="rounded-2xl bg-base-200/50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-base-content/60">
                Date Added
              </p>
              <p className="mt-1 text-sm font-medium text-base-content">
                {dateAdded}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};