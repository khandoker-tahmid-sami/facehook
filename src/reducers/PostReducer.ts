import { actions } from "../actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        posts: action.data,
        loading: false,
      };
    }
    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.POST_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.post.DATA_DELETED: {
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((item) => item.id !== action.data),
      };
    }

    case actions.post.POST_COMMENT_DELETED: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment.id !== action.commentId,
                ),
              }
            : post,
        ),
      };
    }

    case actions.post.POST_COMMENT_EDITED: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.postId
            ? {
                ...post,
                comments: post.comments.map(
                  (comment) => comment.id === action.commentId,
                )
                  ? {
                      ...comment,
                      comment: action.comment,
                    }
                  : comment,
              }
            : post,
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, postReducer };
