import { IDataObject, IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

import type { Zalo } from './Interfaces';
import * as message from './message';
import * as file from './file';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items: INodeExecutionData[]             = this.getInputData();
    const operationResult: INodeExecutionData[]   = [];
    let responseData: IDataObject | IDataObject[] = [];

    const resource  = this.getNodeParameter<Zalo>('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0);
    const zalo = {
        resource,
        operation
    } as Zalo;

    for (let i = 0; i < items.length; i++) {
        try {
            if (zalo.resource === 'message') {
                responseData = await message[zalo.operation].execute.call(this, i) as IDataObject[]
            } else if (zalo.resource === 'file') {
                responseData = await file[zalo.operation].execute.call(this, i) as IDataObject[]
            }

            const executionData = this.helpers.constructExecutionMetaData(
				this.helpers.returnJsonArray(responseData as IDataObject[]),
				{  itemData: { item: i } }
			);

            const data = executionData as any
            if (data[0].json?.error !== 0) {
                throw new NodeOperationError(this.getNode(), data[0]?.json.message, { itemIndex: i })
            }

			operationResult.push(...executionData);
        } catch (err) {
            if (this.continueOnFail()) {
                operationResult.push({ json: this.getInputData(i)[0].json, error: err });
            } else {
                if (err.context) err.context.itemIndex = i;
                throw err;
            }
        }
    }

    return [operationResult];
}