import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import createFavoriteAlbumUrl from '../helpers/createFavoriteAlbumUrl';

export default async function favorite(
  client: Client,
  albumHash: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.post(createFavoriteAlbumUrl(albumHash), {});
}
