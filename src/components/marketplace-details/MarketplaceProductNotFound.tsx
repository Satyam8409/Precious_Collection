import { Link } from "react-router-dom";

type MarketplaceProductNotFoundProps = {
  message?: string;
};

export const MarketplaceProductNotFound = ({
  message = "The marketplace item you requested does not exist or may have been removed.",
}: MarketplaceProductNotFoundProps) => {
  return (
    <section className="space-y-6">
      <Link to="/marketplace" className="btn btn-ghost btn-sm sm:btn-md">
        Back to Marketplace
      </Link>

      <div className="rounded-3xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-base-content">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-base-content/70">{message}</p>
      </div>
    </section>
  );
};
