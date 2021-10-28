"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImgurApiResponseFromResponse = exports.createForm = exports.getSource = exports.isStream = exports.isImageUrl = exports.isBase64 = void 0;
const tslib_1 = require("tslib");
const form_data_1 = tslib_1.__importDefault(require("form-data"));
function isBase64(payload) {
    if (typeof payload === 'string') {
        return false;
    }
    return typeof payload.base64 !== 'undefined' && payload.type === 'base64';
}
exports.isBase64 = isBase64;
function isImageUrl(payload) {
    if (typeof payload === 'string') {
        return true;
    }
    return typeof payload.image !== 'undefined' && payload.type === 'url';
}
exports.isImageUrl = isImageUrl;
function isStream(payload) {
    if (typeof payload === 'string') {
        return false;
    }
    return typeof payload.stream !== 'undefined';
}
exports.isStream = isStream;
// TODO: Refactor this to be a unique name of some kind (a hash?)
function getSource(payload) {
    if (typeof payload === 'string') {
        return payload;
    }
    if (isBase64(payload)) {
        return 'payload.base64';
    }
    else if (isStream(payload)) {
        return 'payload.stream';
    }
    else {
        return payload.image;
    }
}
exports.getSource = getSource;
function createForm(payload) {
    const form = new form_data_1.default();
    if (typeof payload === 'string') {
        form.append('image', payload);
        return form;
    }
    for (const [key, value] of Object.entries(payload)) {
        const supportedUploadObjectTypes = ['base64', 'stream'];
        if (supportedUploadObjectTypes.indexOf(key) !== -1) {
            if (supportedUploadObjectTypes.indexOf(payload.type) !== -1) {
                form.append(key, payload);
            }
        }
        else {
            form.append(key, value);
        }
    }
    return form;
}
exports.createForm = createForm;
function getImgurApiResponseFromResponse(response) {
    var _a, _b;
    if (typeof ((_a = response.data) === null || _a === void 0 ? void 0 : _a.status) !== 'undefined' &&
        typeof ((_b = response.data) === null || _b === void 0 ? void 0 : _b.success) !== 'undefined') {
        return response.data;
    }
    return {
        data: response.data,
        status: response.status,
        // TODO: determine the success of the call?
        success: true,
    };
}
exports.getImgurApiResponseFromResponse = getImgurApiResponseFromResponse;
//# sourceMappingURL=utils.js.map