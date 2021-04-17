import { ImgurClient } from '../client';
import {
  SUBREDDIT_GALLERY_ENDPOINT,
  IMGUR_API_PREFIX,
} from '../common/endpoints';
import { ImgurApiResponse, GalleryData } from '../common/types';
import { URL } from 'url';
import { getImgurApiResponseFromResponse } from '../common/utils';

export type TimeOptions = {
  subreddit: string;
  sort?: 'time';
  page?: number;
};

export type TopOptions = Omit<TimeOptions, 'sort'> & {
  sort?: 'top';
  window?: 'day' | 'week' | 'month' | 'year' | 'all';
};

export type SubredditGalleryOptions = TimeOptions | TopOptions;

export function constructSubredditGalleryUrl(
  options: SubredditGalleryOptions
): URL {
  let uri = `${options.subreddit}`;

  if (options.sort) {
    uri += `/${options.sort}`;
  }

  if (options.sort === 'top' && options.window) {
    uri += `/${options.window}`;
  }

  if (options.page) {
    uri += `/${options.page}`;
  }

  const url = new URL(
    `${IMGUR_API_PREFIX}/${SUBREDDIT_GALLERY_ENDPOINT}/${uri}`
  );

  return url;
}

export async function getSubredditGallery(
  client: ImgurClient,
  options: SubredditGalleryOptions
): Promise<ImgurApiResponse<GalleryData>> {
  const { pathname } = constructSubredditGalleryUrl(options);
  // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
  const finalPathname = pathname.slice(1);

  return getImgurApiResponseFromResponse(await client.request({ url: finalPathname })) as ImgurApiResponse<GalleryData>;
}
