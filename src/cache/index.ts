import { ImgurApiResponse, AuthenticationRequiredResponse } from '../responses';

const LRU = require('lru-cache');

const options = {
  length: function(n: number, key: any) {
    return n * 2 + key.length;
  },
  maxAge: 1000 * 30 * 30,
};

export const cache = new LRU(options);

export const cacheGet = (key: string) => {
  return cache.get(key) || false;
};

export const cacheSet = (
  key: string,
  res: Promise<ImgurApiResponse | AuthenticationRequiredResponse>,
) => {
  cache.set(key, JSON.stringify(res));
  return res;
};
