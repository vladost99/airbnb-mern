import api from "./index";

export const placesAPI = {
  uploadByLink: async (link) => {
    return api.post(`places/upload-by-link`, { link });
  },
  uploadFiles: async (data) => {
    return api.post(`places/upload`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  create: async (data) => {
    return api.post("places", data);
  },
  update: async (id, data) => {
    return api.put(`places/${id}`, data);
  },
  mylist: async () => {
    return api.get("places/user-places");
  },
  list: async () => {
    return api.get("places");
  },
  getById: async (id) => {
    return api.get(`places/${id}`);
  },
};
