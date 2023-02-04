import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userAPI } from "../api/user.api";
import { UserContext } from "../context/user.context";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const register = async (e) => {
    e.preventDefault();
    try {
      await userAPI.register({ name, password, email });
      alert("Registration successful. Now you can log in");
      navigate("/login");
    } catch (err) {
      alert(`Registration failed(${err}). Please try again later`);
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form onSubmit={register} className="max-w-md mx-auto">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={"John Doe"}
          />
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
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
