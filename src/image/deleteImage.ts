import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function deleteImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImgurApiResponse<boolean>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return getImgurApiResponseFromResponse(
    await client.request({ url, method: 'DELETE' })
  ) as ImgurApiResponse<boolean>;
}
