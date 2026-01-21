import { IDataObject, IExecuteFunctions, INodeExecutionData} from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import * as utils from '../../utils';

export async function sendFile(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index) as boolean;

    const headers       = await utils.createZaloHeaders.call(this, index) as IDataObject;
    const body          = await utils.createZaloBody.call(this, index) as IDataObject
    const query         = {} as IDataObject;
    const requestMethod = 'POST';
    const endpoint      = !isForAnonymous ? 'message/cs' : 'message';

    // Append the required payload for posting file message
    body.message = {
        attachment: {
            type: 'file',
            payload: {
                token: this.getNodeParameter('fileToken', index)
            }
        }
    }

    const responseData = await apiRequest.call(this, requestMethod, endpoint, headers, body, query)

    return this.helpers.returnJsonArray(responseData as IDataObject[]);
}