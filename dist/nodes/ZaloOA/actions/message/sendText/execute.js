"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendText = void 0;
const transport_1 = require("../../../transport");
async function sendText(index) {
    const authenType = this.getNodeParameter('authentication', index);
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index);
    const text = this.getNodeParameter('text', index);
    var accessToken;
    if (authenType === 'parameterCredentialsType') {
        accessToken = this.getNodeParameter('accessToken', index);
    }
    else {
        const credentials = await this.getCredentials('zaloOAApi');
        accessToken = credentials.accessToken;
    }
    const headers = {
        access_token: accessToken
    };
    const body = {
        message: {
            text: text
        }
    };
    const query = {};
    const requestMethod = 'POST';
    const endpoint = !isForAnonymous ? 'message/cs' : 'message';
    if (!isForAnonymous) {
        body.recipient = {
            user_id: this.getNodeParameter('userID', index)
        };
    }
    else {
        body.recipient = {
            anonymous_id: this.getNodeParameter('anonymousID', index),
            conversation_id: this.getNodeParameter('conversationID', index)
        };
    }
    const responseData = await transport_1.apiRequest.call(this, requestMethod, endpoint, headers, body, query);
    return this.helpers.returnJsonArray(responseData);
}
exports.sendText = sendText;
//# sourceMappingURL=execute.js.map