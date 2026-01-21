"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRequest = void 0;
const n8n_workflow_1 = require("n8n-workflow");
async function apiRequest(method, endpoint, headers = {}, body = {}, query = {}) {
    const authenType = this.getNodeParameter('authentication', 0);
    let baseUrl = this.getNodeParameter('baseUrl', 0);
    if ((!baseUrl || baseUrl.trim() === '') && authenType === 'predefinedCredentialsType') {
        const credentials = await this.getCredentials('zaloOAApi');
        baseUrl = credentials.baseUrl;
    }
    baseUrl = baseUrl.replace(/\/$/, '');
    const options = {
        method,
        body,
        qs: query,
        url: `${baseUrl}/${endpoint}`,
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    };
    if (Object.keys(headers).length !== 0) {
        options.headers = { ...options.headers, ...headers };
    }
    if (!Object.keys(body).length) {
        delete options.body;
    }
    if (!Object.keys(query).length) {
        delete options.qs;
    }
    try {
        return await this.helpers.httpRequest(options);
    }
    catch (error) {
        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
    }
}
exports.apiRequest = apiRequest;
//# sourceMappingURL=index.js.map