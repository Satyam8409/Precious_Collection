import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CommunityState = {
  likedPostIds: string[];
  savedPostIds: string[];
};

const initialState: CommunityState = {
  likedPostIds: [],
  savedPostIds: [],
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    toggleLikePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      if (state.likedPostIds.includes(postId)) {
        state.likedPostIds = state.likedPostIds.filter((id) => id !== postId);
      } 
      else {
        state.likedPostIds.push(postId);
      }
    },

    toggleSavePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      if (state.savedPostIds.includes(postId)) {
        state.savedPostIds = state.savedPostIds.filter((id) => id !== postId);
      } 
      else {
        state.savedPostIds.push(postId);
      }
    },
  },
});

export const { toggleLikePost, toggleSavePost } = communitySlice.actions;
export default communitySlice.reducer;