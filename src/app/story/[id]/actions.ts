import { CommentType } from "@/types/Comment";
import { Story } from "@/types/Story";
import { fetchItem } from "../../../services/firebase";

export const fetchStoryById = async (id: number): Promise<Story | null> => {
  try {
    const story = await fetchItem(id);
    return story;
  } catch (err) {
    console.error("Failed to fetch story by id:", err);
    return null;
  }
};

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
