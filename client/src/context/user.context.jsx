import { createContext, useEffect, useState } from "react";
import {
  clearUserInCookie,
  getUserFromCookie,
  setUserInCookie,
} from "../utils/user.utils";
import { userAPI } from "../api/user.api";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUserLocal] = useState(getUserFromCookie());

  const setUser = (data) => {
    setUserInCookie(data);
    setUserLocal(data);
  };

  const clearUser = () => {
    setUser(null);
    clearUserInCookie();
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await userAPI.profile();
        setUser(userData);
      } catch (err) {
        clearUser();
      }
    };

    if (user) {
      checkAuth();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}
