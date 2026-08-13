type CommunityEmptyProps = {
  title?: string;
  description?: string;
};

export const CommunityEmpty = ({title = "No community posts found",description = "The community feed is currently empty"}: CommunityEmptyProps) => {
  return (
    <div className="rounded-3xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-base-content">{title}</h2>
      <p className="mt-2 text-sm text-base-content/70">{description}</p>
    </div>
  );
};