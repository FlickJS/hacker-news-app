"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Story } from "../_types/Story";

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
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=${
          pageNumber * limitStoriesId
        }`
      );
      const storiesId = await response.json();
      if (
        JSON.stringify(storiesId) ===
        JSON.stringify(previousStoriesIdRef.current)
      ) {
        setLoading(false);
        return;
      }

      previousStoriesIdRef.current = storiesId;

      const storyPromises = storiesId
        .slice((pageNumber - 1) * limitStoriesId, pageNumber * limitStoriesId)
        .map(async (id: number) => {
          const storyDetail = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          const story = await storyDetail.json();
          return story;
        });

      const storiesData: Story[] = (await Promise.all(storyPromises)).filter(
        (story) => story !== null
      );
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
