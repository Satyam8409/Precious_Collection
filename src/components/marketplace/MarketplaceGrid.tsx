import { MarketplaceCard, type MarketplaceItem } from "./MarketplaceCard";

type MarketplaceGridProps = {
  items: MarketplaceItem[];
  failedImages: Record<string, boolean>;
  fallbackImage: string;
  onImageError: (itemId: string) => void;
  formatPrice: (price?: number) => string;
};

export const MarketplaceGrid = ({
  items,
  failedImages,
  fallbackImage,
  onImageError,
  formatPrice,
}: MarketplaceGridProps) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item) => {
        const imageSource = failedImages[item.id]
          ? fallbackImage
          : item.image || fallbackImage;

        return (
          <MarketplaceCard
            key={item.id}
            item={item}
            imageSource={imageSource}
            onImageError={onImageError}
            formatPrice={formatPrice}
          />
        );
      })}
    </div>
  );
};
