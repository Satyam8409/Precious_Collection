import { useEffect, useState } from "react";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";
import {MARKETPLACE_API_URL,formatMarketplacePrice,} from "../constants/marketplace";

export const useMarketplaceDetails = (id?: string) => {
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadItem = async () => {
      if (!id) {
        setItem(null);
        setNotFound(true);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        setItem(null);
        setImageFailed(false);

        const response = await fetch(`${MARKETPLACE_API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setNotFound(true);
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Failed to load product details (${response.status})`,
          );
        }

        const data: MarketplaceItem = await response.json();
        setItem(data);
      } 
      catch (fetchError) {
        if (fetchError instanceof DOMException &&fetchError.name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load product details.",
        );
      } 
      finally {
        setLoading(false);
      }
    };

    loadItem();

    return () => controller.abort();
  }, [id]);

  const handleImageError = () => {
    setImageFailed(true);
  };

  return {
    item,
    loading,
    error,
    notFound,
    imageFailed,
    handleImageError,
    formatPrice: formatMarketplacePrice,
  };
};
