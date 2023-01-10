import { MinimalNodeEntity, MinimalNodeEntryEntity } from '@alfresco/js-api';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class DocumentBasePageService {
  abstract canUpdateNode(node: MinimalNodeEntity): boolean;
  abstract canUploadContent(node: MinimalNodeEntryEntity): boolean;
}
