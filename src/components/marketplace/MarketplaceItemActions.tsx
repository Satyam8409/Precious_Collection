import { useState } from "react";
import { type MarketplaceItem } from "./MarketplaceCard";
import {addItemToCollection,addItemToWishlist} from "../../store/marketplaceCollectionSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type MarketplaceItemActionsProps = {
  item: MarketplaceItem;
};

export const MarketplaceItemActions = ({ item }: MarketplaceItemActionsProps) => {
  const dispatch = useAppDispatch();
  const isInCollection = useAppSelector((state) =>
  state.marketplaceCollection.collectionItems.some(
    (collectionItem) => collectionItem.id === item.id,
  ),
);

const isInWishlist = useAppSelector((state) =>
  state.marketplaceCollection.wishlistItems.some(
    (wishlistItem) => wishlistItem.id === item.id,
  ),
);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleCollectionClick = () => {
    if (isInCollection) {
      setFeedbackMessage("Already in Collection");
      return;
    }

    dispatch(addItemToCollection(item));
    setFeedbackMessage("Added to Collection");
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      setFeedbackMessage("Already in Wishlist");
      return;
    }

    dispatch(addItemToWishlist(item));
    setFeedbackMessage("Added to Wishlist");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className={`btn btn-sm flex-1 ${isInCollection ? "btn-success btn-outline" : "btn-primary"}`}
          onClick={handleCollectionClick}
        >
          {isInCollection ? "In Collection" : "Add to Collection"}
        </button>
        <button
          type="button"
          className={`btn btn-sm flex-1 ${isInWishlist ? "btn-warning btn-outline" : "btn-secondary"}`}
          onClick={handleWishlistClick}
        >
          {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      <p className="min-h-5 text-sm text-base-content/60">{feedbackMessage}</p>
    </div>
  );
};
