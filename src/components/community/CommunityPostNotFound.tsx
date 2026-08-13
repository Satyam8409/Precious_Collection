import { Link } from "react-router-dom";

export const CommunityPostNotFound = () => {
  return (
    <section className="space-y-6">
      <Link to="/community" className="btn btn-ghost btn-sm sm:btn-md">
        Back to Community
      </Link>
      <div className="rounded-3xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-base-content">Post not found</h1>
        <p className="mt-2 text-sm text-base-content/70">
          The community post you requested is not available.
        </p>
      </div>
    </section>
  );
};