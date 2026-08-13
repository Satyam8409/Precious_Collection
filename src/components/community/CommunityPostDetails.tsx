import { type CommunityPost } from "../../hooks/useCommunity";
import { useCommunityPostInteractions } from "../../hooks/useCommunityPostInteractions";
import { CommunityPostActions } from "./CommunityPostActions";

type CommunityPostDetailsProps = {
  post: CommunityPost;
  imageSource: string;
};

export const CommunityPostDetails = ({ post, imageSource }: CommunityPostDetailsProps) => {
  const { isLiked, isSaved, displayLikes, handleLike, handleSave } = useCommunityPostInteractions(post.id, post.likes);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <figure className="overflow-hidden rounded-3xl bg-base-200 shadow-sm ring-1 ring-base-200">
        <img src={imageSource} alt={post.caption ?? "Community post"} className="h-full w-full object-cover" />
      </figure>

      <div className="rounded-3xl bg-base-100 p-6 shadow-sm ring-1 ring-base-200 sm:p-8">
        <div className="flex items-center gap-3">
          <img src={post.user?.avatar ?? imageSource} alt={post.user?.name ?? "Community user"} className="h-12 w-12 rounded-full object-cover ring-2 ring-base-200" />
          <div>
            <h1 className="text-2xl font-bold text-base-content">{post.user?.name ?? "Community member"}</h1>
            <p className="text-sm text-base-content/60">{post.category ?? "Uncategorized"}</p>
          </div>
        </div>

        <p className="mt-6 text-base leading-7 text-base-content/80">{post.caption ?? "No caption available."}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="badge badge-primary badge-outline">{displayLikes} likes</span>
          <span className="badge badge-secondary badge-outline">{post.comments ?? 0} comments</span>
        </div>

        <div className="mt-6">
          <CommunityPostActions isLiked={isLiked} isSaved={isSaved} onLike={handleLike} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};