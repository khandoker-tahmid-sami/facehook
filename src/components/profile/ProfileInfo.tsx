import { useState } from "react";
import { actions } from "../../actions";
import CheckIcon from "../../assets/icons/checkicon.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAxios } from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
import { ProfileImage } from "./ProfileImage";

export const ProfileInfo = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editBio, setEditBio] = useState(false);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio },
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditBio(false);
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.profile.DATA_FETCH_ERROR, data: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />

      <div className="mt-15">
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName} {state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
      </div>

      {/* User bio */}
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        {!editBio ? (
          <div className="flex-1">
            <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
          </div>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            cols={55}
          ></textarea>
        )}

        {!editBio ? (
          <button
            onClick={() => setEditBio(true)}
            className="flex-center h-7 w-7 rounded-full cursor-pointer"
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        ) : (
          <button
            onClick={handleBioEdit}
            className="flex-center h-7 w-7 rounded-full cursor-pointer"
          >
            <img
              src={CheckIcon}
              alt="Edit"
              className="brightness-0 invert w-4 h-4"
            />
          </button>
        )}
      </div>

      {/* border line */}
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};
