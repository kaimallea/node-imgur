import { EventEmitter } from 'events';
import got, { ExtendOptions, Got } from 'got';
import { getAuthorizationHeader, Credentials } from './helpers';
import { deleteImage, getImage, upload, Payload } from './image';
import { IMGUR_API_PREFIX } from './helpers';

type ImgurApiResponse = {
  data: Record<string, unknown>;
  status: number;
  success: boolean;
};

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

  async deleteImage(imageHash: string) {
    return deleteImage(this, imageHash);
  }

  async getImage(imageHash: string) {
    return getImage(this, imageHash);
  }

  async upload(payload: string | string[] | Payload | Payload[]) {
    return upload(this, payload);
  }
}
