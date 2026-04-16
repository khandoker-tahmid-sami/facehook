import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const statusCode = error?.status || 404;
  // const message = error?.statusText || error?.message || "Something went wrong";

  return (
    <div className="min-h-screen bg-deepDark flex-center flex-col gap-6 px-4 text-center">
      {/* Glowing status code */}
      <div className="relative select-none">
        <span
          className="text-[2rem] sm:text-[4rem] font-bold leading-none text-lwsGreen opacity-50 absolute inset-0 blur-2xl"
          aria-hidden="true"
        >
          {statusCode}
        </span>
        <span className="relative text-[2rem] sm:text-[4rem] font-bold leading-none text-lwsGreen">
          {statusCode}
        </span>
      </div>

      {/* Icon + heading */}
      <div className="card flex flex-col items-center gap-4 max-w-md w-full">
        {/* <div className="flex-center w-16 h-16 rounded-full bg-lwsGreen/10 border border-lwsGreen/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-lwsGreen"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div> */}

        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold text-gray-100">
            Oops! Page not found
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sorry, an unexpected error has occurred.
          </p>
          {/* <p className="text-lwsGreen/80 text-sm font-medium italic">
            {message}
          </p> */}
        </div>

        <div className="flex gap-3 mt-2 w-full">
          <button
            onClick={() => navigate(-1)}
            className="btn-primary flex-1 border border-[#3F3F3F]"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex-center gap-2 rounded-md bg-lwsGreen px-5 py-2.5 text-sm font-medium text-deepDark hover:bg-lwsGreen/80 lg:text-lg transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
