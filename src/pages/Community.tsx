import { CommunityEmpty } from "../components/community/CommunityEmpty";
import { CommunityError } from "../components/community/CommunityError";
import { CommunityFilters } from "../components/community/CommunityFilters";
import { CommunityGrid } from "../components/community/CommunityGrid";
import { CommunitySkeleton } from "../components/community/CommunitySkeleton";
import { useCommunity } from "../hooks/useCommunity";

export const Community = () => {
  const {
    filteredPosts,
    loading,
    error,
    fallbackImage,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    categories,
    hasActiveFilters,
  } = useCommunity();

  if (loading) {
    return <CommunitySkeleton />;
  }

  if (error) {
    return <CommunityError message={error} />;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Community Feed
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
          Discover collectibles shared by the community
        </h1>
        <p className="max-w-2xl text-sm text-base-content/70 sm:text-base">
          Browse user posts, see what others are collecting, and explore the
          latest shared finds.
        </p>
      </div>

      <CommunityFilters
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {filteredPosts.length === 0 ? (
        <CommunityEmpty
          title={hasActiveFilters ? "No matching posts found" : undefined}
          description={
            hasActiveFilters
              ? "No community posts match the current search or category filter."
              : undefined
          }
        />
      ) 
      : (
        <CommunityGrid posts={filteredPosts} fallbackImage={fallbackImage} />
      )}
    </section>
  );
};
