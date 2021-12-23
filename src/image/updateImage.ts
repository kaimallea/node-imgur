import { ImgurClient } from '../client';
import { IMAGE_ENDPOINT } from '../common/endpoints';
import { createForm, getImgurApiResponseFromResponse } from '../common/utils';
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
      /* eslint no-async-promise-executor: 0 */
      return new Promise(async function (resolve) {
        return resolve(
          getImgurApiResponseFromResponse(
            await client.request({
              url,
              method: 'POST',
              data: form,
              headers: form.getHeaders(),
            })
          ) as ImgurApiResponse<boolean>
        );
      }) as Promise<ImgurApiResponse<boolean>>;
    });

    return await Promise.all(promises).then();
  }

  if (!isValidUpdatePayload(payload)) {
    throw new Error('Update requires a title and/or description');
  }

  const url = `${IMAGE_ENDPOINT}/${payload.imageHash}`;
  const form = createForm(payload);
  return getImgurApiResponseFromResponse(
    await client
      .request({
        url,
        method: 'POST',
        data: form,
        headers: form.getHeaders(),
      })
      .catch((e) => e)
  ) as ImgurApiResponse<boolean>;
}
