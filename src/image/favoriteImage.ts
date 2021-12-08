import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function favoriteImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImgurApiResponse<'favorited'>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}/favorite`;
  return getImgurApiResponseFromResponse(
    await client.request({ url, method: 'POST' })
  ) as ImgurApiResponse<'favorited'>;
}
