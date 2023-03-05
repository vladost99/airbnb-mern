import axios from "axios";
import { getUserFromCookie } from "../utils/user.utils";

const url = `http://localhost:4000`;
const baseURL = `${url}/api`;

const $api = axios.create({
  baseURL,
});

export const imagesURL = `${url}/uploads`;

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
