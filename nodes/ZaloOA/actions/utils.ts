import { IDataObject, IExecuteFunctions } from 'n8n-workflow';

import { ZaloModels } from '../models';

export async function createZaloBody(this: IExecuteFunctions, index: number): Promise<IDataObject> {
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index) as boolean;
    
    const body = {
        recipient: isForAnonymous
            ? {
                anonymous_id: this.getNodeParameter('anonymousID', index),
                conversation_id: this.getNodeParameter('conversationID', index),
              }
            : {
                user_id: this.getNodeParameter('userID', index),
              }
    } as IDataObject

    return body
}

/**
 * Retrieve the access token based on the authentication method selected
 * by the user for the Zalo Node
 */
export async function createZaloHeaders(this: IExecuteFunctions, index: number): Promise<IDataObject> {
    const authenType  = this.getNodeParameter('authentication', index) as string;
    
    const accessToken = authenType === 'parameterCredentialsType'
        ? this.getNodeParameter('accessToken', index)
        : (await this.getCredentials('zaloOAApi') as unknown as ZaloModels.Credentials).accessToken;
    
    const headers = {
        access_token: accessToken,
    } as IDataObject;

    return headers;
}