import { ImgurClient } from '../client';
import { ALBUM_ENDPOINT } from '../common/endpoints';
import { ImgurApiResponse, AlbumData } from '../common/types';

export async function getAlbum(
  client: ImgurClient,
  albumHash: string
): Promise<ImgurApiResponse<AlbumData>> {
  const url = `${ALBUM_ENDPOINT}/${albumHash}`;
  return (await client.request(url).json()) as ImgurApiResponse<AlbumData>;
}
