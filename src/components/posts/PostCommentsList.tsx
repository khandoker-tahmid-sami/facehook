import { useState } from "react";
import { actions } from "../../actions";
import ThreeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";

export const PostCommentsList = ({ post, postComments, setComments }) => {
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [editingComnentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("")

  const { dispatch } = usePost();
  const { api } = useAxios();
  const { auth } = useAuth();

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/comment/${commentId}`,
      );

      if (response?.status === 200) {
        dispatch({
          type: actions.post.POST_COMMENT_DELETED,
          postId: post?.id,
          commentId,
        });

        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentEdit = async(commentId) =>{
      try{
        const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/comment`, {comment: editCommentText})

        if(response?.status === 200){
          dispatch({
            type: actions.post.POST_COMMENT_EDITED, postId: post?.id, commentId, comment: editCommentText
          })

          setComments((prev) => prev.map((c) => (c.id === commentId ? {...c, comment: editCommentText} : c)))
        }

        setEditingCommentId(null)

      }catch(error){
        console.error(error)
      }
  }
  return (
    <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
      {postComments &&
        [...postComments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((comment, index) => {
            const isMe = comment?.author?.id === auth?.user?.id;
            return (
              <div key={index} className="flex items-center gap-3 pt-4">
                <img
                  className="max-w-6 max-h-6 rounded-full aspect-square object-cover"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment?.author?.avatar}`}
                  alt="avatar"
                />
                <div className="w-full relative">
                  <div className="flex justify-between items-center text-xs lg:text-sm">
                    <div className="flex gap-1 items-center">
                      <span>{comment?.author?.name}: </span>
                      <span>{comment?.comment}</span>
                    </div>
                    {isMe && (
                      <button
                        onClick={() => setActiveCommentId(activeCommentId === comment.id ? null : comment.id)}
                        className="cursor-pointer"
                      >
                        <img
                          src={ThreeDots}
                          alt="Three dots"
                          className="w-4 h-4 rotate-90"
                        />
                      </button>
                    )}

                    {activeCommentId === comment.id && (
                      <div className="absolute flex right-0 top-5 z-10 gap-1 rounded-md border border-[#3F3F3F] bg-mediumDark py-1 shadow-lg divide-x divide-[#3F3F3F]">
                        <button className="flex gap-2 px-3 py-2 cursor-pointer text-[12px]">
                          <img
                            src={EditIcon}
                            alt=""
                            className="h-4 w-4 group-hover:bg-lwsGreen"
                          />
                          Edit
                        </button>

                        <button
                          onClick={() => handleCommentDelete(comment?.id)}
                          className="flex gap-2 px-3 py-2 cursor-pointer text-[12px]"
                        >
                          <img src={DeleteIcon} alt="" className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};
