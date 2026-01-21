import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ZaloOAApi implements ICredentialType {
    name = 'zaloOAApi';
    displayName = 'Zalo OA Access Token API';
    documentationUrl = 'https://developers.zalo.me/docs/api/official-account-api/xac-thuc-va-uy-quyen/cach-1-xac-thuc-voi-giao-thuc-oauth/yeu-cau-cap-moi-oa-access-token-post-4307';
    properties: INodeProperties[] = [
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://openapi.zalo.me/v3.0/oa',
            description: 'The base URL that serves the API.'
        },
        {
            displayName: 'Access Token',
            name: 'accessToken',
            placeholder: 'Enter OA access token',
            type: 'string',
            typeOptions: {
                password: true
            },
            default: '',
            required: true
        }
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                access_token: '={{$credentials.accessToken}}'
            }
        }
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials?.baseUrl}}',
            url: '/quota/message',
            method: 'GET'
        },
        rules: [
            {
                type: 'responseSuccessBody',
                properties: {
                    key: 'error',
                    value: -216,
                    message: 'Unable to authenticate. Check the credentials and the url'
                } 
            }
        ]
    };    
}