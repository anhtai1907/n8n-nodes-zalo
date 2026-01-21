"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptions = exports.sendFile = exports.sendTemplate = exports.sendImage = exports.sendText = void 0;
const sendText = __importStar(require("./sendText"));
exports.sendText = sendText;
const sendImage = __importStar(require("./sendImage"));
exports.sendImage = sendImage;
const sendTemplate = __importStar(require("./sendText"));
exports.sendTemplate = sendTemplate;
const sendFile = __importStar(require("./sendFile"));
exports.sendFile = sendFile;
exports.descriptions = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['message']
            }
        },
        options: [
            {
                name: 'Text',
                value: 'sendText',
                action: 'Send a text message'
            },
            {
                name: 'Text + Image',
                value: 'sendImage',
                action: 'Send a text message with an image attached'
            },
            {
                name: 'Template',
                value: 'sendTemplate',
                action: 'Send a message using the user information request form'
            },
            {
                name: 'File',
                value: 'sendFile',
                action: 'Send a file'
            }
        ],
        default: 'sendText'
    },
    {
        displayName: 'Send To Anonymous',
        name: 'isForAnonymous',
        type: 'boolean',
        required: true,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendImage', 'sendTemplate', 'sendFile']
            }
        },
        default: false,
        description: 'Whether the user is anonymous or not'
    },
    {
        displayName: 'User ID',
        name: 'userID',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendImage', 'sendTemplate', 'sendFile'],
                isForAnonymous: [false]
            }
        },
        default: '',
        description: 'User ID of Zalo'
    },
    {
        displayName: 'Anonymous ID',
        name: 'anonymousID',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendImage', 'sendTemplate', 'sendFile'],
                isForAnonymous: [true]
            }
        },
        default: '',
        description: 'The ID represents the anonymous user'
    },
    {
        displayName: 'Conversation ID',
        name: 'conversationID',
        type: 'string',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendImage', 'sendTemplate', 'sendFile'],
                isForAnonymous: [true]
            }
        },
        default: '',
        description: 'The ID of the conversation'
    },
    ...sendText.description,
    ...sendImage.description,
    ...sendFile.description
];
//# sourceMappingURL=index.js.map