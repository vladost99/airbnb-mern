import api from "./index";

export const bookingAPI = {
  create: async (data) => {
    return api.post("bookings", data);
  },
  list: async () => {
    return api.get("bookings");
  },
  getById(id) {
    return api.get(`bookings/${id}`);
  },
};
