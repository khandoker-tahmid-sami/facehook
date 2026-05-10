import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../common/Field";

export const ForgotPasswordForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    // const email = formData.email;

    //make forgot-password api call

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/forgot-password`,
        formData,
      );

      if (response.status === 200) {
        setSuccessMessage("Password reset link has been sent to your email");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  };

  if (successMessage) {
    return (
      <div className="py-10 lg:py-[60px] text-center">
        <p className="text-lwsGreen text-lg">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* <!-- email --> */}
      <Field label={"Email"} error={errors.email}>
        <input
          {...register("email", { required: "Email id is required" })}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          className={`auth-input ${errors.email ? "border-red-500" : "border-gray-200"} `}
        />
      </Field>

      {/* {successMessage && <p className="pb-2 text-lwsGreen">{successMessage}</p>} */}

      <p className="pb-2 text-red-500">{errors?.root?.random?.message}</p>
      {/* <!-- Submit --> */}
      <Field>
        <button
          disabled={isLoading}
          className="auth-input bg-lwsGreen font-bold text-deepDark cursor-pointer transition-all hover:opacity-90"
          type="submit"
        >
          {isLoading ? "Sending...." : "Send Reset Link"}
        </button>
      </Field>
    </form>
  );
};
