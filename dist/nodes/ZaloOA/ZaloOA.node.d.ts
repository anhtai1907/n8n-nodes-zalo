import { IExecuteFunctions, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class ZaloOA implements INodeType {
    description: INodeTypeDescription;
    methods: {};
    execute(this: IExecuteFunctions): Promise<import("n8n-workflow").INodeExecutionData[][]>;
}
