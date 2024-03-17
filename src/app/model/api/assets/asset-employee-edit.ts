import { CodeNameEntity } from "../common/code-name-entity";
import { Brand } from "./brand";
import { Model } from "./model";
import { DictionaryItem } from '../administration/dictionary-item';

export class AssetEmployeeEdit {
    id: number;
    invNo: string;
    name: string;
    serialNumber: string;
    info: string;
    info2019: string;
    brand: Brand;
    model: Model;
    dictionaryItem: DictionaryItem;
    validated: boolean;
    dictionaryItemId: number;
    brandId: number;
    modelId: number;
    sapCode: string;
    phoneNumber: string;
    imei: string;
    adm: any;
}
