type CommunityFiltersProps = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
};

export const CommunityFilters = ({searchText,onSearchTextChange,selectedCategory,onCategoryChange,categories}: CommunityFiltersProps) => {
  return (
    <div className="rounded-3xl bg-base-100 p-5 shadow-sm ring-1 ring-base-200 sm:p-6">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="form-control">
          <span className="label-text mb-1 text-xs font-semibold uppercase tracking-wider text-base-content/70">
            Search caption
          </span>
          <input
            type="text"
            placeholder="Search posts"
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
      </div>
    </div>
  );
};