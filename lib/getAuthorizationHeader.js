"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizationHeader = void 0;
const types_1 = require("./common/types");
const endpoints_1 = require("./common/endpoints");
async function getAuthorizationHeader(client) {
    if (types_1.isAccessToken(client.credentials)) {
        return `Bearer ${client.credentials.accessToken}`;
    }
    if (types_1.isClientId(client.credentials) && !types_1.isLogin(client.credentials)) {
        return `Client-ID ${client.credentials.clientId}`;
    }
    const { clientId, username, password } = client.credentials;
    const options = {
        url: endpoints_1.AUTHORIZE_ENDPOINT,
        baseURL: endpoints_1.IMGUR_API_PREFIX,
        params: {
            client_id: clientId,
            response_type: 'token',
        },
    };
    let response = await client.plainRequest(options);
    const cookies = Array.isArray(response.headers['set-cookie'])
        ? response.headers['set-cookie'][0]
        : response.headers['set-cookie'];
    if (!cookies) {
        throw new Error('No cookies were set during authorization');
    }
    const matches = cookies.match('(^|;)[s]*authorize_token=([^;]*)');
    if (!matches || matches.length < 3) {
        throw new Error('Unable to find authorize_token cookie');
    }
    const authorizeToken = matches[2];
    options.method = 'POST';
    options.data = {
        username,
        password,
        allow: authorizeToken,
    };
    options.followRedirect = false;
    options.headers = {
        cookie: `authorize_token=${authorizeToken}`,
    };
    response = await client.plainRequest(options);
    const location = response.headers.location;
    if (!location) {
        throw new Error('Unable to parse location');
    }
    const token = JSON.parse('{"' +
        decodeURI(location.slice(location.indexOf('#') + 1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}');
    const accessToken = token.access_token;
    client.credentials.accessToken = accessToken;
    return `Bearer ${accessToken}`;
}
exports.getAuthorizationHeader = getAuthorizationHeader;
//# sourceMappingURL=getAuthorizationHeader.js.map