import { Navigate, Route, Routes } from "react-router-dom";
import { Marketplace } from "../pages/Marketplace";
import { MarketplaceDetails } from "../pages/MarketplaceDetails";
import { Community } from "../pages/Community";
import { CommunityDetails } from "../pages/CommunityDetails";
import { Collection } from "../pages/Collection";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/marketplace" replace />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/:id" element={<MarketplaceDetails />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/:id" element={<CommunityDetails />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
  );
};
