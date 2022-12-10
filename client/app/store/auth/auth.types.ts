export interface IAuthResponse {
  user: {
    id: number;
    email: number;
  } | null;
  accessToken: string;
  refreshToken?: string;
}

export interface IAuthLoginFields {
  email: string;
  password: string;
}

export interface IAuthRegisterFields extends IAuthLoginFields {
  name: string;
  surname: string;
}
export interface IAuthInitialState extends IAuthResponse {
  isLoading: boolean;
}
