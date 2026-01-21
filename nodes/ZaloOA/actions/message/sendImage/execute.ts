import { IDataObject, IExecuteFunctions, INodeExecutionData} from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import * as utils from '../../utils';

export async function sendImage(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
    const isForAnonymous = this.getNodeParameter('isForAnonymous', index) as boolean;

    const headers       = await utils.createZaloHeaders.call(this, index) as IDataObject;
    const body          = await utils.createZaloBody.call(this, index) as IDataObject;
    const query         = {} as IDataObject;
    const requestMethod = 'POST';
    const endpoint      = !isForAnonymous ? 'message/cs' : 'message';

    // Append the required payload for posting image message
    const mediaType = this.getNodeParameter('mediaType', index)
    const useURL    = this.getNodeParameter('useURL', index)
    body.message = {
        text: this.getNodeParameter('text', index),
        attachment: {
            type: 'template',
            payload: {
                template_type: 'media',
                elements: [{
                    media_type: mediaType,
                    ...(useURL
                        ? { url: this.getNodeParameter('attachmentURL', index) }
                        : { attachment_id: this.getNodeParameter('attachmentID', index) }
                    ),
                    ...(mediaType === 'gif'
                        ? { width: this.getNodeParameter('width', index), height: this.getNodeParameter('height', index) }
                        : {}
                    )
                }]
            }
        }
    }

    const responseData = await apiRequest.call(this, requestMethod, endpoint, headers, body, query)

    return this.helpers.returnJsonArray(responseData as IDataObject[]);
}
