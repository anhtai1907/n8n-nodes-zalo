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

export async function uploadImage(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const dataPropertyName = this.getNodeParameter('dataPropertyName', index);
    const binaryData       = this.helpers.assertBinaryData(index, dataPropertyName);

    const allowedMimeTypes = ['image/gif', 'image/png', 'image/jpeg'];
    let mimeType = binaryData.mimeType;
    if (!allowedMimeTypes.includes(mimeType)) {
        throw new NodeOperationError(this.getNode(), 'Unsupported file format (Allowed file types: gif, png, jpeg, jpg)');
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
    const endpoint      = mimeType === 'image/gif' ? 'upload/gif' : 'upload/image';

    const responseData = await apiRequest.call(this, requestMethod, endpoint, headers, body, query)

    return this.helpers.returnJsonArray(responseData as IDataObject[]);
}