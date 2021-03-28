import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';

type FavoriteResponse = {
  data: 'favorited';
  success: true;
  status: 200;
};

export async function favoriteImage(client: ImgurClient, imageHash: string) {
  const url = `${IMAGE_ENDPOINT}/${imageHash}/favorite`;
  return (await client
    .request(url, { method: 'POST' })
    .json()) as FavoriteResponse;
}
