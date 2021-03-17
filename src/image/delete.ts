import { Client } from '../client';
import { PathLike } from 'fs';
import { IMAGE_URI } from '../endpoints';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';

type ImageHash = PathLike;

export default async function deleteImage(
  client: Client,
  imageHash: ImageHash,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${DELETE_IMAGE_URI}${imageHash}`);
}
