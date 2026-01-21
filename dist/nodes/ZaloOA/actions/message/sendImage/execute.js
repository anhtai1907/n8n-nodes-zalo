"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImage = void 0;
const transport_1 = require("../../../transport");
const utils = __importStar(require("../../utils"));
async function sendImage(index) {
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index);
    const headers = await utils.createZaloHeaders.call(this, index);
    const body = await utils.createZaloBody.call(this, index);
    const query = {};
    const requestMethod = 'POST';
    const endpoint = !isForAnonymous ? 'message/cs' : 'message';
    const mediaType = this.getNodeParameter('mediaType', index);
    const useURL = this.getNodeParameter('useURL', index);
    body.message = {
        text: this.getNodeParameter('text', index),
        attachment: {
            type: 'template',
            payload: {
                template_type: 'media',
                elements: [{
                        media_type: mediaType,
                        ...(useURL
                            ? { url: this.getNodeParameter('attachmentURL', index) }
                            : { attachment_id: this.getNodeParameter('attachmentID', index) }),
                        ...(mediaType === 'gif'
                            ? { width: this.getNodeParameter('width', index), height: this.getNodeParameter('height', index) }
                            : {})
                    }]
            }
        }
    };
    const responseData = await transport_1.apiRequest.call(this, requestMethod, endpoint, headers, body, query);
    return this.helpers.returnJsonArray(responseData);
}
exports.sendImage = sendImage;
//# sourceMappingURL=execute.js.map