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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const form_data_1 = __importDefault(require("form-data"));
const transport_1 = require("../../../transport");
const utils = __importStar(require("../../utils"));
const isGreaterThanMaxSize = (sizeString, maxSizeInMB) => {
    if (!sizeString)
        return false;
    const [sizeValue, sizeUnit] = sizeString.split(' ');
    let sizeInBytes;
    switch (sizeUnit.toUpperCase()) {
        case 'B':
            sizeInBytes = Number(sizeValue);
            break;
        case 'KB':
            sizeInBytes = Number(sizeValue) * 1024;
            break;
        case 'MB':
            sizeInBytes = Number(sizeValue) * 1024 * 1024;
            break;
        default:
            throw new Error(`Unsupported size unit: ${sizeUnit}`);
    }
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return sizeInBytes > maxSizeInBytes;
};
async function uploadFile(index) {
    const dataPropertyName = this.getNodeParameter('dataPropertyName', index);
    const binaryData = this.helpers.assertBinaryData(index, dataPropertyName);
    const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const mimeType = binaryData.mimeType;
    if (!allowedMimeTypes.includes(mimeType)) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Unsupported file format (Allowed file types: PDF, DOC, DOCX)');
    }
    if (isGreaterThanMaxSize(binaryData.fileSize, 5)) {
        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Exceeded max size limit of 5MB');
    }
    let fileContent;
    if (binaryData.id) {
        fileContent = this.helpers.getBinaryStream(binaryData.id);
    }
    else {
        fileContent = Buffer.from(binaryData.data, n8n_workflow_1.BINARY_ENCODING);
    }
    const formData = new form_data_1.default();
    formData.append('file', fileContent, { contentType: mimeType, filename: binaryData.fileName });
    const headers = {
        ...await utils.createZaloHeaders.call(this, index),
        ...{
            'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`
        }
    };
    const body = formData;
    const query = {};
    const requestMethod = 'POST';
    const endpoint = 'upload/file';
    const responseData = await transport_1.apiRequest.call(this, requestMethod, endpoint, headers, body, query);
    return this.helpers.returnJsonArray(responseData);
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=execute.js.map