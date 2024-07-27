import { CommentType } from "@/app/_types/Comment";
import { fetchItem } from "@/app/_services/firebase";

export const fetchComments = async (ids: number[]): Promise<CommentType[]> => {
  const fetchCommentsRecursive = async (
    ids: number[]
  ): Promise<CommentType[]> => {
    const commentPromises = ids.map(async (id) => {
      const comment = await fetchItem(id);

      if (comment && comment.kids && comment.kids.length > 0) {
        comment.kids = await fetchCommentsRecursive(comment.kids);
      }

      return comment;
    });

    const comments = await Promise.all(commentPromises);
    return comments.filter((comment) => comment !== null && comment.text);
  };

  return fetchCommentsRecursive(ids);
};
