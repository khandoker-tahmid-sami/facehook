import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { PostCommentsList } from "./PostCommentsList";
export const PostComments = ({ post }) => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  // console.log(comments)

  const handleComment = async (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/comment`,
          { comment },
        );

        if (response.status === 200) {
          setComments([...response.data.comments]);
          setComment("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      {/* <!-- comment input box --> */}
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full object-cover aspect-square lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => handleComment(e)}
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      {/* <!-- comment filter button --> */}
      <div className="mt-4">
        {comments?.length > 0 ? (
          <>
            <button
              className="text-gray-300 max-md:text-sm cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            >
              All Comment ▾
            </button>
            {showComments && <PostCommentsList postComments={comments} />}
          </>
        ) : (
          <p className="text-center text-gray-400 text-sm">No comments</p>
        )}
      </div>
    </div>
  );
};
