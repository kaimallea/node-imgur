import { createReadStream } from 'fs';
import FormData from 'form-data';
import { Payload } from './types';

export function isVideo(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false;
  }

  return typeof payload.video === 'string';
}

export function getSource(payload: string | Payload): string {
  if (typeof payload === 'string') {
    return payload;
  }

  if (isVideo(payload)) {
    return payload.video as string;
  } else {
    return payload.image as string;
  }
}

export function createForm(payload: string | Payload): FormData {
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
