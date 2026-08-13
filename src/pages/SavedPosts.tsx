import { useMemo } from "react";
import { CommunityEmpty } from "../components/community/CommunityEmpty";
import { CommunityError } from "../components/community/CommunityError";
import { CommunityGrid } from "../components/community/CommunityGrid";
import { CommunitySkeleton } from "../components/community/CommunitySkeleton";
import { useCommunity } from "../hooks/useCommunity";
import { useAppSelector } from "../store/hooks";

export const SavedPosts = () => {
  const { posts, loading, error, fallbackImage } = useCommunity();
  const savedPostIds = useAppSelector((state) => state.community.savedPostIds);

  const savedPosts = useMemo(() => {
    return posts.filter((post) => savedPostIds.includes(post.id));
  }, [posts, savedPostIds]);

  if (loading) {
    return <CommunitySkeleton />;
  }

  if (error) {
    return <CommunityError message={error} />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex w-fit rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Saved
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Your saved community posts
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-base-content/70 sm:text-base">
              Quickly access all the community posts you have bookmarked.
            </p>
          </div>
        </div>

        <div className="text-sm text-base-content/60">
          {savedPosts.length} saved post{savedPosts.length === 1 ? "" : "s"}
        </div>
      </div>

      {savedPosts.length === 0 ? (
        <CommunityEmpty
          title="No saved posts yet"
          description="Click the save button on any community post to keep track of it here."
        />
      ) : (
        <CommunityGrid posts={savedPosts} fallbackImage={fallbackImage} />
      )}
    </section>
  );
};
