"use client";

import { useParams } from "next/navigation";
import Navigation from "../../_components/_layout/Navigation";
import Button from "../../_components/_layout/Button";
import Placeholder from "../../_components/_layout/Placeholder";
import StoryDetails from "../../_components/_story/StoryDetails";
import Comment from "../../_components/_story/Comment";
import { useStory } from "./useStory";
import { useStoriesContext } from "../../_context/StoriesContext";

const StoryPage = () => {
  const { id } = useParams();
  const { stories } = useStoriesContext();
  const story = stories.find((s) => s.id === parseInt(id as string));

  const storyKids = (story?.kids ?? []) as unknown as string[];

  const {
    comments,
    loading,
    error,
    visibleCount,
    allLoaded,
    handleLoadMoreComments,
  } = useStory(storyKids);

  if (!story) {
    return <div>Story not found</div>;
  }
  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Hacker news {story.id}</h2>
        <StoryDetails
          title={story.title}
          text={story.text}
          by={story.by}
          score={story.score}
          url={story.url}
        />
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {loading && !error && (
            <ul>
              {[...Array(5)].map((_, i) => (
                <li key={i} className="w-full">
                  <Placeholder uniqueKey={`placeholder-${i}`} />
                </li>
              ))}
            </ul>
          )}
          {error && <p className="text-red-700">{error}</p>}
          {!loading && !error && comments.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-4">
              <p className="text-gray-700 text-lg">No comments available.</p>
            </div>
          )}
          <ul data-testid="comments-list">
            {comments.slice(0, visibleCount).map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
          {comments.length > 0 && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMoreComments} disabled={allLoaded}>
                {allLoaded ? "All Comments Loaded" : "Load More Comments"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
