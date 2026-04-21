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
  const [firstName, setFirstName] = useState(state?.user?.firstName);
  const [lastName, setLastName] = useState(state?.user?.lastName);
  const [editName, setEditName] = useState(false);
  const [email, setEmail] = useState(state?.user?.email);
  const [editEmail, setEditEmail] = useState(false);

  const handleProfileUpdate = async (fields, setEdit) => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        fields,
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEdit(false);
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.profile.DATA_FETCH_ERROR, data: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <ProfileImage />

      <div className="mt-2">
        {/* user name */}
        <div className="flex items-center justify-center gap-2">
          {!editName ? (
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {firstName} {lastName}
            </h3>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                size={Math.max(10, firstName.length)}
                className="p-1 rounded-md text-gray-300 text-xl font-semibold"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                size={Math.max(3, lastName.length)}
                className="p-1 rounded-md text-gray-300 text-xl font-semibold"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}

          {!editName ? (
            <button
              onClick={() => setEditName(true)}
              className="flex-center h-7 w-7 rounded-full cursor-pointer"
            >
              <img src={EditIcon} alt="Edit" />
            </button>
          ) : (
            <button
              onClick={() =>
                handleProfileUpdate({ firstName, lastName }, setEditName)
              }
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

        {/* user email */}
        <div className="flex gap-2 items-center justify-center">
          {!editEmail ? (
            <p className="leading-[231%] lg:text-lg">{email}</p>
          ) : (
            <input
              type="email"
              size={Math.max(3, email.length)}
              className="p-2 rounded-md text-gray-300 text-xl font-semibold w-60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {!editEmail ? (
            <button
              onClick={() => setEditEmail(true)}
              className="flex-center h-7 w-7 rounded-full cursor-pointer"
            >
              <img src={EditIcon} alt="Edit" />
            </button>
          ) : (
            <button onClick={() => handleProfileUpdate({email}, setEditEmail)} className="flex-center h-7 w-7 rounded-full cursor-pointer">
              <img
                src={CheckIcon}
                alt="Edit"
                className="brightness-0 invert w-4 h-4"
              />
            </button>
          )}
        </div>
      </div>

      {/* User bio */}
      <div className="mt-4 flex items-center content-center gap-2 lg:mt-6">
        {!editBio ? (
          <div className="flex-1">
            <p className="leading-[188%] text-gray-400 lg:text-lg">{bio}</p>
          </div>
        ) : (
          <textarea
            className="p-2 leading-[188%] text-gray-300 lg:text-lg rounded-md"
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
            onClick={() => handleProfileUpdate({ bio }, setEditBio)}
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
