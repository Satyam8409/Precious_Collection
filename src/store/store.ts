import { configureStore } from "@reduxjs/toolkit";
import marketplaceCollectionReducer from "./marketplaceCollectionSlice";

export const store = configureStore({
  reducer: {
    marketplaceCollection: marketplaceCollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
