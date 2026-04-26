import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhoto from "../../assets/icons/addPhoto.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import { Field } from "../common/Field";
export const CreatePost = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const { auth } = useAuth();
  const { state: profile } = useProfile();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const fileUploadRef = useRef();

  const user = profile?.user ?? auth?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleImageChange = () => {
    const file = fileUploadRef.current.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handlePostSubmit = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const postData = new FormData();

    postData.append("content", formData.content);
    if (image) {
      postData.append("image", image);
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        postData,
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.POST_CREATED, data: response.data });

        //close this UI
        onClose();
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: response.error });
    }
  };
  return (
    //  <!-- Create Post  -->
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>

      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full object-cover aspect-square lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt={user?.firstName}
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            hidden
            ref={fileUploadRef}
            onChange={handleImageChange}
          />
        </div>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="mb-3 w-full rounded-lg"
          />
        )}
        {/* <!-- Post Text Input --> */}

        <Field label={""} error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is id is mandatory",
            })}
            name="content"
            id="post"
            placeholder="Share your thoughts..."
            className={`h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px] ${errors.content ? "border-red-500" : "border-gray-200"}`}
          ></textarea>
        </Field>

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 cursor-pointer"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
    //   <!-- Create Post -->
  );
};
