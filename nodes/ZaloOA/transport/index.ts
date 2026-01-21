import {
	type IExecuteFunctions,
	type IHookFunctions,
	type ILoadOptionsFunctions,
	type IDataObject,
	type IHttpRequestMethods,
    type IHttpRequestOptions,
    NodeApiError,
} from 'n8n-workflow';
import { ZaloModels } from '../models';

/**
 * Make an API request to Zalo
 */
export async function apiRequest(
    this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    endpoint: string,
    headers: IDataObject = {}, 
    body: any = {},
    query: IDataObject = {}
) {
    const authenType = this.getNodeParameter('authentication', 0) as string;
    
    let baseUrl = this.getNodeParameter('baseUrl', 0) as string;
    if ((!baseUrl || baseUrl.trim() === '') && authenType === 'predefinedCredentialsType') {
        const credentials = await this.getCredentials('zaloOAApi') as unknown as ZaloModels.Credentials;
        baseUrl = credentials.baseUrl;
    }
    baseUrl = baseUrl.replace(/\/$/, '');

    const options: IHttpRequestOptions = {
        method,
        body,
        qs: query,
        url: `${baseUrl}/${endpoint}`,
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    }

    if (Object.keys(headers).length !== 0) {
        options.headers = {...options.headers, ...headers}
    }

    if (!Object.keys(body).length) {
		delete options.body;
	}

	if (!Object.keys(query).length) {
		delete options.qs;
	}

    try {
        return await this.helpers.httpRequest(options);
    } catch (error) {
        throw new NodeApiError(this.getNode(), error)
    }
}