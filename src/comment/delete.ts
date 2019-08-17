import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { DELETE_COMMENT_URI } from '../endpoints';

export default async function deleteComment(
  client: Client,
  commentId: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${DELETE_COMMENT_URI}${commentId}`);
}
