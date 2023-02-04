import Cookie from "js-cookie";
const userVar = "user";

export const getUserFromCookie = () => {
  const user = Cookie.get(userVar);

  return user ? JSON.parse(user) : null;
};

export const setUserInCookie = (data) => {
  Cookie.set(userVar, JSON.stringify(data), { expires: 1 });
};

export const clearUserInCookie = () => {
  Cookie.remove(userVar);
};
