"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Story } from "../types/Story";
import { fetchTopStories, fetchItems } from "../services/firebase";

interface StoriesContextProps {
  stories: Story[];
  loading: boolean;
  error: string | null;
  loadMoreStories: () => void;
}

const StoriesContext = createContext<StoriesContextProps | undefined>(
  undefined
);

export const StoriesProvider = ({ children }: { children: ReactNode }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const limitStoriesId = 5;

  const previousStoriesIdRef = useRef<number[]>([]);

  const fetchStories = async (pageNumber: number) => {
    try {
      setLoading(true);
      const limit = pageNumber * limitStoriesId;
      const storiesId = await fetchTopStories(limit);
      if (
        JSON.stringify(storiesId) ===
        JSON.stringify(previousStoriesIdRef.current)
      ) {
        setLoading(false);
        return;
      }

      previousStoriesIdRef.current = storiesId;

      const storyIdsToFetch = storiesId.slice(
        (pageNumber - 1) * limitStoriesId,
        pageNumber * limitStoriesId
      );

      const storiesData: Story[] = await fetchItems(storyIdsToFetch);

      setStories((prevStories) => [...prevStories, ...storiesData]);
    } catch (err) {
      setError("Failed to load stories");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreStories = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  return (
    <StoriesContext.Provider
      value={{
        stories,
        loading,
        error,
        loadMoreStories,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};

export const useStoriesContext = () => {
  const context = useContext(StoriesContext);
  if (context === undefined) {
    throw new Error("useStoriesContext must be used within a StoriesProvider");
  }
  return context;
};
