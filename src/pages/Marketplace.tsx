import { useEffect, useState } from "react";
import { MarketplaceEmpty } from "../components/marketplace/MarketplaceEmpty";
import { MarketplaceError } from "../components/marketplace/MarketplaceError";
import { MarketplaceGrid } from "../components/marketplace/MarketplaceGrid";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";
import { MarketplaceSkeleton } from "../components/marketplace/MarketplaceSkeleton";

const MARKETPLACE_URL = "http://localhost:3000/marketplace";
const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Cpath d='M220 380l95-115 85 98 62-72 118 139H220z' fill='%23cbd5e1'/%3E%3Ccircle cx='310' cy='235' r='36' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='87%25' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='%236b7280'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export const Marketplace = () => {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const controller = new AbortController();

    const loadMarketplace = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(MARKETPLACE_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to load marketplace data (${response.status})`,
          );
        }

        const data: MarketplaceItem[] = await response.json();
        setItems(data);
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

  const formatPrice = (price?: number) => {
    return price !== undefined
      ? `₹${price.toLocaleString("en-IN")}`
      : "Price unavailable";
  };

  const handleImageError = (itemId: string) => {
    setFailedImages((current) => ({
      ...current,
      [itemId]: true,
    }));
  };

  if (loading) {
    return <MarketplaceSkeleton />;
  }

  if (error) {
    return <MarketplaceError message={error} />;
  }

  if (items.length === 0) {
    return <MarketplaceEmpty />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Marketplace
          </span>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Discover collectibles for sale
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-base-content/70 sm:text-base">
              Browse the current marketplace listings with pricing, seller, and
              location details in a clean responsive grid.
            </p>
          </div>
        </div>

        <div className="text-sm text-base-content/60">
          {items.length} listing{items.length === 1 ? "" : "s"} available
        </div>
      </div>

      <MarketplaceGrid
        items={items}
        failedImages={failedImages}
        fallbackImage={FALLBACK_IMAGE}
        onImageError={handleImageError}
        formatPrice={formatPrice}
      />
    </section>
  );
};
