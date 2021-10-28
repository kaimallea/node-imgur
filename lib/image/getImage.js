"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function getImage(client, imageHash) {
    const url = `${endpoints_1.IMAGE_ENDPOINT}/${imageHash}`;
    return utils_1.getImgurApiResponseFromResponse(await client.request({ url }));
}
exports.getImage = getImage;
//# sourceMappingURL=getImage.js.map