import api from "../instance";
import qs from "qs";
import {
  IAuthRequest,
  IAuthResponse,
  IRefreshRequest,
  IRefreshResponse,
  ITelegramAuthData,
  ITelegramAuthResponse,
  ITelegramUserRegister,
} from "../models/Auth";
import axios from "axios";
const endpoint = "/auth";

const login = async (data: IAuthRequest) => {
  const resp = await api.post<IAuthResponse>(
    `${endpoint}/login`,
    qs.stringify(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return resp.data;
};

const refresh = async (data: IRefreshRequest) => {
  const resp = await api.post<IRefreshResponse>(`${endpoint}/refresh`, data);
  return resp.data;
};

const telegramAuth = async (data: ITelegramAuthData) => {
  const resp = await api.post<ITelegramAuthResponse>(
    `${endpoint}/telegram`,
    data
  );
  return resp.data;
};

const telegramRegister = async (
  data: ITelegramUserRegister,
  custom_username?: string
) => {
  const resp = await api.post<ITelegramAuthResponse>(
    custom_username
      ? `${endpoint}/telegram/register?username=${custom_username}`
      : `${endpoint}/telegram/register`,
    data.username ? data : { ...data, username: null }
  );

  return resp.data;
};

const telegramConnect = async (
  access_token: string,
  data: ITelegramAuthData
) => {
  const resp = await axios.post<ITelegramAuthResponse>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/telegram/connect`,
    data.username ? data : { ...data, username: null },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return resp.status;
};

const telegramLink = async (data: ITelegramAuthData) => {
  const resp = await api.post<ITelegramAuthResponse>(
    `${endpoint}/telegram/connect`,
    data.username ? data : { ...data, username: null }
  );
  return resp.data;
};

const authAPI = {
  login,
  refresh,
  telegramAuth,
  telegramRegister,
  telegramConnect,
  telegramLink,
};

export default authAPI;
