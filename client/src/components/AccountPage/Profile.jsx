import { useContext } from "react";
import { UserContext } from "../../context/user.context";

const Profile = () => {
  const { user, clearUser } = useContext(UserContext);

  return (
    <div className="text-center flex flex-col items-center max-w-lg mx-auto">
      <span>
        {" "}
        Logged in as {user.name} ({user.email})
      </span>
      <button onClick={clearUser} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
};

export default Profile;
