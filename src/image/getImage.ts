import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse, ImageData } from '../common/types';

export async function getImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImgurApiResponse<ImageData>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return (await client.request(url).json()) as ImgurApiResponse<ImageData>;
}
