import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { DELETE_IMAGE_FROM_GALLERY_URI } from '../endpoints';

export default async function deleteFromGallery(
  client: Client,
  galleryHash: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${DELETE_IMAGE_FROM_GALLERY_URI}${galleryHash}`);
}
