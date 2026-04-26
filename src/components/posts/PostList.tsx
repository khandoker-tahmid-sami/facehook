import { PostCard } from "./PostCard";

export const PostList = ({ posts }) => {
  return (
    !!posts &&
    [...posts]
      .sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime())
      .map((post) => <PostCard key={post.id} post={post} />)
  );
};
