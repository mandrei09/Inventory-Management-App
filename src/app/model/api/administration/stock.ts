import { CodeNameEntity } from '../common/code-name-entity';
import { CodePartnerEntity } from '../common/code-partner-entity';

export class Stock {
    id: number;
    code: string;
    name: string;
    uom: CodeNameEntity;
    material: CodeNameEntity;
    category: CodeNameEntity;
    company: CodeNameEntity;
    brand: CodeNameEntity;
    partner: CodePartnerEntity;
    state: any; notSync: any; isLocked: any;
    last_Incoming_Date: Date;
    longName: string;
    plant: string;
    storage_Location: string;
    um: string;
    quantity: number;
    value: number;


    constructor (id: number, code: string, name: string, uom: CodeNameEntity,
        material: CodeNameEntity,
        category: CodeNameEntity,
        company: CodeNameEntity,
        brand: CodeNameEntity,
        partner: CodePartnerEntity,
        last_Incoming_Date: Date,
        longName: string,
        plant: string,
        storage_Location: string,
        um: string,
        quantity: number,
        value: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uom = uom;
        this.material = material;
        this.category = category;
        this.company = company;
        this.brand = brand;
        this.partner = partner;
        this.last_Incoming_Date = last_Incoming_Date;
        this.longName = longName;
        this.plant = plant;
        this.storage_Location = storage_Location;
        this.um = um;
        this.quantity = quantity;
        this.value = value;
    }
}
