import { type IExecuteFunctions, type IHookFunctions, type ILoadOptionsFunctions, type IDataObject, type IHttpRequestMethods } from 'n8n-workflow';
export declare function apiRequest(this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, method: IHttpRequestMethods, endpoint: string, headers?: IDataObject, body?: any, query?: IDataObject): Promise<any>;
