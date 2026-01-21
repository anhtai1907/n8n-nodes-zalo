import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';
declare type ZaloMap = {
    message: 'sendText' | 'sendImage' | 'sendTemplate' | 'sendFile';
    file: 'uploadImage' | 'uploadFile';
};
export declare type Zalo = AllEntities<ZaloMap>;
export declare type ZaloMessage = Entity<ZaloMap, 'message'>;
export declare type ZaloFile = Entity<ZaloMap, 'file'>;
export declare type MessageProperties = PropertiesOf<ZaloMessage>;
export declare type FileProperties = PropertiesOf<ZaloFile>;
export {};
