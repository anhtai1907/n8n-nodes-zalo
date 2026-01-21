import { IDataObject, IExecuteFunctions, INodeExecutionData} from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import { ZaloModels } from '../../../models';

export async function sendText(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const authenType     = this.getNodeParameter('authentication', index) as string;
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index) as boolean;
    const text           = this.getNodeParameter('text', index);

    // Retrieve the access token based on the authentication method selected
    // by the user for the Zalo Node
    var accessToken;
    if (authenType === 'parameterCredentialsType') {
        accessToken = this.getNodeParameter('accessToken', index);
    } else {
        const credentials = await this.getCredentials('zaloOAApi') as unknown as ZaloModels.Credentials;
        accessToken = credentials.accessToken;
    }

    const headers = {
        access_token: accessToken
    } as IDataObject;
    
    const body = {
        message: {
            text: text
        }
    } as IDataObject;
    
    const query         = {} as IDataObject;
    const requestMethod = 'POST';
    const endpoint      = !isForAnonymous ? 'message/cs' : 'message';

    if (!isForAnonymous) {
        body.recipient = {
            user_id: this.getNodeParameter('userID', index)
        };
    } else {
        body.recipient = {
            anonymous_id: this.getNodeParameter('anonymousID', index),
            conversation_id: this.getNodeParameter('conversationID', index)
        };
    }

    const responseData = await apiRequest.call(this, requestMethod, endpoint, headers, body, query)

    return this.helpers.returnJsonArray(responseData as IDataObject[]);
}