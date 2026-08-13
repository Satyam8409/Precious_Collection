type CommunityErrorProps = {
  message: string;
};

export const CommunityError = ({ message }: CommunityErrorProps) => {
  return (
    <div className="rounded-3xl border border-error/20 bg-error/10 p-6 text-error-content">
      <h2 className="text-lg font-semibold">Unable to load community feed</h2>
      <p className="mt-2 text-sm leading-6 opacity-90">{message}</p>
    </div>
  );
};