import { ImgurClient } from '../client';
import {
  createForm,
  getImgurApiResponseFromResponse,
  // getSource,
} from '../common/utils';
import { Payload, ImgurApiResponse, ImageData } from '../common/types';
import { UPLOAD_ENDPOINT } from '../common/endpoints';

export async function upload(
  client: ImgurClient,
  payload: string | string[] | Payload | Payload[]
): Promise<ImgurApiResponse<ImageData> | ImgurApiResponse<ImageData>[]> {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      const form = createForm(p);

      /* eslint no-async-promise-executor: 0 */
      return new Promise(async (resolve) => {
        resolve(
          getImgurApiResponseFromResponse(
            await client.request({
              url: UPLOAD_ENDPOINT,
              method: 'POST',
              data: form,
              headers: form.getHeaders(),
              onUploadProgress: (progressEvent) => {
                console.log({ progressEvent });
                client.emit('uploadProgress', { ...progressEvent });
              },
            })
          ) as ImgurApiResponse<ImageData>
        );
      }) as Promise<ImgurApiResponse<ImageData>>;
    });
    return await Promise.all(promises);
  }

  const form = createForm(payload);
  // const id = Date.now.toString();
  const request = await client.request({
    url: UPLOAD_ENDPOINT,
    method: 'POST',
    data: form,
    headers: form.getHeaders(),
    onUploadProgress: (progressEvent) => {
      console.log({ progressEvent });
      client.emit('uploadProgress', { ...progressEvent });
    },
  });

  return Promise.resolve(
    getImgurApiResponseFromResponse(request) as ImgurApiResponse<ImageData>
  );
}
