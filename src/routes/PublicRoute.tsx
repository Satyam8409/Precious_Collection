import { Navigate, Route, Routes } from "react-router";
import { Marketplace } from "../pages/Marketplace";
import { Community } from "../pages/Community";
import { Collection } from "../pages/Collection";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/marketplace" replace />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/community" element={<Community />} />
      <Route path="/collection" element={<Collection />} />
    </Routes>
  );
};
