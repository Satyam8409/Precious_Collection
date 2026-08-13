import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "./communitySlice";
import marketplaceCollectionReducer from "./marketplaceCollectionSlice";

export const store = configureStore({
  reducer: {
    community: communityReducer,
    marketplaceCollection: marketplaceCollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
