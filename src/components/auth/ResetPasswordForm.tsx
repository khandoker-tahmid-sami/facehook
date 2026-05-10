import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Field } from "../common/Field";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);

    //make reset-password api call
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/reset-password`,
        { token, newPassword: formData.newPassword },
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: "Password reset failed. The link may be expired or invalid.",
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* <!-- password --> */}
      <Field label={"New Password"} error={errors.newPassword}>
        <input
          {...register("newPassword", {
            required: "New password is required",
            // pattern: /^[A-Za-z]+$/i,
            minLength: {
              value: 8,
              message: "Your password must be atleast 8 character",
            },
          })}
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Enter your new password..."
          className={`auth-input ${errors.newPassword ? "border-red-500" : "border-gray-200"} `}
        />
      </Field>

      <Field label={"Confirm New Password"} error={errors.confirmPassword}>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your new password..."
          className={`auth-input ${errors.confirmPassword ? "border-red-500" : "border-gray-200"} `}
        />
      </Field>

      <p className="pb-2 text-red-500">{errors?.root?.random?.message}</p>
      {/* <!-- Submit --> */}
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark cursor-pointer transition-all hover:opacity-90"
          type="submit"
        >
          Send Reset Link
        </button>
      </Field>
    </form>
  );
};
