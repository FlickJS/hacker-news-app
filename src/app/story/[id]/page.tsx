"use client";

import { useParams } from "next/navigation";
import Navigation from "../../../components/layout/navigation";
import Button from "../../../components/layout/button";
import Placeholder from "../../../components/layout/placeholder";
import StoryDetails from "../../../components/story/story-details";
import Comment from "../../../components/story/comment";
import { useStory } from "./useStory";

const StoryPage = () => {
  const { id } = useParams();
  const storyId = parseInt(id as string);

  const {
    story,
    comments,
    loading,
    commentsLoading,
    error,
    visibleCount,
    allLoaded,
    handleLoadMoreComments,
  } = useStory(storyId);

  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">
          Hacker news {story ? story.id : ""}
        </h2>
        {loading && !story ? (
          <div className="p-4 mb-4 bg-white shadow rounded-lg">
            <Placeholder uniqueKey="story-loading-placeholder" />
          </div>
        ) : story ? (
          <StoryDetails
            title={story.title}
            text={story.text}
            by={story.by}
            score={story.score}
            url={story.url}
          />
        ) : (
          <div className="p-4 mb-4 bg-white shadow rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {commentsLoading ? (
            <ul className="p-4 bg-white shadow rounded-lg">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="w-full">
                  <Placeholder uniqueKey={`placeholder-${i}`} />
                </li>
              ))}
            </ul>
          ) : error ? (
            <p className="text-red-700">
              No comments available for story with ID: {id}.
            </p>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-4">
              <p className="text-gray-700 text-lg">No comments available.</p>
            </div>
          ) : (
            <ul
              data-testid="comments-list"
              className="p-4 bg-white shadow rounded-lg"
            >
              {comments.slice(0, visibleCount).map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          )}
          {comments.length > 0 && !commentsLoading && (
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
