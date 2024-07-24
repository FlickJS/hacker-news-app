"use client";

import { useState, useEffect } from "react";
import Placeholder from "./_components/_layout/Placeholder";
import Hero from "./_components/_layout/Hero";
import Button from "./_components/_layout/Button";
import { useStoriesContext } from "./_context/StoriesContext";
import Story from "./_components/_story/Story";

const Home = () => {
  const { stories, loading, error, loadMoreStories } = useStoriesContext();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="container mx-auto p-4 pb-16">
      <Hero />
      {error && <p className="text-red-700">{error}</p>}
      {loading || !showContent ? (
        <ul>
          {[...Array(5)].map((_, i) => (
            <li key={i} className="w-full">
              <Placeholder />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {stories.map((story) => (
            <Story key={story.id} story={story} />
          ))}
          <div className="mt-8 text-center">
            <Button onClick={loadMoreStories}>Load more stories</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
