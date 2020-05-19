import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { ALBUM_URI } from '../endpoints';

export default async function deleteAlbum(
  client: Client,
  albumHash: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${ALBUM_URI}${albumHash}`);
}
