import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';

export interface ImageResponse {
  data?: {
    id?: string;
    title?: string | null;
    description?: string | null;
    datetime?: number;
    type?: string;
    animated?: boolean;
    width?: number;
    height?: number;
    size?: number;
    views?: number;
    bandwidth?: number;
    vote?: boolean | null;
    favorite?: boolean;
    nsfw?: boolean;
    section?: string | null;
    account_url?: string | null;
    account_id?: string | null;
    is_ad?: boolean;
    in_most_viral?: boolean;
    has_sound?: boolean;
    tags?: string[];
    ad_type?: number;
    ad_url?: string;
    edited?: string;
    in_gallery?: string;
    link?: string;
    ad_config?: {
      safeFlags?: string[];
      highRiskFlags?: string[];
      unsafeFlags?: string[];
      wallUnsafeFlags?: string[];
      showsAds?: boolean;
    };
  };
  success?: boolean;
  status?: number;
}

export async function getImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImageResponse> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return (await client.request(url).json()) as ImageResponse;
}
