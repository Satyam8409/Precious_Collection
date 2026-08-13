import { Link, useParams } from "react-router-dom";
import { MarketplaceError } from "../components/marketplace/MarketplaceError";
import { MarketplaceDetailsSkeleton } from "../components/marketplace-details/MarketplaceDetailsSkeleton";
import { MarketplaceProductDetails } from "../components/marketplace-details/MarketplaceProductDetails";
import { MarketplaceProductNotFound } from "../components/marketplace-details/MarketplaceProductNotFound";
import { MARKETPLACE_FALLBACK_IMAGE } from "../constants/marketplace";
import { useMarketplaceDetails } from "../hooks/useMarketplaceDetails";

export const MarketplaceDetails = () => {
  const { id } = useParams();
  const {
    item,
    loading,
    error,
    notFound,
    imageFailed,
    handleImageError,
    formatPrice,
  } = useMarketplaceDetails(id);

  if (loading) {
    return <MarketplaceDetailsSkeleton />;
  }

  if (error) {
    return (
      <section className="space-y-6">
        <Link to="/marketplace" className="btn btn-ghost btn-sm sm:btn-md">
          Back to Marketplace
        </Link>
        <MarketplaceError message={error} />
      </section>
    );
  }

  if (notFound) {
    return <MarketplaceProductNotFound />;
  }

  if (!item) {
    return null;
  }

  const imageSource = imageFailed
    ? MARKETPLACE_FALLBACK_IMAGE
    : item.image || MARKETPLACE_FALLBACK_IMAGE;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link to="/marketplace" className="btn btn-ghost btn-sm sm:btn-md">
          Back to Marketplace
        </Link>
        <span className="text-sm text-base-content/60">Product details</span>
      </div>

      <MarketplaceProductDetails
        item={item}
        imageSource={imageSource}
        onImageError={handleImageError}
        formatPrice={formatPrice}
      />
    </section>
  );
};
