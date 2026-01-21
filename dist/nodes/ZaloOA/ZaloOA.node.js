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
exports.ZaloOA = void 0;
const message = __importStar(require("./actions/message"));
const file = __importStar(require("./actions/file"));
const router_1 = require("./actions/router");
class ZaloOA {
    constructor() {
        this.description = {
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
        this.methods = {};
    }
    async execute() {
        return router_1.router.call(this);
    }
}
exports.ZaloOA = ZaloOA;
//# sourceMappingURL=ZaloOA.node.js.map