import { ImgurClient } from '../client';
import { GALLERY_ENDPOINT, IMGUR_API_PREFIX } from '../common/endpoints';
import { ImgurApiResponse, GalleryData } from '../common/types';

export type CommonSectionProps = {
  sort?: 'viral' | 'top' | 'time';
  page?: number;
};

export type HotSection = CommonSectionProps & {
  section: 'hot';
};

export type TopSection = CommonSectionProps & {
  section: 'top';
  window?: 'day' | 'week' | 'month' | 'year' | 'all';
};

export type UserSection = Omit<CommonSectionProps, 'sort'> & {
  section: 'user';
  sort?: 'viral' | 'top' | 'time' | 'rising';
};

export type SectionOptions = HotSection | TopSection | UserSection;

export type PresentationOptions = {
  showViral?: boolean;
  mature?: boolean;
  album_previews?: boolean;
};

export type GalleryOptions = SectionOptions & PresentationOptions;

const defaultOptions: GalleryOptions = {
  section: 'hot',
  sort: 'viral',
};

export function constructGalleryUrl(options: GalleryOptions) {
  const mergedOptions = Object.assign({}, defaultOptions, options);

  let uri = `${mergedOptions.section}`;

  if (mergedOptions.sort) {
    uri += `/${mergedOptions.sort}`;
  }

  if (mergedOptions.section === 'top' && mergedOptions.window) {
    uri += `/${mergedOptions.window}`;
  }

  if (mergedOptions.page) {
    uri += `/${mergedOptions.page}`;
  }

  const url = new URL(`${IMGUR_API_PREFIX}/${GALLERY_ENDPOINT}/${uri}`);

  if (mergedOptions.showViral !== undefined) {
    url.searchParams.append('showViral', mergedOptions.showViral.toString());
  }

  if (mergedOptions.mature !== undefined) {
    url.searchParams.append('mature', mergedOptions.mature.toString());
  }

  if (mergedOptions.album_previews !== undefined) {
    url.searchParams.append(
      'album_previews',
      mergedOptions.album_previews.toString()
    );
  }

  return url;
}

export async function getGallery(
  client: ImgurClient,
  options: GalleryOptions = defaultOptions
) {
  const { pathname } = constructGalleryUrl(options);
  // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
  const finalPathname = pathname.slice(1);

  return (await client
    .request(finalPathname)
    .json()) as ImgurApiResponse<GalleryData>;
}
