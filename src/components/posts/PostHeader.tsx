import { useState } from "react";
import ThreeDots from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import { useAuth } from "../../hooks/useAuth";
import { formatDateTime } from "../../utils";

export const PostHeader = ({ post }) => {
  const { auth } = useAuth();
  const authorName = post?.author?.name;
  const [headerAction, setHeaderAction] = useState(false);

  const isMe = post?.author?.id === auth?.user?.id;

  return (
    <header className="flex items-center justify-between gap-4">
      {/* <!-- author info --> */}
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${post?.author?.avatar}`}
          alt={authorName}
        />
        <div>
          <h6 className="text-lg lg:text-xl">{authorName}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {formatDateTime(post?.createAt)}
            </span>
          </div>
        </div>
      </div>
      {/* <!-- author info ends --> */}

      {/* <!-- action dot --> */}

      <div className="relative">
        {isMe && (
          <button
            onClick={() => setHeaderAction(!headerAction)}
            className="cursor-pointer"
          >
            <img src={ThreeDots} alt="3dots of Action" />
          </button>
        )}

        {/* <!-- Action Menus Popup --> */}
        {headerAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen cursor-pointer">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500 cursor-pointer">
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
      {/* <!-- action dot ends --> */}
    </header>
  );
};
