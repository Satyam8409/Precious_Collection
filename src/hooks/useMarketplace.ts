import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";
import { MARKETPLACE_API_URL, formatMarketplacePrice } from "../constants/marketplace";

const EMPTY_IMAGE_STATE: Record<string, boolean> = {};

export type MarketplaceSortOption = "newest" | "price-low-high" | "price-high-low";

export const useMarketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>(EMPTY_IMAGE_STATE);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("search") ?? "";
  const selectedCategory = searchParams.get("category") ?? "all";
  const selectedCondition = searchParams.get("condition") ?? "all";

  const sortParam = searchParams.get("sort");
  const sortBy: MarketplaceSortOption =
    sortParam === "price-low-high" || sortParam === "price-high-low" ? sortParam : "newest";

  const updateParam = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const setSearchText = (val: string) => updateParam("search", val, "");
  const setSelectedCategory = (val: string) => updateParam("category", val, "all");
  const setSelectedCondition = (val: string) => updateParam("condition", val, "all");
  const setSortBy = (val: MarketplaceSortOption) => updateParam("sort", val, "newest");

  useEffect(() => {
    const controller = new AbortController();
    const loadMarketplace = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(MARKETPLACE_API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error(`Failed to load marketplace data (${response.status})`);
        const data: MarketplaceItem[] = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") return;
        setError(fetchError instanceof Error ? fetchError.message : "Unable to load marketplace data.");
      } finally {
        setLoading(false);
      }
    };

    loadMarketplace();
    return () => controller.abort();
  }, []);

  const categories = Array.from(new Set(items.map((item) => item.category ?? "Uncategorized"))).sort();
  const conditions = Array.from(new Set(items.map((item) => item.condition ?? "Condition unavailable"))).sort();
  const search = searchText.trim().toLowerCase();

  const filteredItems = items.filter((item) => {
    const title = item.title?.toLowerCase() ?? "";
    const category = item.category ?? "Uncategorized";
    const condition = item.condition ?? "Condition unavailable";
    return title.includes(search) && (selectedCategory === "all" || category === selectedCategory) && (selectedCondition === "all" || condition === selectedCondition);
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low-high") return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sortBy === "price-high-low") return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    return b.id.localeCompare(a.id);
  });

  const isFiltering = search.length > 0 || selectedCategory !== "all" || selectedCondition !== "all";

  const handleImageError = (itemId: string) => {
    setFailedImages((current) => ({ ...current, [itemId]: true }));
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
