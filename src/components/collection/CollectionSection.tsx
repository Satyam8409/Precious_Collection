import { MarketplaceEmpty } from "../marketplace/MarketplaceEmpty";
import { type CollectionItemEntry } from "../../hooks/useCollection";
import { type CollectionView } from "../../hooks/useCollection";
import { CollectionItemCard } from "./CollectionItemCard";
import { type MarketplaceItem } from "../marketplace/MarketplaceCard";

type CollectionSectionProps = {
  title: string;
  description: string;
  items: CollectionItemEntry[];
  emptyTitle: string;
  emptyDescription: string;
  currentView: CollectionView;
  onRemoveItem: (item: MarketplaceItem) => void;
  onMoveItem: (item: MarketplaceItem, destination: CollectionView) => void;
};

export const CollectionSection = ({title,description,items,emptyTitle,emptyDescription,currentView,onRemoveItem,onMoveItem}: CollectionSectionProps) => {
  return (
    <section className="rounded-3xl bg-base-100 p-5 shadow-sm ring-1 ring-base-200 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-base-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-base-content">
              {title}
            </h2>
            <span className="badge badge-neutral badge-outline">
              {items.length} item{items.length === 1 ? "" : "s"}
            </span>
          </div>
          <p className="max-w-3xl text-sm text-base-content/70">{description}</p>
        </div>
      </div>

      {items.length === 0 
      ? (
        <MarketplaceEmpty title={emptyTitle} description={emptyDescription} />
      ) 
      : (
        <div className="space-y-4">
          {items.map(({ item, dateAdded }) => (
            <CollectionItemCard
              key={item.id}
              item={item}
              dateAdded={dateAdded}
              currentView={currentView}
              onRemoveItem={onRemoveItem}
              onMoveItem={onMoveItem}
            />
          ))}
        </div>
      )}
    </section>
  );
};