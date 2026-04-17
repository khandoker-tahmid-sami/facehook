import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
        );

        const { user, posts } = response.data;

        console.log(user, posts)
        setUser(user);
        setPosts(posts);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>fetching your profile data</div>;


  return <div>
    
    {user?.firstName}
    <p>You have {posts.length} posts</p>
  </div>;
};

export default ProfilePage;
