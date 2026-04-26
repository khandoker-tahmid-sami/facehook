import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { CreatePost } from "./CreatePost";

export const NewPost = () => {
  const { auth } = useAuth();
  const { state } = useProfile();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const user = state?.user ?? auth?.user;
  return (
    <>
      {showCreatePost ? (
        <CreatePost onClose={() => setShowCreatePost(false)}/>
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="max-w-10 max-h-10 rounded-full object-cover aspect-square lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt={user?.firstName}
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                placeholder={`What's on your mind? ${user?.firstName}`}
                onClick={() => setShowCreatePost(true)}
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
