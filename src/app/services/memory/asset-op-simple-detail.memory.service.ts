import { Injectable } from '@angular/core';
import { AssetOpSd } from '../../model/api/assets/asset-op-sd';
import { GenericMemoryService } from '../memory/generic.memory.service';

@Injectable()
export class AssetOpSimpleDetailMemoryService extends GenericMemoryService<AssetOpSd, number> {
}