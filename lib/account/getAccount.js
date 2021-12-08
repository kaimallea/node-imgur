"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = void 0;
const endpoints_1 = require("../common/endpoints");
const utils_1 = require("../common/utils");
async function getAccount(client, account) {
    const url = `${endpoints_1.ACCOUNT_ENDPOINT}/${account}`;
    return utils_1.getImgurApiResponseFromResponse(await client.plainRequest({ url }));
}
exports.getAccount = getAccount;
//# sourceMappingURL=getAccount.js.map