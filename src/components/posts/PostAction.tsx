import { useState } from "react";
import CommentIcon from "../../assets/icons/comment.svg";
import LikedIcon from "../../assets/icons/like-fill-6.svg";
import LikeIcon from "../../assets/icons/like.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";

export const PostAction = ({ post, commentCount }) => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const [like, setLike] = useState(post?.likes?.includes(auth?.user?.id));

  const handleLike = async () => {
    // console.log("button clicked");

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post?.id}/like`,
      );

      if (response.status === 200) {
        setLike(!like);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      {/* <!-- Like Button --> */}
      <button
        onClick={handleLike}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm cursor-pointer"
      >
        <img
          src={like ? LikedIcon : LikeIcon}
          alt="Like"
          style={like ? { filter: "brightness(0) invert(1)" } : {}}
          className="w-6 h-6"
        />
        {like ? (
          <span className="font-extrabold">Liked</span>
        ) : (
          <span>Like</span>
        )}
      </button>

      {/* <!-- Comment Button --> */}
      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm cursor-pointer">
        <img src={CommentIcon} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>
      {/* <!-- Share Button --> */}

      {/* <!-- Like Button --> */}
      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm cursor-pointer">
        <img src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
};
