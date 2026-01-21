import type { AllEntities, Entity, PropertiesOf } from 'n8n-workflow';

type ZaloMap = {
    message: 'sendText' | 'sendImage' | 'sendTemplate' | 'sendFile';
    file: 'uploadImage' | 'uploadFile';
};

export type Zalo = AllEntities<ZaloMap>;

export type ZaloMessage = Entity<ZaloMap, 'message'>;
export type ZaloFile    = Entity<ZaloMap, 'file'>;

export type MessageProperties = PropertiesOf<ZaloMessage>;
export type FileProperties    = PropertiesOf<ZaloFile>;