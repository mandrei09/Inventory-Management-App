import { Injectable } from '@angular/core';

import { AssetSimpleDetail } from '../../model/api/assets/asset-simple-detail';
import { GenericMemoryService } from '../memory/generic.memory.service';

@Injectable()
export class AssetMemoryService extends GenericMemoryService<AssetSimpleDetail, number> {
}