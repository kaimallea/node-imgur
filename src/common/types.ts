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
interface CommonData {
  id: string;
  title: string | null;
  description: string | null;
  datetime: number;
  link: string;

  ad_type: number;
  ad_url: string;
  account_url: string | null;
  account_id: string | null;
  favorite: boolean;
  is_ad: boolean;
  in_gallery: boolean;
  in_most_viral: boolean;
  nsfw: boolean | null;
  points: number | null;
  section: string | null;
  tags: string[];
  vote: null;

  comment_count: number | null;
  favorite_count: number | null;
  ups: number | null;
  downs: number | null;
  score: number | null;
  views: number;
}
export interface ImageData extends CommonData {
  type: string;
  width: number;
  height: number;
  size: number;
  bandwidth: number;
  animated: boolean;
  has_sound: boolean;
  edited: string;
}

export interface GalleryData extends CommonData {
  cover: string | null;
  cover_width: number | null;
  cover_height: number | null;
  layout: string;
  privacy: string;
  is_album: boolean;
  topic: string | null;
  topic_id: string | null;
  include_album_ads: boolean;
  images: ImageData[];
  images_count: number;
  ad_config: {
    safeFlags: string[];
    highRiskFlags: string[];
    unsafeFlags: string[];
    wallUnsafeFlags: string[];
    showsAds: boolean;
  };
}

export interface ImgurApiResponse {
  data: Record<string, unknown> | Record<string, unknown>[] | string | boolean;
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
