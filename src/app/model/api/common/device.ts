import { CodeNameEntity } from "./code-name-entity";

export class Pocket {
    id: number;
    code: string;
    name: string;
    model: string;
    producer: string;
    version: string;
    platform: string;
    uui: string;
    serial: string;
    // type: string;
    deviceType: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, model: string,
        producer: string,
        version: string,
        platform: string,
        uui: string,
        serial: string,
        // type: string, 
        deviceType: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.model = model;
        this.producer = producer;
        this.version = version;
        this.platform = platform;
        this.uui = uui;
        this.serial = serial;
        this.deviceType = deviceType;

    }
}