import { type CommunityPost } from "../../hooks/useCommunity";

type CommunityCardProps = {
  post: CommunityPost;
  imageSource: string;
};

export const CommunityCard = ({ post, imageSource }: CommunityCardProps) => {
  return (
    <article className="overflow-hidden rounded-3xl bg-base-100 shadow-sm ring-1 ring-base-200 transition-shadow duration-200 hover:-translate-y-1 hover:shadow-md">
      <figure className="relative aspect-[4/3] bg-base-200">
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
            {post.likes ?? 0} likes
          </span>
          <span className="badge badge-secondary badge-outline">
            {post.comments ?? 0} comments
          </span>
        </div>
      </div>
    </article>
  );
};