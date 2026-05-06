import { useReducer, useState } from "react";
import { PostContext } from "../context";
import { initialState, postReducer } from "../reducers/PostReducer";

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [editPost, setEditPost] = useState(null);
  return (
    <PostContext.Provider value={{ state, dispatch, editPost, setEditPost }}>
      {children}
    </PostContext.Provider>
  );
};
