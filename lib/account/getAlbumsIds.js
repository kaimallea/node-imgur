"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbumsIds = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function getAlbumsIds(client, account, page) {
    const url = `${endpoints_1.ACCOUNT_ENDPOINT}/${account}/albums/ids/${page}`;
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url }));
}
exports.getAlbumsIds = getAlbumsIds;
//# sourceMappingURL=getAlbumsIds.js.map