import { MarketplaceEmpty } from "../components/marketplace/MarketplaceEmpty";
import { MarketplaceError } from "../components/marketplace/MarketplaceError";
import { MarketplaceGrid } from "../components/marketplace/MarketplaceGrid";
import { MarketplaceSkeleton } from "../components/marketplace/MarketplaceSkeleton";
import { useMarketplace } from "../hooks/useMarketplace";
const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Cpath d='M220 380l95-115 85 98 62-72 118 139H220z' fill='%23cbd5e1'/%3E%3Ccircle cx='310' cy='235' r='36' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='87%25' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='%236b7280'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export const Marketplace = () => {
  const {
    items,
    loading,
    error,
    failedImages,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    sortBy,
    setSortBy,
    categories,
    conditions,
    sortedItems,
    isFiltering,
    formatPrice,
    handleImageError,
  } = useMarketplace();

  if (loading) {
    return <MarketplaceSkeleton />;
  }

  if (error) {
    return <MarketplaceError message={error} />;
  }

  if (items.length === 0) {
    return <MarketplaceEmpty />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Marketplace
          </span>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Discover collectibles for sale
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-base-content/70 sm:text-base">
              Browse the current marketplace listings with pricing, seller, and
              location details in a clean responsive grid.
            </p>
          </div>
        </div>

          <div className="text-sm text-base-content/60">
            {sortedItems.length} listing
            {sortedItems.length === 1 ? "" : "s"} shown
          </div>
      </div>

      <div className="rounded-2xl bg-base-100 p-4 shadow-sm ring-1 ring-base-200">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="form-control">
            <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Search title
            </span>
            <input
              type="text"
              placeholder="Search collectibles"
              className="input input-bordered w-full"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>

          <label className="form-control">
            <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Category
            </span>
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Condition
            </span>
            <select
              className="select select-bordered w-full"
              value={selectedCondition}
              onChange={(event) => setSelectedCondition(event.target.value)}
            >
              <option value="all">All conditions</option>
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Sort
            </span>
            <select
              className="select select-bordered w-full"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
            >
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <MarketplaceEmpty
          title={
            searchText.trim().length > 0
              ? "No search results"
              : "No filtered results"
          }
            description={
              searchText.trim().length > 0
                ? `No listing title matches \"${searchText.trim()}\".`
                : "No listings match the selected category and condition."
            }
        />
      ) : (
        <MarketplaceGrid
          items={sortedItems}
          failedImages={failedImages}
          fallbackImage={FALLBACK_IMAGE}
          onImageError={handleImageError}
          formatPrice={formatPrice}
        />
      )}

      {isFiltering && sortedItems.length > 0 && (
        <p className="text-sm text-base-content/60">
          Filters applied to {items.length} total listing
          {items.length === 1 ? "" : "s"}.
        </p>
      )}
    </section>
  );
};
