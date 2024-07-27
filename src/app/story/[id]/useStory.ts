import { useEffect, useReducer } from "react";
import { CommentType } from "@/app/_types/Comment";
import { Story } from "@/app/_types/Story";
import { fetchComments, fetchStoryById } from "./actions";
import { useStoriesContext } from "../../_context/StoriesContext";

interface State {
  story: Story | null;
  comments: CommentType[];
  loading: boolean;
  commentsLoading: boolean;
  error: string | null;
  visibleCount: number;
  allLoaded: boolean;
}

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_STORY_SUCCESS"; payload: Story }
  | { type: "FETCH_COMMENTS_INIT" }
  | { type: "FETCH_COMMENTS_SUCCESS"; payload: CommentType[] }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "LOAD_MORE"; payload: CommentType[] }
  | { type: "SET_ALL_LOADED" };

const initialState: State = {
  story: null,
  comments: [],
  loading: true,
  commentsLoading: true,
  error: null,
  visibleCount: 5,
  allLoaded: false,
};

function storyReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_STORY_SUCCESS":
      return { ...state, story: action.payload, loading: false };
    case "FETCH_COMMENTS_INIT":
      return { ...state, commentsLoading: true, error: null };
    case "FETCH_COMMENTS_SUCCESS":
      return { ...state, comments: action.payload, commentsLoading: false };
    case "FETCH_FAILURE":
      return {
        ...state,
        loading: false,
        commentsLoading: false,
        error: action.payload,
      };
    case "LOAD_MORE":
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
        visibleCount: state.visibleCount + 5,
      };
    case "SET_ALL_LOADED":
      return { ...state, allLoaded: true };
    default:
      return state;
  }
}

export const useStory = (id: number) => {
  const [state, dispatch] = useReducer(storyReducer, initialState);
  const { stories } = useStoriesContext();

  useEffect(() => {
    const loadStoryAndComments = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        let story = stories.find((s) => s.id === id) || null;
        if (!story) {
          story = await fetchStoryById(id);
        }
        if (story) {
          dispatch({ type: "FETCH_STORY_SUCCESS", payload: story });
          dispatch({ type: "FETCH_COMMENTS_INIT" });
          const initialComments = await fetchComments(
            (story.kids ?? []).slice(0, 5)
          );
          dispatch({
            type: "FETCH_COMMENTS_SUCCESS",
            payload: initialComments,
          });
        } else {
          throw new Error("Story not found");
        }
      } catch (err) {
        dispatch({
          type: "FETCH_FAILURE",
          payload: `The story with ID: ${id} could not be found. Please check the ID and try again.`,
        });
      }
    };

    loadStoryAndComments();
  }, [id, stories]);

  const handleLoadMoreComments = async () => {
    const nextVisibleCount = state.visibleCount + 5;
    const kids = state.story?.kids ?? [];

    if (nextVisibleCount >= kids.length) {
      dispatch({ type: "SET_ALL_LOADED" });
    }

    try {
      const additionalComments = await fetchComments(
        kids.slice(state.visibleCount, nextVisibleCount)
      );
      dispatch({ type: "LOAD_MORE", payload: additionalComments });
    } catch (err) {
      dispatch({
        type: "FETCH_FAILURE",
        payload: "Failed to load more comments",
      });
    }
  };

  return {
    ...state,
    handleLoadMoreComments,
  };
};
