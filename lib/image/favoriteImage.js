"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteImage = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function favoriteImage(client, imageHash) {
    const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}/favorite`;
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url, method: 'POST' }));
}
exports.favoriteImage = favoriteImage;
//# sourceMappingURL=favoriteImage.js.map