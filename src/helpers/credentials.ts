export type AccessToken = {
  accessToken: string;
};

export type ClientId = {
  clientId: string;
};

export type Login = ClientId & {
  username: string;
  password: string;
};

export type Credentials = AccessToken | ClientId | Login;

export function isAccessToken(arg: any): arg is AccessToken {
  return arg.accessToken !== undefined;
}

export function isLogin(arg: any): arg is Login {
  return arg.username !== undefined && arg.password !== undefined;
}

export function isClientId(arg: any): arg is ClientId {
  return arg.clientId !== undefined;
}
