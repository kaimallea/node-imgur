import { ImgurClient } from '../client';
import { UPLOAD_ENDPOINT } from '../helpers';
import { createReadStream } from 'fs';
import FormData from 'form-data';

export interface Payload {
  image?: string;
  video?: string;
  type?: 'file' | 'url' | 'base64';
  name?: string;
  title?: string;
  description?: string;
  album?: string;
  disable_audio?: '1' | '0';
}

function createForm(file: string | Payload) {
  const form = new FormData();

  if (typeof file === 'string') {
    form.append('image', createReadStream(file));
    return form;
  }

  for (const [key, value] of Object.entries(file)) {
    if (key === 'image' || key === 'video') {
      form.append(key, createReadStream(value));
    } else {
      form.append(key, value);
    }
  }
  return form;
}

export async function upload(
  client: ImgurClient,
  payload: string | string[] | Payload | Payload[]
) {
  if (Array.isArray(payload)) {
    const promises = payload.map((p: string | Payload) => {
      const form = createForm(p);
      return client.authorizedRequest({
        url: UPLOAD_ENDPOINT,
        method: 'POST',
        body: form,
      });
    });
    return await Promise.all(promises);
  }

  const form = createForm(payload);
  return await client.authorizedRequest({
    url: UPLOAD_ENDPOINT,
    method: 'POST',
    body: form,
  });
}
