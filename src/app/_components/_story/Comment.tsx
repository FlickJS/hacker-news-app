import { convertUnixToDate } from "../../_utils/dateUtils";
import { sanitizeHtml } from "../../_utils/sanitizeHtml";
import { CommentType } from "../../_types/Comment";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const generateUniqueKey = (id: number, parentId: number | null): string => {
    return `${parentId ? `${parentId}-` : ""}${id}`;
  };

  if (!comment.text) {
    return null;
  }

  return (
    <li className="p-4 mb-4 bg-white shadow rounded-lg overflow-hidden comment">
      <p className="font-semibold text-gray-800 mb-2">
        Commented by: {comment.by} - {convertUnixToDate(comment.time)}
      </p>
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
      />
      {comment.kids && comment.kids.length > 0 && (
        <ul className="pl-4 border-l-2 border-gray-200">
          {comment.kids.map((kidComment: CommentType) => (
            <Comment
              key={generateUniqueKey(kidComment.id, comment.id)}
              comment={kidComment}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Comment;
