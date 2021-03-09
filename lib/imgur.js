'use strict';
const imgur = exports;
const got = require('got');
const fs = require('fs');
const urlParser = require('url');
const FormData = require('form-data');
const VERSION = require('../package.json').version;

// The following client ID is tied to the
// registered 'node-imgur' app and is available
// here for public, anonymous usage via this node
// module only.
let imgurClientId = process.env.IMGUR_CLIENT_ID || 'f0ea04148a54268';
let imgurApiUrl = process.env.IMGUR_API_URL || 'https://api.imgur.com/3/';
let imgurMashapeKey = process.env.IMGUR_MASHAPE_KEY;
let imgurUsername = null;
let imgurPassword = null;
let imgurAccessToken = null;

// An IIFE that returns the OS-specific home directory
// as a location to optionally store the imgur client id
const DEFAULT_CLIENT_ID_PATH = (() => {
  const envHome = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
  return process.env[envHome] + '/.imgur';
})();

imgur.VERSION = VERSION;

/**
 * Send a request to imgur's public API
 *
 * @param   {string}  operation - operation to perform; 'info' or 'upload'
 * @param   {mixed}   payload - image data
 * @returns {promise}
 */
imgur._imgurRequest = async (operation, payload, extraFormParams) => {
  const form = new FormData();
  const options = {
    url: imgurApiUrl,
    method: null,
    encoding: 'utf8',
  };
  let response = null;

  if (
    !operation ||
    typeof operation !== 'string' ||
    (!payload && operation !== ('credits' && 'search'))
  ) {
    throw new Error('Invalid argument');
  }

  switch (operation) {
    case 'upload':
      options.method = 'POST';
      options.url += 'image';
      break;
    case 'credits':
      options.method = 'GET';
      options.url += 'credits';
      break;
    case 'info':
      options.method = 'GET';
      options.url += 'image/' + payload;
      break;
    case 'album':
      options.method = 'GET';
      options.url += 'album/' + payload;
      break;
    case 'createAlbum':
      options.method = 'POST';
      options.url += 'album';
      break;
    case 'delete':
      options.method = 'DELETE';
      options.url += 'image/' + payload;
      break;
    case 'gallery':
      options.method = 'GET';
      options.url += 'gallery/' + payload;
      break;
    case 'search':
      options.method = 'GET';
      options.url += '/gallery/search/' + payload;
      break;
    default:
      throw new Error('Invalid operation');
  }

  const authorizationHeader = await imgur._getAuthorizationHeader();

  if (imgurMashapeKey) {
    options.headers = {
      Authorization: authorizationHeader,
      'X-Mashape-Key': imgurMashapeKey,
    };
  } else {
    options.headers = {
      Authorization: authorizationHeader,
    };
  }

  if (operation === 'upload' || operation === 'update') {
    if (operation === 'upload') {
      form.append('image', payload);
    }

    if (typeof extraFormParams === 'object') {
      for (let param in extraFormParams) {
        form.append(param, extraFormParams[param]);
      }
    }

    options.body = form;
  }

  response = await imgur._request(options);
  if (response && !response.success) {
    throw new Error({
      status: response.status,
      message: response.data ? response.error : 'No body data response',
    });
  } else {
    return response.data;
  }
};

/**
 * Make a request, abstracting away the underlying logic
 *
 * @param {object} options
 * @returns {promise}
 */
imgur._request = async (options) => await got(options).json();

/**
 * Get imgur access token using credentials
 *
 * @returns {promise}
 */
imgur._getAuthorizationHeader = async () => {
  if (imgurAccessToken) {
    return `Bearer ${imgurAccessToken}`;
  }

  if (!(imgurUsername && imgurPassword)) {
    return `Client-ID ${imgurClientId}`;
  }

  const options = {
    uri: 'https://api.imgur.com/oauth2/authorize',
    method: 'GET',
    encoding: 'utf8',
    searchParams: {
      client_id: imgurClientId,
      response_type: 'token',
    },
  };

  let response;

  response = await imgur._request(options);
  const authorize_token = response.headers['set-cookie'][0].match(
    '(^|;)[s]*authorize_token=([^;]*)'
  )[2];

  options.method = 'POST';
  options.form = {
    username: imgurUsername,
    password: imgurPassword,
    allow: authorize_token,
  };
  options.headers = {
    Cookie: 'authorize_token=' + authorize_token,
  };

  response = await imgur._request(options);
  const location = response.headers.location;
  const token = JSON.parse(
    '{"' +
      decodeURI(location.slice(location.indexOf('#') + 1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
  imgurAccessToken = token.access_token;
  return `Bearer ${imgurAccessToken}`;
};

/**
 * Set your credentials
 * @link https://api.imgur.com/#register
 * @param {string} username
 * @param {string} password
 * @param {string} clientId
 */
imgur.setCredentials = (username, password, clientId) => {
  if (clientId && typeof clientId === 'string') {
    imgurClientId = clientId;
  }
  if (username && typeof username === 'string') {
    imgurUsername = username;
  }
  if (password && typeof password === 'string') {
    imgurPassword = password;
  }
};

/**
 * Attempt to load the client ID from disk
 * @param   {string}  path - path to file with client id
 * @returns {promise}
 */
imgur.loadClientId = async (path) => {
  path = path || DEFAULT_CLIENT_ID_PATH;

  fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      throw new Error(err);
    }

    if (!data) {
      throw new Error('File is empty');
    }

    return data;
  });
};

