import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleLikePost, toggleSavePost } from "../store/communitySlice";

export const useCommunityPostInteractions = (postId: string, likes?: number) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.community.likedPostIds.includes(postId));
  const isSaved = useAppSelector((state) => state.community.savedPostIds.includes(postId));
  const displayLikes = (likes ?? 0) + (isLiked ? 1 : 0);

  const handleLike = () => dispatch(toggleLikePost(postId));
  const handleSave = () => dispatch(toggleSavePost(postId));

  return { isLiked, isSaved, displayLikes, handleLike, handleSave };
};