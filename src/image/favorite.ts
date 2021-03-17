import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import createFavoriteImageUrl from '../helpers/createFavoriteImageUrl';

export default async function favorite(
  client: Client,
  imageHash: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.post(createFavoriteImageUrl(imageHash), {});
}
