import { Client } from '../client';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';
import { GALLERY_URI } from '../endpoints';

export default async function deleteFromGallery(
  client: Client,
  galleryHash: string,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.delete(`${GALLERY_URI}${galleryHash}`);
}
