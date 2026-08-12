type MarketplaceErrorProps = {
  message: string;
};

export const MarketplaceError = ({ message }: MarketplaceErrorProps) => {
  return (
    <div className="rounded-2xl border border-error/20 bg-error/10 p-6 text-error-content">
      <h2 className="text-lg font-semibold">Unable to load marketplace</h2>
      <p className="mt-2 text-sm leading-6 opacity-90">{message}</p>
    </div>
  );
};
