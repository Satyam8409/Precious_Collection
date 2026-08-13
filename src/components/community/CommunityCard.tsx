import { Link } from "react-router-dom";
import { type CommunityPost } from "../../hooks/useCommunity";
import { useCommunityPostInteractions } from "../../hooks/useCommunityPostInteractions";
import { CommunityPostActions } from "./CommunityPostActions";

type CommunityCardProps = {
  post: CommunityPost;
  imageSource: string;
};

export const CommunityCard = ({ post, imageSource }: CommunityCardProps) => {
  const {
    isLiked,
    isSaved,
    displayLikes,
    handleLike,
    handleSave,
  } = useCommunityPostInteractions(post.id, post.likes);

  return (
    <article className="overflow-hidden rounded-3xl bg-base-100 shadow-sm ring-1 ring-base-200 transition-shadow duration-200 hover:-translate-y-1 hover:shadow-md">
      <Link to={`/community/${post.id}`} className="block">
        <figure className="relative aspect-4/3 bg-base-200">
          <img
            src={imageSource}
            alt={post.caption ?? "Community post"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </figure>

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <img
              src={post.user?.avatar ?? imageSource}
              alt={post.user?.name ?? "Community user"}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-base-200"
              loading="lazy"
            />

            <div>
              <h2 className="font-semibold text-base-content">
                {post.user?.name ?? "Community member"}
              </h2>
              <p className="text-sm text-base-content/60">
                {post.category ?? "Uncategorized"}
              </p>
            </div>
          </div>

          <p className="text-sm leading-6 text-base-content/80">
            {post.caption ?? "No caption available."}
          </p>

          <div className="flex items-center gap-3 text-sm text-base-content/60">
            <span className="badge badge-primary badge-outline">
              {displayLikes} likes
            </span>
            <span className="badge badge-secondary badge-outline">
              {post.comments ?? 0} comments
            </span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <CommunityPostActions
          isLiked={isLiked}
          isSaved={isSaved}
          onLike={handleLike}
          onSave={handleSave}
        />
      </div>
    </article>
  );
};