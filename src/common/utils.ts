import { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { ImgurApiResponse, Payload } from './types';
import { Readable } from 'stream';

export function isBase64(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false;
  }

  return typeof payload.base64 !== 'undefined' && payload.type === 'base64';
}

export function isImageUrl(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return true;
  }

  return typeof payload.image !== 'undefined' && payload.type === 'url';
}

export function isStream(payload: string | Payload): boolean {
  if (typeof payload === 'string') {
    return false;
  }

  return typeof payload.stream !== 'undefined';
}

// TODO: Refactor this to be a unique name of some kind (a hash?)
export function getSource(payload: string | Payload): string | Readable {
  if (typeof payload === 'string') {
    return payload;
  }

  if (isBase64(payload)) {
    return 'payload.base64' as string;
  } else if (isStream(payload)) {
    return 'payload.stream' as string;
  } else {
    return payload.image as string;
  }
}

export function createForm(payload: string | Payload): FormData {
  const form = new FormData();

  if (typeof payload === 'string') {
    form.append('image', payload);
    return form;
  }

  for (const [key, value] of Object.entries(payload)) {
    const supportedUploadObjectTypes = ['base64', 'stream'];
    if (supportedUploadObjectTypes.indexOf(key) !== -1) {
      if (supportedUploadObjectTypes.indexOf(payload.type as string) !== -1) {
        form.append(key, payload);
      }
    } else {
      form.append(key, value);
    }
  }
  return form;
}

export function getImgurApiResponseFromResponse(
  response: AxiosResponse | string
): ImgurApiResponse {
  let success = true;
  let data;
  let status = 200;

  if (typeof response === 'string') {
    data = response as string;
    status = 500;
    success = false;
  } else if (
    typeof response?.data?.status !== 'undefined' &&
    typeof response?.data?.success !== 'undefined'
  ) {
    success = response.data.success;
    status = response.data.status;
    data = response.data.data?.error ? response.data.data?.error : response.data.data;
  } else {
    status = response.status;
    data = response.data;
  }

  return {
    data,
    status,
    success,
  };
}
