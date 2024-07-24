import { useEffect, useMemo, useReducer, useRef } from "react";
import { CommentType } from "@/app/_types/Comment";
import { StoryParams } from "@/app/_types/StoryParams";
import { fetchComments } from "./actions";

interface State {
  comments: CommentType[];
  loading: boolean;
  error: string | null;
  visibleCount: number;
  allLoaded: boolean;
}

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: CommentType[] }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "LOAD_MORE"; payload: CommentType[] }
  | { type: "SET_ALL_LOADED" };

const initialState: State = {
  comments: [],
  loading: true,
  error: null,
  visibleCount: 5,
  allLoaded: false,
};

function storyReducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, comments: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
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

export const useStory = (kids: StoryParams["kids"]) => {
  const [state, dispatch] = useReducer(storyReducer, initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const kidsAsNumbers = useMemo(() => {
    return Array.isArray(kids) ? (kids as unknown as string[]).map(Number) : [];
  }, [kids]);

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const { signal } = controller;

    const loadInitialComments = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const initialComments = await fetchComments(
          kidsAsNumbers.slice(0, 5),
          signal
        );
        dispatch({ type: "FETCH_SUCCESS", payload: initialComments });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          dispatch({
            type: "FETCH_FAILURE",
            payload: "Failed to load comments",
          });
        }
      }
    };

    if (kidsAsNumbers.length > 0) {
      loadInitialComments();
    } else {
      dispatch({ type: "FETCH_FAILURE", payload: "No comments available." });
    }

    return () => {
      controller.abort();
    };
  }, [kidsAsNumbers]);

  const handleLoadMoreComments = async () => {
    const controller = abortControllerRef.current || new AbortController();
    const { signal } = controller;
    const nextVisibleCount = state.visibleCount + 5;

    if (nextVisibleCount >= kidsAsNumbers.length) {
      dispatch({ type: "SET_ALL_LOADED" });
    }

    try {
      const additionalComments = await fetchComments(
        kidsAsNumbers.slice(state.visibleCount, nextVisibleCount),
        signal
      );
      dispatch({ type: "LOAD_MORE", payload: additionalComments });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        dispatch({
          type: "FETCH_FAILURE",
          payload: "Failed to load more comments",
        });
      }
    }
  };

  return {
    ...state,
    handleLoadMoreComments,
  };
};
