import React from "react";
import { sanitizeHtml } from "@/app/_utils/sanitizeHtml";

interface StoryDetailsProps {
  title: string;
  text?: string;
  by: string;
  score: number;
  url?: string;
}

const StoryDetails: React.FC<StoryDetailsProps> = ({
  title,
  text,
  by,
  score,
  url,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 mt-4">
        {title}
      </h1>
      {text && (
        <p
          className="my-4 text-gray-700 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
        ></p>
      )}
      {url && (
        <p className="my-4">
          🔗 Link to: &nbsp;
          <a
            href={url}
            className="text-blue-600 hover:text-blue-800 text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </p>
      )}
      <p className="my-4 text-gray-700 text-lg">
        <span className="font-semibold">🔥 Score:</span> {score}
      </p>
      <p className="my-4 text-gray-700 text-lg">
        <span className="font-semibold">🧑‍💻 By:</span> {by}
      </p>
    </div>
  );
};

export default StoryDetails;
