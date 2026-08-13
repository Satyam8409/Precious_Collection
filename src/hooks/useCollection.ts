import { useEffect, useState } from "react";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";

export type CollectionView = "owned" | "wishlist" | "selling";

export type CollectionSortOption =
  | "newest"
  | "value-low-high"
  | "value-high-low";

type CollectionViewConfig = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
};

export type CollectionItemEntry = {
  item: MarketplaceItem;
  dateAdded: string;
};

type UseCollectionArgs = {
  ownedItems: MarketplaceItem[];
  wishlistItems: MarketplaceItem[];
};

const collectionViewConfig: Record<CollectionView, CollectionViewConfig> = {
  owned: {
    title: "Owned",
    description:
      "Items you have already added to your collection from the marketplace.",
    emptyTitle: "No owned items yet",
    emptyDescription:
      "Add a marketplace item to your Collection to see it here.",
  },
  wishlist: {
    title: "Wishlist",
    description: "Items you have saved for later from the marketplace.",
    emptyTitle: "No wishlist items yet",
    emptyDescription:
      "Add a marketplace item to your Wishlist to build this list.",
  },
  selling: {
    title: "Selling",
    description: "Items planned for sale will appear here.",
    emptyTitle: "No selling items yet",
    emptyDescription: "This section is currently empty.",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDateAdded = (dateString?: string) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return dateFormatter.format(date);
};

export const useCollection = ({ownedItems,wishlistItems}: UseCollectionArgs) => {
  const [activeView, setActiveView] = useState<CollectionView>("owned");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] =
    useState<CollectionSortOption>("newest");

  useEffect(() => {
    setSearchText("");
    setSelectedCategory("all");
    setSortBy("newest");
  }, [activeView]);

  let activeItems: MarketplaceItem[] = [];

  if (activeView === "owned") {
    activeItems = ownedItems;
  } 
  else if (activeView === "wishlist") {
    activeItems = wishlistItems;
  }

  const categories = [
    ...new Set(
      activeItems.map((item) => item.category ?? "Uncategorized"),
    ),
  ].sort();

  const searchQuery = searchText.trim().toLowerCase();

  const filteredItems = activeItems.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery) ?? false;

    const matchesCategory =
      selectedCategory === "all" ||
      (item.category ?? "Uncategorized") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "value-low-high") {
      return (a.price ?? Infinity) - (b.price ?? Infinity);
    }

    if (sortBy === "value-high-low") {
      return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    }

    return 0;
  });

  const itemsWithMetadata: CollectionItemEntry[] = sortedItems.map(
    (item) => ({
      item,
      dateAdded: formatDateAdded(item.dateAdded),
    }),
  );

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    sortBy !== "newest";

  return {
    activeView,
    setActiveView,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    categories,
    filteredItems: itemsWithMetadata,
    hasActiveFilters,
    activeItemCount: activeItems.length,
    activeViewConfig: collectionViewConfig[activeView],
  };
};