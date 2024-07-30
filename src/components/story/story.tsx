import React from "react";
import Link from "next/link";
import { convertUnixToDate } from "../../utils/dateUtils";
import { Story as StoryType } from "../../types/Story";

interface StoryProps {
  story: StoryType;
}

const Story: React.FC<StoryProps> = ({ story }) => {
  return (
    <div
      datatest-id="story-element"
      key={story.id}
      className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer"
    >
      <Link href={`/story/${story.id}`}>
        <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
        <p className="text-gray-700 mb-2">
          Written by: <span className="font-medium">{story.by}</span>,{" "}
          {convertUnixToDate(story.time)}
        </p>
        <p className="text-gray-700">
          🔥 Current score: <span className="font-medium">{story.score}</span>
        </p>
      </Link>
    </div>
  );
};

export default Story;
