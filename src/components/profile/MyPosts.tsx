import { useProfile } from "../../hooks/useProfile";
import { PostList } from "../posts/PostList";

export const MyPosts = () => {
  const { state, dispatch } = useProfile();

  console.log(state)
  const posts = state?.posts;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">My Posts</h4>
      <PostList posts={posts} />
    </>
  );
};
