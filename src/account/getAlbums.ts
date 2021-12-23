import { ImgurClient } from '../client';
import { ACCOUNT_ENDPOINT } from '../common/endpoints';
import { AlbumData, ImgurApiResponse } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function getAlbums(
  client: ImgurClient,
  account: string,
  page?: number
): Promise<ImgurApiResponse<AlbumData[]>> {
  const url = `${ACCOUNT_ENDPOINT}/${account}/albums/${page ?? ''}`;
  return getImgurApiResponseFromResponse(
    await client.request({ url }).catch(e => e.response)
  ) as ImgurApiResponse<AlbumData[]>;
}
