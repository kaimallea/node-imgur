"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogin = exports.isClientId = exports.isAccessToken = void 0;
function isAccessToken(arg) {
    return arg.accessToken !== undefined;
}
exports.isAccessToken = isAccessToken;
function isClientId(arg) {
    return arg.clientId !== undefined;
}
exports.isClientId = isClientId;
function isLogin(arg) {
    return (arg.clientId !== undefined &&
        arg.username !== undefined &&
        arg.password !== undefined);
}
exports.isLogin = isLogin;
//# sourceMappingURL=types.js.map