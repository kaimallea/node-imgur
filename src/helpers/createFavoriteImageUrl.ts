import { IMAGE_URI } from '../endpoints';

/**
 * Accepts imageHash and returns the constructed favorite image URL endpoint
 * @param imageHash
 * @returns https://api.imgur.com/3/image/{{imageHash}}/favorite

 */

const createFavoriteImageUrl = (imageHash: string) => {
  return `${IMAGE_URI}${imageHash}/favorite`;
};

export default createFavoriteImageUrl;
