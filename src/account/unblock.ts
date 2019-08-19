import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { createUnblockUrl } from '../helpers/';

export default async function unblock(
  client: Client,
  username: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${createUnblockUrl(username)}`);
}
