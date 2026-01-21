import {
    BINARY_ENCODING,
    IDataObject,
    IExecuteFunctions,
    INodeExecutionData,
    NodeOperationError
} from 'n8n-workflow';

import FormData from 'form-data';

import type { Readable } from 'stream';

import { apiRequest } from '../../../transport';
import * as utils from '../../utils';

const isGreaterThanMaxSize = (sizeString: any, maxSizeInMB: number) => {
    if (!sizeString)
        return false;

    // Parse the file size string to get the numeric value and unit
    const [sizeValue, sizeUnit] = sizeString.split(' ');

    // Convert the size to bytes
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

    // Compare the size with the threshold
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    return sizeInBytes > maxSizeInBytes;
}

export async function uploadFile(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const dataPropertyName = this.getNodeParameter('dataPropertyName', index);
    const binaryData       = this.helpers.assertBinaryData(index, dataPropertyName);

    // Validate the mime type
    const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const mimeType = binaryData.mimeType;
    if (!allowedMimeTypes.includes(mimeType)) {
        throw new NodeOperationError(this.getNode(), 'Unsupported file format (Allowed file types: PDF, DOC, DOCX)');
    }

    // Validate the file size
    if (isGreaterThanMaxSize(binaryData.fileSize, 5)) {
        throw new NodeOperationError(this.getNode(), 'Exceeded max size limit of 5MB');
    }

    let fileContent: Buffer | Readable;
    if (binaryData.id) {
        fileContent = this.helpers.getBinaryStream(binaryData.id);
    } else {
        fileContent = Buffer.from(binaryData.data, BINARY_ENCODING);
    }

    const formData = new FormData();
    formData.append('file', fileContent, { contentType: mimeType, filename: binaryData.fileName })

    const headers       = {
        ...(await utils.createZaloHeaders.call(this, index) as IDataObject),
        ...{
            'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`
        }
    }
    const body          = formData;
    const query         = {} as IDataObject;
    const requestMethod = 'POST';
    const endpoint      = 'upload/file';

    const responseData = await apiRequest.call(this, requestMethod, endpoint, headers, body, query)

    return this.helpers.returnJsonArray(responseData as IDataObject[]);
}