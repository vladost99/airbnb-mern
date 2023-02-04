import React, { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Link, useParams } from "react-router-dom";
import Profile from "../components/AccountPage/Profile";

const AccountPage = () => {
  const { user } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  const linkClasses = (type = null) => {
    let classes = `py-2 px-6`;

    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += ` bg-primary text-white rounded-full`;
    }

    return classes;
  };

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
        <Link className={linkClasses("profile")} to="/account">
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to="/account/bookings">
          My bookings
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          My accommodations
        </Link>
      </nav>
      {subpage === "profile" && <Profile />}
    </div>
  );
};

export default AccountPage;
