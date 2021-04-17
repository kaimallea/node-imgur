import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse } from '../common/types';

export async function deleteImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImgurApiResponse<boolean>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return (await client
    .request(url, { method: 'DELETE' })
    .json()) as ImgurApiResponse<boolean>;
}
