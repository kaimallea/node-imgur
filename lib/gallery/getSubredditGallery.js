"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubredditGallery = exports.constructSubredditGalleryUrl = void 0;
const endpoints_1 = require("../common/endpoints");
const url_1 = require("url");
const utils_1 = require("../common/utils");
function constructSubredditGalleryUrl(options) {
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
    const url = new url_1.URL(`${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.SUBREDDIT_GALLERY_ENDPOINT}/${uri}`);
    return url;
}
exports.constructSubredditGalleryUrl = constructSubredditGalleryUrl;
async function getSubredditGallery(client, options) {
    const { pathname } = constructSubredditGalleryUrl(options);
    // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
    const finalPathname = pathname.slice(1);
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url: finalPathname }));
}
exports.getSubredditGallery = getSubredditGallery;
//# sourceMappingURL=getSubredditGallery.js.map