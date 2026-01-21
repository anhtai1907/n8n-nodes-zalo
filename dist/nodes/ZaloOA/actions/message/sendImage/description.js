"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSendImageDescription = void 0;
exports.messageSendImageDescription = [
    {
        displayName: 'Text',
        name: 'text',
        type: 'string',
        typeOptions: {
            maxValue: 2000
        },
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage']
            }
        },
        default: '',
        description: 'Title of the photo. The maximum limit is 2,000 characters.'
    },
    {
        displayName: 'Media Type',
        name: 'mediaType',
        type: 'options',
        options: [
            {
                name: 'Image',
                value: 'image'
            },
            {
                name: 'GIF',
                value: 'gif'
            }
        ],
        default: 'image',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage']
            }
        }
    },
    {
        displayName: 'Use URL',
        name: 'useURL',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage']
            }
        }
    },
    {
        displayName: 'Attachment\'s URL',
        name: 'attachmentURL',
        type: 'string',
        required: true,
        default: '',
        description: 'The URL of the image',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage'],
                useURL: [true]
            }
        }
    },
    {
        displayName: 'Attachment\'s ID',
        name: 'attachmentID',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the image after using the upload API',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage'],
                useURL: [false]
            }
        }
    },
    {
        displayName: 'Width',
        name: 'width',
        type: 'number',
        required: true,
        default: '',
        description: 'The width of the image',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage'],
                mediaType: ['gif']
            }
        }
    },
    {
        displayName: 'Height',
        name: 'height',
        type: 'number',
        required: true,
        default: '',
        description: 'The height of the image',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendImage'],
                mediaType: ['gif']
            }
        }
    }
];
//# sourceMappingURL=description.js.map