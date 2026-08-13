import { useEffect, useState } from "react";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";
import {
  MARKETPLACE_API_URL,
  formatMarketplacePrice,
} from "../constants/marketplace";

const EMPTY_IMAGE_STATE: Record<string, boolean> = {};

export type MarketplaceSortOption =
  | "newest"
  | "price-low-high"
  | "price-high-low";

export const useMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] =
    useState<Record<string, boolean>>(EMPTY_IMAGE_STATE);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState<MarketplaceSortOption>("newest");

  useEffect(() => {
    const controller = new AbortController();

    const loadMarketplace = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(MARKETPLACE_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to load marketplace data (${response.status})`,
          );
        }

        const data: MarketplaceItem[] = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load marketplace data.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMarketplace();

    return () => controller.abort();
  }, []);

  const categories = Array.from(
    new Set(items.map((item) => item.category ?? "Uncategorized")),
  ).sort();

  const conditions = Array.from(
    new Set(items.map((item) => item.condition ?? "Condition unavailable")),
  ).sort();

  const search = searchText.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const title = item.title?.toLowerCase() ?? "";
    const category = item.category ?? "Uncategorized";
    const condition = item.condition ?? "Condition unavailable";

    const matchesSearch = title.includes(search);

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    const matchesCondition =
      selectedCondition === "all" || condition === selectedCondition;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return (a.price ?? Infinity) - (b.price ?? Infinity);
    }

    if (sortBy === "price-high-low") {
      return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    }

    // Newest
    return b.id.localeCompare(a.id);
  });

  const isFiltering =
    search.length > 0 ||
    selectedCategory !== "all" ||
    selectedCondition !== "all";

  const handleImageError = (itemId: string) => {
    setFailedImages((current) => ({
      ...current,
      [itemId]: true,
    }));
  };

  return {
    items,
    loading,
    error,
    failedImages,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    sortBy,
    setSortBy,
    categories,
    conditions,
    sortedItems,
    isFiltering,
    formatPrice: formatMarketplacePrice,
    handleImageError,
  };
};
