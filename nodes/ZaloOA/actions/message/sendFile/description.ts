import type { MessageProperties } from '../../Interfaces';

export const messageSendFileDescription: MessageProperties = [
    {
        displayName: 'File Token',
        name: 'fileToken',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendFile']
            }
        },
        default: '',
        description: 'The token string returned when using the file upload API'
    }
]