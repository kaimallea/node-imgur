import { EventEmitter } from 'events';
import got, { ExtendOptions, Got } from 'got';
import { getAuthorizationHeader } from './getAuthorizationHeader';
import {
  deleteImage,
  favoriteImage,
  getImage,
  upload,
  updateImage,
  UpdateImagePayload,
} from './image';
import { IMGUR_API_PREFIX } from './common/endpoints';
import { Credentials, Payload } from './common/types';

const USERAGENT = 'imgur/next (https://github.com/kaimallea/node-imgur)';

export class ImgurClient extends EventEmitter {
  private got: Got;
  private gotExtended: Got;
  constructor(readonly credentials: Credentials) {
    super();
    this.got = got.extend();
    this.gotExtended = this.got.extend({
      prefixUrl: IMGUR_API_PREFIX,
      headers: {
        'user-agent': USERAGENT,
      },
      responseType: 'json',
      hooks: {
        beforeRequest: [
          async (options) => {
            options.headers['authorization'] = await getAuthorizationHeader(
              this
            );
          },
        ],
      },
    });
  }

  plainRequest(url: string, options: ExtendOptions = {}) {
    return this.got.extend(options)(url);
  }

  request(url: string, options: ExtendOptions = {}) {
    return this.gotExtended.extend(options)(url);
  }

  deleteImage(imageHash: string) {
    return deleteImage(this, imageHash);
  }

  favoriteImage(imageHash: string) {
    return favoriteImage(this, imageHash);
  }

  getImage(imageHash: string) {
    return getImage(this, imageHash);
  }

  updateImage(payload: UpdateImagePayload | UpdateImagePayload[]) {
    return updateImage(this, payload);
  }

  upload(payload: string | string[] | Payload | Payload[]) {
    return upload(this, payload);
  }
}
