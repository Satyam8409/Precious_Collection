import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type MarketplaceItem } from "../components/marketplace/MarketplaceCard";

type CollectionKey = "collectionItems" | "wishlistItems" | "sellingItems";

type MarketplaceCollectionState = {
  collectionItems: MarketplaceItem[];
  wishlistItems: MarketplaceItem[];
  sellingItems: MarketplaceItem[];
};

const initialState: MarketplaceCollectionState = {
  collectionItems: [],
  wishlistItems: [],
  sellingItems: [],
};

const getCollectionItems = (
  state: MarketplaceCollectionState,
  collectionKey: CollectionKey,
) => {
  return state[collectionKey];
};

const addItemToCollectionList = (
  state: MarketplaceCollectionState,
  collectionKey: CollectionKey,
  item: MarketplaceItem,
) => {
  const collectionItems = getCollectionItems(state, collectionKey);
  const exists = collectionItems.some((existingItem) => existingItem.id === item.id);

  if (!exists) {
    collectionItems.push(item);
  }
};

const removeItemFromCollectionList = (
  state: MarketplaceCollectionState,
  collectionKey: CollectionKey,
  itemId: string,
) => {
  const collectionItems = getCollectionItems(state, collectionKey);

  state[collectionKey] = collectionItems.filter((item) => item.id !== itemId);
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
      addItemToCollectionList(state, "wishlistItems", action.payload);
    },

    addItemToSelling: (
      state,
      action: PayloadAction<MarketplaceItem>,
    ) => {
      addItemToCollectionList(state, "sellingItems", action.payload);
    },

    removeItemFromCollection: (
      state,
      action: PayloadAction<string>,
    ) => {
      removeItemFromCollectionList(state, "collectionItems", action.payload);
    },

    removeItemFromWishlist: (
      state,
      action: PayloadAction<string>,
    ) => {
      removeItemFromCollectionList(state, "wishlistItems", action.payload);
    },

    removeItemFromSelling: (
      state,
      action: PayloadAction<string>,
    ) => {
      removeItemFromCollectionList(state, "sellingItems", action.payload);
    },

    moveItemBetweenCollections: (
      state,
      action: PayloadAction<{
        item: MarketplaceItem;
        from: CollectionKey;
        to: CollectionKey;
      }>,
    ) => {
      const { item, from, to } = action.payload;

      if (from === to) {
        return;
      }

      removeItemFromCollectionList(state, from, item.id);
      addItemToCollectionList(state, to, item);
    },
  },
});

export const {
  addItemToCollection,
  addItemToWishlist,
  addItemToSelling,
  removeItemFromCollection,
  removeItemFromWishlist,
  removeItemFromSelling,
  moveItemBetweenCollections,
} = marketplaceCollectionSlice.actions;

export default marketplaceCollectionSlice.reducer;