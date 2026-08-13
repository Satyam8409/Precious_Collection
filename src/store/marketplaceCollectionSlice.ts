import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";

type MarketplaceCollectionState = {
  collectionItems: MarketplaceItem[];
  wishlistItems: MarketplaceItem[];
};

const initialState: MarketplaceCollectionState = {
  collectionItems: [],
  wishlistItems: [],
};

const marketplaceCollectionSlice = createSlice({
  name: "marketplaceCollection",
  initialState,
  reducers: {
    addItemToCollection: (
      state,
      action: PayloadAction<MarketplaceItem>,
    ) => {
      const exists = state.collectionItems.some(
        (item) => item.id === action.payload.id,
      );

      if (!exists) {
        state.collectionItems.push(action.payload);
      }
    },

    addItemToWishlist: (
      state,
      action: PayloadAction<MarketplaceItem>,
    ) => {
      const exists = state.wishlistItems.some(
        (item) => item.id === action.payload.id,
      );

      if (!exists) {
        state.wishlistItems.push(action.payload);
      }
    },

    removeItemFromCollection: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.collectionItems = state.collectionItems.filter(
        (item) => item.id !== action.payload,
      );
    },

    removeItemFromWishlist: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  addItemToCollection,
  addItemToWishlist,
  removeItemFromCollection,
  removeItemFromWishlist,
} = marketplaceCollectionSlice.actions;

export default marketplaceCollectionSlice.reducer;