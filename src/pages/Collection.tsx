import { CollectionFilters } from "../components/collection/CollectionFilters";
import { CollectionHeader } from "../components/collection/CollectionHeader";
import { CollectionSection } from "../components/collection/CollectionSection";
import { CollectionTabs } from "../components/collection/CollectionTabs";
import {useCollection, type CollectionItemEntry, type CollectionSortOption, type CollectionView} from "../hooks/useCollection";
import { moveItemBetweenCollections, removeItemFromCollection, removeItemFromSelling, removeItemFromWishlist} from "../store/marketplaceCollectionSlice";
import { useAppSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";
import { useEffect, useMemo, useState } from "react";

const collectionViews: Array<{ view: CollectionView; label: string }> = [
  { view: "owned", label: "Owned" },
  { view: "wishlist", label: "Wishlist" },
  { view: "selling", label: "Selling" },
];

const collectionLabels: Record<CollectionView, string> = {
  owned: "Owned",
  wishlist: "Wishlist",
  selling: "Selling",
};

const formatDateAdded = (dateString?: string) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return dateFormatter.format(date);
};

const getCollectionItemsForView = (
  activeView: CollectionView,
  ownedItems: MarketplaceItem[],
  wishlistItems: MarketplaceItem[],
  sellingItems: MarketplaceItem[],
) => {
  if (activeView === "owned") {
    return ownedItems;
  }

  if (activeView === "wishlist") {
    return wishlistItems;
  }

  return sellingItems;
};

const getCollectionKeyForView = (view: CollectionView) => {
  if (view === "owned") {
    return "collectionItems";
  }

  if (view === "wishlist") {
    return "wishlistItems";
  }

  return "sellingItems";
};

const buildCollectionEntries = (
  items: MarketplaceItem[],
  searchText: string,
  selectedCategory: string,
  sortBy: CollectionSortOption,
) => {
  const searchQuery = searchText.trim().toLowerCase();

  const itemsWithMetadata: CollectionItemEntry[] = items.map((item) => ({
    item,
    dateAdded: formatDateAdded(item.dateAdded),
  }));

  const filteredItems = itemsWithMetadata.filter(({ item }) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery) ?? false;

    const matchesCategory =
      selectedCategory === "all" ||
      (item.category ?? "Uncategorized") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "value-low-high") {
      return (a.item.price ?? Infinity) - (b.item.price ?? Infinity);
    }

    if (sortBy === "value-high-low") {
      return (b.item.price ?? -Infinity) - (a.item.price ?? -Infinity);
    }

    return 0;
  });

  return {
    searchQuery,
    items: sortedItems,
    hasActiveFilters:
      searchQuery !== "" || selectedCategory !== "all" || sortBy !== "newest",
  };
};

export const Collection = () => {
  const dispatch = useAppDispatch();
  const ownedItems = useAppSelector((state) => state.marketplaceCollection.collectionItems);
  const wishlistItems = useAppSelector((state) => state.marketplaceCollection.wishlistItems);
  const sellingItems = useAppSelector((state) => state.marketplaceCollection.sellingItems);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const {
    activeView,
    setActiveView,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    activeViewConfig,
  } = useCollection({ ownedItems, wishlistItems });

  const activeItems = useMemo(
    () => getCollectionItemsForView(activeView, ownedItems, wishlistItems, sellingItems),
    [activeView, ownedItems, wishlistItems, sellingItems],
  );

  const categories = useMemo(() => {
    return Array.from(
      new Set(activeItems.map((item) => item.category ?? "Uncategorized")),
    ).sort();
  }, [activeItems]);

  const { items: filteredItems, searchQuery, hasActiveFilters } = useMemo(
    () => buildCollectionEntries(activeItems, searchText, selectedCategory, sortBy),
    [activeItems, searchText, selectedCategory, sortBy],
  );

  useEffect(() => {
    if (!feedbackMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [feedbackMessage]);

  const trimmedSearchText = searchQuery.trim();
  const hasNoResults = hasActiveFilters && filteredItems.length === 0;
  const emptyTitle = hasNoResults
    ? "No matching items"
    : activeViewConfig.emptyTitle;
  const emptyDescription = hasNoResults
    ? trimmedSearchText.length > 0
      ? `No items in ${activeViewConfig.title.toLowerCase()} match "${trimmedSearchText}".`
      : `No items match the selected filters in ${activeViewConfig.title.toLowerCase()}.`
    : activeViewConfig.emptyDescription;

  const handleRemoveItem = (item: MarketplaceItem) => {
    if (activeView === "owned") {
      dispatch(removeItemFromCollection(item.id));
    } else if (activeView === "wishlist") {
      dispatch(removeItemFromWishlist(item.id));
    } else {
      dispatch(removeItemFromSelling(item.id));
    }

    setFeedbackMessage(`Removed "${item.title ?? "Untitled item"}" from ${collectionLabels[activeView]}.`);
  };

  const handleMoveItem = (item: MarketplaceItem, destination: CollectionView) => {
    dispatch(
      moveItemBetweenCollections({
        item,
        from: getCollectionKeyForView(activeView),
        to: getCollectionKeyForView(destination),
      }),
    );

    setFeedbackMessage(`Moved "${item.title ?? "Untitled item"}" to ${collectionLabels[destination]}.`);
  };

  return (
    <section className="space-y-8">
      <CollectionHeader ownedCount={ownedItems.length} wishlistCount={wishlistItems.length} sellingCount={sellingItems.length} />

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

        {feedbackMessage ? (
          <div className="alert alert-info mt-5">
            <span>{feedbackMessage}</span>
          </div>
        ) : null}

        <div className="mt-5">
          <CollectionSection
            title={activeViewConfig.title}
            description={activeViewConfig.description}
            items={filteredItems}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            currentView={activeView}
            onRemoveItem={handleRemoveItem}
            onMoveItem={handleMoveItem}
          />
        </div>
      </div>

      <div className="text-sm text-base-content/60">
        {activeView === "selling"
          ? `${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"} shown out of ${activeItems.length}.`
          : `${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"} shown out of ${activeItems.length}.`}
      </div>
    </section>
  );
};