/**
 * Attempt to save the client ID to disk
 * @param   {string} path - path to save the client id to
 * @returns {promise}
 */
imgur.saveClientId = async (clientId, path) => {
  path = path || DEFAULT_CLIENT_ID_PATH;

  fs.writeFile(path, clientId, (err) => {
    if (err) {
      throw new Error(err);
    }

    return;
  });
};

/**
 * Attempt to remove a saved client ID from disk
 * NOTE: File remains but is emptied
 *
 * @param   {string} path - path to save the client id to
 * @returns {promise}
 */
imgur.clearClientId = (path) => imgur.saveClientId('', path);

/**
 * Set your client ID
 * @link https://api.imgur.com/#register
 * @param {string} clientId
 */
imgur.setClientId = (clientId) => {
  if (clientId && typeof clientId === 'string') {
    imgurClientId = clientId;
  }
};

/**
 * Get currently set client ID
 * @returns {string} client ID
 */
imgur.getClientId = () => imgurClientId;

/**
 * Set Imgur API URL
 * @link https://api.imgur.com/#register or https://imgur-apiv3.p.mashape.com
 * @param {string} url - URL to make the API calls to imgur
 */
imgur.setAPIUrl = (url) => {
  if (url && typeof url === 'string') {
    imgurApiUrl = url;
  }
};

/**
 * Get Imgur API Url
 * @returns {string} API Url
 */
imgur.getAPIUrl = () => imgurApiUrl;

/**
 * Set Mashape Key
 * @link https://market.mashape.com/imgur/imgur-9
 * @param {string} mashapeKey
 */
imgur.setMashapeKey = (mashapeKey) => {
  if (mashapeKey && typeof mashapeKey === 'string') {
    imgurMashapeKey = mashapeKey;
  }
};

/**
 * Get Mashape Key
 * @returns {string} Mashape Key
 */
imgur.getMashapeKey = () => {
  return imgurMashapeKey;
};

/**
 * Delete image
 * @param {string} deleteHash - deletehash of the image generated during upload
 * @returns {promise}
 */
imgur.deleteImage = async (deleteHash) => {
  if (!deleteHash) {
    throw new Error('Missing delete hash');
  }

  return await imgur._imgurRequest('delete', 'deleteHash');
};

/**
 * Get gallery metadata
 * @param   {string}  id - unique gallery id
 * @returns {promise}
 */
imgur.getGalleryInfo = async (id) => {
  if (!id) {
    throw new Error('Invalid gallery ID');
  }

  return await imgur._imgurRequest('gallery', id);
};

/**
 * Get image metadata
 * @param   {string}  id - unique image id
 * @returns {promise}
 */
imgur.getInfo = async (id) => {
  if (!id) {
    throw new Error('Invalid image ID');
  }

  return await imgur._imgurRequest('info', id);
};

/**
 * Create an album
 * @returns {promise}
 */
imgur.createAlbum = async () => {
  return await imgur._imgurRequest('createAlbum', 'dummy');
};

/**
 * Get album metadata
 * @param   {string}  id - unique album id
 * @returns {promise}
 */
imgur.getAlbumInfo = async (id) => {
  if (!id) {
    throw new Error('Invalid album ID');
  }

  return await imgur._imgurRequest('album', id);
};

imgur.search = async (query, options) => {
  const checkQuery = imgur.checkQuery(query);
  let params;
  options = options || {};
  if (checkQuery.constructor === Error) {
    throw new Error(checkQuery);
  } else {
    params = imgur.initSearchParams(query, options);
    const queryStr = params.queryStr;
    delete params.queryStr;

    const json = await imgur._imgurRequest('search', queryStr);
    return { data: json.data, params };
  }
};

imgur.checkQuery = (query) => {
  let errMsg;
  if (!query) {
    errMsg = new Error(
      'Search requires a query. Try searching with a query (e.g cats).'
    );
  } else if (typeof query != 'string') {
    errMsg = new Error('You did not pass a string as a query.');
  } else {
    errMsg = '';
  }
  return errMsg;
};

imgur.initSearchParams = (query, options) => {
  const params = { sort: 'time', dateRange: 'all', page: '1' };

  for (const key in options) {
    if (key == 'sort' || key == 'dateRange' || key == 'page') {
      params[key] = params[key] != options[key] ? options[key] : params[key];
    }
  }

  let queryStr = '';
  Object.keys(params).forEach((param) => {
    queryStr += '/' + params[param];
  });
  queryStr += '?q=' + query;
  params['queryStr'] = queryStr;
  return params;
};

