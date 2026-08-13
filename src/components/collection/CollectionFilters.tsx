import { type CollectionSortOption } from "../../hooks/useCollection";

type CollectionFiltersProps = {
  activeViewTitle: string;
  searchText: string;
  onSearchTextChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  sortBy: CollectionSortOption;
  onSortChange: (value: CollectionSortOption) => void;
};

export const CollectionFilters = ({activeViewTitle,searchText,onSearchTextChange,selectedCategory,onCategoryChange,categories,sortBy,onSortChange}: CollectionFiltersProps) => {
  return (
    <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
      <label className="form-control">
        <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
          Search title
        </span>
        <input
          type="text"
          placeholder={`Search ${activeViewTitle.toLowerCase()}`}
          className="input input-bordered w-full"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </label>

      <label className="form-control">
        <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
          Category
        </span>
        <select
          className="select select-bordered w-full"
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
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
          Sort
        </span>
        <select
          className="select select-bordered w-full"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as CollectionSortOption)}
        >
          <option value="newest">Newest</option>
          <option value="value-high-low">Value: High to Low</option>
          <option value="value-low-high">Value: Low to High</option>
        </select>
      </label>
    </div>
  );
};