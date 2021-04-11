import { EventEmitter } from 'events';
import got, { CancelableRequest, ExtendOptions, Response, Got } from 'got';
import { getAuthorizationHeader } from './getAuthorizationHeader';
import {
  deleteImage,
  favoriteImage,
  getImage,
  upload,
  updateImage,
  UpdateImagePayload,
} from './image';
import {
  GalleryOptions,
  getGallery,
  getSubredditGallery,
  SubredditGalleryOptions,
  searchGallery,
  SearchGalleryOptions,
} from './gallery';
import { IMGUR_API_PREFIX } from './common/endpoints';
import {
  Credentials,
  GalleryData,
  ImageData,
  ImgurApiResponse,
  Payload,
} from './common/types';

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

  plainRequest(
    url: string,
    options: ExtendOptions = {}
  ): CancelableRequest<Response<unknown>> {
    return this.got.extend(options)(url);
  }

  request(
    url: string,
    options: ExtendOptions = {}
  ): CancelableRequest<Response<string>> {
    return this.gotExtended.extend(options)(url);
  }

  deleteImage(imageHash: string): Promise<ImgurApiResponse<boolean>> {
    return deleteImage(this, imageHash);
  }

  favoriteImage(imageHash: string): Promise<ImgurApiResponse<string>> {
    return favoriteImage(this, imageHash);
  }

  getGallery(options: GalleryOptions): Promise<ImgurApiResponse<GalleryData>> {
    return getGallery(this, options);
  }

  getSubredditGallery(
    options: SubredditGalleryOptions
  ): Promise<ImgurApiResponse<GalleryData>> {
    return getSubredditGallery(this, options);
  }

  searchGallery(
    options: SearchGalleryOptions
  ): Promise<ImgurApiResponse<GalleryData>> {
    return searchGallery(this, options);
  }

  getImage(imageHash: string): Promise<ImgurApiResponse<ImageData>> {
    return getImage(this, imageHash);
  }

  updateImage(
    payload: UpdateImagePayload | UpdateImagePayload[]
  ): Promise<ImgurApiResponse<boolean> | ImgurApiResponse<boolean>[]> {
    return updateImage(this, payload);
  }

  upload(
    payload: string | string[] | Payload | Payload[]
  ): Promise<ImgurApiResponse<ImageData> | ImgurApiResponse<ImageData>[]> {
    return upload(this, payload);
  }
}