/**
 * Upload an image file or multiple image files concurrently
 * @param   {string|[]string}  path - path to a binary image file
 * @param   {string=} albumId - the album id to upload to
 * @param   {string=} title - the title of the image
 * @param   {string=} description - the description of the image
 * @returns {promise}
 */
imgur.uploadFile = async (path, albumId, title, description) => {
  const extraFormParams = {};

  if (!path) {
    throw new Error('No file(s) to upload');
  }

  if (typeof albumId === 'string' && albumId.length) {
    extraFormParams.album = albumId;
  }

  if (typeof title === 'string' && title.length) {
    extraFormParams.title = title;
  }

  if (typeof description === 'string' && description.length) {
    extraFormParams.description = description;
  }

  if (Array.isArray(path)) {
    const promises = path.map((f) =>
      imgur._imgurRequest('upload', fs.createReadStream(f), extraFormParams)
    );

    return await Promise.all(promises);
  } else {
    return await imgur._imgurRequest(
      'upload',
      fs.createReadStream(path),
      extraFormParams
    );
  }
};

/**
 * Upload a url
 * @param   {string}  url - address to an image on the web
 * @param   {string=} albumId - the album id to upload to
 * @param   {string=} title - the title of the image
 * @param   {string=} description - the description of the image
 * @returns {promise}
 */
imgur.uploadUrl = async (url, albumId, title, description) => {
  const extraFormParams = { type: 'url' };

  if (typeof url === 'object') {
    extraFormParams.title = url.title;
    extraFormParams.description = url.description;
    extraFormParams.album = url.albumId;
    url = url.url;
  }

  if (typeof albumId === 'string' && albumId.length) {
    extraFormParams.album = albumId;
  }

  if (typeof title === 'string' && title.length) {
    extraFormParams.title = title;
  }

  if (typeof description === 'string' && description.length) {
    extraFormParams.description = description;
  }

  if (!url || !urlParser.parse(url).protocol) {
    throw new Error('Invalid URL');
  }

  return await imgur._imgurRequest('upload', url, extraFormParams);
};

/**
 * Upload a Base64-encoded string
 * @link http://en.wikipedia.org/wiki/Base64
 * @param   {string} base64 - a base-64 encoded string
 * @param   {string=} albumId - the album id to upload to
 * @param   {string=} title - the title of the image
 * @param   {string=} description - the description of the image
 * @returns {promise} - on resolve, returns the resulting image object from imgur
 */
imgur.uploadBase64 = async (base64, albumId, title, description) => {
  const extraFormParams = {};

  if (typeof albumId === 'string' && albumId.length) {
    extraFormParams.album = albumId;
  }

  if (typeof title === 'string' && title.length) {
    extraFormParams.title = title;
  }

  if (typeof description === 'string' && description.length) {
    extraFormParams.description = description;
  }

  if (typeof base64 !== 'string' || !base64 || !base64.length) {
    throw new Error('Invalid Base64 input');
  }

  return await imgur._imgurRequest('upload', base64, extraFormParams);
};

/**
 * Upload an entire album of images
 * @param   {Array} images - array of image strings of desired type
 * @param   {string} uploadType - the type of the upload ('File', 'Url', 'Base64')
 * @param   {boolean=} failSafe - if true, it won't fail on invalid or empty image input and will return an object with empty album data and an empty image array
 * @returns {promise} - on resolve, returns an object with the album data and and an array of image data objects {data: {...}, images: [{...}, ...]}
 */
imgur.uploadAlbum = async (images, uploadType, failSafe) => {
  if (
    !images ||
    !images.length ||
    !(typeof images === 'string' || images instanceof Array)
  ) {
    if (failSafe) {
      return { data: {}, images: [] };
    } else {
      throw new Error('Invalid image input, only arrays supported');
    }
  }

  const album = await imgur.createAlbum();
  const imageArr = await imgur.uploadImages(images, uploadType, album.data.id);
  return { data: album.data, images: imageArr };
};

/**
 * Upload an entire album of images
 * @param {Array} images  - array of image strings of desired type
 * @param {string} uploadType - the type of the upload ('File', 'Url', 'Base64')
 * @param {string=} albumId - the album id to upload to
 * @returns {promise} - on resolve, returns an array of image data objects {album: {...}, images: [{...}, ...]}
 */
imgur.uploadImages = async (images, uploadType, albumId) => {
  const upload = imgur['upload' + uploadType];

  if (
    !images ||
    !images.length ||
    !(typeof images === 'string' || images instanceof Array)
  ) {
    throw new Error('Invalid image input, only arrays supported');
  }

  const results = [];
  let progress = 0;
  const done = images.length;
  for (let i = 0; i < done; i++) {
    const image = await upload(images[i], albumId);
    results.push(image.data);
    ++progress;
    if (progress == done) {
      return results;
    }
  }
};

/**
 * Get current credit limits
 * @returns {promise}
 */
imgur.getCredits = async () => {
  return await imgur._imgurRequest('credits');
};
