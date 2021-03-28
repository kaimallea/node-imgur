import { ImgurClient } from '../client';
import { createForm, getSource, Payload, UPLOAD_ENDPOINT } from '../helpers';
import { Progress } from 'got';

export async function upload(
  client: ImgurClient,
  payload: string | string[] | Payload | Payload[]
) {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      const form = createForm(p);
      const req = client.request(UPLOAD_ENDPOINT, {
        method: 'POST',
        body: form,
        resolveBodyOnly: true,
      });

      const id = getSource(p);
      req.on('uploadProgress', (progress: Progress) => {
        client.emit('uploadProgress', { ...progress, id });
      });

      return req;
    });
    return await Promise.all(promises);
  }

  const form = createForm(payload);
  const req = client.request(UPLOAD_ENDPOINT, {
    method: 'POST',
    body: form,
    resolveBodyOnly: true,
  });

  const id = getSource(payload);
  req.on('uploadProgress', (progress) => {
    client.emit('uploadProgress', { ...progress, id });
  });

  return await req;
}
