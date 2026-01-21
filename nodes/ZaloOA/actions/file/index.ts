import { INodeProperties } from 'n8n-workflow';
import * as uploadImage from './uploadImage';
import * as uploadFile from './uploadFile';

export { uploadImage, uploadFile };

export const description: INodeProperties[] = [
    {
        displayName: 'Operation',
		name: 'operation',
		type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['file']
            }
        },
        options: [
            {
                name: 'Upload Image / GIF',
                value: 'uploadImage',
                action: 'Upload an image or a GIF'
            },
            {
                name: 'Upload File',
                value: 'uploadFile',
                action: 'Upload a file'
            }
        ],
        default: 'uploadImage'
    },
    ...uploadImage.description,
    ...uploadFile.description
]