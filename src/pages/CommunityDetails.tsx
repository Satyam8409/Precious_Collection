import { Link, useParams } from "react-router-dom";
import { CommunityError } from "../components/community/CommunityError";
import { CommunityDetailsSkeleton } from "../components/community/CommunityDetailsSkeleton";
import { CommunityPostDetails } from "../components/community/CommunityPostDetails";
import { CommunityPostNotFound } from "../components/community/CommunityPostNotFound";
import { useCommunity } from "../hooks/useCommunity";

export const CommunityDetails = () => {
  const { id } = useParams();
  const { posts, loading, error, fallbackImage } = useCommunity();
  const post = posts.find((item) => item.id === id);

  if (loading) return <CommunityDetailsSkeleton />;
  if (error) {
    return (
      <section className="space-y-6">
        <Link to="/community" className="btn btn-ghost btn-sm sm:btn-md">
          Back to Community
        </Link>
        <CommunityError message={error} />
      </section>
    );
  }
  if (!post) return <CommunityPostNotFound />;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link to="/community" className="btn btn-ghost btn-sm sm:btn-md">
          Back to Community
        </Link>
        <span className="text-sm text-base-content/60">Post details</span>
      </div>

      <CommunityPostDetails
        post={post}
        imageSource={post.image || fallbackImage}
      />
    </section>
  );
};
