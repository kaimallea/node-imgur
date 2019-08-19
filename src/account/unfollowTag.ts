import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { UNFOLLOW_TAG_URI } from '../endpoints';

export default async function unfollowTag(
  client: Client,
  tagName: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${UNFOLLOW_TAG_URI}${tagName}`);
}
