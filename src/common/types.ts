export interface AccessToken {
  accessToken: string;
}

export interface ClientId {
  clientId: string;
}

export interface Login extends ClientId {
  username: string;
  password: string;
}

export type Credentials = AccessToken | ClientId | Login;

export function isAccessToken(arg: any): arg is AccessToken {
  return arg.accessToken !== undefined;
}

export function isClientId(arg: any): arg is ClientId {
  return arg.clientId !== undefined;
}

export function isLogin(arg: any): arg is Login {
  return (
    arg.clientId !== undefined &&
    arg.username !== undefined &&
    arg.password !== undefined
  );
}

export interface ImgurApiResponse {
  data: Record<string, unknown> | string | boolean;
  status: number;
  success: boolean;
}

export interface Payload {
  image?: string;
  video?: string;
  type?: 'file' | 'url' | 'base64';
  name?: string;
  title?: string;
  description?: string;
  album?: string;
  disable_audio?: '1' | '0';
}
