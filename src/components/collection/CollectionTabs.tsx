import { type CollectionView } from "../../hooks/useCollection";

type CollectionTab = {
  view: CollectionView;
  label: string;
};

type CollectionTabsProps = {
  activeView: CollectionView;
  collectionViews: CollectionTab[];
  onSelectView: (view: CollectionView) => void;
};

export const CollectionTabs = ({ activeView, collectionViews, onSelectView }: CollectionTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {collectionViews.map(({ view, label }) => {
        const isActive = activeView === view;

        return (
          <button
            key={view}
            type="button"
            className={`btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"}`}
            onClick={() => onSelectView(view)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};