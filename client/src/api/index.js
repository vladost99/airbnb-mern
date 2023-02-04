import axios from "axios";
import { getUserFromCookie } from "../utils/user.utils";

const baseURL = `http://localhost:4000/api`;

const $api = axios.create({
  baseURL,
});

$api.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${getUserFromCookie()?.token}`,
    },
  };
});

$api.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response;
  },
  (err) => {
    throw err?.response?.data?.message;
  }
);

export default $api;
