import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse } from '../common/types';

export async function favoriteImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImgurApiResponse<'favorited'>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}/favorite`;
  return (await client
    .request(url, { method: 'POST' })
    .json()) as ImgurApiResponse<'favorited'>;
}
