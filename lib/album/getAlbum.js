"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbum = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function getAlbum(client, albumHash) {
    const url = `${endpoints_1.ALBUM_ENDPOINT}/${albumHash}`;
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url }));
}
exports.getAlbum = getAlbum;
//# sourceMappingURL=getAlbum.js.map