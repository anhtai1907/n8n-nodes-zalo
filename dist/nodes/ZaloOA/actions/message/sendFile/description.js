"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSendFileDescription = void 0;
exports.messageSendFileDescription = [
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
];
//# sourceMappingURL=description.js.map