import Home from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/logo.svg";

import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import { Logout } from "../auth/Logout";

export const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();

  //check if state has other then take from auth
  const user = state?.user ?? auth?.user;
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to={"/"}>
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={Logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to={"/"} className="btn-primary">
            <img src={Home} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>
          <Logout />

          <Link to={"/me"} className="flex-center !ml-8 gap-3">
            <span className="text-sm font-medium lg:text-xl">
              {user?.firstName} {user?.lastName}
            </span>
            {user.avatar ? (
              <img
                className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full object-cover aspect-square"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
                alt=""
              />
            ) : (
              <div className="flex-center max-h-[32px] max-w-[32px] lg:max-h-[50px] lg:max-w-[50px] rounded-full bg-blue-500 text-white text-sm font-bold aspect-square p-2">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};
