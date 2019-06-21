import { Client } from '../client';
import createForm from '../helpers/createForm';
import FormData from 'form-data';
import { PathLike, createReadStream } from 'fs';
import { UPLOAD_URI } from '../endpoints';
import {
  UploadSuccessResponse,
  AuthenticationRequiredResponse,
} from '../responses';

type Image = PathLike;
type Video = PathLike;

export type UploadRequestBody = {
  image?: Image;
  video?: Video;
  album?: string;
  type?: string;
  name?: string;
  title?: string;
  description?: string;
  disable_audio?: number;
};

export async function upload(
  client: Client,
  body: UploadRequestBody | FormData,
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
      disable_audio = 1, // eslint-disable-line @typescript-eslint/camelcase
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

    album && form.append('album', album); // eslint-disable-line no-unused-expressions
    type && form.append('type', type); // eslint-disable-line no-unused-expressions
    name && form.append('name', name); // eslint-disable-line no-unused-expressions
    description && form.append('description', description); // eslint-disable-line no-unused-expressions
    video && // eslint-disable-line no-unused-expressions
    typeof disable_audio === 'number' && // eslint-disable-line @typescript-eslint/camelcase
      form.append('disable_audio', disable_audio); // eslint-disable-line no-unused-expressions
  } else {
    form = body;
  }

  return client.post(UPLOAD_URI, form);
}
