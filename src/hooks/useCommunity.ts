import { useEffect, useState } from "react";

export type CommunityPost = {
  id: string;
  user?: {
    name?: string;
    avatar?: string;
  };
  image?: string;
  caption?: string;
  category?: string;
  likes?: number;
  comments?: number;
};

const COMMUNITY_API_URL = "http://localhost:3000/community";
const COMMUNITY_FALLBACK_IMAGE ="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Cpath d='M220 380l95-115 85 98 62-72 118 139H220z' fill='%23cbd5e1'/%3E%3Ccircle cx='310' cy='235' r='36' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='87%25' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='%236b7280'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export const useCommunity = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCommunity = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(COMMUNITY_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load community data (${response.status})`);
        }

        const data: CommunityPost[] = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load community data.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCommunity();

    return () => controller.abort();
  }, []);

  return {
    posts,
    loading,
    error,
    fallbackImage: COMMUNITY_FALLBACK_IMAGE,
  };
};