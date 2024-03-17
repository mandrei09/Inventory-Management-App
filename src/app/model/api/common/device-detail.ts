
import { CodeNameEntity } from './code-name-entity';
import { Pocket } from './device';

export class DeviceDetail extends Pocket {
    deviceTypeCode: string;
    deviceTypeName: string;
    isDeleted: boolean;

    constructor (id: number, code: string, name: string, model: string, producer: string, version: string, platform: string, uui: string, serialNumber: string, deviceTypeId: number, deviceTypeCode: string, deviceTypeName: string, isDeleted: boolean) {
        super(id, code, name, model, producer, version, platform, uui, serialNumber, new CodeNameEntity(deviceTypeId, deviceTypeCode, deviceTypeName));
        this.deviceTypeCode = deviceTypeCode;
        this.deviceTypeName = deviceTypeName;
        this.isDeleted = isDeleted;
    }
}