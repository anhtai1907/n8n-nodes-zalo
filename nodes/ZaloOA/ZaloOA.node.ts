import {
    IExecuteFunctions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import * as message from './actions/message';
import * as file from './actions/file';
import { router } from './actions/router';

export class ZaloOA implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'ZaloOA',
        name: 'zaloOA',
        icon: 'file:zalo.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Consume ZaloOA API',
        defaults: {
            name: 'Zalo OA',
        },
        inputs: ['main'],
		outputs: ['main'],
        credentials: [
            {
                name: 'zaloOAApi',
                required: true,
                displayOptions: {
                    hide: {
                        authentication: ['parameterCredentialsType']
                    }
                }
            }
        ],
        properties: [
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'options',
                options: [
                    {
                        name: 'Parameter Credentials',
                        value: 'parameterCredentialsType'
                    },
                    {
                        name: 'Predefined Credentials',
                        value: 'predefinedCredentialsType'
                    }
                ],
                default: 'parameterCredentialsType',
                noDataExpression: true,
                required: true,
                description: 'Select the authentication method'
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://openapi.zalo.me/v3.0/oa',
                displayOptions: {
                    show: {
                        authentication: ['parameterCredentialsType'] 
                    }
                },
                noDataExpression: true,
                required: true,
                description: 'The base URL that serves the API'
            },
            {
                displayName: 'Access Token',
                name: 'accessToken',
                type: 'string',
                default: '',
                required: true,
                description: 'OA access token',
                placeholder: 'Enter OA access token',
                displayOptions: {
                    show: {
                        authentication: ['parameterCredentialsType']
                    }
                }
            },
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Message',
                        value: 'message'
                    },
                    {
                        name: 'File',
                        value: 'file'
                    }
                ],
                default: 'message'
            },
            ...message.descriptions,
            ...file.description
        ]
    };

    methods = {};

    async execute(this: IExecuteFunctions) {
        return router.call(this);
    }
}