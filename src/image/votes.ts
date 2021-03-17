import { Client } from '../client';
import { createImageVoteCountUrl } from '../helpers';
import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';

type GalleryHash = string;

export async function votes(
  client: Client,
  galleryHash: GalleryHash,
): Promise<ImgurApiResponse | AuthenticationRequiredResponse> {
  return client.get(createImageVoteCountUrl(galleryHash));
}
