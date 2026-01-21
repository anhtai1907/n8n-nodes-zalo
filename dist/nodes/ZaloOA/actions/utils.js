"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZaloHeaders = exports.createZaloBody = void 0;
async function createZaloBody(index) {
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index);
    const body = {
        recipient: isForAnonymous
            ? {
                anonymous_id: this.getNodeParameter('anonymousID', index),
                conversation_id: this.getNodeParameter('conversationID', index),
            }
            : {
                user_id: this.getNodeParameter('userID', index),
            }
    };
    return body;
}
exports.createZaloBody = createZaloBody;
async function createZaloHeaders(index) {
    const authenType = this.getNodeParameter('authentication', index);
    const accessToken = authenType === 'parameterCredentialsType'
        ? this.getNodeParameter('accessToken', index)
        : (await this.getCredentials('zaloOAApi')).accessToken;
    const headers = {
        access_token: accessToken,
    };
    return headers;
}
exports.createZaloHeaders = createZaloHeaders;
//# sourceMappingURL=utils.js.map