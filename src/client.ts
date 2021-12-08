import { EventEmitter } from 'events';
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
import { getAlbum } from './album';
import { getAlbums, getAlbumsIds } from './account';
import { IMGUR_API_PREFIX } from './common/endpoints';
import {
  AlbumData,
  Credentials,
  GalleryData,
  ImageData,
  ImgurApiResponse,
  Payload,
} from './common/types';

const USERAGENT = 'imanagur (https://github.com/keneucker/imanagur-core)';

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export type { Credentials as ImgurCredentials, ImgurApiResponse };
export class ImgurClient extends EventEmitter {
  private plainFetcher: AxiosInstance;
  private fetcher: AxiosInstance;

  constructor(readonly credentials: Credentials) {
    super();
    const headers =
      typeof window !== 'undefined'
        ? {}
        : {
            'user-agent': USERAGENT,
          };

    this.plainFetcher = axios.create({
      baseURL: IMGUR_API_PREFIX,
      headers,
      responseType: 'json',
    });
    this.fetcher = axios.create({
      baseURL: IMGUR_API_PREFIX,
      headers,
      responseType: 'json',
    });
    this.fetcher.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.headers = config.headers ? config.headers : {};
        config.headers.authorization = await getAuthorizationHeader(this);
        return config;
      },
      (e: Error) => Promise.reject(e)
    );
  }

  plainRequest(options: AxiosRequestConfig): Promise<AxiosResponse<unknown>> {
    return this.plainFetcher(options);
  }

  request(options: AxiosRequestConfig = {}): Promise<AxiosResponse<unknown>> {
    return this.fetcher(options);
  }

  deleteImage(imageHash: string): Promise<ImgurApiResponse<boolean>> {
    return deleteImage(this, imageHash);
  }

  favoriteImage(imageHash: string): Promise<ImgurApiResponse<string>> {
    return favoriteImage(this, imageHash);
  }

  getAlbum(albumHash: string): Promise<ImgurApiResponse<AlbumData>> {
    return getAlbum(this, albumHash);
  }

  getAlbums(
    account: string,
    page?: number
  ): Promise<ImgurApiResponse<AlbumData[]>> {
    return getAlbums(this, account, page);
  }

  getAlbumsIds(
    account: string,
    page?: number
  ): Promise<ImgurApiResponse<string[]>> {
    return getAlbumsIds(this, account, page);
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
