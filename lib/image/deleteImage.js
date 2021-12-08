"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function deleteImage(client, imageHash) {
    const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}`;
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url, method: 'DELETE' }));
}
exports.deleteImage = deleteImage;
//# sourceMappingURL=deleteImage.js.map