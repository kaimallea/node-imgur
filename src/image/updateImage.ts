import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { createForm } from '../common/utils';
import { Payload, ImgurApiResponse } from '../common/types';

export interface UpdateImagePayload
  extends Pick<Payload, 'title' | 'description'> {
  imageHash: string;
}

function isValidUpdatePayload(p: UpdateImagePayload) {
  return typeof p.title === 'string' || typeof p.description === 'string';
}

export async function updateImage(
  client: ImgurClient,
  payload: UpdateImagePayload | UpdateImagePayload[]
): Promise<ImgurApiResponse<boolean> | ImgurApiResponse<boolean>[]> {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: UpdateImagePayload) => {
      if (!isValidUpdatePayload(p)) {
        throw new Error('Update requires a title and/or description');
      }

      const url = `${IMAGE_ENDPOINT}/${p.imageHash}`;
      const form = createForm(p);
      return (client.request(url, {
        method: 'POST',
        body: form,
        resolveBodyOnly: true,
      }) as unknown) as Promise<ImgurApiResponse<boolean>>;
    });

    return await Promise.all(promises);
  }

  if (!isValidUpdatePayload(payload)) {
    throw new Error('Update requires a title and/or description');
  }

  const url = `${IMAGE_ENDPOINT}/${payload.imageHash}`;
  const form = createForm(payload);
  return ((await client.request(url, {
    method: 'POST',
    body: form,
    resolveBodyOnly: true,
  })) as unknown) as ImgurApiResponse<boolean>;
}
