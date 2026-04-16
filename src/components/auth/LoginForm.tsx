import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Field } from "../common/Field";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>();

  const submitForm: SubmitHandler<LoginFormValues> = async (formData) => {
    // console.log(formData);

    //make an api call will and logged in user information
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData,
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`Login time authToken ${authToken}`);

          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);

      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found`,
      });
    }
  };
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
      {/* <!-- password --> */}
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
      {/* <!-- Submit --> */}
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark cursor-pointer transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};
