import { ACCOUNT_URI } from '../endpoints';

/**
 * Accepts username of account to
 * be unblocked and returns the constructed unblocked URL endpoint
 *
 * @param username
 * @returns https://api.imgur.com/account/v1/{{username}}/block
 */

const createUnblockUrl = (username: string) => {
  return `${ACCOUNT_URI}${username}/block`;
};

export default createUnblockUrl;
