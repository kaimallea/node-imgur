import { ImgurClient } from '../client';
import { createForm, IMAGE_ENDPOINT, Payload } from '../helpers';

export type UpdateImagePayload = { imageHash: string } & Pick<
  Payload,
  'title' | 'description'
>;

function isValidUpdatePayload(p: UpdateImagePayload) {
  return typeof p.title === 'string' || typeof p.description === 'string';
}

export async function updateImage(
  client: ImgurClient,
  payload: UpdateImagePayload | UpdateImagePayload[]
) {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: UpdateImagePayload) => {
      if (!isValidUpdatePayload(p)) {
        throw new Error('Update requires a title and/or description');
      }

      const url = `${IMAGE_ENDPOINT}/${p.imageHash}`;
      const form = createForm(p);
      return client.request(url, {
        method: 'POST',
        body: form,
        resolveBodyOnly: true,
      });
    });

    return await Promise.all(promises);
  }

  if (!isValidUpdatePayload(payload)) {
    throw new Error('Update requires a title and/or description');
  }

  const url = `${IMAGE_ENDPOINT}/${payload.imageHash}`;
  const form = createForm(payload);
  return await client.request(url, {
    method: 'POST',
    body: form,
    resolveBodyOnly: true,
  });
}
