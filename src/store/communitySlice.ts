import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const SAVED_POSTS_STORAGE_KEY = "precious_collection_saved_posts";

const loadSavedPostIdsFromStorage = (): string[] => {
  try {
    const item = localStorage.getItem(SAVED_POSTS_STORAGE_KEY);
    if (!item) return [];
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

type CommunityState = {
  likedPostIds: string[];
  savedPostIds: string[];
};

const initialState: CommunityState = {
  likedPostIds: [],
  savedPostIds: loadSavedPostIdsFromStorage(),
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    toggleLikePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      if (state.likedPostIds.includes(postId)) {
        state.likedPostIds = state.likedPostIds.filter((id) => id !== postId);
      } else {
        state.likedPostIds.push(postId);
      }
    },

    toggleSavePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      if (state.savedPostIds.includes(postId)) {
        state.savedPostIds = state.savedPostIds.filter((id) => id !== postId);
      } else {
        state.savedPostIds.push(postId);
      }

      try {
        localStorage.setItem(SAVED_POSTS_STORAGE_KEY, JSON.stringify(state.savedPostIds));
      } catch {
        // ignore quota/storage errors
      }
    },
  },
});

export const { toggleLikePost, toggleSavePost } = communitySlice.actions;
export default communitySlice.reducer;