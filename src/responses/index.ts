export type ImgurApiResponse = {
  data: {
    [key: string]: any | undefined;
  };
  success: boolean;
  status: number;
};

export type InvalidRefreshTokenResponse = ImgurApiResponse & {
  success: boolean;
  status: 400;
};

export type AuthenticationRequiredResponse = ImgurApiResponse & {
  success: boolean;
  status: 401;
};

export type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: 'bearer';
  scope: string;
  refresh_token: string;
  account_id: number;
  account_username: string;
};

export type UploadSuccessResponse = ImgurApiResponse & {
  data: {
    id: string;
    title: string | null;
    description: string | null;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: any | null;
    favorite: boolean;
    nsfw: any | null;
    section: any | null;
    account_url: string | null;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    has_sound: boolean;
    tags: string[];
    ad_type: number;
    ad_url: string;
    edited: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  };
  success: true;
  status: 200;
};
