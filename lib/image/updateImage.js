"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImage = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
function isValidUpdatePayload(p) {
    return typeof p.title === 'string' || typeof p.description === 'string';
}
async function updateImage(client, payload) {
    if (Array.isArray(payload)) {
        const promises = payload.map((p) => {
            if (!isValidUpdatePayload(p)) {
                throw new Error('Update requires a title and/or description');
            }
            const url = `${endpoints_1.IMAGE_ENDPOINT}/${p.imageHash}`;
            const form = utils_1.createForm(p);
            /* eslint no-async-promise-executor: 0 */
            return new Promise(async function (resolve) {
                return resolve(utils_1.getImgurApiResponseFromResponse(await client.request({
                    url,
                    method: 'POST',
                    data: form,
                    headers: form.getHeaders(),
                })));
            });
        });
        return await Promise.all(promises);
    }
    if (!isValidUpdatePayload(payload)) {
        throw new Error('Update requires a title and/or description');
    }
    const url = `${endpoints_1.IMAGE_ENDPOINT}/${payload.imageHash}`;
    const form = utils_1.createForm(payload);
    return utils_1.getImgurApiResponseFromResponse(await client.request({
        url,
        method: 'POST',
        data: form,
        headers: form.getHeaders(),
    }));
}
exports.updateImage = updateImage;
//# sourceMappingURL=updateImage.js.map