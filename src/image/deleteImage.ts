import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../helpers';

type DeleteResponse = {
  data: true;
  success: true;
  status: 200;
};

export async function deleteImage(client: ImgurClient, imageHash: string) {
  const url = `${IMAGE_ENDPOINT}/${imageHash}`;
  return (await client
    .request(url, { method: 'DELETE' })
    .json()) as DeleteResponse;
}
