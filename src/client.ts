import { EventEmitter } from 'events';
import got, { Options } from 'got';
import { getAuthorizationHeader, Credentials } from './helpers';

export class ImgurClient extends EventEmitter {
  constructor(readonly credentials: Credentials) {
    super();
  }

  async request(options: Options): Promise<any> {
    try {
      return await got(options);
    } catch (err) {
      throw new Error(err);
    }
  }

  async authorizedRequest(options: Options): Promise<any> {
    try {
      const authorization = await getAuthorizationHeader(this);
      const mergedOptions = got.mergeOptions(options, {
        headers: { authorization },
        responseType: 'json',
        resolveBodyOnly: true,
      });
      return await this.request(mergedOptions);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
