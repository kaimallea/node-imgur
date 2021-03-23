import { ImgurClient } from '../client';
import { UPLOAD_ENDPOINT } from '../helpers';
import { createReadStream } from 'fs';
import FormData from 'form-data';
import { Progress } from 'got/dist/source';

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

function isVideo(payload: string | Payload) {
  if (typeof payload === 'string') {
    return false;
  }

  return typeof payload.video !== 'undefined' && payload.video;
}

function getSource(payload: string | Payload) {
  if (typeof payload === 'string') {
    return payload;
  }

  if (isVideo(payload)) {
    return payload.video;
  } else {
    return payload.image;
  }
}

function createForm(payload: string | Payload) {
  const form = new FormData();

  if (typeof payload === 'string') {
    form.append('image', createReadStream(payload));
    return form;
  }

  for (const [key, value] of Object.entries(payload)) {
    if (key === 'image' || key === 'video') {
      if (!payload.type || payload.type === 'file')
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
