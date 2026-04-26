import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    //add a request incepter
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    //add a response interceptop
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = auth?.refreshToken;
          const response = await axios
            .post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken },
            )
            .catch(() => {
              setAuth(null);
              return Promise.reject(error);
            });

          const { token, refreshToken: newRefreshToken } = response.data;

          console.log(`New token: ${token}`);

          setAuth({ ...auth, authToken: token, refreshToken: newRefreshToken });
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return api(originalRequest);
        }
      },
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);

  return { api };
};
