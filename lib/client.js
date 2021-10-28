"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgurClient = void 0;
const tslib_1 = require("tslib");
const events_1 = require("events");
const getAuthorizationHeader_1 = require("./getAuthorizationHeader");
const image_1 = require("./image");
const gallery_1 = require("./gallery");
const album_1 = require("./album");
const endpoints_1 = require("./common/endpoints");
const USERAGENT = 'imgur/next (https://github.com/kaimallea/node-imgur)';
const axios_1 = tslib_1.__importDefault(require("axios"));
class ImgurClient extends events_1.EventEmitter {
    constructor(credentials) {
        super();
        this.credentials = credentials;
        this.plainFetcher = axios_1.default.create({
            baseURL: endpoints_1.IMGUR_API_PREFIX,
            headers: {
                'user-agent': USERAGENT,
            },
            responseType: 'json',
        });
        this.fetcher = axios_1.default.create({
            baseURL: endpoints_1.IMGUR_API_PREFIX,
            headers: {
                'user-agent': USERAGENT,
            },
            responseType: 'json',
        });
        this.fetcher.interceptors.request.use(async (config) => {
            config.headers = config.headers ? config.headers : {};
            config.headers.authorization = await getAuthorizationHeader_1.getAuthorizationHeader(this);
            return config;
        }, (e) => Promise.reject(e));
    }
    plainRequest(options) {
        return this.plainFetcher(options);
    }
    request(options = {}) {
        return this.fetcher(options);
    }
    deleteImage(imageHash) {
        return image_1.deleteImage(this, imageHash);
    }
    favoriteImage(imageHash) {
        return image_1.favoriteImage(this, imageHash);
    }
    getAlbum(albumHash) {
        return album_1.getAlbum(this, albumHash);
    }
    getGallery(options) {
        return gallery_1.getGallery(this, options);
    }
    getSubredditGallery(options) {
        return gallery_1.getSubredditGallery(this, options);
    }
    searchGallery(options) {
        return gallery_1.searchGallery(this, options);
    }
    getImage(imageHash) {
        return image_1.getImage(this, imageHash);
    }
    updateImage(payload) {
        return image_1.updateImage(this, payload);
    }
    upload(payload) {
        return image_1.upload(this, payload);
    }
}
exports.ImgurClient = ImgurClient;
//# sourceMappingURL=client.js.map