import { ALBUM_URI } from '../endpoints';

/**
 * Accepts albumHash and returns the constructed favorite image URL endpoint
 * @param albumHash
 * @returns https://api.imgur.com/3/image/{{albumHash}}/favorite

 */

const createFavoriteAlbumUrl = (albumHash: string) => {
  return `${ALBUM_URI}${albumHash}/favorite`;
};

export default createFavoriteAlbumUrl;
