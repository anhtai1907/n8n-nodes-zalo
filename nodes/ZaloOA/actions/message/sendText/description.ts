import type { MessageProperties } from '../../Interfaces';

export const messageSendTextDescription: MessageProperties = [
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText']
            }
        },
        default: '',
        description: 'Text content you want to send to the user'
    }
]