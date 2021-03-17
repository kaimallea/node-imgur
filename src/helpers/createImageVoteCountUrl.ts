import { IMAGE_VOTES_URI } from '../endpoints';

/**
 * Accepts galleryHash of a gallery to
 * get the vote count
 *
 * @param galleryHash
 * @returns https://api.imgur.com/3/gallery/{{galleryHash}}/votes
 */

const createImageCountUrl = (galleryHash: string) => {
  return `${IMAGE_VOTES_URI}${galleryHash}/votes`;
};

export default createImageCountUrl;
