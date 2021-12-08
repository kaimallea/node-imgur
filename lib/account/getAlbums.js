"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbums = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function getAlbums(client, account, page) {
    const url = `${endpoints_1.ACCOUNT_ENDPOINT}/${account}/albums/${page !== null && page !== void 0 ? page : ''}`;
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url }));
}
exports.getAlbums = getAlbums;
//# sourceMappingURL=getAlbums.js.map