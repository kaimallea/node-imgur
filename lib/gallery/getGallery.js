"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGallery = exports.constructGalleryUrl = void 0;
const endpoints_1 = require("../common/endpoints");
const url_1 = require("url");
const utils_1 = require("../common/utils");
const defaultOptions = {
    section: 'hot',
    sort: 'viral',
};
function constructGalleryUrl(options) {
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
    const url = new url_1.URL(`${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.GALLERY_ENDPOINT}/${uri}`);
    if (mergedOptions.showViral !== undefined) {
        url.searchParams.append('showViral', mergedOptions.showViral.toString());
    }
    if (mergedOptions.mature !== undefined) {
        url.searchParams.append('mature', mergedOptions.mature.toString());
    }
    if (mergedOptions.album_previews !== undefined) {
        url.searchParams.append('album_previews', mergedOptions.album_previews.toString());
    }
    return url;
}
exports.constructGalleryUrl = constructGalleryUrl;
async function getGallery(client, options = defaultOptions) {
    const { pathname } = constructGalleryUrl(options);
    // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
    const finalPathname = pathname.slice(1);
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url: finalPathname }));
}
exports.getGallery = getGallery;
//# sourceMappingURL=getGallery.js.map