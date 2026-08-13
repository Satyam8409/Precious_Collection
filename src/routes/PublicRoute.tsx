import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Marketplace } from "../pages/Marketplace";
import { MarketplaceSkeleton } from "../components/marketplace/MarketplaceSkeleton";
import { MarketplaceDetailsSkeleton } from "../components/marketplace-details/MarketplaceDetailsSkeleton";
import { CommunitySkeleton } from "../components/community/CommunitySkeleton";
import { CommunityDetailsSkeleton } from "../components/community/CommunityDetailsSkeleton";

const MarketplaceDetails = lazy(() =>
  import("../pages/MarketplaceDetails").then((module) => ({ default: module.MarketplaceDetails }))
);
const Community = lazy(() =>
  import("../pages/Community").then((module) => ({ default: module.Community }))
);
const CommunityDetails = lazy(() =>
  import("../pages/CommunityDetails").then((module) => ({ default: module.CommunityDetails }))
);
const Collection = lazy(() =>
  import("../pages/Collection").then((module) => ({ default: module.Collection }))
);
const SavedPosts = lazy(() =>
  import("../pages/SavedPosts").then((module) => ({ default: module.SavedPosts }))
);

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/marketplace" replace />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route
        path="/marketplace/:id"
        element={
          <Suspense fallback={<MarketplaceDetailsSkeleton />}>
            <MarketplaceDetails />
          </Suspense>
        }
      />
      <Route
        path="/community"
        element={
          <Suspense fallback={<CommunitySkeleton />}>
            <Community />
          </Suspense>
        }
      />
      <Route
        path="/community/:id"
        element={
          <Suspense fallback={<CommunityDetailsSkeleton />}>
            <CommunityDetails />
          </Suspense>
        }
      />
      <Route
        path="/collection"
        element={
          <Suspense fallback={<MarketplaceSkeleton />}>
            <Collection />
          </Suspense>
        }
      />
      <Route
        path="/saved"
        element={
          <Suspense fallback={<CommunitySkeleton />}>
            <SavedPosts />
          </Suspense>
        }
      />
    </Routes>
  );
};
