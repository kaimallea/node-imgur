import { ImgurClient } from '../client';
import { ACCOUNT_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function getAlbumsIds(
  client: ImgurClient,
  account: string,
  page?: number
): Promise<ImgurApiResponse<string[]>> {
  const url = `${ACCOUNT_ENDPOINT}/${account}/albums/ids/${page ?? ''}`;
  return getImgurApiResponseFromResponse(
    await client.request({ url }).catch(e => e.response)
  ) as ImgurApiResponse<string[]>;
}
