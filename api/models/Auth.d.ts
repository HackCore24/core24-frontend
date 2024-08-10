export interface IAuthRequest {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface IRefreshRequest {
  refresh_token: string;
}

export interface IRefreshResponse {
  access_token: string;
  token_type: string;
}

export interface ITelegramAuthData {
  auth_date: number;
  first_name: string;
  last_name?: string;
  hash: string;
  id: number;
  photo_url?: string;
  username?: string;
  webapp_data?: string;
}

export interface ITelegramUserRegister extends ITelegramAuthData {
  password: string;
}

export interface ITelegramAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
}
