type CommunityPostActionsProps = {
  isLiked: boolean;
  isSaved: boolean;
  onLike: () => void;
  onSave: () => void;
};

export const CommunityPostActions = ({ isLiked, isSaved, onLike, onSave }: CommunityPostActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className={`btn btn-sm ${isLiked ? "btn-primary" : "btn-outline btn-primary"}`} onClick={onLike}>
        {isLiked ? "Liked" : "Like"}
      </button>
      <button type="button" className={`btn btn-sm ${isSaved ? "btn-secondary" : "btn-outline btn-secondary"}`} onClick={onSave}>
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};