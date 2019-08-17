import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { DELETE_ALBUM_URI } from '../endpoints';

export default async function deleteAlbum(
  client: Client,
  albumHash: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${DELETE_ALBUM_URI}${albumHash}`);
}
