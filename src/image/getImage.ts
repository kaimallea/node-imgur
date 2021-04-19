import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse, ImageData } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function getImage(
  client: ImgurClient,
  imageHash: string
): Promise<ImgurApiResponse<ImageData>> {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return getImgurApiResponseFromResponse(
    await client.request({ url })
  ) as ImgurApiResponse<ImageData>;
}
