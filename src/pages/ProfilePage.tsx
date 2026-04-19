import { useEffect } from "react";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import { ProfileInfo } from "../components/profile/ProfileInfo";
import { MyPosts } from "../components/profile/MyPosts";

const ProfilePage = () => {
  // const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
        );

        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }

        // const { user, posts } = response.data;

        // console.log(user, posts)
        // setUser(user);
        // setPosts(posts);
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
        // setError(error);
      }
    };

    fetchProfile();
  }, []);

  if (state?.loading) return <div>fetching your profile data</div>;

  return (
    <>
     <ProfileInfo/>
     <MyPosts/>
    </>
  );
};

export default ProfilePage;
