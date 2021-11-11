"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const utils_1 = require("../common/utils");
const endpoints_1 = require("../common/endpoints");
async function upload(client, payload) {
    if (Array.isArray(payload)) {
        const promises = payload.map((p) => {
            const form = utils_1.createForm(p);
            /* eslint no-async-promise-executor: 0 */
            return new Promise(async (resolve) => {
                resolve(utils_1.getImgurApiResponseFromResponse(await client.request({
                    url: endpoints_1.UPLOAD_ENDPOINT,
                    method: 'POST',
                    data: form,
                    headers: form.getHeaders(),
                    onUploadProgress: (progressEvent) => {
                        console.log({ progressEvent });
                        client.emit('uploadProgress', { ...progressEvent });
                    },
                })));
            });
        });
        return await Promise.all(promises);
    }
    const form = utils_1.createForm(payload);
    // const id = Date.now.toString();
    const request = await client.request({
        url: endpoints_1.UPLOAD_ENDPOINT,
        method: 'POST',
        data: form,
        headers: form.getHeaders(),
        onUploadProgress: (progressEvent) => {
            console.log({ progressEvent });
            client.emit('uploadProgress', { ...progressEvent });
        },
    });
    return Promise.resolve(utils_1.getImgurApiResponseFromResponse(request));
}
exports.upload = upload;
//# sourceMappingURL=upload.js.map