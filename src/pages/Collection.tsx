import { CollectionFilters } from "../components/collection/CollectionFilters";
import { CollectionHeader } from "../components/collection/CollectionHeader";
import { CollectionSection } from "../components/collection/CollectionSection";
import { CollectionTabs } from "../components/collection/CollectionTabs";
import { useCollection } from "../hooks/useCollection";
import { type CollectionView } from "../hooks/useCollection";
import { useAppSelector } from "../store/hooks";

const collectionViews: Array<{ view: CollectionView; label: string }> = [
  { view: "owned", label: "Owned" },
  { view: "wishlist", label: "Wishlist" },
  { view: "selling", label: "Selling" },
];

export const Collection = () => {
  const ownedItems = useAppSelector((state) => state.marketplaceCollection.collectionItems);
  const wishlistItems = useAppSelector((state) => state.marketplaceCollection.wishlistItems);

  const {
    activeView,
    setActiveView,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filteredItems,
    hasActiveFilters,
    activeItemCount,
    activeViewConfig,
  } = useCollection({ ownedItems, wishlistItems });

  // const showCollectionControls = activeView !== "selling";
  const trimmedSearchText = searchText.trim();
  const hasNoResults = hasActiveFilters && filteredItems.length === 0;
  const emptyTitle = hasNoResults
    ? "No matching items"
    : activeViewConfig.emptyTitle;
  const emptyDescription = hasNoResults
    ? trimmedSearchText.length > 0
      ? `No items in ${activeViewConfig.title.toLowerCase()} match "${trimmedSearchText}".`
      : `No items match the selected filters in ${activeViewConfig.title.toLowerCase()}.`
    : activeViewConfig.emptyDescription;

  return (
    <section className="space-y-8">
      <CollectionHeader ownedCount={ownedItems.length} wishlistCount={wishlistItems.length} />

      <div className="rounded-3xl bg-base-100 p-5 shadow-sm ring-1 ring-base-200 sm:p-6">
        <CollectionTabs
          activeView={activeView}
          collectionViews={collectionViews}
          onSelectView={setActiveView}
        />

        <CollectionFilters
          activeViewTitle={activeViewConfig.title}
          searchText={searchText}
          onSearchTextChange={setSearchText}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="mt-5">
          <CollectionSection
            title={activeViewConfig.title}
            description={activeViewConfig.description}
            items={activeView === "selling" ? [] : filteredItems}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
          />
        </div>
      </div>

      <div className="text-sm text-base-content/60">
        {activeView === "selling"
          ? "Selling is currently empty."
          : `${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"} shown out of ${activeItemCount}.`}
      </div>
    </section>
  );
};
