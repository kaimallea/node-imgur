import { EventEmitter } from 'events';
import { IncomingMessage } from 'http';
import got, { ExtendOptions } from 'got';
import { getAuthorizationHeader, Credentials } from './helpers';
import { getImage, upload, Payload } from './image';

type ImgurResponse = {
  data?: any;
  success?: boolean;
  status?: number;
};

export class ImgurClient extends EventEmitter {
  constructor(readonly credentials: Credentials) {
    super();
  }

  async request(options: ExtendOptions): Promise<IncomingMessage> {
    try {
      return (await got(options)) as IncomingMessage;
    } catch (err) {
      throw new Error(err);
    }
  }

  async authorizedRequest(options: ExtendOptions): Promise<ImgurResponse> {
    try {
      const authorization = await getAuthorizationHeader(this);
      const mergedOptions = got.mergeOptions(options, {
        headers: { authorization },
        responseType: 'json',
        resolveBodyOnly: true,
      });
      return (await this.request(mergedOptions)) as ImgurResponse;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getImage(imageHash: string) {
    return getImage(this, imageHash);
  }

  async upload(payload: string | string[] | Payload | Payload[]) {
    return upload(this, payload);
  }
}
