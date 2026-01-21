"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadImageDescription = void 0;
exports.fileUploadImageDescription = [
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
];
//# sourceMappingURL=description.js.map