import type { FileProperties } from '../../Interfaces';

export const fileUploadImageDescription: FileProperties = [
    {
        displayName: 'Property Name',
        name: 'dataPropertyName',
        type: 'string',
        default: 'data',
        required: true,
        description: 'Name of the binary property which contains the data for the file to be uploaded',
        displayOptions: {
            show: {
                resource: ['file'],
                operation: ['uploadImage']
            }
        }
    }
]