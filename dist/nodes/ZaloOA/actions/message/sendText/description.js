"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSendTextDescription = void 0;
exports.messageSendTextDescription = [
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
];
//# sourceMappingURL=description.js.map