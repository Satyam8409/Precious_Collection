import { useAppSelector } from "../store/hooks";
import { CollectionSection } from "../components/collection/CollectionSection";

export const Collection = () => {
  const ownedItems = useAppSelector((state) => state.marketplaceCollection.collectionItems);
  const wishlistItems = useAppSelector((state) => state.marketplaceCollection.wishlistItems);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              My Collection
            </span>

            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                A clear view of what you own, save, and plan to sell
              </h1>

              <p className="mt-3 max-w-3xl text-sm text-base-content/70 sm:text-base">
                This dashboard reads directly from the existing Redux collection
                and wishlist arrays, then presents them as simple shelves with a
                stronger visual hierarchy.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-105">
            <div className="rounded-2xl bg-primary/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Owned
              </p>
              <p className="mt-2 text-3xl font-bold text-base-content">
                {ownedItems.length}
              </p>
            </div>

            <div className="rounded-2xl bg-secondary/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Wishlist
              </p>
              <p className="mt-2 text-3xl font-bold text-base-content">
                {wishlistItems.length}
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/70">
                Selling
              </p>
              <p className="mt-2 text-3xl font-bold text-base-content">0</p>
            </div>
          </div>
        </div>
      </div>

      <CollectionSection
        title="Owned"
        description="Items you have already added to your collection from the marketplace."
        items={ownedItems}
        emptyTitle="No owned items yet"
        emptyDescription="Add a marketplace item to your Collection to see it here."
      />

      <CollectionSection
        title="Wishlist"
        description="Items you have saved for later from the marketplace."
        items={wishlistItems}
        emptyTitle="No wishlist items yet"
        emptyDescription="Add a marketplace item to your Wishlist to build this list."
      />

      <CollectionSection
        title="Selling"
        description="Items planned for sale will appear here once that flow is added."
        items={[]}
        emptyTitle="No selling items yet"
        emptyDescription="This section is ready for future selling items."
      />
    </section>
  );
};
