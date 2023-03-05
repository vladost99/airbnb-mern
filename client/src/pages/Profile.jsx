import { useContext } from "react";
import { UserContext } from "../context/user.context";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const { user, clearUser } = useContext(UserContext);

  return (
    <div>
      <AccountNav subpage={"profile"} />
      <div className="text-center flex flex-col items-center max-w-lg mx-auto">
        <span>
          {" "}
          Logged in as {user.name} ({user.email})
        </span>
        <button onClick={clearUser} className="primary max-w-sm mt-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
