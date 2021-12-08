"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGallery = exports.constructSearchGalleryUrl = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
const url_1 = require("url");
const advancedParameters = [
    'q_all',
    'q_any',
    'q_exactly',
    'q_not',
    'q_type',
    'q_size_px',
];
function constructSearchGalleryUrl(options) {
    let uri = '';
    if (options.sort) {
        uri += `/${options.sort}`;
    }
    if (options.sort === 'top' && options.window) {
        uri += `/${options.window}`;
    }
    if (options.page) {
        uri += `/${options.page}`;
    }
    const url = new url_1.URL(`${endpoints_1.IMGUR_API_PREFIX}/${endpoints_1.SEARCH_GALLERY_ENDPOINT}${uri}`);
    advancedParameters.forEach((param) => {
        var _a;
        if ((_a = options[param]) === null || _a === void 0 ? void 0 : _a.length) {
            url.searchParams.append(param, options[param]);
        }
    });
    if (!url.search) {
        const query = options.q || options.query;
        if (!query) {
            throw new Error('No query was provided');
        }
        url.searchParams.append('q', query);
    }
    return url;
}
exports.constructSearchGalleryUrl = constructSearchGalleryUrl;
async function searchGallery(client, options) {
    const { pathname } = constructSearchGalleryUrl(options);
    // since we're using prefixUrl with got, we have to remove the starting slash or it'll throw
    const finalPathname = pathname.slice(1);
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url: finalPathname }));
}
exports.searchGallery = searchGallery;
//# sourceMappingURL=searchGallery.js.map