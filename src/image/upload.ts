import { Client } from '../client';
import createForm from '../helpers/createForm';
import FormData from 'form-data';
import { PathLike, createReadStream } from 'fs';
import { UPLOAD_URI } from '../endpoints';

type Image = PathLike;
type Video = PathLike;

export interface UploadRequestBody {
  image?: Image;
  video?: Video;
  album?: string;
  type?: string;
  name?: string;
  title?: string;
  description?: string;
  disable_audio?: number;
}

export interface AuthenticationRequiredResponse {
  data: any;
  success: false;
  status: 401;
}

export interface UploadSuccessResponse {
  data: any;
  success: true;
  status: 200;
}

export async function upload(
  client: Client,
  body: UploadRequestBody | FormData
): Promise<UploadSuccessResponse | AuthenticationRequiredResponse> {
  let form;
  if (!(body instanceof FormData)) {
    const {
      image = '',
      video = '',
      album = '',
      type = 'file',
      name = '',
      description = '',
      disable_audio = 1,
    } = body;

    if (!image && !video) {
      return Promise.reject(new Error('No image or video specified'));
    }

    form = createForm();

    if (video) {
      form.append('video', type === 'base64' ? video : createReadStream(video));
    } else {
      form.append('image', type === 'base64' ? image : createReadStream(image));
    }

    album && form.append('album', album);
    type && form.append('type', type);
    name && form.append('name', name);
    description && form.append('description', description);
    video &&
      typeof disable_audio === 'number' &&
      form.append('disable_audio', disable_audio);
  } else {
    form = body;
  }

  return client.post(UPLOAD_URI, form);
}
