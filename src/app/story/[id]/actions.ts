import { CommentType } from "@/app/_types/Comment";

export const fetchComments = async (
  ids: number[],
  signal: AbortSignal
): Promise<CommentType[]> => {
  const fetchCommentsRecursive = async (
    ids: number[],
    signal: AbortSignal
  ): Promise<CommentType[]> => {
    const commentPromises = ids.map(async (id) => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        { signal }
      );
      const comment = await response.json();

      if (comment && comment.kids && comment.kids.length > 0) {
        comment.kids = await fetchCommentsRecursive(comment.kids, signal);
      }

      return comment;
    });

    const comments = await Promise.all(commentPromises);
    return comments.filter((comment) => comment !== null && comment.text);
  };

  return fetchCommentsRecursive(ids, signal);
};
