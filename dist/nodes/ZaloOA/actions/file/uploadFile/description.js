"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadFileDescription = void 0;
exports.fileUploadFileDescription = [
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
                operation: ['uploadFile']
            }
        }
    }
];
//# sourceMappingURL=description.js.map