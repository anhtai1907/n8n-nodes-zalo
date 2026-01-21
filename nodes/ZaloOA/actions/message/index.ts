import type { INodeProperties } from 'n8n-workflow';

import * as sendText from './sendText';
import * as sendImage from './sendImage';
import * as sendTemplate from './sendText';
import * as sendFile from './sendFile';

export { sendText, sendImage, sendTemplate, sendFile };

export const descriptions: INodeProperties[] = [
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
]