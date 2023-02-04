import api from "./index";

export const userAPI = {
  register: async (data) => {
    return api.post("user/register", data);
  },
  login: async (data) => {
    return api.post("user/login", data);
  },
  profile: async () => {
    return api.get("user/profile");
  },
};
