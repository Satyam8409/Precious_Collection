import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

export type CommunityFilterOption = string;

const COMMUNITY_API_URL = "https://precious-collection-8ll4.onrender.com/community";
const COMMUNITY_FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Cpath d='M220 380l95-115 85 98 62-72 118 139H220z' fill='%23cbd5e1'/%3E%3Ccircle cx='310' cy='235' r='36' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='87%25' text-anchor='middle' font-family='Arial, sans-serif' font-size='28' fill='%236b7280'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export const useCommunity = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get("search") ?? "";
  const selectedCategory = searchParams.get("category") ?? "all";

  const updateParam = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === defaultValue) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const setSearchText = (val: string) => updateParam("search", val, "");
  const setSelectedCategory = (val: string) => updateParam("category", val, "all");

  useEffect(() => {
    const controller = new AbortController();

    const loadCommunity = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(COMMUNITY_API_URL, { signal: controller.signal });
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

  const categories = useMemo(() => {
    return Array.from(
      new Set(posts.map((post) => post.category ?? "Uncategorized")),
    ).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return posts.filter((post) => {
      const caption = post.caption?.toLowerCase() ?? "";
      const category = post.category ?? "Uncategorized";

      const matchesSearch = caption.includes(search);
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchText, selectedCategory]);

  const hasActiveFilters =
    searchText.trim().length > 0 || selectedCategory !== "all";

  return {
    posts,
    filteredPosts,
    loading,
    error,
    fallbackImage: COMMUNITY_FALLBACK_IMAGE,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    categories,
    hasActiveFilters,
  };
};