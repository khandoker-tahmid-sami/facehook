import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Field } from "../common/Field";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
};

export const RegistrationForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegistrationFormValues>();

  const submitForm: SubmitHandler<RegistrationFormValues> = async (
    formData,
  ) => {
    console.log(formData);

    //make an api call for registration
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData,
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      setError("root.random", {
        type: "random",
        message: `Something went wrong ${error.message}. User with this email ${formData.email} is already exist`,
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
    >
      <Field label={"First Name"} error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name is required" })}
          type="firstName"
          name="firstName"
          id="firstName"
          placeholder="Enter your first name..."
          className={`auth-input ${errors.firstName ? "border-red-500" : "border-gray-200"} `}
        />
      </Field>

      <Field label={"Last Name"} error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is required" })}
          type="lastName"
          name="lastName"
          id="lastName"
          placeholder="Enter your last name..."
          className={`auth-input ${errors.lastName ? "border-red-500" : "border-gray-200"} `}
        />
      </Field>

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

      <Field label={"Password"} error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            // pattern: /^[A-Za-z]+$/i,
            minLength: {
              value: 8,
              message: "Your password must be atleast 8 character",
            },
          })}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password..."
          className={`auth-input ${errors.password ? "border-red-500" : "border-gray-200"} `}
        />
      </Field>

      <p className="pb-2 text-red-500">{errors?.root?.random?.message}</p>

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 cursor-pointer"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};
