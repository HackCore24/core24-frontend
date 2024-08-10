import useSWR from "swr";
import api from "../instance";
import { IUser } from "../models/User";
const endpoint = "/users";

const getMe = async () => {
  return (await api.get<IUser>(`${endpoint}/me`)).data;
};

export const useUsers = () => {
  return {
    GetMe: () => useSWR("me", getMe),
  };
};

const usersAPI = {
  getMe,
};

export default usersAPI;
