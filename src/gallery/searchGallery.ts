import { ImgurClient } from '../client';
import { SEARCH_GALLERY_ENDPOINT, IMGUR_API_PREFIX } from '../common/endpoints';
import { ImgurApiResponse, GalleryData } from '../common/types';
import { URL } from 'url';

export type SearchOptions = {
  q?: string;
  query?: string;
  sort?: 'time' | 'viral';
  page?: number;
};

export type TopSearchOptions = Omit<SearchOptions, 'sort'> & {
  sort?: 'top';
  window?: 'day' | 'week' | 'month' | 'year' | 'all';
};

export type AdvancedSearchQueryParameters = {
  q_all?: string;
  q_any?: string;
  q_exactly?: string;
  q_not?: string;
  q_type?: 'jpg' | 'png' | 'gif' | 'anigif' | 'album';
  q_size_px?: 'small' | 'med' | 'big' | 'lrg' | 'huge';
};

const advancedParameters: Array<keyof AdvancedSearchQueryParameters> = [
  'q_all',
  'q_any',
  'q_exactly',
  'q_not',
  'q_type',
  'q_size_px',
];

export type SearchGalleryOptions = (SearchOptions | TopSearchOptions) &
  AdvancedSearchQueryParameters;

export function constructSearchGalleryUrl(options: SearchGalleryOptions): URL {
  let uri = '';

  if (options.sort) {
    uri += `/${options.sort}`;
  }

  if (options.sort === 'top' && options.window) {
    uri += `/${options.window}`;
  }

  if (options.page) {
    uri += `/${options.page}`;
  }

  const url = new URL(`${IMGUR_API_PREFIX}/${SEARCH_GALLERY_ENDPOINT}${uri}`);

  advancedParameters.forEach((param) => {
    if (options[param]?.length) {
      url.searchParams.append(param, options[param] as string);
    }
  });

  if (!url.search) {
    const query = options.q || options.query;
    if (!query) {
      throw new Error('No query was provided');
    }

    url.searchParams.append('q', query);
  }

  return url;
}

export async function searchGallery(
  client: ImgurClient,
  options: SearchGalleryOptions
): Promise<ImgurApiResponse<GalleryData>> {
  const { pathname } = constructSearchGalleryUrl(options);
  // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
  const finalPathname = pathname.slice(1);

  return (await client
    .request(finalPathname)
    .json()) as ImgurApiResponse<GalleryData>;
}
