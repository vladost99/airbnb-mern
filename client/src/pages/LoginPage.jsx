import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../api/user.api";
import { UserContext } from "../context/user.context";
import { routerLink } from "../routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await userAPI.login({ email, password });
      setUser(userInfo);
      alert("Login successfull");
      navigate(routerLink.home);
    } catch (errorMessage) {
      alert(`Login failed (${errorMessage})`);
    }
  };

  if (user) {
    return <Navigate replace to={routerLink.home} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={login} className="max-w-md mx-auto">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={"your@email.com"}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={"password"}
          />
          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={routerLink.register}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
