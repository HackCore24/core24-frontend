import useSWR from "swr";
import api from "../instance";
import { IUser } from "../models/User";
const endpoint = "/users";

const getMe = async () => {
  return (await api.get<IUser>(`${endpoint}/me`)).data;
};

const getByID = async (user_id: string) => {
  return (await api.get<IUser>(`${endpoint}/${user_id}`)).data;
};

export const useUsers = () => {
  return {
    GetMe: () => useSWR("me", getMe),
    GetByID: (id: string) =>
      useSWR(`user-${id}`, () => {
        if (!id) return null;
        return getByID(id);
      }),
  };
};

const usersAPI = {
  getMe,
};

export default usersAPI;
