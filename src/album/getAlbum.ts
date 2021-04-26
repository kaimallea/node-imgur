import { ImgurClient } from '../client';
import { ALBUM_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse, AlbumData } from '../common/types';
import { getImgurApiResponseFromResponse } from '../common/utils';

export async function getAlbum(
  client: ImgurClient,
  albumHash: string
): Promise<ImgurApiResponse<AlbumData>> {
  const url = `${ALBUM_ENDPOINT}/${albumHash}`;
  return getImgurApiResponseFromResponse(
    await client.request({ url })
  ) as ImgurApiResponse<AlbumData>;
}
