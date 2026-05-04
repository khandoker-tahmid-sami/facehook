import { actions } from "../../actions";
import DeleteIcon from "../../assets/icons/delete.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";

export const PostCommentsList = ({ postComments, post, setComments }) => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { dispatch } = usePost();

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/comment/${commentId}`,
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_COMMENT_DELETED,
          postId: post.id,
          commentId,
        });

        setComments((prev) => prev.filter((c) => c.id !== commentId));
      }
    } catch (error) {
      console.error(error);
    }
  };
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
                <div>
                  <div className="flex gap-1 text-xs lg:text-sm">
                    <span>{comment?.author?.name}: </span>
                    <span>{comment?.comment}</span>
                    {isMe && (
                      <button
                        onClick={() => handleCommentDelete(comment.id)}
                        className="cursor-pointer ml-4"
                      >
                        <img src={DeleteIcon} alt="3dots of Action" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

// export const PostCommentsList = ({ postComments }) => {
//   return (
//     <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
//       {postComments &&
//         [...postComments]
//           .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//           .map((comment, index) => (
//             <div key={index} className="flex items-center gap-3 pt-4">
//               <img
//                 className="max-w-6 max-h-6 rounded-full aspect-square object-cover"
//                 src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment?.author?.avatar}`}
//                 alt="avatar"
//               />
//               <div>
//                 <div className="flex gap-1 text-xs lg:text-sm">
//                   <span>{comment?.author?.name}: </span>
//                   <span>{comment?.comment}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//     </div>
//   );
// };
